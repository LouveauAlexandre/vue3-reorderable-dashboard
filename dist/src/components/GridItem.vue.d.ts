import { GridItemDragEvent, GridItemEvent } from 'src/composables/gridEmitParam';
declare const _sfc_main: import("vue").DefineComponent<{
    index: {
        type: NumberConstructor;
        required: true;
    };
    sort: {
        type: NumberConstructor;
        required: true;
    };
    cellWidth: {
        type: NumberConstructor;
        required: true;
    };
    cellHeight: {
        type: NumberConstructor;
        required: true;
    };
    columnCount: {
        type: NumberConstructor;
        required: true;
    };
    rowShift: {
        type: NumberConstructor;
        required: true;
        default: number;
    };
    draggable: {
        type: BooleanConstructor;
        required: true;
    };
    dragDelay: {
        type: NumberConstructor;
        required: true;
        default: number;
    };
}, {
    CLICK_PIXEL_DISTANCE: number;
    props: {
        index: number;
        sort: number;
        cellWidth: number;
        cellHeight: number;
        columnCount: number;
        rowShift: number;
        draggable: boolean;
        dragDelay: number;
    };
    emit: {
        (e: 'dragstart', event: GridItemEvent): void;
        (e: 'drag', event: GridItemDragEvent): void;
        (e: 'click', event: GridItemEvent): void;
        (e: 'dragend', event: GridItemEvent): void;
    };
    self: import("vue").Ref<any>;
    animate: import("vue").Ref<boolean>;
    dragging: import("vue").Ref<boolean>;
    shiftStartX: import("vue").Ref<number>;
    shiftStartY: import("vue").Ref<number>;
    mouseMoveStartX: import("vue").Ref<number>;
    mouseMoveStartY: import("vue").Ref<number>;
    shiftX: import("vue").Ref<number>;
    shiftY: import("vue").Ref<number>;
    timer: null;
    zIndex: import("vue").Ref<number>;
    className: import("vue").ComputedRef<(string | {
        'v-grid-item-animate': boolean;
        'v-grid-item-dragging': boolean;
    })[]>;
    left: import("vue").ComputedRef<number>;
    top: import("vue").ComputedRef<number>;
    style: import("vue").ComputedRef<{
        zInder: number;
        width: string;
        height: string;
        transform: string;
    }>;
    wrapEvent: (event: Event) => GridItemEvent;
    dragStart: (event: MouseEvent | TouchEvent) => void;
    drag: (event: MouseEvent | TouchEvent) => void;
    mousedown: (event: MouseEvent | TouchEvent) => void;
    documentMouseMove: (event: MouseEvent | TouchEvent) => void;
    documentMouseUp: (event: MouseEvent | TouchEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("drag" | "dragstart" | "dragend" | "click")[], "drag" | "dragstart" | "dragend" | "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    index?: unknown;
    sort?: unknown;
    cellWidth?: unknown;
    cellHeight?: unknown;
    columnCount?: unknown;
    rowShift?: unknown;
    draggable?: unknown;
    dragDelay?: unknown;
} & {
    index: number;
    sort: number;
    cellWidth: number;
    cellHeight: number;
    draggable: boolean;
    dragDelay: number;
    columnCount: number;
    rowShift: number;
} & {}> & {
    onDrag?: ((...args: any[]) => any) | undefined;
    onDragstart?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    dragDelay: number;
    rowShift: number;
}>;
export default _sfc_main;
//# sourceMappingURL=GridItem.vue.d.ts.map