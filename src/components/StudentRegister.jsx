import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import TeacherNavBar1 from './Teacher/TeacherNavBar1';

export default class StudentRegister extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        console.log(this.props.match.params.teacherId)
    }
    constructor(props) {
        super(props);
        this.state = {
            teacherId:this.props.match.params.teacherId,
            fullName: '',
            userName: '',
            studentEmail: '',
            parentEmail: '',
            parentMobile: '',
            studentPassword: '',
            rollNo:'',
            std:'',
            errors: {}
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePEmail = this.handleChangePEmail.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeRollNo = this.handleChangeRollNo.bind(this);
        // this.handleChangeStd = this.handleChangeStd.bind(this);
        

        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
        this.detail = this.detail.bind(this);

    }
  
    handleChangeName(e) {
        this.setState({ fullName: e.target.value });
    }
    handleChangeUserName(e) {
        this.setState({ userName: e.target.value });
    }
    handleChangeEmail(e) {

        this.setState({ studentEmail: e.target.value });

    }
    handleChangePEmail(e) {

        this.setState({ parentEmail: e.target.value });

    }

    handleChangeMobile(e) {

        this.setState({ parentMobile: e.target.value });

    }

    handleChangePassword(e) {

        this.setState({ studentPassword: e.target.value });

    }
    
    handleChangeRollNo(e) {

        this.setState({ rollNo: e.target.value });

    }
    
    // handleChangeStd(e) {

    //     this.setState({ std: e.target.value });

    // }
    detail(){
        alert("Registration Successful");
        // console.log(this.props.match.params.teacherId);
        this.props.history.push(`/TeacherNavbar/${this.state.teacherId}`);
    
      } 

    submituserRegistrationForm(e) {

        e.preventDefault();

        if (this.validateForm()) {

            console.log(this.state);

            var apiBaseUrl = "http://localhost:9090/springfox/api/student/register";

            var data = {
                "fullName": this.state.fullName,
                "userName": this.state.userName,
                "studentEmail": this.state.studentEmail,
                "parentEmail": this.state.parentEmail,
                "parentMobile": this.state.parentMobile,
                "studentPassword": this.state.studentPassword,
                "rollNo":this.state.rollNo,
                "std":this.props.match.params.stdId,
                "status":"REGISTER"


            }

            var headers = {

                'Content-Type': 'application/json',

            }

            console.log(data);

            axios.post(apiBaseUrl, data, { headers: headers }).then(function (response) {

                console.log(response);

                alert("Registration Successful");
        // console.log(this.props.match.params.teacherId);
        this.props.history.push(`/TeacherNavbar/${this.state.teacherId}`);
    
                // window.location = "/TeacherNavbar"+"/"+this.props.match.params.teacherId;
                
                // if (response.data.success) {

                //     localStorage.setItem("u_code", encodeURIComponent(JSON.stringify(response.data.data)));

                //     localStorage.setItem('is_done', true);

                //     window.location.href = "/";

                //     console.log("Register successfull");

                // } else {

                //     alert("Registration Successful");

                // }

            }).catch(function (error) {
                alert("Proceed");
                console.log(error);

            });

        }

    }

    validateForm() {

        let errors = {};

        let formIsValid = true;

        if (!this.state.studentEmail) {

            formIsValid = false;

            errors["studentEmail"] = "*Please enter your email-ID.";

        }
        

        if (typeof this.state.studentEmail !== "undefined") {

            //regular expression for email validation

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
 
            if (!pattern.test(this.state.studentEmail)) {

                formIsValid = false;

                errors["studentEmail"] = "*Please enter valid email-ID.";

            }

        }
        if (!this.state.fullName) {
            formIsValid = false;
            errors["fullName"] = "*Please enter your name.";
        }
         if (typeof this.state.fullName !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/); 
            if (!pattern.test(this.state.fullName)) {
                formIsValid = false;
                errors["fullName"] = "*Please enter valid name.";
            }

        }
        if (!this.state.userName) {

            formIsValid = false;

            errors["userName"] = "*Please enter your username.";

        }

        if (typeof this.state.userName !== "undefined") {

          

            var pattern = new RegExp(/[A-Za-z0-9_]+/);
            
            if (!pattern.test(this.state.userName)) {

                formIsValid = false;

                errors["userName"] = "*Please enter valid username.";

            }

        }

        if (!this.state.parentEmail) {

            formIsValid = false;

            errors["parentEmail"] = "*Please enter your email-ID.";

        }

        if (typeof this.state.parentEmail !== "undefined") {

            if (!this.state.parentEmail.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {

                formIsValid = false;

                errors["parentEmail"] = "*Please enter valid email-ID.";

            }

        }

        if (!this.state.parentMobile) {
            formIsValid = false;
            errors["parentMobile"] = "*Please enter  parent mobile no.";
        }
        if (typeof this.state.parentMobile !== "undefined") {
            if (!this.state.parentMobile.match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["parentMobile"] = "*Please enter valid mobile no.";
            }
        }
        
        if (!this.state.rollNo) {
            formIsValid = false;
            errors["rollNo"] = "*Please enter  rollNo.";
        }
        if (typeof this.state.rollNo !== "undefined") {
            if (!this.state.rollNo.match(/^[0-9]/)) {
                formIsValid = false;
                errors["rollNo"] = "*Please enter valid rollNo.";
            }
        }
        // if (!this.state.std) {
        //     formIsValid = false;
        //     errors["std"] = "*Please enter  std";
        // }
        // if (typeof this.state.std !== "undefined") {
        //     if (!this.state.std.match(/^[0-9]/)) {
        //         formIsValid = false;
        //         errors["std"] = "*Please enter valid std";
        //     }
        // }
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

    render() {

        return (

            <div>
                 <TeacherNavBar1 teacherId={this.props.match.params.teacherId}></TeacherNavBar1>

<div class="bg-img">
                    <div className="row" >

                        <div className="col-md-4 login-sec">

                            <h2 className="text-center">Student Registration</h2>

                            <Form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>

                                <FormGroup>

                                    <Label for="examplefullName">Full Name</Label>

                                    <Input type="text" name="fullName" id="fullName" value={this.state.fullName} onChange={this.handleChangeName} placeholder="Enter your  name" />

                                    <div className="errorMsg">{this.state.errors.fullName}</div>

                                </FormGroup>
                                <FormGroup>

                                    <Label for="exampleuserName">User Name</Label>

                                    <Input type="text" name="userName" id="userName" value={this.state.userName} onChange={this.handleChangeUserName} placeholder="Enter your user name" />

                                    <div className="errorMsg">{this.state.errors.userName}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Label for="exampleEmail">Student Email</Label>

                                    <Input type="email" name="studentEmail" id="studentEmail" value={this.state.studentEmail} onChange={this.handleChangeEmail} placeholder="Enter a student email" />

                                    <div className="errorMsg">{this.state.errors.studentEmail}</div>

                                </FormGroup>
                                <FormGroup>

<Label for="exampleEmail">Parent Email</Label>

<Input type="email" name="parentEmail" id="parentEmail" value={this.state.parentEmail} onChange={this.handleChangePEmail} placeholder="Enter a parent's email" />

<div className="errorMsg">{this.state.errors.parentEmail}</div>

</FormGroup>

                                <FormGroup>

                                    <Label for="exampleMobile">Parent Mobile No.</Label>

                                    <Input type="text" name="parentMobile" id="parentMobile" value={this.state.parentMobile} onChange={this.handleChangeMobile} placeholder="Enter a parent's Mobile No." />

                                    <div className="errorMsg">{this.state.errors.parentMobile}</div>

                                </FormGroup>

                                <FormGroup>

                                    <Label for="exampleRollNo">Student Roll No</Label>

                                    <Input type="text" name="rollNo" id="rollNo" value={this.state.rollNo} onChange={this.handleChangeRollNo} placeholder="Enter a rollno" />

                                    <div className="errorMsg">{this.state.errors.rollNo}</div>

                                </FormGroup>
                                <FormGroup>

                                    <Label for="examplestd">Student Std</Label>

                                    <Input type="text" name="std" id="std" value={this.props.match.params.stdId} placeholder="Enter a std" />

                                    <div className="errorMsg">{this.state.errors.std}</div>

                                </FormGroup>



                                <FormGroup>

                                    <Label for="examplePassword">Student Password</Label>

                                    <Input type="password" name="studentPassword" id="studentPassword" value={this.state.studentPassword} onChange={this.handleChangePassword} placeholder="Enter a student password" />

                                    <div className="errorMsg">{this.state.errors.studentPassword}</div>

                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3 teacherdashboard_container">
                                <button class="buttonSubmit">

<span>Submit</span></button>
                                  
                                </div>

                                <div className="mt-4">

                                   
                                   

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