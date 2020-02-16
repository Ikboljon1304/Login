import React, { Component } from "react";
import "./App.css";
import Logo from "./Vector.svg";
import Login from './Login';
import { Route, Link } from 'react-router-dom';


const Register =() => (
  <div>Register</div>
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


class Reg extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "User" };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
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
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    alert("You are in Adminstration page" + this.state.value);
    e.preventDefault();
  };




  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "Требуется минимум 3 символа" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "Требуется минимум 3 символа" : "";
        break;
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
    this.setState({ value: e.target.value });
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
                <button><a href="./Login">Войти</a></button>
            </div>
          <form onSubmit={this.handleSubmit}>
            <div className="firstName">
              <label htmlFor="firstName">Имя</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="Имя"
                type="text"
                name="firstName"
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Фамилия</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Фамилия"
                type="text"
                name="lastName"
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Электронная Почта</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Почта"
                type="email"
                name="email"
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
                placeholder="Пароль"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <Link to={"/Login"}><button type="submit">Регистратция</button></Link>
            </div>
          </form>
        </div>
      </div>

      
    );
  }
}


export default Reg;