# sciTech-server
SciTech Nodejs API

## Database Schema


## Authentication
After login, a JWT Auth token is returned. For each autheticated request just add an "Authorization" header with JWT and the token.

| HEADER        | VALUE         |
| ------------- | ------------- |
| Authorization | JWT token_key |

## Allowed methods
 - POST, GET, PATCH, PUT, DELETE

## API Endpoints
 - API Route Prefix: "/api" (Example: "https://localhost:3000/api/")
 - "?" character indicates an optional param

| STATUS | VERB  | URL                             | URL PARAMS | BODY PARAMS | DESCRIPTION                                                 |
| ------ | ----- | ------------------------------- | ---------- | ----------- | ----------------------------------------------------------- |
| DONE   | GET   | /                               |            |             | Get a message "SciTech Server!" |
