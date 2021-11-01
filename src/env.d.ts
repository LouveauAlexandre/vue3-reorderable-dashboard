/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type Color = { r: number, g: number, b: number; }

type GridItemDragEvent = {
  event?: MouseEvent | TouchEvent,
  distanceX: number,
  distanceY: number,
  positionX: number,
  positionY: number,
  index: number,
  gridX: number,
  gridY: number,
  gridPosition: number
}

type GridItemEvent = {
  event?: Event,
  index?: number,
  sort?: number
}

type GridDragEvent = {
  datetime: number,
  items: any[],
  event?: MouseEvent | TouchEvent,
  distanceX: number,
  distanceY: number,
  positionX: number,
  positionY: number,
  index: number,
  gridX: number,
  gridY: number,
  gridPosition: number
}

type GridEvent = {
  datetime: number,
  items: any[],
  event?: Event,
  index?: number,
  sort?: number
}