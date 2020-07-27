import React, { Fragment, useState, useEffect, useContext } from "react";
import { store } from "../store"
import axios from "axios";
import jwt from "jsonwebtoken"
import { navigate } from "@reach/router";
import { Grid, TextField, MobileStepper, Button} from "@material-ui/core";

import "../stylesheets/login.css";

import hand0 from "../assets/login/hand0.png";
import hand1 from "../assets/login/hand1.png";
import signIn from "../assets/icons/sign-in.svg";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import MainLogo from "../components/MainLogo";
import Footer from "../components/Footer";
import { IconButton } from "../design-system/components/Buttons";
import { showToaster } from "../design-system/components/Toaster";
import { toast } from "react-toastify";

const OrganizationRegister = () => {
  const globalState = useContext(store)
  const { dispatch } = globalState

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [street, setStreet] = useState("")
  const [complement, setComplement] = useState("")
  const [number, setNumber] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [postal, setPostal] = useState("")
  const [password, setPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    toast.dismiss();
  });

  function onRegister() {
    let toastMessage = ""
    toastMessage = passConfirmation === "" || password === "" ? "Por favor preencha todos os campos" : toastMessage
    toastMessage = passConfirmation !== password ? "As senhas estão diferentes." : toastMessage
    
    if (toastMessage !== "") {
      showToaster({
        type: "error",
        message: toastMessage,
        autoClose: false,
      });
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password,
      adress: {
        street: street,
        number: number,
        city: city,
        state: state
      },
      phone: phone,
      cnpj: cnpj,
    };

    axios
      .post(
        "http://holp-server.now.sh/api/v1/user/solicitant",
        JSON.stringify(data)
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
        switch (error.response.status) {
          case 409:
            showToaster({
              type: "error",
              message: "ONG já cadastrada!",
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

  function onNext(){
    let toastMessage = ""
    switch(steps) {
      case 0:
        toastMessage = email === "" ? "Por favor insira o email." : toastMessage
        toastMessage = cnpj === "" ? "Por favor insira seu CNPJ." : toastMessage
        toastMessage = name === "" ? "Por favor insira a razão social." : toastMessage
        break
      case 1:
        toastMessage = state === "" ? "Por favor insira a UF." : toastMessage
        toastMessage = city === "" ? "Por favor insira a cidade sede." : toastMessage
        toastMessage = postal === "" ? "Por favor insira o CEP." : toastMessage
        toastMessage = number === "" ? "Por favor insira o número." : toastMessage
        toastMessage = street === "" ? "Por favor insira o endereço." : toastMessage
        break
      default:
        toastMessage
    }

    if (toastMessage !== "") {
      showToaster({
        type: "error",
        message: toastMessage,
        autoClose: false,
      });
      return;
    }
    else {
      setSteps(steps + 1)
    }
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Razão Social"
                id="name"
                type="text"
                className="login-form"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="CNPJ"
                id="cnpj"
                type="text"
                className="login-form"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Email"
                id="email"
                type="email"
                className="login-form"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Telefone"
                id="telephone"
                type="text"
                className="login-form"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Endereço"
                id="adress"
                type="text"
                className="login-form"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid item container xs={12} style={{margin: "0px 25%"}} alignContent="center" justify="space-around">
              <Grid item xs={3}>
                <TextField
                  color="secondary"
                  label="Número"
                  id="number"
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={9} style={{textAlign: "end"}}>
                <TextField
                  color="secondary"
                  label="Complemento"
                  id="complement"
                  type="text"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="CEP"
                id="postal"
                type="text"
                className="login-form"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
              />
            </Grid>
            <Grid item container xs={12} style={{margin: "0px 25%"}} alignContent="center" justify="space-around">
              <Grid item xs={9}>
                <TextField
                  color="secondary"
                  label="Cidade"
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={3} style={{textAlign: "end"}}>
                <TextField
                  color="secondary"
                  label="UF"
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
            </Grid>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
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
          </Fragment>
        );
      default:
        return <Fragment />;
    }
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
            item
            container
            md={12}
            className="auth-form"
            alignContent="flex-start"
            style={{height: "40%"}}
          >
            {getStepContent(steps)}
          </Grid>
          <Grid item container md={12} justify="center" style={{height: "30%"}}>
            <Grid item md={12} style={{textAlign: "center", height: "70%"}}>
              {steps < 2 ? (
                null
              ) : (
                <IconButton
                  onClick={onRegister}
                  variant="contained"
                  color="primary"
                  style={{
                    color: "#6d2d54",
                  }}
                  icon={signIn}
                  alt="hand holding a heart"
                  msg="Cadastrar"
                />
              )}
            </Grid>
            <Grid item md={6} style={{height: "30%"}}>  
              <MobileStepper    
                variant="dots"
                steps={3}
                position="static"
                activeStep={steps}
                nextButton={
                  <Button size="small" onClick={onNext} disabled={steps === 2}>
                    Avançar
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={() => setSteps(steps - 1)} disabled={steps === 0}>
                    <KeyboardArrowLeft />
                    Voltar
                  </Button>
                }
              />
            </Grid>
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

export default OrganizationRegister;
