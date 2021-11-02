import { Color } from '../composables/gridEmitParam';
declare const _sfc_main: import("vue").DefineComponent<{
    index: {
        type: NumberConstructor;
        required: true;
    };
    withButton: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    color: {
        type: null;
        required: true;
        default: undefined;
    };
}, {
    props: {
        index: number;
        withButton: boolean;
        color: Color;
    };
    emit: (e: 'remove', param: {
        index: number;
    }) => void;
    brightness: import("vue").ComputedRef<number>;
    style: import("vue").ComputedRef<"" | {
        'background-color': string;
        'box-shadow': string;
        color: string;
    }>;
    remove: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "remove"[], "remove", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    index?: unknown;
    withButton?: unknown;
    color?: unknown;
} & {
    index: number;
    withButton: boolean;
} & {
    color?: any;
}> & {
    onRemove?: ((...args: any[]) => any) | undefined;
}, {
    withButton: boolean;
    color: any;
}>;
export default _sfc_main;
//# sourceMappingURL=Icon.vue.d.ts.map