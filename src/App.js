import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./containers/sign-up";
import SignIn from "./containers/sign-in";
import Dashboard from "./containers/dashboard";
import NavBar from "./containers/navbar";
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

// router main page
// /sign-up & /login
// loggedin page - dashboard
// Build a signu form using the Rain API: https://rain-web-staging-0.herokuapp.com/en/docs
// Create a small app that creates a new user on Rain’s API, and also has an ability to fetch the email address of the currently logged in user.
// Desired views:
// Main view that allows you to either sign up or login
// Login view with a form that upon submitting login, redirects to a page that displays the currently logged in user
// Sign up view with a form that upon submission, creates a new user on Rain.
// Use https://c
// https://cors-anywhere.herokuapp.com/http://rain-staging-0.herokuapp.com/api/1/signup 
function App() {
  return (
    <Router>
      <Container>
        <br />
        <NavBar/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
