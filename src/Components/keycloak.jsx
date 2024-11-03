import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://avajava.pro:8880',
  realm: "praksa",
  clientId: "react-client",
});

export default keycloak;