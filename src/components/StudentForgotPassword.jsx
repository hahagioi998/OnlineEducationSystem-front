import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
class StudentForgotPassword extends Component {
   studentData;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            newPassword: '',
            rePassword:'',
            errors: {}
        }

        this.emailHandler=this.emailHandler.bind(this);
        this.usernameHandler=this.usernameHandler.bind(this);
        this.changeNewPasswordHandler=this.changeNewPasswordHandler.bind(this);
        this.changeRePasswordHandler=this.changeRePasswordHandler.bind(this);
        this.StudentForgotPassword=this.StudentForgotPassword.bind(this);
       
    }

    emailHandler = (event) => {
        this.setState({ email: event.target.value });
    }

    usernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    changeNewPasswordHandler = (event) => {
        this.setState({ newPassword: event.target.value });
    }

    changeRePasswordHandler = (event) => {
        this.setState({ rePassword: event.target.value });
    }

    validateForm() {

        let errors = {};

        let formIsValid = true;

        if (!this.state.email) {

            formIsValid = false;

            errors["email"] = "*Please enter your email-ID.";

        }

        if (typeof this.state.email !== "undefined") {

            //regular expression for email validation

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(this.state.email)) {

                formIsValid = false;

                errors["email"] = "*Please enter valid email-ID.";

            }

        }
        if (!this.state.username) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }
        
        
        if (!this.state.newPassword) {

            formIsValid = false;

            errors["newPassword"] = "*Please enter your password.";

        }

        else if (typeof this.state.newPassword !== "undefined") {

            if (!this.state.newPassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {

                formIsValid = false;

                errors["newPassword"] = "*Please enter secure and strong password.";

            }

        }
        if (!this.state.rePassword) {

            formIsValid = false;

            errors["rePassword"] = "*Please enter your password.";

        }

        else if (typeof this.state.rePassword !== "undefined") {

            if (!this.state.rePassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {

                formIsValid = false;

                errors["newPassword"] = "*Please enter secure and strong password.";

            }

        }

        if (this.state.newPassword !== this.state.rePassword) {
            formIsValid = false;
            errors["notEqual"] = "*Password do not match."
        }

        this.setState({

            errors: errors

        });

        return formIsValid;
    }

    

    StudentForgotPassword(
        e) {
        e.preventDefault();

        if (this.validateForm()) {
            var apiBaseUrl = "http://localhost:9090/springfox/api/students/forgot/"+this.state.newPassword;

            var data = {

                "email": this.state.email,

                "username": this.state.username

            }

            var headers = {

                'Content-Type': 'application/json',

            }

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {
                alert("New Password set successfully");
               
                window.location = "/StudentLogin";
                
            }).catch(function (error) {

               
                alert("Email or Username is incorrect.")
            });
        }
    }

    cancel() {
        this.props.history.push('/StudentLogin');
    }

    render() {
        return (
            
            <div>
                <Navbar />
                <div class="bgg-img">
                    <div className="row">
                        <div className="cardfor col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Forgot Password ?</h3>
                            <div className="cardfor-body">
                                <fieldset>
                                    <form>
                                    <div className="form-group">
                                            <label>Enter email</label>
                                            <input placeholder="Email" type="email"
                                                name="email"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={this.emailHandler} required/>
                                    </div>
                                    <div className="errorMsg">{this.state.errors.email}</div>

                                    <div className="form-group">
                                            <label>Enter user name</label>
                                            <input placeholder="username" type="text"
                                                name="username"
                                                className="form-control"
                                                value={this.state.username }
                                                onChange={this.usernameHandler} required/>
                                    </div>
                                   <div className="errorMsg">{this.state.errors.username}</div>

                                   <div className="form-group">
                                            <label>Enter new password</label>
                                            <input placeholder="New Password" type="password"
                                                name="password"
                                                className="form-control"
                                                value={this.state.newPassword }
                                                onChange={this.changeNewPasswordHandler} required/>
                                    </div>
                                    <div className="errorMsg">{this.state.errors.newPassword}</div>

                                    <div className="form-group">
                                            <label>Re-enter the password</label>
                                            <input placeholder="New Password" type="password"
                                                name="password"
                                                className="form-control"
                                                value={this.state.rePassword}
                                                onChange={this.changeRePasswordHandler} required/>
                                    </div>
                                    <div className="errorMsg">{this.state.errors.rePassword}</div>
                                    <div className="errorMsg">{this.state.errors.notEqual}</div>

                                    <button className="btn btn-success" onClick={this.StudentForgotPassword}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                    </form>
                              </fieldset>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default StudentForgotPassword;