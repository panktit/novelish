// FRONT END SIGN UP
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import loginImg from "../assets/img/logo.png"
import "../assets/scss/signuplogin.scss";
import axios from 'axios';

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  cnfpassword: "",
  age: "",

  // for errors
  fnameError: "",
  lnameError: "",
  emailError: "",
  passwordLengthError: "",
  passwordMatchError: "",
  ageError: ""
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    console.log("Props in signup: ", this.props);
  }
  state = initialState;
  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate = () => {
    let emailError = "";
    let fnameError = "";
    let lnameError = "";
    let passwordLengthError = "";
    let passwordMatchError = "";
    let ageError = "";
    if (!this.state.first_name) {
        fnameError = "First Name cannot be blank";
    }

    if (!this.state.last_name) {
      lnameError = "Last Name cannot be blank";
    }

    if (!this.state.email.includes("@") && !this.state.email.includes(".")) {
      emailError = "Invalid Email";
    }

    if(this.state.password.length < 8) {
        passwordLengthError = "Password should contain atleast 8 characters"
    }

    if(!(this.state.password === this.state.cnfpassword)) {
        passwordMatchError = "Passwords do not match"
    }
      
    if(!this.state.age || this.state.age < 0 || this.state.age > 120) {
      ageError = "Invalid Age"
    } 

    if (fnameError || lnameError || emailError || passwordLengthError || passwordMatchError || ageError) {
      this.setState({ fnameError, lnameError, emailError, passwordLengthError, passwordMatchError, ageError });
      return false;
    }

    return true;
  };

 
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialState);
      // save the entry in database
      axios.post('http://localhost:4000/user/signup', { first_name: this.state.first_name, 
        last_name: this.state.last_name, 
        email: this.state.email, 
        password: this.state.password,
      })
      .then((result) => {
        this.props.history.push("/login")
      });
    }
  };

  render() {
    return (
      <>
      <div className="App">
        <div className="register">
          <div className="container">
            <form onSubmit={this.handleSubmit} >
              <div className="base-container">
                <div className="content">
                  <div className="image">
                    <img src={loginImg} alt="logo"/>
                  </div>
                  <div className="form">
                    <div className="form-group">
                        <input type="text" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange} />
                        <div style={{ fontSize: 12, color: "red" }}>{this.state.fnameError}</div>
                    </div>
                    <div className="form-group">
                        <input type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleChange} />
                        <div style={{ fontSize: 12, color: "red" }}>{this.state.lnameError}</div>
                    </div>
                    <div className="form-group">
                        <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                        <div style={{ fontSize: 12, color: "red" }}>{this.state.emailError}</div>
                    </div>
                    <div className="form-group">
                      <input type="number" name="age" placeholder="Age" value={this.state.age} onChange={this.handleChange}  />
                      <div style={{ fontSize: 12, color: "red" }}>{this.state.ageError}</div>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password (atleast 8 characters)" value={this.state.password} onChange={this.handleChange} />
                        <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordLengthError}</div>
                    </div>
                    <div className="form-group">
                        <input type="password" name="cnfpassword" placeholder="Confirm Password" value={this.state.cnfpassword} onChange={this.handleChange} />
                        <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordMatchError}</div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                <Button className="submit-btn">
                  Register
                </Button><br/><br/>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
              </div>  
            </form>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default withRouter(Signup);