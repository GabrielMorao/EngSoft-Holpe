import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

export const Appbar = withStyles(() => ({
  root: {
    position: "fixed",
    top: 0,
    backgroundColor: "#AE0F8B",
    height: "9vh",
  },
}))((props) => <Grid {...props}></Grid>);
