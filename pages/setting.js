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
    if (this.props.resProfile.status === 200) {
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
              this.props.resProfile.status === 200
                ? this.updateCompany
                : this.createCompany
            }
            ref={c => {
              this.form = c;
            }}
          >
            <h3>
              {this.props.resProfile.status === 200
                ? "Update Company"
                : "Create Company"}
            </h3>
            
          </Form>
        </div>
        
      </Layout>
    );
  }
}

export default Setting;
