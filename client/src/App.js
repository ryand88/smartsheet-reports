import React, { useEffect, useState } from "react";
import { Router, navigate } from "@reach/router";
import axios from "axios";

import SheetList from "./components/SheetList";
import ReportTest from "./components/ReportTest";

import setAuthToken from "./utils/setAuthToken";
import smartsheetRedirectURL from "./utils/smartsheetRedirectURL";

function App() {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    // const dateTest = new Date();
    // console.log(dateTest.getTime());
    // dateTest.setMinutes((24 - dateTest.getHours()) * 60 + 9 * 60);
    // console.log(dateTest);

    const isCallback = window.location.href.match(/callback/); // Check for callback URL
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
        navigate("/");
      });
    } else if (auth) {
      // if auth state exists, fetch user data
      const { access_token } = auth;
      setAuthToken(access_token);
      axios.get("/api/user/current-user").then(res => {
        console.log(res.data);
        setUser(res.data);
      });
      // .catch(
      //   // if user can't be fetched, redirect to smartsheet login
      //   () => (window.location.href = smartsheetRedirectURL)
      // );
    } else if (localStorageAuth) {
      // if no auth state, but in local storage, copy local storage to auth state
      setAuth(JSON.parse(localStorageAuth));
    } else {
      // if no auth state or local storage, redirect to smartsheet login
      window.location.href = smartsheetRedirectURL;
    }
  }, [auth]);

  return (
    <div className="App">
      {user ? (
        <Router>
          <ReportTest path="/" sheetId={7928597139744644} />
          <SheetList path="/sheet-list" />
        </Router>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
