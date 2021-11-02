export interface Color {
    r: number;
    g: number;
    b: number;
}
export interface GridItemDragEvent {
    event?: MouseEvent | TouchEvent;
    distanceX: number;
    distanceY: number;
    positionX: number;
    positionY: number;
    index: number;
    gridX: number;
    gridY: number;
    gridPosition: number;
}
export interface GridItemEvent {
    event?: Event;
    index?: number;
    sort?: number;
}
export interface GridDragEvent {
    datetime: number;
    items: any[];
    event?: MouseEvent | TouchEvent;
    distanceX: number;
    distanceY: number;
    positionX: number;
    positionY: number;
    index: number;
    gridX: number;
    gridY: number;
    gridPosition: number;
}
export interface GridEvent {
    datetime: number;
    items: any[];
    event?: Event;
    index?: number;
    sort?: number;
}
//# sourceMappingURL=gridEmitParam.d.ts.map