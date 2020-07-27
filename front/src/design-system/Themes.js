import { createMuiTheme } from "@material-ui/core/styles";

export const holpe = createMuiTheme({
  palette: {
    primary: {
      main: "#7ee3d5",
    },
    secondary: {
      main: "#6d2d54",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ],
    subtitle1: {
      fontWeight: 100,
      fontSize: "3vw",
      textAlign: "center",
      lineHeight: 1,
      marginTop: "8px",
      color: "#208bb3",
    },
    subtitle2: {
      fontWeight: 100,
      fontSize: "1.5vw",
      textAlign: "center",
      lineHeight: 1,
      color: "#208bb3",
    },
    h4: {
      color: "#208bb3",
      marginBottom: "5vh",
    },
    h3: {
      color: "#6d2d54",
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontWeight: 100,
      fontSize: "1.4vw",
      textAlign: "start",
      color: "#208bb3",
    },
    h1: {
      fontWeight: 400,
      fontSize: "1.2rem",
      textAlign: "start",
      color: "#6d2d54",
      verticalAlign: "sub",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        fontSize: "1.2rem"
      }
    },
    MuiInputBase: {
      root: {
        fontSize: "1.2rem"
      }
    },
    MuiMobileStepper: {
      root: {
        background: "#00000000"
      },
      dots: {
        margin: "8px"
      }
    },
    MuiDialogTitle: {
      root: {
        padding: "0 24px"
      }
    },
    MuiDialog: {
      paper: {
        background: "#E2FAFC",
        padding: "16px",
        height: "55%"
      }
    },
    MuiMenu: {
      paper: {
        background: "#E2FAFC",
        color: "#6d2d54"
      }
    },
    MuiAppBar: {
      root: {
        boxSizing: "border-box"
      },
      positionFixed: {
        boxSizing: "border-box"
      }
    },
    MuiAvatar: {
      root: {
        height: '2em',
        width: "2em",
        fontSize: "1em"
      },
      colorDefault: {
        backgroundColor: "#6d2d54"
      }
    }
  }
});
