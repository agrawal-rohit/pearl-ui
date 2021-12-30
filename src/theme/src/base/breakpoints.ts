import { Breakpoint } from "../types";

export const breakpoints = {
  phone: 0,
  longPhone: {
    width: 0,
    height: 812,
  },
  tablet: 768,
  largeTablet: 1024,
} as Record<string, Breakpoint>;
