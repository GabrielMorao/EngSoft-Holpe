import React from "react";

import { Grid } from "@material-ui/core";

import logoIcmc from "../assets/logo-icmc.png";
import logoMonitora from "../assets/logo-monitora.png";

const Footer = () => (
  <Grid item container className="footer" justify="center" alignItems="center">
    <span>Uma parceria entre</span>{" "}
    <img src={logoIcmc} alt="icmc" className="logo" />{" "}
    <img src={logoMonitora} alt="Monitora" className="logo" />
  </Grid>
);

export default Footer;
