import React, { useState, useEffect, useContext } from "react";
import { store } from "../store"
import { trackPromise } from "react-promise-tracker"
import axios from "axios";
import { cloneDeep } from "lodash";
import { useTheme, Grid, Typography, Button } from "@material-ui/core";

import { Event } from "../design-system/components/Cards";
import { EventDetails } from "../design-system/components/Dialogs"
import { showToaster } from "../design-system/components/Toaster";

import "../stylesheets/events.css";

const Events = () => {
  const theme = useTheme();
  const { state } = useContext(store)
  const userType = state.userType;

  const [userID, setUserID] = useState("")
  const [events, setEvents] = useState([]);
  const [appliedEvents, setAppliedEvents] = useState([])
  const [unappliedEvents, setUnappliedEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [detailsModal, setDetailsModal] = useState(false);
  const [showAppliedEvents, setShowAppliedEvents] = useState(true)

  function openDetailsModal(item, id){
    item.userId = id;
    setDetailsModal(true)
    setSelectedEvent(item)
  }

  function closeDetailsModal(){
    setDetailsModal(false)
    setSelectedEvent(undefined)
  }

  function applyToEvent(){
    axios
      .post("https://holp-server.vercel.app/api/v1/event/apply", 
        {
          eventId: selectedEvent._id
        },
        {headers: { "Authorization": "Bearer " + localStorage.getItem("Token") }}
      )
      .then((response) => {
        showToaster({
          message: "Inscrição feita com sucesso!",
          autoClose: 2000,
          onClose: () => {
            location.reload();
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
      })
  }

  function unapplyToEvent() {
    axios
      .post("https://holp-server.vercel.app/api/v1/event/unapply", 
        {
          eventId: selectedEvent._id
        },
        {headers: { "Authorization": "Bearer " + localStorage.getItem("Token") }}
      )
      .then((response) => {
        showToaster({
          message: "Inscrição cancelada com sucesso!",
          autoClose: 2000,
          onClose: () => {
            location.reload();
          },
        });
      })
      .catch((error) => {
        console.warn("error", error);
        showToaster({
          type: "error",
          message: "Falha ao cancelar inscrição!",
          autoClose: 2000,
          onClose: () => {
            location.reload();
          },
        });
      })
  }

  useEffect(() => {
    let events = [];
    let orgName;
    let orgMail;
    let orgPhone;

    trackPromise(
      axios
        .get("https://holp-server.vercel.app/api/v1/user/solicitant")
        .then((response) => {
          response.data.map((org) => {
            orgName = org.name;
            orgMail = org.email;
            orgPhone = org.phone;
            org.events.map((event) => {
              event.organization = orgName
              event.email = orgMail
              event.phone = orgPhone
              events.push(event);
            });
          });
          setEvents(events);
        })
        .catch((error) => {
          console.log(error.response);
        })
    )
  }, []);

  useEffect(() => {
    if(userType === "volunteer") {
      axios.get(
        `https://holp-server.vercel.app/api/v1/user/${userType}`, 
        {headers: { "Authorization": "Bearer " + localStorage.getItem("Token") }
        }
    )
    .then(({ data }) => {
        setUserID(data._id)          
    })
    .catch(error => console.log(error.response))
    }
  }, [events])

  useEffect(() => {
    console.log(userID)
    console.log(events)
    if(userID !== "" && events.length > 0) {
      let appliedEventsList = cloneDeep(events)
      appliedEventsList = appliedEventsList.filter((event) => event.volunteers.includes(userID))
      setAppliedEvents(appliedEventsList)

      let unappliedEventsList = cloneDeep(events)
      unappliedEventsList = unappliedEventsList.filter((event) => !event.volunteers.includes(userID))
      setUnappliedEvents(unappliedEventsList)
    }
  }, [userID, events])

  function renderEventList() {
    if(userType !== "volunteer") {
      return events.map((event, index) => (
              <Event
                key={index}
                name={event.name}
                photo={event.photo}
                summary={event.summary}
                details={event.details}
                volunteers={event.volunteers.length}
                vacancies={event.totalVacancies}
                initialDate={event.initialDate}
                finalDate={event.finalDate}
                openModal={() => openDetailsModal(event)}
              />
            ))
    }
    else if(showAppliedEvents) {
      return appliedEvents.map((event, index) => (
        <Event
          key={index}
          name={event.name}
          photo={event.photo}
          summary={event.summary}
          details={event.details}
          volunteers={event.volunteers.length}
          vacancies={event.totalVacancies}
          initialDate={event.initialDate}
          finalDate={event.finalDate}
          openModal={() => openDetailsModal(event, userID)}
        />
      ))
    }
    else {
      return unappliedEvents.map((event, index) => (
        <Event
          key={index}
          name={event.name}
          photo={event.photo}
          summary={event.summary}
          details={event.details}
          volunteers={event.volunteers.length}
          vacancies={event.totalVacancies}
          initialDate={event.initialDate}
          finalDate={event.finalDate}
          openModal={() => openDetailsModal(event)}
        />
      ))
    }
  }

  return (
    <div style={{ margin: "9vh auto 0", width: "80%" }}>
      <Grid container justify="center">
        <Grid item xs={12} className="event-header">
          <Typography variant="h4">Trabalhos</Typography>
        </Grid>
        {userType === "volunteer"
          ? <Grid item container justify="center" style={{textAlign: "center"}}>
              <Grid item xs={6} style={{
                  borderRight: `solid ${theme.palette.secondary.main} 2px`,
                  backgroundColor: showAppliedEvents ? `#E2FAFC` : "transparent"
                }}>
                <Button onClick={() => setShowAppliedEvents(true)} >
                  <Typography variant="h3">Inscrições</Typography>
                </Button>
              </Grid>
              <Grid item xs={6} style={{
                  backgroundColor: showAppliedEvents ? "transparent" : `#E2FAFC`
                }}>
                <Button onClick={() => setShowAppliedEvents(false)} >
                  <Typography variant="h3">Novos Eventos</Typography>
                </Button>
              </Grid>
            </Grid>
          : null }
        <Grid item container>
          {selectedEvent ?
            <EventDetails
              closeModal={closeDetailsModal}
              modal={detailsModal}
              applyToEvent={applyToEvent}
              unapplyToEvent={unapplyToEvent}
              selectedEvent={selectedEvent}
              userType={userType}
              userID={userID}
            />
          : null }
          {renderEventList()}
        </Grid>
      </Grid>
    </div>
  );
};

export default Events;
