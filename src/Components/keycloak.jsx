import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://avajava.pro:8880/',
  realm: "praksa",
  clientId: "react-client",
  credentials: {
    secret: "fvPLhPeV4TvBrVQDucQtlsLcoSURe6oB", 
  }

});

export default keycloak;