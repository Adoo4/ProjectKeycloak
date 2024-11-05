import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://avajava.pro:8880',
  realm: "praksa",
  clientId: "react-client",
  credentials: {
    secret: 'H51u5k5aHvrh8w6oomDJtq3633VjeixU', // keep this secure in server-side code only
  }
});

export default keycloak;