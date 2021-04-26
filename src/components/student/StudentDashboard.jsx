import axios from 'axios';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import NavBar from '../student/StudentNavBar'
let data = localStorage.getItem('student');
data = JSON.parse(data);


class StudentDashboard extends Component
{
    state = {
        fullName:'',
        rollNo:'',
        std:'',
        studentEmail:''
    };

    componentDidMount()
    {

        axios.get(
            'http://localhost:9090/springfox/api/student/details/' + this.props.match.params.username +'/'+ this.props.match.params.password)
        .then(res=>{
            console.log("Student:",res.data)
            this.setState(
                {
                    fullName: res.data.fullName, 
                    rollNo: res.data.rollNo,
                    std: res.data.std,
                    studentEmail: res.data.studentEmail
                }
            )
        })
    }
    render(){    
    return (
            <div>
                 <div class="bimg-1">
                <NavBar username={this.props.match.params.username} password={this.props.match.params.password}/>
                <main>
                    <section className = 'Custom-container'>
                        <div>
                            
                        </div>
                            
                            <div >
                                
                                <div className='border border-primary'>
                                    <CardBody>
                                    <h1>Student Details</h1>
                                    <h4>UserName: {this.props.match.params.username}</h4>
                                        <h4>Student Name: {this.state.fullName}</h4>
                                        <h4>Roll No: {this.state.rollNo}</h4>
                                        <h4>Class: {this.state.std}</h4>
                                        <h4>Student Email: {this.state.studentEmail}</h4>
                                    </CardBody>
                                </div>
                            </div>
                    </section>
                </main>
            </div>
            </div>
        )
    }
}
export default StudentDashboard;