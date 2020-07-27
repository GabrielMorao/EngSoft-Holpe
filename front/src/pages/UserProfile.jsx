import React, { Fragment, useState, useEffect, useContext } from "react"
import { store} from "../store"
import { trackPromise } from "react-promise-tracker"
import axios from "axios"
import { Grid, Typography, Paper, Avatar, TextField, Button, IconButton, useTheme, Input } from "@material-ui/core"
import { PhoneMask } from "../design-system/components/MaskedInputs"

import facebookLogo from "../assets/external-logos/facebook-brands.svg"
import instagramLogo from "../assets/external-logos/instagram-brands.svg"
import whatsappLogo from "../assets/external-logos/whatsapp-brands.svg"

const UserProfile = (props) => {
    const theme = useTheme()
    const { state } = useContext(store)
    const userType = state.userType;

    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [description, setDescription] = useState("")
    const [documentNumber, setDocumentNumber] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("")
    const [number, setNumber] = useState("")
    const [addressComplement, setAddressComplement] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUF] = useState("")
    const [postal, setPostal] = useState("")
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")

    const [isEditing, setIsEditing] = useState(false)

    function imageUpload(event) {
        if (event.target.files && event.target.files[0]) {
            let image = event.target.files[0]
            setAvatar(URL.createObjectURL(image))
        }
    }

    useEffect(() => {
        trackPromise (
            axios.get(
                `https://holp-server.vercel.app/api/v1/user/${userType}`, 
                {headers: { "Authorization": "Bearer " + localStorage.getItem("Token") }
                }
            )
            .then(({ data }) => {
                setName(data.name? data.name : "")
                setAvatar(data.photo? URL.createObjectURL(data.photo) : null)
                setEmail(data.email? data.email : "")
                setStreet(data.address.street? data.address.street : "")
                setNumber(data.address.number? data.address.number : "")
                setUF(data.address.state? data.address.state : "")
                setPostal(data.address.zipcode? data.address.zipcode : "")
                setCity(data.address.city? data.address.city : "")
                setPhone(data.phone? data.phone : "")
                if(userType === "solicitant"){
                    setDocumentNumber(data.cnpj? data.cnpj : "")
                }            
            })
            .catch(error => console.log(error.response))
        )
    }, [])

    function editProfile() {
        console.log("salvando")
        axios.patch(
            `https://holp-server.vercel.app/api/v1/user/${userType}`,
            {
                name: name,
                photo: avatar,
                email: email,
                adress: {
                    street: street,
                    number: number,
                    state: uf,
                    zipcode: postal,
                    city: city
                },
                phone: phone,
                cpf: documentNumber,
            },
            {headers: { "Authorization": "Bearer " + localStorage.getItem("Token") }
            }
        )
        .then((response) => console.log(response))
        .catch(error => console.log(error.response))
    }

    return (
        <div style={{ margin: "9vh auto 0", width: "80%" }}>
            <Grid container justify="center" alignContent="flex-start">
                <Grid item xs={12} className="event-header" style={{height: "10%"}}>
                    <Typography variant="h4">Configurações da Conta</Typography>
                </Grid>
                <Paper
                    style={{
                        backgroundColor: "#E2FAFC",
                        width: "100%",
                        height: "calc(80% - 9vh)",
                        marginBottom: "24px",
                        minHeight: "200px",
                        borderRadius: "8px",
                        padding: "24px"
                    }}>
                    <Grid item container>
                        <Grid item container className="settings-row">
                            <Grid item sm={2}>
                                <input 
                                    accept="image/*"
                                    id="avatar-upload"
                                    type="file"
                                    style={{display: "none"}}
                                    onChange={imageUpload}
                                    disabled={!isEditing}
                                />
                                <label htmlFor="avatar-upload">
                                    <IconButton component="span">
                                        <Avatar src={avatar} alt="avatar" style={{height: "120px", width: "120px"}}/>
                                    </IconButton>
                                </label>
                            </Grid>
                            <Grid item container sm={10}>
                                <Grid item container sm={12}>
                                    <Grid item sm={8} style={{paddingRight: "16px"}}>
                                        <TextField
                                            color="secondary"
                                            label={userType === "solicitant" ? "Razão Social" : "Nome"}
                                            id="name"
                                            type="text"
                                            className="settings-form"
                                            value={name}
                                            disabled={!isEditing}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item sm={4} style={{paddingLeft: "16px"}}>
                                        <TextField
                                            fullWidth
                                            color="secondary"
                                            label="Email"
                                            id="email"
                                            type="text"
                                            className="settings-form"
                                            value={email}
                                            disabled={!isEditing}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container sm={12} justify="space-between">
                                    <Grid item container sm={4} style={{paddingRight: "16px"}}>
                                        <Grid item container sm={2}>
                                            <img src={facebookLogo} style={{height: "36px"}} />
                                        </Grid>
                                        <Grid item sm={10} style={{paddingLeft: "8px"}}>
                                            <Input
                                                color="secondary"
                                                label="Facebook"
                                                id="facebook"
                                                type="text"
                                                className="settings-form"
                                                value={facebook}
                                                disabled={!isEditing}
                                                onChange={(e) => setFacebook(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item container sm={4} style={{padding: "0 16px"}}>
                                        <Grid item container sm={2}>
                                            <img src={instagramLogo} style={{height: "36px"}} />
                                        </Grid>
                                        <Grid item sm={10} style={{paddingLeft: "8px"}}>
                                            <Input
                                                color="secondary"
                                                label="Instagram"
                                                id="instagram"
                                                type="text"
                                                className="settings-form"
                                                value={instagram}
                                                disabled={!isEditing}
                                                onChange={(e) => setInstagram(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item container sm={4} style={{paddingLeft: "16px"}}>
                                        <Grid item container sm={2}>
                                            <img src={whatsappLogo} style={{height: "36px", color: "red"}} />
                                        </Grid>
                                        <Grid item sm={10} style={{paddingLeft: "8px"}}>
                                            <Input
                                                color="secondary"
                                                label="WhatsApp"
                                                id="whatsapp"
                                                type="text"
                                                className="settings-form"
                                                value={phone}
                                                disabled={!isEditing}
                                                onChange={(e) => setPhone(e.target.value)}
                                                //inputComponent={PhoneMask}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container className="settings-row">
                            <TextField
                                multiline
                                rows={3}
                                inputProps={{
                                    "maxlength": 240 
                                }}
                                color="secondary"
                                label={
                                    userType === "solicitant" 
                                    ? "Faça um resumo de sua ONG para possíveis voluntários"
                                    : "Faça uma breve descrição sobre você para possíveis organizadores"
                                }
                                id="street"
                                type="text"
                                className="settings-form"
                                value={description}
                                disabled={!isEditing}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item container className="settings-row">
                            <Grid item sm={7} style={{paddingRight: "16px"}}>
                                <TextField
                                    color="secondary"
                                    label="Endereço"
                                    id="street"
                                    type="text"
                                    className="settings-form"
                                    value={street}
                                    disabled={!isEditing}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Grid>
                            <Grid item sm={2} style={{padding: "0px 16px"}}>
                                <TextField
                                    color="secondary"
                                    label="Número"
                                    id="number"
                                    type="text"
                                    className="settings-form"
                                    value={number}
                                    disabled={!isEditing}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item sm={3} style={{paddingLeft: "16px"}}>
                                <TextField
                                    color="secondary"
                                    label="Complemento"
                                    id="complement"
                                    type="text"
                                    className="settings-form"
                                    value={addressComplement}
                                    disabled={!isEditing}
                                    onChange={(e) => setAddressComplement(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container className="settings-row">
                            <Grid item sm={3} style={{paddingRight: "16px"}}>
                                <TextField
                                    color="secondary"
                                    label="CEP"
                                    id="postal"
                                    type="text"
                                    className="settings-form"
                                    value={postal}
                                    disabled={!isEditing}
                                    onChange={(e) => setPostal(e.target.value)}
                                />
                            </Grid>
                            <Grid item sm={5} style={{padding: "0 16px"}}>
                                <TextField
                                    color="secondary"
                                    label="Cidade"
                                    id="city"
                                    type="text"
                                    className="settings-form"
                                    value={city}
                                    disabled={!isEditing}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item sm={1} style={{padding: "0 16px"}}>
                                <TextField
                                    color="secondary"
                                    label="UF"
                                    id="uf"
                                    type="text"
                                    className="settings-form"
                                    value={uf}
                                    disabled={!isEditing}
                                    onChange={(e) => setUF(e.target.value)}
                                />
                            </Grid>
                            <Grid item container sm={3} style={{paddingLeft: "16px"}} justify="flex-end" alignContent="flex-end">
                                {isEditing ?
                                    <Fragment>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={() => setIsEditing(false)}>
                                                CANCELAR
                                        </Button>
                                        <Button
                                            style={{ marginLeft: "32px" }}
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={editProfile}>
                                                SALVAR
                                        </Button>
                                    </Fragment>
                                :

                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => setIsEditing(true)}>
                                            EDITAR PERFIL
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                        {userType === "solicitant" ?
                            <Grid item container className="settings-row">
                                <Grid item sm={2} style={{paddingRight: "16px"}}>
                                    <TextField
                                        color="secondary"
                                        label="CNPJ"
                                        id="cpf"
                                        type="text"
                                        className="settings-form"
                                        value={documentNumber}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        :
                            null
                        }
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )

}

export default UserProfile