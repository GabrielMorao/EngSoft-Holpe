# Holpe
Holpe is a college project to help ONGs find people who wants help/donate something.

## How to deploy
Just run `npm run deploy-dev` and it is done!

## Logs
To check logs just log into papertrail (`https://my.papertrailapp.com/`)
User: `gabrielrmachado11@usp.br`
Password: `teamholpe`

## The API
Base uri: `http://holp-server.now.sh/api/v1`

## Database models
### MER
https://drive.google.com/open?id=1SqZeekXlYj91ljV1WpQNOikioA3p3G0q

### MONGO
https://drive.google.com/open?id=1yIBrXG4F_SFfXPuFIBSg755ATxt-DH9Q


## Endpoints
### Authentication
`POST http://holp-server.now.sh/api/v1/auth/volunteer`

`POST http://holp-server.now.sh/api/v1/auth/solicitant`

`POST http://holp-server.now.sh/api/v1/auth`

### CRUD Volunteer
`POST http://holp-server.now.sh/api/v1/user/volunteer`

`GET http://holp-server.now.sh/api/v1/user/volunteer`

`PATCH http://holp-server.now.sh/api/v1/user/volunteer`

`DEL http://holp-server.now.sh/api/v1/user/volunteer`

### CRUD Ong
`POST http://holp-server.now.sh/api/v1/user/solicitant`

`GET http://holp-server.now.sh/api/v1/user/solicitant`

`PATCH http://holp-server.now.sh/api/v1/user/solicitant`

`DEL http://holp-server.now.sh/api/v1/user/solicitant`

### CRUD evento
`POST http://holp-server.now.sh/api/v1/event`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| initialDate    | String (YYYY-MM-DD HH:mm) | sim         |
| finalDate      | String (YYYY-MM-DD HH:mm) | sim         |
| name           | String                    | sim         |
| details        | String                    | não         |
| summary        | String                    | não         |
| photo          | String (base 64)          | não         |
| totalVacancies | Number                    | sim         |
| volunteers     | [String]                  | não         |

`PATCH http://holp-server.now.sh/api/v1/event`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| id             | String                    | sim         |
| initialDate    | String (YYYY-MM-DD HH:mm) | não         |
| finalDate      | String (YYYY-MM-DD HH:mm) | não         |
| name           | String                    | não         |
| details        | String                    | não         |
| summary        | String                    | não         |
| photo          | String (base 64)          | não         |
| totalVacancies | Number                    | não         |
| volunteers     | [String]                  | não         |

`DEL http://holp-server.now.sh/api/v1/event`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| id             | String                    | sim         |

### Evento inscrição
`POST http://holp-server.now.sh/api/v1/event/apply`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| eventId        | String                    | sim         |

`POST http://holp-server.now.sh/api/v1/event/unapply`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| eventId        | String                    | sim         |

`GET http://holp-server.now.sh/api/v1/event/apply`

Retorna um array de objeto de ongs, cada ong terá seus eventos que o usuári oestá inscrito