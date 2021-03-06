import { onBeforeUnmount } from '@vue/runtime-core';
import { Ref, ref } from '@vue/reactivity';

const windowHeight = ref(80);
const windowWidth = ref(80);

const useWindowSizeLifecycles = (root: Ref<HTMLElement>) => {
  window.addEventListener('resize', getWindowSize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', getWindowSize);
  });

  function getWindowSize() {
    if (root.value) {
      windowHeight.value = root.value.parentElement
        ? root.value.parentElement.clientHeight
        : root.value.clientHeight;
      windowWidth.value = root.value.clientWidth;
    }
  }

  getWindowSize();
};

export default function windowSize() {
  return { useWindowSizeLifecycles, windowHeight, windowWidth };
}
