import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import Dashboard from "./Dashboard";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ohaafogw5p8uyx1m.us.auth0.com"
      clientId="fMzzNURq1avAeKZGXe7mnSt71TBBQcJy"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-ohaafogw5p8uyx1m.us.auth0.com/api/v2/",
        scope: "openid profile email",
      }}
      cacheLocation="localstorage"
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
