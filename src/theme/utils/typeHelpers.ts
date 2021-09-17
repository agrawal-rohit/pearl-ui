import { BasePearlTheme } from "../src/types";

export const getKeys = <T>(object: T) => Object.keys(object) as (keyof T)[];

export function isThemeKey(
  theme: BasePearlTheme,
  K: keyof BasePearlTheme | undefined
): K is keyof BasePearlTheme {
  return getKeys(theme).includes(K as keyof BasePearlTheme);
}
