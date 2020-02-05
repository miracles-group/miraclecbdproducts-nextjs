import React from "react";
import "../styles/auth.scss";
import { singUp } from "../services/auth";
import Router from "next/router";
import Noty from "noty";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";

class SingUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        emailaddress: "",
        phonenumber: "",
        contactperson: "",
        name: ""
      },
      re_pass: "",
      loading: false,
      valiEmail: false,
      valiPass: false,
      checkNull: false
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

  valiEmail = event => {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(event.target.value)) {
      this.setState({
        valiEmail: true
      });
    } else {
      this.setState({
        valiEmail: false
      });
    }
  };

  onValiPass = () => {
    if (this.state.re_pass !== this.state.user.password) {
      this.setState({
        valiPass: true
      });
    } else {
      this.setState({
        valiPass: false
      });
    }
  };

  signIn = async event => {
    event.preventDefault();
    if (this.state.valiEmail || this.state.valiPass) {
      return;
    }
    this.setState({
      loading: true
    });
    const res = await singUp(this.state.user);
    if (res.status === 200) {
      this.setState({
        loading: false
      });
      Router.push("/login");
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
          <div className="title">SignUp</div>
          <form onSubmit={this.signIn}>
            <div className="input">
              <input
                onChange={this.handleChange}
                required
                name="name"
                placeholder="Name"
                autoFocus
              />
            </div>
            <div className="input">
              <input
                onChange={this.handleChange}
                required
                placeholder="Miracle Username"
                name="username"
              />
            </div>

            <div className="input">
              <input
                onChange={this.handleChange}
                required
                onBlur={this.valiEmail}
                placeholder="Email"
                name="emailaddress"
                type="mail"
              />

              <span className="err">
                {this.state.valiEmail ? "Email invalidate" : ""}
              </span>
            </div>

            <div className="input">
              <input
                onChange={this.handleChange}
                required
                placeholder="Phone Number"
                name="phonenumber"
                type="number"
              />
            </div>

            <div className="input">
              <input
                onChange={this.handleChange}
                required
                name="contactperson"
                placeholder="Company"
                type="text"
              />
            </div>

            <div className="input">
              <input
                onChange={this.handleChange}
                required
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>

            <div className="input">
              <input
                onChange={e => this.setState({ re_pass: e.target.value })}
                onBlur={this.onValiPass}
                required
                name="password"
                placeholder="Comfirm Password"
                type="password"
              />

              <span className="err">
                {this.state.valiPass ? "Password incorrect" : ""}
              </span>
            </div>
            <div className="button login">
              <button type="submit">
                <span>{this.state.loading ? "Loading..." : "SingUp"}</span>
                <i className="fa fa-check"></i>
              </button>
            </div>
          </form>

          <a href="/login" className="pass-forgot">
            Already a member ? Login
          </a>
        </div>
        <div className="overbox"></div>
      </div>
    );
  }
}

export default SingUp;
