import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import reportWebVitals from "./util/reportWebVitals";
import { AuthProvider } from "react-oidc-context";
import theme from "./util/theme";
import GlobalStore from "./GlobalStore";
import "./App.css";
import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/700.css";
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const oidcConfig = {
  authority: "https://login.microsoftonline.com/b39138ca-3cee-4b4a-a4d6-cd83d9dd62f0/v2.0",
  client_id: "70a95e47-d347-4674-ae84-f95fdef6f022",
  redirect_uri: window.location.protocol + "//" + window.location.host + "/auth/openid_connect/callback",
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider {...oidcConfig}>
        <CssBaseline />
        <GlobalStore />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
