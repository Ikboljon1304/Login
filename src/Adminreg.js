import React, { Component } from "react";
import "./App.css";
import Logo from "./Vector.svg";



const AdRegister =() => (
  <div>AdRegister</div>
)

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


class AdReg extends Component {

    
  constructor(props) {
      
    super(props);
    this.state = { value: "Admin" };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: null,
      password1: null,
      password2: null,
      formErrors: {
        email: "",
        password1: "",
        password2: ""
      }
    };
  }

  

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password1: ${this.state.password1}
        Password2: ${this.state.password2}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    alert("Вы находитесь на странице администратора.");
    e.preventDefault();
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
      case "password1":
        formErrors.password1 =
          value.length < 6 ? "Требуется минимум 6 символов" : "";
        break;
      case "password2":
        formErrors.password2 =
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
          <div className="header">
              <h1>Задайте электронную почту и пароль для администратора системы</h1>
          </div>


            <label className="option">
                <select className="choose"  value={this.state.value} onChange={this.handleChange}>
                  <option value="Admin">Администратор</option>
                </select>
            </label>


          <form name ="f" onSubmit={this.handleSubmit}>



            <div className="email">
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Электронная Почта"
                type="email"
                name="email"
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>



            <div className="password1">
              <input
                className={formErrors.password1.length > 0 ? "error" : null}
                placeholder="Введите пароль"
                type="password"
                name="password1"
                onChange={this.handleChange}
              />
              {formErrors.password1.length > 0 && (
                <span className="errorMessage">{formErrors.password1}</span>
              )}
            </div>



            <div className="password2">
              <input
                className={formErrors.password2.length > 0 ? "error" : null}
                placeholder="Повторите пароль"
                type="password"
                name="password2"
                onChange={this.handleChange}
              />
              {formErrors.password2.length > 0 && (
                <span className="errorMessage">{formErrors.password2}</span>
              )}
            </div>



            <div className="createAccount">
              <button type="submit" value="checkpassword" onClick="checkpassword()">Применить и войти</button>
            </div>
          </form>
        </div>
      </div>

      
    );
  }
}


export default AdReg;