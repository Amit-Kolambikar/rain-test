import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import axios from "axios";
import { setCookie } from '../../utils/index';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  state = {
    first_name: "",
    last_name: "",
    middle_name: "",
    password: "",
    email: "",
    terms_of_service_accepted: false,
    error: "",
    password_strength: 0,
  };

  handleChange = (e, { value }) => {
    this.setState({ [e.target.name]: value });
  };

  handlePasswordChange = (e, { value }) => {
    if (value.length > 0) {
      this.setState({
        password:value,
      })
      const url =
        "https://cors-anywhere.herokuapp.com/https://rain-staging-0.herokuapp.com/api/1/password/strength";
      const { first_name, middle_name, last_name, email } = this.state;
      const data = {
        password: value,
        related_terms: [first_name, middle_name, last_name, email],
      };
      axios
        .post(url, data)
        .then( (response) => {
          this.setState({
            password_strength: response.data.score,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            error: error,
          });
        });
    }
  };
  handleSubmit = (e) => {
    if (!this.state.terms_of_service_accepted) {
      this.setState({
        error: "Please accept TOS",
      });
      return;
    }
    e.preventDefault();
    // axios post
    const data = this.state;
    delete data.error;
    delete data.password_strength;
    this.setState({ error: "", password_strength: 0 });
    const url =
      "https://cors-anywhere.herokuapp.com/https://rain-staging-0.herokuapp.com/api/2/signup";
    console.log(data);
    axios
      .post(url, data)
      .then(function (response) {
        console.log(response);
        if(response.data.token!==undefined){
          setCookie("token",response.data.token,15);
          window.location.pathname = "/dashboard";
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors[0].message);
        this.setState({
          error: error.response.data.errors[0].message,
        });
      });
  };

  handleTosChange = (evt, data) => {
    let checked = data.checked;
    console.log(checked);
    this.setState({
      terms_of_service_accepted: checked,
    });
  };
  render() {
    const { error, password_strength } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
          <Form.Input
            size="medium"
            label="First name"
            placeholder="First name"
            required
            name="first_name"
            onChange={this.handleChange}
          />
          <Form.Input
            size="medium"
            label="Middle name"
            placeholder="Middle name"
            name="middle_name"
            onChange={this.handleChange}
          />
          <Form.Input
            size="medium"
            label="Last name"
            placeholder="Last name"
            name="last_name"
            required
            onChange={this.handleChange}
          />
          <Form.Field
            id="form-input-control-error-email"
            size="medium"
            control={Input}
            label="Password"
            type="password"
            name="password"
            placeholder="Enter a strong Password"
            required
            onChange={this.handlePasswordChange}
          />
          <p> Your password strength is {password_strength}</p>
          <br />
          <Form.Input
            
            size="medium"
            label="Email"
            placeholder="Email"
            type="email"
            name="email"
            required
            onChange={this.handleChange}
          />
        <Form.Checkbox
            size="medium"
          label="I agree to the Terms and Conditions"
          name="tos"
          type="checkbox"
          required
          onClick={(evt, data) => this.handleTosChange(evt, data)}
        />
        {error.length > 0 && (
          <div style={{ color: "red", margin: "1em 0" }}>{`${error}`}</div>
        )}
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default SignUp;
