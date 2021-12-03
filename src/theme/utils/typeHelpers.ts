import { FinalPearlTheme } from "../src/types";

export const getKeys = <T>(object: T) => Object.keys(object) as (keyof T)[];

export const getNestedObject = (nestedObj: object, pathArr: string[]) => {
  return pathArr.reduce(
    (obj: any, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};

export function isThemeKey(
  theme: FinalPearlTheme,
  K: keyof FinalPearlTheme | undefined
): K is keyof FinalPearlTheme {
  return getKeys(theme).includes(K as keyof FinalPearlTheme);
}
