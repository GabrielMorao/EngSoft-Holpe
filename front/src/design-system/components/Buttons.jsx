import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export const NavButton = withStyles({
  root: {
    height: "inherit",
    width: "calc(3vh * 6)",
    fontFamily: "Roboto",
    fontWeight: 100,
    fontSize: "3vh",
    textTransform: "none",
    color: "white",
    "&:hover": {
      height: "inherit",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      borderRadius: "0px",
    },
  },
})(Button);

export const LoginButton = withStyles({
  root: {
    minHeight: "30px",
    width: "80px",
    fontSize: "1.9vh",
    color: "#0179A7",
    background: "#E2FAFC",
    "&:hover": {
      background: "#E2FAFCE6",
    },
  }
})(Button);

export const IconButton = withStyles(() => ({
  root: {
    height: "8vh",
    minHeight: "50px",
    width: "18vw",
    minWidth: "200px",
    borderRadius: "16px",
    margin: "8px",
  },
}))((props) => (
  <Button {...props}>
    <Grid container alignItems="center">
      <Grid item sm={2}>
        <img
          src={props.icon}
          alt={props.alt}
          style={{ height: "4vw", maxHeight: "36px", paddingTop: "20%" }}
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        {props.msg}
      </Grid>
    </Grid>
  </Button>
));
