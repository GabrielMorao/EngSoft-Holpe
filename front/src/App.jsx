import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Router, Redirect } from "@reach/router";
import { ToastContainer } from "react-toastify";

import { usePromiseTracker } from "react-promise-tracker"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { ThemeProvider } from "@material-ui/core/styles";
import { StateProvider, store } from "./store"
import { holpe } from "./design-system/Themes";
import "./stylesheets/app.css";

import Root from "./Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import VolunteerRegister from "./pages/VolunteerRegister";
import OrganizationRegister from "./pages/OrganizationRegister";
import Events from "./pages/Events";
import Team from "./pages/Team"
import CreatedEvents from "./pages/CreatedEvents"
import UserProfile from "./pages/UserProfile"
import CreateEvent from "./pages/CreateEvent"
import Navbar from "./components/Navbar";

const Loading = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#6d2d54" height="100" width="100" />
    </div>
}


const AuthenticatedRoute = (routeProps) => {
  const { state } = useContext(store)
  const userType = state.userType;

  let { as: Component, ...props } = routeProps;
  return userType ? <Redirect to="/events" replace={true} noThrow={true} /> : <Component {...props} />
}

const PrivateRoute = (routeProps) => {
  const { state } = useContext(store)
  const userType = state.userType;

  let { as: Component, ...props } = routeProps;
  return userType ? <Component {...props} /> : <Redirect to="/login" replace={true} noThrow={true} />
}

const App = () => (
  <div>
    <StateProvider>
      <ThemeProvider theme={holpe}>
        <Navbar />
        <ToastContainer />
        <Router>
          <Root path="/">
            <Home path="/" />
            <About path="/about" />
            <AuthenticatedRoute as={Login} path="/login" />
            <AuthenticatedRoute as={VolunteerRegister} path="/volunteer" />
            <AuthenticatedRoute as={OrganizationRegister} path="/organization" />
          </Root>
          
          <Events path="/events" />
          <Team path="/team" />

          <PrivateRoute as={UserProfile} path="user-profile" />
          <PrivateRoute as={CreateEvent} path="create-event" />
          <PrivateRoute as={CreatedEvents} path="your-events" />
        </Router>
      </ThemeProvider>
    </StateProvider>
  </div>
);

ReactDOM.render(
  <div>
    <App />
    <Loading />
  </div>, 
  document.getElementById("root"));
