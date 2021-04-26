import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';  
import '../css/login.css';
export default class TeacherLogin extends Component {
    teacherData;
    constructor(props) {

        super(props);

        this.state = {

            username : '',

            password: '',

            errors: {}

        }


        this.handleChangeUserName = this.handleChangeUserName.bind(this);

        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    }

    handleChangeUserName(e) {

        this.setState({ username: e.target.value });

    }

   handleChangePassword(e) {

        this.setState({ password: e.target.value });

    }


    submituserRegistrationForm(e) {

        e.preventDefault();
        localStorage.setItem('teacher', JSON.stringify(this.state));


        if (this.validateForm()) {

            console.log(this.state);

            var apiBaseUrl = "http://localhost:9090/springfox/api/higherAuthority/teacherRegistration/login";

            var data = {

                "username": this.state.username,

                "password": this.state.password

            }

            var headers = {

                'Content-Type': 'application/json',

            }

            console.log(data);

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {
                console.log(response);
                window.location = "/teacherdashboard";
                if (response.data.success) {
                    console.log("Login successfull");

                } else {

                    alert("Success");

                }

            }).catch(function (error) {

                console.log(error);

            });

        }

    }


    validateForm() {

        let errors = {};

        let formIsValid = true;

        if (!this.state.username) {

            formIsValid = false;

            errors["username"] = "*Please enter your User Name.";

        }

        if (!this.state.password) {

            formIsValid = false;

            errors["password"] = "*Please enter your password.";

        }



        this.setState({

            errors: errors

        });

        return formIsValid;

    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.teacherData = JSON.parse(localStorage.getItem('teacher'));
        if (localStorage.getItem('teacher')) {
            this.setState({
                username: this.teacherData.username,
                password: this.teacherData.password

            })
        } else {
            this.setState({
                username: '',
                password: ''
            })

        }


    }

    render() {

        return (


            <div>
               <Navbar />

               <div class="bg-img">

                    <div className="row" data-test="username">

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">TEACHER LOGIN</h2>

                            <Form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >

                                <FormGroup>
                                    <Input type="text" name="username" id="exampleusername" value={this.state.username} onChange={this.handleChangeUserName} placeholder="&#xf0e0; username" />

                                    <div className="errorMsg">{this.state.errors.username}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Input type="password" name="password" id="examplepassword" value={this.state.password} onChange={this.handleChangePassword} placeholder="&#xf084; password" />

                                    <div className="errorMsg">{this.state.errors.password}</div>

                                </FormGroup>

                                <FormGroup check>

                                    <Label check>

                                        <Input type="checkbox" />{' '}Remember Me
                                    </Label>

                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3 login_container" >

                                    <Button type="submit" className="btn btn-login">Login</Button>

                                </div>

                                <div className="mt-4">

                                    

                                    <div className="d-flex justify-content-center links">

                                        <a className="linka" href="/TeacherForgotPassword">Forgot your password?</a>

                                    </div>

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