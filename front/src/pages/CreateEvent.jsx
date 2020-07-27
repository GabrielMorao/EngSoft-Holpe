import React from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { trackPromise } from "react-promise-tracker";
import { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  useTheme,
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { showToaster } from "../design-system/components/Toaster";

const CLOUDINARY_UPLOAD_PRESET = "qzkjhpc8";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dwzsqytq7/image/upload";

const CreateEvent = (props) => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [vacancies, setVacancies] = useState(5);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [transport, setTransport] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [food, setFood] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  function createEvent() {
    const data = {
      initialDate: moment(initialDate).format("YYYY-MM-DD HH:mm"),
      finalDate: moment(finalDate).format("YYYY-MM-DD HH:mm"),
      name: name,
      // transport: transport,
      // certificate: certificate,
      // food: food,
      details: description,
      summary: summary,
      totalVacancies: vacancies,
      // address: {
      //     street: street,
      //     number: number,
      //     city: city,
      //     country: "Brazil"
      // }
    };
    if (photoURL.length > 1) {
      data.photo = photoURL;
    }

    axios
      .post("https://holp-server.vercel.app/api/v1/event", data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
      })
      .then((response) => {
        showToaster({
          message: "Evento criado com sucesso!",
          autoClose: 2000,
          onClose: () => {
            navigate("/your-events");
          },
        });
      })
      .catch((error) => {
        console.warn("error", error);
        showToaster({
          type: "error",
          message: "Falha na inscrição!",
          autoClose: 2000,
          onClose: () => {
            location.reload();
          },
        });
      });
  }

  function imageUpload(event) {
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];
      setPhoto(URL.createObjectURL(image));

      let data = new FormData();
      data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      data.append("file", image);

      trackPromise(
        axios
          .post(CLOUDINARY_UPLOAD_URL, data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          })
          .then((response) => {
            console.log(response.data);
            setPhotoURL(response.data.secure_url);
          })
          .catch((error) => console.log("error", error))
      );
    }
  }

  return (
    <div style={{ margin: "9vh auto 0", width: "80%" }}>
      <Grid container justify="center" alignContent="flex-start">
        <Grid item xs={12} className="event-header" style={{ height: "10%" }}>
          <Typography variant="h4">Criar Evento</Typography>
        </Grid>
        <Paper
          style={{
            backgroundColor: "#E2FAFC",
            width: "100%",
            height: "calc(80% - 9vh)",
            margin: "auto",
            marginBottom: "24px",
            minHeight: "200px",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <Grid item container>
            <Grid item container className="settings-row">
              <Grid item sm={2}>
                <input
                  accept="image/*"
                  id="photo-upload"
                  type="file"
                  multiple={false}
                  style={{ display: "none" }}
                  onChange={imageUpload}
                />
                <label htmlFor="photo-upload">
                  <Button component="span">
                    <Avatar
                      variant="square"
                      src={photo}
                      alt="foto"
                      style={{ height: "120px", width: "120px" }}
                    />
                  </Button>
                </label>
              </Grid>
              <Grid item container sm={10}>
                <Grid item container sm={12}>
                  <Grid item sm={9} style={{ paddingRight: "16px" }}>
                    <TextField
                      color="secondary"
                      label="Nome do Evento"
                      id="name"
                      className="settings-form"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      inputProps={{
                        maxlength: 40,
                      }}
                    />
                  </Grid>
                  <Grid item sm={3} style={{ paddingLeft: "16px" }}>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="Total de vagas"
                      id="vancancies"
                      type="text"
                      className="settings-form"
                      value={vacancies}
                      onChange={(e) => setVacancies(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container sm={12}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid
                      item
                      container
                      sm={4}
                      style={{ paddingRight: "16px" }}
                    >
                      <Grid item>
                        <KeyboardDatePicker
                          id="date-picker"
                          label="Data"
                          format="DD/MM/yyyy"
                          orientation="landscape"
                          color="secondary"
                          value={initialDate}
                          onChange={(newDate) => {
                            setInitialDate(newDate);
                            setFinalDate(newDate);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container sm={4} justify="center">
                      <Grid item>
                        <KeyboardTimePicker
                          id="initial-time-picker"
                          label="Horário de início"
                          orientation="landscape"
                          color="secondary"
                          value={initialDate}
                          onChange={(newDate) => setInitialDate(newDate)}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container sm={4} justify="flex-end">
                      <Grid item>
                        <KeyboardTimePicker
                          id="final-time-picker"
                          label="Horário de encerramento"
                          orientation="landscape"
                          color="secondary"
                          value={finalDate}
                          onChange={(newDate) => setFinalDate(newDate)}
                        />
                      </Grid>
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container justify="flex-start">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={transport}
                      onChange={() => setTransport(!transport)}
                      name="transport"
                    />
                  }
                  label="Fornecer Transporte"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={certificate}
                      onChange={() => setCertificate(!certificate)}
                      name="certificate"
                    />
                  }
                  label="Fornecer Certificado"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={food}
                      onChange={() => setFood(!food)}
                      name="food"
                    />
                  }
                  label="Fornecer Comida"
                />
              </Grid>
            </Grid>
            <Grid item container className="settings-row">
              <TextField
                multiline
                rows={3}
                inputProps={{
                  maxlength: 240,
                }}
                color="secondary"
                label="Faça uma breve resumo do evento aqui:"
                id="summary"
                type="text"
                className="settings-form"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Grid>
            <Grid item container className="settings-row">
              <TextField
                multiline
                rows={3}
                inputProps={{
                  maxlength: 600,
                }}
                color="secondary"
                label="Descreva o evento com mais detalhes"
                id="description"
                type="text"
                className="settings-form"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item container className="settings-row">
              <Grid item sm={7} style={{ paddingRight: "16px" }}>
                <TextField
                  color="secondary"
                  label="Endereço"
                  id="street"
                  type="text"
                  className="settings-form"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Grid>
              <Grid item sm={2} style={{ padding: "0px 16px" }}>
                <TextField
                  color="secondary"
                  label="Número"
                  id="number"
                  type="text"
                  className="settings-form"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Grid>
              <Grid item sm={3} style={{ paddingLeft: "16px" }}>
                <TextField
                  color="secondary"
                  label="Complemento"
                  id="complement"
                  type="text"
                  className="settings-form"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              className="settings-row"
              justify="space-between"
            >
              <Grid item sm={5}>
                <TextField
                  color="secondary"
                  label="Cidade"
                  id="city"
                  type="text"
                  className="settings-form"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid
                item
                container
                sm={3}
                justify="flex-end"
                alignContent="flex-end"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={createEvent}
                >
                  CRIAR EVENTO
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default CreateEvent;
