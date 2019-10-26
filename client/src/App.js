/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Router, navigate } from "@reach/router";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { lightGreen, deepOrange } from "@material-ui/core/colors";

import "./App.css";

import TopBar from "./components/TopBar";
import SheetList from "./components/SheetList";
import ReportTest from "./components/ReportTest";
// import ReportTemplate from "./components/ReportTemplate";
import IndividualKPIs from "./components/IndividualKPIs/IndividualKPIs";
import SoloDashboard from "./components/SoloDashboard/SoloDashboard";

import setAuthToken from "./utils/setAuthToken";
import smartsheetRedirectURL from "./utils/smartsheetRedirectURL";

const theme = createMuiTheme({
  palette: {
    primary: { main: lightGreen["A700"] },
    secondary: { main: deepOrange[500] }
  }
});

function App({ location }) {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const isCallback = window.location.href.match(/callback/); // Check for callback URL
    const hrefState = window.location.href.match(/state=(.*)/); // Check for callback URL
    const localStorageAuth = localStorage.getItem("auth");
    if (isCallback) {
      // if "callback" is in the href,
      // fetch auth key and set in local storage and auth state
      const code =
        window.location.href.match(/\?code=(.*)/) && // grab code after "callback"
        window.location.href.match(/\?code=(.*)/)[0];
      axios.get(`/api/auth/callback${code}`).then(res => {
        // send code to node server to fetch auth key
        localStorage.setItem("auth", JSON.stringify(res.data));
        setAuth(res.data);
        navigate("/" + hrefState[1]);
      });
    } else if (auth) {
      // if auth state exists, fetch user data
      const { access_token } = auth;
      setAuthToken(access_token);
      axios
        .get("/api/user/current-user")
        .then(res => {
          setUser(res.data);
        })
        .catch(
          // if user can't be fetched, redirect to smartsheet login
          err => {
            window.location.href = `${smartsheetRedirectURL}test`;
            console.log(err);
          }
        );
    } else if (localStorageAuth) {
      // if no auth state, but in local storage, copy local storage to auth state
      setAuth(JSON.parse(localStorageAuth));
    } else {
      // if no auth state or local storage, redirect to smartsheet login
      window.location.href =
        smartsheetRedirectURL + location.pathname.replace("/", "");
    }
  }, [auth]);

  const routeTitles = { "/fmops": "Personal KPI's", "/": "FM KPI's" };
  const currentRoute = location.pathname;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TopBar
          title={routeTitles[currentRoute] ? routeTitles[currentRoute] : "FFG"}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        {user ? (
          <Router>
            <ReportTest
              path="/"
              sheetId={7928597139744644}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
            <SheetList path="/sheet-list" />
            {/* <ReportTemplate path="/test" /> */}
            <IndividualKPIs path="/fmops"></IndividualKPIs>
            <SoloDashboard path="/dashboard"></SoloDashboard>
          </Router>
        ) : (
          <h1>Loading...</h1>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
