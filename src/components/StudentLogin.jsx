import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';  
import '../css/login.css';

export default class StudentLogin extends Component {
    studentData;
    constructor(props) {

        super(props);

        this.state = {

            userName : '',

            studentPassword: '',

            errors: {}

        }


        this.handleChangeUserName = this.handleChangeUserName.bind(this);

        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    }

    handleChangeUserName(e) {

        this.setState({ userName: e.target.value });

    }

   handleChangePassword(e) {

        this.setState({ studentPassword: e.target.value });

    }


    submituserRegistrationForm(e) {

        e.preventDefault();
        localStorage.setItem('student', JSON.stringify(this.state));


        if (this.validateForm()) {

            console.log(this.state);

            var apiBaseUrl = "http://localhost:9090/springfox/api/students/login";

            var data = {

                "userName": this.state.userName,

                "studentPassword": this.state.studentPassword

            }

            var headers = {

                'Content-Type': 'application/json',

            }

            console.log(data);

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {
                console.log(response);
                window.location = "/StudentDashboard";
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

        if (!this.state.userName) {

            formIsValid = false;

            errors["userName"] = "*Please enter your User Name.";

        }

        if (typeof this.state.userName !== "undefined") {

            var pattern = new RegExp(/^[a-zA-Z][a-zA-Z\\s]+$/);

            if (!pattern.test(this.state.userName)) {

                formIsValid = false;

                errors["userName"] = "*Please enter valid User Name.";

            }

        }

        if (!this.state.studentPassword) {

            formIsValid = false;

            errors["studentPassword"] = "*Please enter your password.";

        }

        if (typeof this.state.studentPassword !== "undefined") {

            if (!this.state.studentPassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {

                formIsValid = false;

                errors["studentPassword"] = "*Please enter secure and strong password according to instructions as follows. 1. Atleast 1 letter in UPPERCASE. 2. Include 1or more integers. 3. Include @#$%& ";

            }

        }

        this.setState({

            errors: errors

        });

        return formIsValid;

    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.studentData = JSON.parse(localStorage.getItem('student'));
        if (localStorage.getItem('student')) {
            this.setState({
                userName: this.studentData.userName,
                studentPassword: this.studentData.studentPassword

            })
        } else {
            this.setState({
                userName: '',
                studentPassword: ''
            })

        }


    }

    render() {

        return (


            <div>
               <Navbar />

               <div class="bg-img">

                    <div className="row" data-test="userName">

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">STUDENT LOGIN</h2>

                            <Form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >

                                <FormGroup>
                                    <Input type="text" name="userName" id="exampleuserName" value={this.state.userName} onChange={this.handleChangeUserName} placeholder="&#xf0e0; userName" />

                                    <div className="errorMsg">{this.state.errors.userName}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Input type="password" name="studentPassword" id="examplestudentPassword" value={this.state.studentPassword} onChange={this.handleChangePassword} placeholder="&#xf084; Password" />

                                    <div className="errorMsg">{this.state.errors.studentPassword}</div>

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
                                       
                                        <a className="linka" href="/StudentForgotPassword">Forgot your password?</a>

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