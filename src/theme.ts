const breakpoints = ['600px', '840px', '1284px']
const mediaQueries = {
  small: `@media screen and (max-width: ${breakpoints[0]})`,
  medium: `@media screen and (max-width: ${breakpoints[1]})`,
  large: `@media screen and (max-width: ${breakpoints[2]})`,
}
const colors = {
  white: "#fff",
  black: "#000",
  transparent: {
    grey10: "rgba(0 0 0 / 10%)",
    grey20: "rgba(0 0 0 / 20%)",
    grey30: "rgba(0 0 0 / 30%)",
    grey40: "rgba(0 0 0 / 40%)",
    grey50: "rgba(0 0 0 / 50%)",
    grey60: "rgba(0 0 0 / 60%)",
    grey70: "rgba(0 0 0 / 70%)",
    grey80: "rgba(0 0 0 / 80%)",
    grey90: "rgba(0 0 0 / 90%)",
    grey100: "rgba(0 0 0 / 100%)",
  },
  red: {
    50: "#ffebee",
    100: "#ffcdd2",
    600: "#e53935",
    700: "#d32f2f",
  },
  green: {
    50: "#e8f5e9",
    100: "#c8e6c9",
    600: "43a047",
    700: "#388e3c",
  },
  yellow: {
    600: "#fdd835",
  },
  blue: {
    600: "#1e88e5",
    700: "#1976d2",
  },
  grey: {
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
  },
  lightBlue: {
    50:  "#e1f5fe",
    100: "#b3e5fc",
    200: "#81d4fa",
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4",
    600: "#039be5",
    700: "#0288d1",
    800: "#0277bd",
    900: "#01579b",
  },
  blueGrey: {
    50:  "#eceff1",
    100: "#cfd8dc",
    200: "#b0bec5",
    300: "#90a4ae",
    400: "#78909c",
    500: "#607d8b",
    600: "#546e7a",
    700: "#455a64",
    800: "#37474f",
    900: "#263238",
  }
}
const fontSizes = ["12px", "14px", "16px", "20px", "24px", "32px", "48px", "64px", "96px"]
const space = [0, "8px", "16px", "24px", "32px", "64px", "96px"]
const fontWeights = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const radii = [0, "4px", "8px", "12px", "16px", "20px"]


export default {
  breakpoints,
  mediaQueries,
  colors,
  fontSizes,
  space,
  fontWeights,
  radii,
}

