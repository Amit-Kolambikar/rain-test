import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default class NavBar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => {
    // let history = useHistory();
    // if(name === "Sign Up"){
    //     history.push('/sign-up');
    // }
    // if(name === "Sign In"){
    //     history.push('/sign-in');
    // }
    // if(name === "Home"){
    //     history.push('/home');
    // }
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name="Home"
            active={activeItem === "friends"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Sign Up"
            active={activeItem === "sign-up"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Sign In"
            active={activeItem === "sign-in"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
