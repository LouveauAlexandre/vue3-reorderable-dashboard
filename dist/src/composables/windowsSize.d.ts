import { Ref } from '@vue/reactivity';
export default function windowSize(): {
    useWindowSizeLifecycles: (root: Ref<HTMLElement>) => void;
    windowHeight: Ref<number>;
    windowWidth: Ref<number>;
};
//# sourceMappingURL=windowsSize.d.ts.map