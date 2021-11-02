<template>
  <div
    ref="self"
    :class="className"
    :style="style"
    @mousedown="mousedown"
    @touchstart.stop="mousedown"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from '@vue/reactivity';
  import { onMounted } from '@vue/runtime-core';
  import {
    GridItemDragEvent,
    GridItemEvent,
  } from 'src/composables/gridEmitParam';

  const CLICK_PIXEL_DISTANCE = 4;

  interface Props {
    index: number;
    sort: number;
    cellWidth: number;
    cellHeight: number;
    columnCount: number;
    rowShift: number;
    draggable: boolean;
    dragDelay: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    rowShift: 0,
    dragDelay: 0,
  });

  interface Emits {
    // eslint-disable-next-line no-unused-vars
    (e: 'dragstart', event: GridItemEvent): void;
    // eslint-disable-next-line no-unused-vars
    (e: 'drag', event: GridItemDragEvent): void;
    // eslint-disable-next-line no-unused-vars
    (e: 'click', event: GridItemEvent): void;
    // eslint-disable-next-line no-unused-vars
    (e: 'dragend', event: GridItemEvent): void;
  }

  const emit = defineEmits<Emits>();

  const self = ref();

  let animate = ref(true);
  let dragging = ref(false);
  let shiftStartX = ref(0);
  let shiftStartY = ref(0);
  let mouseMoveStartX = ref(0);
  let mouseMoveStartY = ref(0);
  let shiftX = ref(0);
  let shiftY = ref(0);
  let timer: number | null = null;
  let zIndex = ref(1);

  onMounted(() => {
    self.value.addEventListener(
      'transitionend',
      () => {
        if (!dragging.value) {
          zIndex.value = 1;
        }
      },
      false,
    );
  });

  const className = computed(() => {
    return [
      'v-grid-item-wrapper',
      {
        'v-grid-item-animate': animate.value,
        'v-grid-item-dragging': dragging.value,
      },
    ];
  });

  const left = computed(() =>
    dragging.value
      ? shiftX.value
      : props.rowShift + (props.sort % props.columnCount) * props.cellWidth,
  );

  const top = computed(() =>
    dragging.value
      ? shiftY.value
      : Math.floor(props.sort / props.columnCount) * props.cellHeight,
  );

  const style = computed(() => {
    return {
      zInder: zIndex.value,
      width: props.cellWidth + 'px',
      height: props.cellHeight + 'px',
      transform: `translate3d(${left.value}px, ${top.value}px, 0)`,
    };
  });

  function wrapEvent(event: Event): GridItemEvent {
    let { index, sort } = props;
    return { event, index, sort };
  }

  function dragStart(event: MouseEvent | TouchEvent) {
    let e;
    if (event instanceof MouseEvent) e = event;
    else e = event.touches[0];
    zIndex.value = 2;
    shiftX.value = shiftStartX.value = left.value;
    shiftY.value = shiftStartY.value = top.value;
    mouseMoveStartX.value = e.pageX;
    mouseMoveStartY.value = e.pageY;
    animate.value = false;
    dragging.value = true;
    document.addEventListener('mousemove', documentMouseMove);
    document.addEventListener('touchmove', documentMouseMove);
    emit('dragstart', wrapEvent(event));
  }

  function drag(event: MouseEvent | TouchEvent) {
    let e;
    if (event instanceof MouseEvent) e = event;
    else e = event.touches[0];
    const distanceX = e.pageX - mouseMoveStartX.value;
    const distanceY = e.pageY - mouseMoveStartY.value;
    shiftX.value = distanceX + shiftStartX.value;
    shiftY.value = distanceY + shiftStartY.value;
    let gridX = Math.round((shiftX.value - props.rowShift) / props.cellWidth);
    let gridY = Math.round(shiftY.value / props.cellHeight);
    gridX = Math.min(gridX, props.columnCount - 1);
    gridY = Math.max(gridY * props.columnCount, 0);
    const gridPosition = gridX + gridY;

    const $event = {
      event,
      distanceX,
      distanceY,
      positionX: shiftX.value,
      positionY: shiftY.value,
      index: props.index,
      gridX,
      gridY,
      gridPosition,
    };
    emit('drag', $event);
  }

  function mousedown(event: MouseEvent | TouchEvent) {
    if (props.draggable) {
      timer = setTimeout(() => {
        dragStart(event);
      }, props.dragDelay);
      document.addEventListener('mouseup', documentMouseUp);
      document.addEventListener('touchend', documentMouseUp);
    }
  }

  function documentMouseMove(event: MouseEvent | TouchEvent) {
    if (props.draggable && dragging.value) {
      drag(event);
    }
  }

  function documentMouseUp(event: MouseEvent | TouchEvent) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    let dx = shiftStartX.value - shiftX.value;
    let dy = shiftStartY.value - shiftY.value;
    let distance = Math.sqrt(dx * dx + dy * dy);
    animate.value = true;
    dragging.value = false;
    mouseMoveStartX.value = 0;
    mouseMoveStartY.value = 0;
    shiftStartX.value = 0;
    shiftStartY.value = 0;
    shiftX.value = 0;
    shiftY.value = 0;
    document.removeEventListener('mousemove', documentMouseMove);
    document.removeEventListener('touchmove', documentMouseMove);
    document.removeEventListener('mouseup', documentMouseUp);
    document.removeEventListener('touchend', documentMouseUp);
    let $event = wrapEvent(event);

    if (distance < CLICK_PIXEL_DISTANCE) {
      emit('click', $event);
    }
    emit('dragend', $event);
  }
</script>

<style>
  .v-grid-item-wrapper {
    display: block;
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: 0;
    user-select: none;
    transform: translate3d(0px, 0px, 0px);
    z-index: 1;
  }
  .v-grid-item-animate {
    transition: transform 800ms ease;
  }
</style>
