import React, { Fragment, useEffect } from "react";
import { navigate } from "@reach/router";

import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import "../stylesheets/home.css";

import heart from "../assets/icons/heart-solid.svg";
import holdingHeart from "../assets/icons/hand-holding-heart-solid.svg";

import { IconButton } from "../design-system/components/Buttons";
import Footer from "../components/Footer";
import MainLogo from "../components/MainLogo";
import { toast } from "react-toastify";

const Home = () => {
  const theme = useTheme();

  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <Fragment>
      <Grid container className="background">
        <Grid item md={3} />
        <Grid item container md={6} justify="center">
          <MainLogo message={"Help with Hope"} />
          <Grid item container xs={12} direction="column" alignContent="center">
            <IconButton
              icon={holdingHeart}
              onClick={() => navigate("volunteer")}
              alt="hand holding a heart"
              msg="Trabalhar como voluntário(a)"
              variant="contained"
              color="primary"
              style={{ color: "#6d2d54" }}
            />
            <IconButton
              icon={heart}
              onClick={() => navigate("organization")}
              alt="heart"
              msg="Encontrar Voluntários(as)"
              variant="contained"
              color="secondary"
              style={{ color: theme.palette.primary.main }}
            />
          </Grid>
        </Grid>
        <Grid item md={3} />
      </Grid>
      <Footer />
    </Fragment>
  );
};

export default Home;
