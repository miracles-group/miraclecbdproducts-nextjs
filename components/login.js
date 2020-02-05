import React from "react";
import "../styles/auth.scss";
import { login } from "../services/auth";
import Router from "next/router";
import Noty from "noty";
import Cookie from "js-cookie";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: ""
      },
      loading: false
    };
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  };

  signIn = async event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const res = await login(this.state.user);
    if (res.data.status === 200) {
      Cookie.set("loged", true);
      this.setState({
        loading: false
      });
      Router.push("/");
    } else {
      this.setState({
        loading: false
      });
      return new Noty({
        type: "error",
        layout: "topRight",
        text: res.data.message,
        timeout: 3000
      }).show();
    }
  };

  render() {
    return (
      <div className="materialContainer">
        <div className="box">
          <div className="title">LOGIN</div>
          <form onSubmit={this.signIn} >
            <div className="input">
              <input
                placeholder="Username"
                type="text"
                name="username"
                autoFocus
                onChange={this.handleChange}
              />
              <span className="spin"></span>
            </div>

            <div className="input">
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <span className="spin"></span>
            </div>

            <div className="button login">
              <button type="submit">
                <span>{this.state.loading ? "Loading..." : "GO"}</span>
                <i className="fa fa-check"></i>
              </button>
            </div>
          </form>

          <a href="/singup" className="pass-forgot">
            Don't have an account? Sign Up
          </a>
        </div>
        <div className="overbox"></div>
      </div>
    );
  }
}

export default Login;
