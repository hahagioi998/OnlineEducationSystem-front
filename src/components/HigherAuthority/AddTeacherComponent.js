import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import LogoutNavbar from '../LogoutNavbar';
export default class AddTeacherComponent extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            email: '',
            qualification: '',
            password: '',
            errors: {}
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeuserName = this.handleChangeuserName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeQualification = this.handleChangeQualification.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    }
    handleChangeName(e) {
        this.setState({ fullname: e.target.value });
    }
    handleChangeuserName(e) {
        this.setState({ username: e.target.value });
    }
    handleChangeEmail(e) {

        this.setState({ email: e.target.value });

    }

    handleChangeQualification(e) {

        this.setState({ qualification: e.target.value });

    }

    handleChangePassword(e) {

        this.setState({ password: e.target.value });

    }

    submituserRegistrationForm(e) {

        e.preventDefault();

        if (this.validateForm()) {

            console.log(this.state);

            var apiBaseUrl = "http://localhost:9090/springfox/api/higherAuthority/teacherRegistration";

            var data = {
                "fullname": this.state.fullname,
                "username": this.state.username,
                "email": this.state.email,
                "qualification": this.state.qualification,
                "password": this.state.password

            }

            var headers = {

                'Content-Type': 'application/json',

            }

            console.log(data);

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {

                console.log(response);
                window.location = "/register-teacher"

                if (response.data.success) {

                    localStorage.setItem("u_code", encodeURIComponent(JSON.stringify(response.data.data)));

                    localStorage.setItem('is_done', true);

                    window.location.href = "/";

                    console.log("Register successfull");

                } else {

                    alert("Registration Successful");

                }

            }).catch(function (error) {
                alert("Given email is already registred");
                console.log(error);

            });

        }

    }

    validateForm() {

        let errors = {};

        let formIsValid = true;


        if (!this.state.username) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }
        if (typeof this.state.username !== "undefined") {
            var pattern = new RegExp(/[A-Za-z0-9_]+/);
            if (!pattern.test(this.state.username)) {
                formIsValid = false;
                errors["username"] = "*Please enter valid username.";

            }
        }

        if (!this.state.fullname) {
            formIsValid = false;
            errors["fullname"] = "*Please enter your name.";
        }
        if (typeof this.state.fullname !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/);
            if (!pattern.test(this.state.fullname)) {
                formIsValid = false;
                errors["fullname"] = "*Please enter valid name.";
            }

        }
        if (!this.state.qualification) {
            formIsValid = false;
            errors["qualification"] = "*Please enter your qualification.";
        }
        if (typeof this.state.qualification !== "undefined") {
            var pattern = new RegExp(/^[a-zA-Z][a-zA-Z\\s]+$/);
            if (!pattern.test(this.state.qualification)) {
                formIsValid = false;
                errors["qualification"] = "*Please enter valid qualification.";

            }

        }
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }
        if (typeof this.state.email !== "undefined") {

            var pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            if (!pattern.test(this.state.email)) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

        if (!this.state.password) {

            formIsValid = false;

            errors["password"] = "*Please enter your password.";

        }

        if (typeof this.state.password !== "undefined") {

            if (!this.state.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {

                formIsValid = false;

                errors["password"] = "*Please enter secure and strong password according to instructions as follows. 1. Atleast 1 letter in UPPERCASE. 2. Include 1or more integers. 3. Include @#$%& ";

            }

        }

        this.setState({

            errors: errors

        });

        return formIsValid;

    }

    render() {

        return (

            <div>
<LogoutNavbar />
<div class="bg-img">

                    <div className="row" >

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">Teacher Registration</h2>

                            <Form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>

                                <FormGroup>

                                    <Label for="exampleName">Full Name</Label>

                                    <Input type="text" name="fullname" id="fullname" value={this.state.fullname} onChange={this.handleChangeName} placeholder="Enter your  name" />

                                    <div className="errorMsg">{this.state.errors.fullname}</div>

                                </FormGroup>
                                <FormGroup>

                                    <Label for="exampleuserName">User Name</Label>

                                    <Input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChangeuserName} placeholder="Enter your user name" />

                                    <div className="errorMsg">{this.state.errors.username}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Label for="exampleEmail">Email</Label>

                                    <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Enter a email" />

                                    <div className="errorMsg">{this.state.errors.email}</div>

                                </FormGroup>
                                <FormGroup>

                                    <Label for="exampleQualification">Qualification</Label>

                                    <Input type="text" name="qualification" id="qualification" value={this.state.qualification} onChange={this.handleChangeQualification} placeholder="Enter a qualification" />

                                    <div className="errorMsg">{this.state.errors.qualification}</div>

                                </FormGroup>



                                <FormGroup>

                                    <Label for="examplePassword">Password</Label>

                                    <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Enter a password" />

                                    <div className="errorMsg">{this.state.errors.password}</div>

                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3 submit_container">
                               

<button class="buttonSubmit">

  <span>Submit</span></button>

                                    

                                </div>



                            </Form>

                        </div>

                        <div className="col-md-8 banner-sec"></div>

                    </div>

                </div>

            </div>

        )

    }

}