import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import jwt from "jsonwebtoken"
import { store } from "../store"
import { Grid, Typography, TextField } from "@material-ui/core";
import { Link } from "@reach/router";

import "../stylesheets/login.css";

import hand0 from "../assets/login/hand0.png";
import hand1 from "../assets/login/hand1.png";
import signIn from "../assets/icons/sign-in.svg";

import Footer from "../components/Footer";
import MainLogo from "../components/MainLogo";
import { IconButton } from "../design-system/components/Buttons";
import { showToaster } from "../design-system/components/Toaster";
import { toast } from "react-toastify";

const Login = () => {
  const globalState = useContext(store)
  const { dispatch } = globalState

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    toast.dismiss();
  });

  function onLogin() {
    if (email == "" || password == "") {
      showToaster({
        type: "error",
        message: "Por favor preencha email e senha!",
        autoClose: false,
      });
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    axios
      .post(
        "https://holp-server.vercel.app/api/v1/auth",
        data
      )
      .then((response) => {
        const token = response.headers.authorization
        localStorage.setItem("Token", token);
        const userType = jwt.decode(token).isVolunteer
        dispatch({
          type: "login_success",
          data: userType
        })
        showToaster({
          message: "Autenticado com sucesso!",
          autoClose: 2000
        });
      })
      .catch((error) => {
        switch (error.response.status) {
          case 500:
            showToaster({
              type: "error",
              message: "Por favor tente novamente.",
              autoClose: false,
            });
            break;
          default:
            showToaster({
              type: "error",
              message: "Email ou senha inválidos.",
              autoClose: false,
            });
        }
      });
  }

  return (
    <Fragment>
      <Grid container className="form-container">
        <Grid item md={3}>
          <img src={hand0} alt="hand upward" className="hand-bg" />
        </Grid>
        <Grid item container md={6} justify="center">
          <MainLogo message={"Seja bem-vindo(a)"} />
          <Grid container className="auth-form" alignContent="flex-start">
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                Caso não possua conta, cadastre-se como{" "}
                <Link to="/volunteer">Voluntário</Link> ou{" "}
                <Link to="/organization">Organização</Link> agora mesmo!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Email"
                id="email"
                className="login-form"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                color="secondary"
                label="Senha"
                id="password"
                className="login-form"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} justify="center">
            <IconButton
              onClick={onLogin}
              variant="contained"
              color="primary"
              style={{
                color: "#6d2d54",
              }}
              icon={signIn}
              alt="hand holding a heart"
              msg="Entrar"
            />
          </Grid>
        </Grid>
        <Grid item md={3}>
          <img src={hand1} alt="hand downward" className="hand-bg" />
        </Grid>
      </Grid>
      <Footer />
    </Fragment>
  );
};

export default Login;
