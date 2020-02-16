import React, { Component } from "react";
import "./App.css";
import Logo from "./Vector.svg";
import { Route, Link } from 'react-router-dom';


const Login =() => (
  <div>Login</div>
)

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Web extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Неверный адрес электронной почты";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Требуется минимум 6 символов" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };



  

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="image">
          <img src={Logo} />
        </div>
        <div className="form-wrapper">
          <div className="container">
            <button><a href="./Register">Регистратция</a></button>
          </div>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="email">
            <label htmlFor="email">Электронная Почта</label>
            <input
              className={formErrors.email.length > 0 ? "error" : null}
              placeholder="Почта"
              type="email"
              name="email"
              noValidate
              onChange={this.handleChange}
            />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Пароль</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Пароь"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <Link to={"/Register"}><button type="submit">Войти</button></Link>
            </div>
          </form>
        </div>
      </div>

      
    );
  }
}


export default Web;
