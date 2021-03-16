import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { fontStacks } from "./fonts";
import { DISABLE_ZOOM_STYLES, HIDE_SCROLL_BAR_STYLES } from "./styles";
import { blue } from "@material-ui/core/colors";

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",

      primary: {
        main: blue[400],
      },

      background: {
        default: "#101010",
        paper: "#323232",
      },
    },

    typography: {
      fontWeightRegular: "bold",

      fontFamily: fontStacks.body,

      h1: {
        fontFamily: fontStacks.heading,
      },

      h2: {
        fontFamily: fontStacks.heading,
      },

      h3: {
        fontFamily: fontStacks.heading,
      },

      h4: {
        fontFamily: fontStacks.heading,
      },
    },

    props: {
      MuiLink: {
        variant: "inherit",
        color: "inherit",
        underline: "none",
      },

      MuiContainer: {
        maxWidth: "lg",
      },
    },

    overrides: {
      MuiChip: {
        label: {
          fontWeight: "bolder",
          fontSize: "1.5em",
        },

        root: {
          borderRadius: "3em",
          height: "3em",
        },
      },

      MuiButton: {
        label: {
          fontWeight: "bolder",
        },
      },

      MuiCssBaseline: {
        "@global": {
          html: {
            ...HIDE_SCROLL_BAR_STYLES,
            ...DISABLE_ZOOM_STYLES,
            scrollBehavior: "smooth",
            overflowX: "hidden",
            fontDisplay: "block",
          },
        },
      },
    },
  })
);