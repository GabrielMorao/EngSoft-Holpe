import React, { useState, useEffect } from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker"
import { cloneDeep } from "lodash"

import { Grid, Typography } from "@material-ui/core"
import { showToaster } from "../design-system/components/Toaster";

import { OrganizationEventDetails } from "../design-system/components/Dialogs"
import { Event } from "../design-system/components/Cards";

const createdEvent = () => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(undefined);
    const [detailsModal, setDetailsModal] = useState(false);

    function openDetailsModal(item) {
        let volunteer = cloneDeep(item)

        volunteer.volunteers = users.filter(
            function(e) {
                return item.volunteers.indexOf(e._id) !== -1
            }
        )
       
        setDetailsModal(true);
        setSelectedEvent(volunteer)
    }

    function closeDetailsModal() {
        setDetailsModal(false)
        setSelectedEvent(undefined)
    }

    function deleteEvent(){
        axios
            .delete("https://holp-server.vercel.app/api/v1/event", {
                headers: { 
                    Authorization: "Bearer " + localStorage.getItem("Token") 
                },
                data: {
                    id: selectedEvent._id
                }
            })
            .then((response) => {
                showToaster({
                  message: "Evento deletado com sucesso!",
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
                  message: "Falha ao deletar o evento!",
                  autoClose: 2000,
                  onClose: () => {
                    location.reload();
                  },
                });
            })
    }

    function removeUser(id) {
        let volunteers = selectedEvent.volunteers.filter(user => user._id !== id)
        let ids = []
        volunteers.map((user) => ids.push(user._id))

        const data = {
            id: selectedEvent._id,
            volunteers: ids
        }
        axios
            .patch("https://holp-server.vercel.app/api/v1/event",
                data,
                {headers: { "Authorization": "Bearer " + localStorage.getItem("Token") }}
            )
            .then((response) => {
                showToaster({
                    message: "Voluntário removido com sucesso!",
                    autoClose: 2000,
                    onClose: () => {
                      location.reload();
                    },
                  });
            })
            .catch((error) => {
                console.warn("error", error)
                showToaster({
                    message: "Falha ao remover voluntário!",
                    autoClose: 2000,
                    onClose: () => {
                      location.reload();
                    },
                  });
            })
    }

    useEffect(() => {
        let events = [];
        let orgMail;
        let orgPhone;

        trackPromise(
            axios
                .get("https://holp-server.vercel.app/api/v1/user/solicitant",
                    {headers: { "Authorization": "Bearer " + localStorage.getItem("Token")}}
                )
                .then((response) => {
                    orgMail = response.data.email;
                    orgPhone = response.data.phone
                    response.data.events.map((event) => {
                        event.email = orgMail;
                        event.phone = orgPhone;
                        events.push(event);
                    })
                    setEvents(events)
                })
                .catch((error) => console.log(error))
        )
    }, [])

    useEffect(() => {
        if(events.length > 0) {
            let users = [];

            axios
                .get("https://holp-server.vercel.app/api/v1/user/volunteer",
                    {headers: { "Authorization": "Bearer " + localStorage.getItem("Token")}}
                )
                .then((response) => {
                    response.data.map((user) => {
                        users.push(user);
                    })
                    setUsers(users)
                })
                .catch((error) => console.log(error))
        }
    }, [events])

    return (
        <div style={{ margin: "9vh auto 0", width: "80%"}}>
            <Grid container justify="center">
                <Grid item xs={12} className="event-header">
                    <Typography variant="h4">Meus Trabalhos</Typography>
                </Grid>
                <Grid item container >
                    {selectedEvent ?
                        <OrganizationEventDetails
                            closeModal={closeDetailsModal}
                            modal={detailsModal}
                            selectedEvent={selectedEvent}
                            deleteEvent={deleteEvent}
                            removeUser={removeUser}
                        />
                    : null }
                    {events.map((event, index) => (
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
                    ))}
                </Grid>
            </Grid>
        </div>
    )

}

export default createdEvent