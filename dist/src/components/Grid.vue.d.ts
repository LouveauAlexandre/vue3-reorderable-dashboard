import { GridDragEvent, GridEvent, GridItemDragEvent, GridItemEvent } from 'src/composables/gridEmitParam';
declare const _sfc_main: import("vue").DefineComponent<{
    items: {
        type: ArrayConstructor;
        required: true;
        default: () => never[];
    };
    gridWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    gridHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    autoCellSize: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    cellWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    cellHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    cellMinWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    cellMinHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    draggable: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
    dragDelay: {
        type: NumberConstructor;
        required: true;
        default: number;
    };
    sortable: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
    center: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
    columnCountMax: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    rowCountMax: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}, {
    gridContainer: import("vue").Ref<any>;
    windowHeight: import("vue").Ref<number>;
    windowWidth: import("vue").Ref<number>;
    useWindowSizeLifecycles: (root: import("vue").Ref<HTMLElement>) => void;
    props: {
        items: Array<any>;
        gridWidth: number;
        gridHeight: number;
        autoCellSize: boolean;
        cellWidth: number;
        cellHeight: number;
        cellMinWidth: number;
        cellMinHeight: number;
        draggable: boolean;
        dragDelay: number;
        sortable: boolean;
        center: boolean;
        columnCountMax: number;
        rowCountMax: number;
    };
    emit: {
        (e: 'remove', param: GridEvent): void;
        (e: 'drag', param: GridDragEvent): void;
        (e: 'dragstart', param: GridEvent): void;
        (e: 'dragend', param: GridEvent): void;
        (e: 'click', param: GridEvent): void;
        (e: 'sort', param: GridEvent): void;
    };
    list: import("vue").Ref<any[]>;
    gridResponsiveWidth: import("vue").ComputedRef<number>;
    gridResponsiveHeight: import("vue").ComputedRef<number>;
    cellWidth: import("vue").ComputedRef<number>;
    cellHeight: import("vue").ComputedRef<number>;
    height: import("vue").ComputedRef<number>;
    style: import("vue").ComputedRef<{
        height: string;
    }>;
    columnCount: import("vue").ComputedRef<number>;
    rowShift: import("vue").ComputedRef<number>;
    wrapEvent: (gridItemEvent: GridItemEvent) => GridEvent;
    getListClone: () => any[];
    removeItem: ({ index }: {
        index: number;
    }) => void;
    onDragStart: (event: GridItemEvent) => void;
    onDragEnd: (event: GridItemEvent) => void;
    click: (event: GridItemEvent) => void;
    onDrag: (event: GridItemDragEvent) => void;
    sortList: (itemIndex: number, gridPosition: number) => void;
    GridItem: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("remove" | "sort" | "drag" | "dragstart" | "dragend" | "click")[], "remove" | "sort" | "drag" | "dragstart" | "dragend" | "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    items?: unknown;
    gridWidth?: unknown;
    gridHeight?: unknown;
    autoCellSize?: unknown;
    cellWidth?: unknown;
    cellHeight?: unknown;
    cellMinWidth?: unknown;
    cellMinHeight?: unknown;
    draggable?: unknown;
    dragDelay?: unknown;
    sortable?: unknown;
    center?: unknown;
    columnCountMax?: unknown;
    rowCountMax?: unknown;
} & {
    items: unknown[];
    gridWidth: number;
    gridHeight: number;
    autoCellSize: boolean;
    cellWidth: number;
    cellHeight: number;
    cellMinWidth: number;
    cellMinHeight: number;
    draggable: boolean;
    dragDelay: number;
    sortable: boolean;
    center: boolean;
    columnCountMax: number;
    rowCountMax: number;
} & {}> & {
    onRemove?: ((...args: any[]) => any) | undefined;
    onSort?: ((...args: any[]) => any) | undefined;
    onDrag?: ((...args: any[]) => any) | undefined;
    onDragstart?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    items: unknown[];
    gridWidth: number;
    gridHeight: number;
    autoCellSize: boolean;
    cellWidth: number;
    cellHeight: number;
    cellMinWidth: number;
    cellMinHeight: number;
    dragDelay: number;
    columnCountMax: number;
    rowCountMax: number;
}>;
export default _sfc_main;
//# sourceMappingURL=Grid.vue.d.ts.map