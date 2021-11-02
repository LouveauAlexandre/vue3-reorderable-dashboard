import { Color } from './gridEmitParam';

export const randomInt = (fr: number, to: number) => {
  return Math.round(fr + Math.random() * to);
};

export const generateRGBColors = (count: number): Color[] => {
  return Array(...new Array(count)).map(() => {
    return {
      r: randomInt(0, 255),
      g: randomInt(0, 255),
      b: randomInt(0, 255),
    };
  });
};

export default {
  randomInt,
  generateRGBColors,
};
