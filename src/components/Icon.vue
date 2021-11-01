<template>
  <div class="icon" :style="style">
    <div
v-if="withButton"
         class="icon-delete-btn"
         @mousedown="remove"></div>
    <slot>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';

interface Props {
  index: number,
  withButton?: boolean,
  color: Color,
}
 const props = withDefaults(defineProps<Props>(), {
   withButton: false,
   color: undefined,
 });

const emit = defineEmits<{
  (e: 'remove', param: { index: number }): void
}>();

const brightness = computed(() => {
  const { r, g, b } = props.color;
  return 0.299 * r + 0.587 * g + 0.114 * b;
});

const style = computed(() => {
  if (props.color) {
    const { r, g, b } = props.color
    const background = `rgb(${r}, ${g}, ${b})`
    const shadow = `rgba(${r}, ${g}, ${b}, 0.5)`
    return {
      'background-color': background,
      'box-shadow': `0px 6px 20px ${shadow}`,
      'color': brightness.value > 180 ? '#777' : '#f3f3f3'
    }
  }
  return '';
});

function remove() {
  emit('remove', {
    index: props.index
  });
}

</script>

<style>
@keyframes shake {
  from {
    transform: rotate(-1deg);
  }
  to {
    transform: rotate(1deg);
  }
}

.icon {
  position: relative;
  background-color: transparent;
  margin: 1%;
  height: 96%;
  width: 96%;
  border-radius: 10px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.07);
  color: #777;
  font-weight: 900;
  font-size: 12px;
  line-height: 52px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.icon .icon-delete-btn {
  display: block;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 7px;
  right: 6px;
  top: 6px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.2);
}

.v-grid-item-dragging .icon {
  animation-name: shake;
  animation-duration: 0.07s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>