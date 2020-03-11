import React from "react";
import Layout from "../layout";
import "../styles/page.scss";
import { getProfile, createCompany, updateProfile } from "../services/auth";
import { required, email } from "../utils/validate";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Noty from "noty";
import Modal from "@material-ui/core/Modal";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        name: "",
        username: "",
        email_address: "",
        phone_number: "",
        contact_person: "",
        shop_url: "",
        password: ""
      },
      password: {
        current_password: "",
        new_password: "",
        confirm_new_password: ""
      },
      re_password: "",
      loading: false,
      openModal: false,
      mloading: false
    };
  }
  static async getInitialProps({ req, query }) {
    let resProfile = null;
    const res = await getProfile(query.shopUrl);
    if (res != undefined) {
      resProfile = res.data;
    }
    return { query, resProfile };
  }

  componentDidMount() {
    if (this.props.resProfile && this.props.resProfile.status === 200) {
      const data = this.props.resProfile.data;
      const phone = data.phoneNumber.trim();
      this.setState({
        company: {
          ...this.state.company,
          name: data.name,
          username: data.username,
          email_address: data.emailAddress,
          phone_number: phone,
          contact_person: data.contactPerson,
          shop_url: data.shopUrl,
          password: data.currentPassword
        }
      });
      // console.log(this.props.resProfile.data);
    }
  }

  changeValue = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      company: {
        ...this.state.company,
        [name]: value
      }
    });
  };

  changPass = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      password: {
        ...this.state.password,
        [name]: value
      }
    });
  };

  createCompany = async event => {
    event.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({
        loading: true
      });
      const res = await createCompany(this.state.company);
      if (res.data.status === 200) {
        this.updateProfile();
        this.setState({
          loading: false
        });
        return new Noty({
          type: "success",
          layout: "topRight",
          text: res.data.message,
          timeout: 3000
        }).show();
      } else {
        this.setState({
          loading: false
        });
        return new Noty({
          type: "error",
          layout: "topRight",
          text: "Can't create company",
          timeout: 3000
        }).show();
      }
    }
  };

  updateProfile = async e => {
    const profile = await getProfile(this.props.query.shopUrl);
    const data = profile.data;
    const phone = data.phoneNumber.trim();
    if (profile.status === 200) {
      this.setState({
        company: {
          ...this.state.company,
          name: data.name,
          username: data.username,
          email_address: data.emailAddress,
          phone_number: phone,
          contact_person: data.contactPerson,
          shop_url: data.shopUrl,
          password: data.currentPassword
        }
      });
    }
  };

  updateCompany = async e => {
    e.preventDefault();
    this.form.validateAll();

    const data = this.props.resProfile.data;
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({
        loading: true
      });
      const params = {
        name: this.state.company.name,
        username: this.state.company.username,
        email_address: this.state.company.email_address,
        phone_number: this.state.company.phone_number,
        contact_person: this.state.company.contact_person,
        shop_url: this.state.company.shop_url,
        current_password: this.state.company.password
      };
      const res = await updateProfile(data.username, params);

      if (res.data.status === 200) {
        this.updateProfile();
        this.setState({
          loading: false
        });
        return new Noty({
          type: "success",
          layout: "topRight",
          text: res.data.message,
          timeout: 3000
        }).show();
      } else {
        this.setState({
          loading: false
        });
        return new Noty({
          type: "error",
          layout: "topRight",
          text: "Can't update company",
          timeout: 3000
        }).show();
      }
    }
  };

  submitPass = async e => {
    e.preventDefault();
    this.form.validateAll();
    const data = this.props.resProfile.data;
    if (
      this.checkPass.context._errors.length === 0 &&
      this.state.password.new_password ===
        this.state.password.confirm_new_password
    ) {
      this.setState({
        mloading: true
      });
      const params = {
        name: this.state.company.name,
        username: this.state.company.username,
        email_address: this.state.company.email_address,
        phone_number: this.state.company.phone_number,
        contact_person: this.state.company.contact_person,
        shop_url: this.state.company.shop_url,
        current_password: this.state.password.current_password,
        new_password: this.state.password.new_password,
        confirm_new_password: this.state.password.confirm_new_password
      };
      const res = await updateProfile(data.username, params);
      if (res.data.status === 200) {
        this.updateProfile();
        this.setState({
          mloading: false,
          openModal: false,
          password: {
            current_password: "",
            new_password: "",
            confirm_new_password: ""
          }
        });
        return new Noty({
          type: "success",
          layout: "topRight",
          text: res.data.message,
          timeout: 3000
        }).show();
      } else {
        this.setState({
          mloading: false
        });
        return new Noty({
          type: "error",
          layout: "topRight",
          text: "Password Incorrect",
          timeout: 3000
        }).show();
      }
    }
  };

  validPass = () => {
    const { new_password, confirm_new_password } = this.state.password;
    if (new_password !== confirm_new_password) {
      return <span>Password incorrect</span>;
    }
  };

  // onClose = () =>

  render() {
    return (
      <Layout>
        <div className="form-setting">
          <Form
            onSubmit={
              this.props.resProfile && this.props.resProfile.status === 200
                ? this.updateCompany
                : this.createCompany
            }
            ref={c => {
              this.form = c;
            }}
          >
            <h3>
              {this.props.resProfile && this.props.resProfile.status === 200
                ? "Update Company"
                : "Create Company"}
            </h3>
            <Input
              name="name"
              placeholder="Name"
              type="text"
              autoFocus
              value={this.state.company.name}
              onChange={this.changeValue}
              validations={[required]}
            />
            <Input
              name="username"
              placeholder="Username"
              type="text"
              value={this.state.company.username}
              onChange={this.changeValue}
              validations={[required]}
              disabled={this.props.resProfile && this.props.resProfile.status === 200 ? true : false}
            />

            <Input
              name="email_address"
              placeholder="Email"
              type="email"
              value={this.state.company.email_address}
              onChange={this.changeValue}
              validations={[required, email]}
            />
            <Input
              name="phone_number"
              placeholder="Phone Number"
              type="number"
              value={this.state.company.phone_number}
              onChange={this.changeValue}
              validations={[required]}
            />

            <Input
              name="contact_person"
              placeholder="Contact Person"
              type="text"
              value={this.state.company.contact_person}
              onChange={this.changeValue}
              validations={[required]}
            />
            <Input
              name="shop_url"
              placeholder="Shop url"
              type="text"
              value={this.state.company.shop_url}
              onChange={this.changeValue}
              validations={[required]}
            />

            {this.props.resProfile && this.props.resProfile.status !== 200 && (
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.company.password}
                onChange={this.changeValue}
                validations={[required]}
              />
            )}
            {this.props.resProfile && this.props.resProfile.status !== 200 && (
              <Input
                name="re_password"
                placeholder="Comfirm Password"
                type="password"
                value={this.state.re_password}
                onChange={e => this.setState({ re_password: e.target.value })}
                validations={[required]}
              />
            )}

            {this.props.resProfile && this.props.resProfile.status === 200 && (
              <React.Fragment>
                <button type="submit">
                  {this.state.loading ? "Loading..." : "Save"}
                </button>
                <a onClick={() => this.setState({ openModal: true })}>
                  Change your password
                </a>
              </React.Fragment>
            )}
            {this.props.resProfile && this.props.resProfile.status !== 200 && (
              <button type="submit">
                {this.state.loading ? "Loading..." : "Create"}
              </button>
            )}

            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
        >
          <div className="modal">
            <h4 id="simple-modal-title">Change your password</h4>
            <Form onSubmit={this.submitPass}>
              <Input
                name="current_password"
                placeholder="Current Password"
                type="password"
                autoFocus
                onChange={this.changPass}
                validations={[required]}
              />
              <Input
                name="new_password"
                placeholder="New Password"
                type="password"
                onChange={this.changPass}
                validations={[required]}
              />
              <Input
                name="confirm_new_password"
                placeholder="Confirm New Password"
                type="password"
                onChange={this.changPass}
                validations={[required, this.validPass]}
              />
              <button type="submit">
                {this.state.mloading ? "loading..." : "Save"}
              </button>
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkPass = c;
                }}
              />
            </Form>
          </div>
        </Modal>
      </Layout>
    );
  }
}

export default Setting;
