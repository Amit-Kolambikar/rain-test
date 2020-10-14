import React, { Component } from 'react';
import axios from "axios";
import { getCookie } from '../../utils/index';
class Dashboard extends Component {
  state = {}

  componentDidMount(){
    const url = "https://cors-anywhere.herokuapp.com/https://rain-staging-0.herokuapp.com/api/2/user";
    const AUTH_TOKEN = getCookie("token");
    console.log(AUTH_TOKEN);
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  }
  render() {
    return(
      <h1>Dashboard</h1>
    )
  }
}

export default Dashboard
