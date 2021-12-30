import { ElevationConfig } from "../types";

export const elevation = {
  xs: {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  s: {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  m: {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  l: {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  xl: {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 16,
  },
  "2xl": {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  "3xl": {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 24,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 24,
  },
  "4xl": {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 28,
    },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 28,
  },
} as Record<string, ElevationConfig>;
