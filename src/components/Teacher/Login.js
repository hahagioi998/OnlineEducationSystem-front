import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import axios from 'axios';
import Navbar from '../Navbar';
import '../../css/login.css';
import Footernew from '../Footernew';

class Login extends Component {
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
        axios.get('http://localhost:9090/springfox/api/higherAuthority/teacherRegistration/login' + '/' + this.state.username + '/' + this.state.password).
            then((response) => {
                this.setState({ answer: response.data });
                console.log(response.data);
                if (response.data) {
                    this.setState({ answer1: "Login Successfully" })
                    console.log(this.state.answer1);
                    axios.get('http://localhost:9090/springfox/api/higherAuthority/teacherRegistration/getbyup' + '/' + u + '/' + p).
                        then((response) => {
                            this.setState({ teacher: response.data });
                            console.log(response.data)
                            alert("Login Successfully!!")
                            var id = this.state.teacher.id;
                            this.props.history.push(`/TeacherNavbar/${id}`);
                        })
                }
                else {
                    alert("Incorrect Username or password... ")
                }
            }

            );

        // if(true){

        this.setState(this.baseState);
    }

    render() {
        return (
            //   <div class="bg-img">

            //   <div className = "card-body">
            //    <div  box-sizing= "border-box">
            //     <h2 style={{color:"white"}}> Login </h2>
            //     <br></br>
            //     <br></br>
            //     <form method="POST" onSubmit={this.handleSubmit} >
            //     <label>
            //     <div>
            //     <p class="text-center" class="text-white"><b>USERNAME</b></p>

            //           <input

            //             value={this.state.companyId}
            //             className="form-control"
            //             onChange={(event)=>{this.setState({username:event.target.value})}}
            //             Placeholder="username"


            //           />
            //         </div>
            //         <div>

            //         <p class="text-center" class="text-white"><b>PASSWORD</b></p>
            //         <input
            //         type="password"
            //           name="password"

            //           value={this.state.password}
            //           className="form-control"
            //           onChange={(event)=>{this.setState({password:event.target.value})}}
            //           Placeholder="password"


            //         />
            //       </div>

            //   </label>
            //   <p></p>
            //   <p>

            //   <button class="btn btn-primary"  hover opacity="1">Log in</button>
            //   </p>
            //   <p style={{color:"white"}}>{this.state.answer1}</p>


            //   <h4 style={{color:"white"}}>New User??? </h4>
            //   <a class="white-link" href="/cregister"><b>Click here for Registration</b></a>

            //  <br></br>
            //   <br></br>
            //   <br></br>

            //   <a class="white-link" href="/forgot"><b>Forgot password????</b></a>


            //   </form>



            //     </div>
            //     </div>
            //     </div>



            <div>
                <Navbar />

                <div class="bg-img">

                    <div className="row" data-test="username">

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">TEACHER LOGIN</h2>

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

                                        <a className="linka" href="/TeacherForgotPassword">Forgot your password?</a>

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
export default Login;