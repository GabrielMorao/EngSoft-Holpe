import React from "react";
import {
  Avatar,
  Paper,
  Grid,
  withStyles,
  useTheme,
  Typography,
  Button
} from "@material-ui/core";
import Moment from "react-moment";

import defaultImage from "../../assets/card-default.png";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Calendar from "@material-ui/icons/Event";

export const Event = withStyles(() => ({
  root: {
    backgroundColor: "#E2FAFC",
    width: "100%",
    margin: "8px",
    minHeight: "200px",
    borderRadius: "8px",
  },
}))((props) => {
  const theme = useTheme();
  return (
    <Paper {...props}>
      <Grid container style={{height: "100%", width: "100%"}}>
        <Grid item container justify="center"
          style={{
            flexGrow: 0,
            maxWidth: "30%",
            flexBasis: "30%"
          }}>
          <img
            src={props.photo ? props.photo : defaultImage}
            alt={"imagem"}
            style={{
              height: "inherit",
              maxHeight: "180px",
              margin: "auto",
              padding: "10px",
            }}
          />
        </Grid>
        <Grid item container
          style={{
            flexGrow: 0,
            maxWidth: "70%",
            flexBasis: "70%",
            padding: "8px 10px 24px 0",
          }}>
          <Grid
            item
            style={{
              width: "100%",
              borderBottom: `solid ${theme.palette.secondary.main} 2px`,
              marginBottom: "1vh",
              height: "25%",
            }}
          >
            <Typography variant="h3">{props.name}</Typography>
          </Grid>
          <Grid item style={{ height: "65%" }}>
            <Typography variant="h2">{props.summary}</Typography>
          </Grid>
          <Grid item container justify="space-around" style={{ height: "10%" }}>
            <Typography variant="h1" title="Número de voluntários">
              <SupervisorAccount />: {props.volunteers}/{props.vacancies}
            </Typography>
            <Typography variant="h1" title="Dia e horário do evento">
              <Calendar />:{" "}
              <Moment date={props.initialDate} format={"DD/MM/YYYY"} />{" "}
              &nbsp;&nbsp;
              <AccessAlarmIcon />:{" "}
              <Moment date={props.initialDate} format={"hh:mm"} />
              &nbsp;ÀS&nbsp;
              <Moment date={props.finalDate} format={"hh:mm"} />
            </Typography>
            <Button onClick={props.openModal} style={{backgroundColor: "transparent"}}>
              <Typography variant="h1">
                SAIBA MAIS
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
});

export const Member = withStyles(() => ({
  root: {
    backgroundColor: "#E2FAFC",
    width: "45%",
    margin: "8px",
    minHeight: "140px",
    borderRadius: "8px",
  },
}))((props) => {
  const theme = useTheme();
  return (
    <Paper {...props}>
      <Grid container style={{height: "100%", width: "100%"}}>
        <Grid item container justify="center"
          style={{
            flexGrow: 0,
            maxWidth: "30%",
            flexBasis: "30%"
          }}>
          <img
            src={props.photo}
            alt={props.photo}
            style={{
              height: "120px",
              maxHeight: "120px",
              margin: "auto",
              padding: "10px",
              borderRadius: "24px"
            }}
          />
        </Grid>
        <Grid item container
          style={{
            flexGrow: 0,
            maxWidth: "70%",
            flexBasis: "70%",
            padding: "8px 10px 24px 8px",
          }}>
          <Grid
            item
            style={{
              width: "100%",
              borderBottom: `solid ${theme.palette.secondary.main} 2px`,
              marginBottom: "1vh",
              height: "25%",
            }}
          >
            <Typography variant="h1">{props.name}</Typography>
          </Grid>
          <Grid item style={{ height: "65%" }}>
            <Typography variant="h1">{props.email}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
});

export const ThemedPaper = withStyles(() => ({
  root: {
    backgroundColor: "#E2FAFC",
    width: "60vw",
    height: "calc(60vw / 5)",
    margin: "auto",
    minHeight: "200px",
    borderRadius: "8px",
  },
}))((props) => {
  const theme = useTheme();
  return (
    <Paper {...props}>
      <Grid container style={{height: "100%", width: "100%", padding: "10px"}}>
        <Grid
          item
          style={{
            width: "100%",
            borderBottom: `solid ${theme.palette.secondary.main} 2px`,
            marginBottom: "1vh",
            height: "25%",
          }}
        >
          <Typography variant="h3">{props.name}</Typography>
        </Grid>
        <Grid item>
          {props.text}
        </Grid>
      </Grid>
    </Paper>
  )
})

export const User = withStyles(() => ({
  root: {
    width: "50%",
    margin: "16px"
  },
}))((props) => {
  const theme = useTheme();
  return (
    <Grid container {...props}>
      <Grid item xs={2}>
        <Avatar src={props.photo} style={{height: '3em', width: "3em"}} />
      </Grid>
      <Grid item container xs={8}>
        <Grid item xs={12}>
          <Typography variant="h2">{props.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">{props.email}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={() => props.removeUser(props.id)} style={{backgroundColor: "transparent"}}>
          <Typography variant="h1">
            REMOVER
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
});