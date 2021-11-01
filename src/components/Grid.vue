<template>
  <div ref="gridContainer" class="v-grid" :style="style">
    <GridItem v-for="v in list"
      :key="v.index"
      :index="v.index"
      :sort="v.sort"
      :draggable="draggable"
      :drag-delay="dragDelay"
      :column-count="columnCount"
      :cell-width="cellWidth"
      :cell-height="cellHeight"
      :window-width="windowWidth"
      :row-shift="rowShift"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @drag="onDrag"
      @click="click">
      <slot name="cell"
        :item="v.item"
        :index="v.index"
        :sort="v.sort"
        :remove="() => { removeItem(v) }">
      </slot>
    </GridItem>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import windowsSize from '../composables/windowsSize';
import GridItem from './GridItem.vue';

const gridContainer = ref(null);

const { windowHeight, windowWidth, useWindowSizeLifecycles } = windowsSize();

onMounted(() => useWindowSizeLifecycles(gridContainer));

interface Props {
  items: Array<any>,
  gridWidth?: number,
  gridHeight?: number,
  autoCellSize?: boolean,
  cellWidth?: number,
  cellHeight?: number,
  cellMinWidth?: number,
  cellMinHeight?: number,
  draggable: boolean,
  dragDelay: number,
  sortable: boolean,
  center: boolean,
  columnCountMax?: number,
  rowCountMax?: number,
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  gridWidth: -1,
  gridHeight: -1,
  autoCellSize: true,
  cellWidth: 80,
  cellHeight: 80,
  cellMinWidth: 80,
  cellMinHeight: 80,
  draggable: false,
  dragDelay: 0,
  sortable: false,
  center: true,
  columnCountMax: -1,
  rowCountMax: -1,
});

const emit = defineEmits<{
  (e: 'remove', param: GridEvent): void,
  (e: 'drag', param: GridDragEvent): void,
  (e: 'dragstart', param: GridEvent): void,
  (e: 'dragend', param: GridEvent): void,
  (e: 'click', param: GridEvent): void,
  (e: 'sort', param: GridEvent): void,
}>();

const list = ref<any[]>([]);

watch(props.items, (items, prevItems) => {
  list.value = items.map((item, index) => {
    return {
      item,
      index: index,
      sort: index,
    }
  });
},
{
  immediate: true,
}
);

const gridResponsiveWidth = computed(() => {
  if (props.gridWidth < 0) {
    return windowWidth.value;
  } else {
    return Math.min(windowWidth.value, props.gridWidth);
  }
});

const gridResponsiveHeight = computed(() => {
  if (props.gridHeight < 0) {
    return windowHeight.value;
  } else {
    return Math.min(windowHeight.value, props.gridHeight);
  }
});

const cellWidth = computed(() => {
  if (props.autoCellSize) {
    return Math.max(Math.ceil(gridResponsiveWidth.value / props.columnCountMax) - 1, props.cellMinWidth);
  } else {
    return props.cellWidth;
  }
});

const cellHeight = computed(() => {
  if (props.autoCellSize) {
    return Math.max(gridResponsiveHeight.value / Math.ceil(list.value.length / props.rowCountMax) - 1, props.cellMinHeight);
  } else {
    return props.cellHeight;
  }
})

const height = computed(() => Math.ceil(list.value.length / columnCount.value) * cellHeight.value);

const style = computed (() => {
  return {
    height: height.value + 'px',
  };
});

const columnCount = computed(() => {
  const columnCount = Math.floor(gridResponsiveWidth.value / cellWidth.value);
  if (props.columnCountMax > 0)
    return Math.min(columnCount, props.columnCountMax);
  else
    return Math.min(columnCount, list.value.length);
}
);

const rowShift = computed(() => {
  if (props.center) {
    const contentWidth = cellWidth.value * columnCount.value;
    const rowShift = contentWidth < gridResponsiveWidth.value
      ? (gridResponsiveWidth.value - contentWidth) / 2
      : (gridResponsiveWidth.value / columnCount.value) / 2;
    return Math.floor(rowShift);
  }
  return 0;
});

/* Returns merged event object */
function wrapEvent (gridItemEvent: GridItemEvent): GridEvent {
  return {
    datetime: Date.now(),
    items: getListClone(),
    ...gridItemEvent,
  }
}

/* Returns sorted clone of "list" array */
function getListClone () {
  return list.value
    .slice(0)
    .sort((a, b) => {
      return a.sort - b.sort
    });
  //  .map(v => {
  //    return { ...v.item }
  //  })
}

function removeItem ({ index }: { index: number }) {
  let removeItem = list.value.find(v => v.index === index);
  let removeItemSort = removeItem.sort;
  list.value = list.value
    .filter(v => {
      return v.index !== index;
    })
    .map(v => {
      let sort = v.sort > removeItemSort
        ? (v.sort - 1)
        : v.sort;
      return { ...v, sort };
    });
  emit('remove', wrapEvent({ index }));
}

function onDragStart (event: GridItemEvent) {
  emit('dragstart', wrapEvent(event));
}

function onDragEnd (event: GridItemEvent) {
  emit('dragend', wrapEvent(event));
}

function click (event: GridItemEvent) {
  emit('click', wrapEvent(event));
}

function onDrag (event: GridItemDragEvent) {
  if (props.sortable) {
    sortList(event.index, event.gridPosition);
  }
  emit('drag', {
    datetime: Date.now(),
    items: getListClone(),
    ...event,
  });
}

function sortList (itemIndex: number, gridPosition: number) {
  let targetItem = list.value.find(item => item.index === itemIndex);
  let targetItemSort = targetItem.sort;

  /*
    Normalizing new grid position
  */
  gridPosition = Math.max(gridPosition, 0);
  /*
    If you remove this line you can drag items to positions that
    are further than items array length
  */
  gridPosition = Math.min(gridPosition, list.value.length - 1);
  if (targetItemSort !== gridPosition) {
    list.value = list.value.map(item => {
      if (item.index === targetItem.index) {
        return {
          ...item,
          sort: gridPosition
        }
      }
      const { sort } = item;
      if (targetItemSort > gridPosition) {
        if (sort <= targetItemSort && sort >= gridPosition) {
          return {
            ...item,
            sort: sort + 1
          }
        }
      }
      if (targetItemSort < gridPosition) {
        if (sort >= targetItemSort && sort <= gridPosition) {
          return {
            ...item,
            sort: sort - 1
          }
        }
      }
      return item;
    })
    emit('sort', wrapEvent({}));
  }
}
</script>

<style>
.v-grid {
  display: block;
  position: relative;
  width: 100%;
  outline: auto;
  outline-color: aqua;
}
</style>
