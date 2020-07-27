import React, { useState, useEffect, useContext } from "react";
import { store } from "../store"
import axios from "axios";
import jwt from "jsonwebtoken"
import { navigate } from "@reach/router";
import { Grid, TextField } from "@material-ui/core";

import "../stylesheets/login.css";

import hand0 from "../assets/login/hand0.png";
import hand1 from "../assets/login/hand1.png";
import signIn from "../assets/icons/sign-in.svg";

import MainLogo from "../components/MainLogo";
import Footer from "../components/Footer";
import { IconButton } from "../design-system/components/Buttons";
import { showToaster } from "../design-system/components/Toaster";
import { toast } from "react-toastify";

const VolunteerRegister = () => {
  const globalState = useContext(store)
  const { dispatch } = globalState

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");

  useEffect(() => {
    toast.dismiss();
  });

  function onRegister() {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passConfirmation === ""
    ) {
      showToaster({
        type: "error",
        message: "Todos os campos são obrigatórios!",
        autoClose: false,
      });
      return;
    }
    if (password !== passConfirmation) {
      showToaster({
        type: "error",
        message: "As senhas estão diferentes.",
        autoClose: false,
      });
      return;
    }

    const data = {
      email: email,
      name: name,
      password: password,
    };

    axios
      .post(
        "https://holp-server.vercel.app/api/v1/user/volunteer",
        data
      )
      .then(() => {
        showToaster({
          message: "Cadastrado com sucesso!",
          autoClose: 2000,
          onClose: () => {
            navigate("/login");
          },
        });
      })
      .catch((error) => {
        console.log(error)
        switch (error.response.status) {
          case 409:
            showToaster({
              type: "error",
              message: "Usuário já cadastrado!",
              autoClose: false,
            });
            break;
          default:
            showToaster({
              type: "error",
              message: "Por favor tente novamente.",
              autoClose: false,
            });
            break;
        }
      });
  }

  return (
    <Grid container>
      <Grid container className="form-container">
        <Grid item md={3}>
          <img src={hand0} alt="hand upward" className="hand-bg" />
        </Grid>
        <Grid item container md={6} justify="center">
          <MainLogo message={"Help with Hope"} />
          <Grid
            container
            className="auth-form"
            alignContent="flex-start"
          >
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Nome"
                id="name"
                className="login-form"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                color="secondary"
                label="Senha"
                id="password"
                type="password"
                className="login-form"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Confirmar Senha"
                id="password-confirm"
                type="password"
                className="login-form"
                value={passConfirmation}
                onChange={(e) => setPassConfirmation(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} justify="center">
            <IconButton
              onClick={onRegister}
              variant="contained"
              color="primary"
              style={{
                color: "#6d2d54",
              }}
              icon={signIn}
              alt="login"
              msg="Cadastrar"
            />
          </Grid>
        </Grid>
        <Grid item md={3}>
          <img src={hand1} alt="hand downward" className="hand-bg" />
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
};

export default VolunteerRegister;
