import { BasePearlTheme } from "../src/types";

export const getKeys = <T>(object: T) => Object.keys(object) as (keyof T)[];

export const getNestedObject = (nestedObj: object, pathArr: string[]) => {
  return pathArr.reduce(
    (obj: any, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};

export function isThemeKey(
  theme: BasePearlTheme,
  K: keyof BasePearlTheme | undefined
): K is keyof BasePearlTheme {
  return getKeys(theme).includes(K as keyof BasePearlTheme);
}
