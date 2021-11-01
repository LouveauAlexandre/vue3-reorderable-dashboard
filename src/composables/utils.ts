export const randomInt = (fr: number, to: number) => {
  return Math.round(fr + Math.random() * to)
}

export const generateRGBColors = (count: number): Color[] => {
  return Array.apply(null, new Array(count)).map((none, i) => {
    return {
      r: randomInt(0, 255),
      g: randomInt(0, 255),
      b: randomInt(0, 255)
    }
  });
}

export default {
  randomInt,
  generateRGBColors
}
