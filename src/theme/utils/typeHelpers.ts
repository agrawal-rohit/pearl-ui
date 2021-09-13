import { IBasePearlTheme } from "../src/types";

export const getKeys = <T>(object: T) => Object.keys(object) as (keyof T)[];

// export function isThemeKey<Theme extends IBasePearlTheme>(
//   theme: Theme,
//   K: keyof Theme | undefined
// ): boolean {
//   if (getKeys(theme).includes(K as any)) return true;

//   return false;
// }

export function isThemeKey<Theme extends IBasePearlTheme>(
  theme: Theme,
  K: keyof Theme | undefined
): K is keyof Theme {
  return getKeys(theme).includes(K as keyof Theme);
}
