import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import axios from 'axios';
import Navbar from '../Navbar';
import '../../css/stulogin.css';
import Footernew from '../Footernew';

class StudentLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {},
            username: '',
            password: ''

        }
        this.baseState = this.state;
    }

    handleSubmit = (e) => {
        console.log("yess")
        var u = this.state.username;
        var p = this.state.password;
        e.preventDefault();
        var t = this.state.companyId;
        axios.get('http://localhost:9090/springfox/api/student/login' + '/' + this.state.username + '/' + this.state.password).
            then((response) => {
                this.setState({ answer: response.data });
                alert(response.data);

                if (response.data == "Login succesfully") {
                    this.props.history.push(`/studentDashBoard/${u}/${p}`);

                }
            }

            );
        this.setState(this.baseState);
    }

    render() {
        return (
            <div>
                <Navbar />

                <div class="bg-img">

                    <div className="row" data-test="username">

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">STUDENT LOGIN</h2>

                            <Form method="post" name="userRegistrationForm" onSubmit={this.handleSubmit} >

                                <FormGroup>
                                    <Input type="text" name="username" id="exampleusername" value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value }) }} placeholder="&#xf0e0; username" />


                                </FormGroup>

                                <FormGroup>

                                    <Input type="password" name="password" id="examplepassword" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }) }} placeholder="&#xf084; password" />


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
                <Footernew/>
            </div>

        )
    }
}
export default StudentLogin;