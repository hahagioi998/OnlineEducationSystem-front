import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';  
import '../css/login.css';
import Footernew from './Footernew';

export default class AdminLogin extends Component {
    adminData;
    constructor(props) {

        super(props);

        this.state = {

            adminuserName : '',

            adminPassword: '',

            errors: {}

        }


        this.handleChangeUserName = this.handleChangeUserName.bind(this);

        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    }

    handleChangeUserName(e) {

        this.setState({ adminuserName: e.target.value });

    }

   handleChangePassword(e) {

        this.setState({ adminPassword: e.target.value });

    }


    submituserRegistrationForm(e) {

        e.preventDefault();
        localStorage.setItem('admin', JSON.stringify(this.state));


        if (this.validateForm()) {

            console.log(this.state);

            var apiBaseUrl = "http://localhost:9090/springfox/api/admin/login";

            var data = {

                "adminuserName": this.state.adminuserName,

                "adminPassword": this.state.adminPassword

            }

            var headers = {

                'Content-Type': 'application/json',

            }

            console.log(data);

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {
                console.log(response);
                window.location = "/AdminHome";
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

        if (!this.state.adminuserName) {

            formIsValid = false;

            errors["adminuserName"] = "*Please enter your User Name.";

        }

        if (!this.state.adminPassword) {

            formIsValid = false;

            errors["adminPassword"] = "*Please enter your password.";

        }

        

        this.setState({

            errors: errors

        });

        return formIsValid;

    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.adminData = JSON.parse(localStorage.getItem('admin'));
        if (localStorage.getItem('admin')) {
            this.setState({
                adminuserName: this.adminData.adminuserName,
                adminPassword: this.adminData.adminPassword

            })
        } else {
            this.setState({
                adminuserName: '',
                adminPassword: ''
            })

        }


    }

    render() {

        return (
            <div>
               <Navbar />
               <div class="bg-img" data-test="Login">
                    <div className="row" data-test="adminuserName">
                        <div className="col-md-4 login-sec">
                              <h2 className="text-center">ADMIN LOGIN</h2>

                            <Form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >

                                <FormGroup>
                                    <Input type="text" name="adminuserName" id="exampleadminuserName" value={this.state.adminuserName} onChange={this.handleChangeUserName} placeholder="&#xf0e0; adminuserName" />

                                    <div className="errorMsg">{this.state.errors.adminuserName}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Input type="password" name="adminPassword" id="exampleadminPassword" value={this.state.adminPassword} onChange={this.handleChangePassword} placeholder="&#xf084; adminPassword" />

                                    <div className="errorMsg">{this.state.errors.adminPassword}</div>

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
                                       
                                       
                                    </div>

                                </div>

                            </Form>

                        </div>

                        <div className="col-md-8 banner-sec"></div>

                    </div>

                </div>
                <Footernew />
            </div>

        )

    }

}