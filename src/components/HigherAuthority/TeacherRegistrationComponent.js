import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
import { FaPlusCircle } from "react-icons/fa";

class TeacherRegistrationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: []
        }
        this.addTeacher = this.addTeacher.bind(this);

    }

    componentDidMount() {
        HigherAuthorityService.getAllTeachers().then((res) => {
            this.setState({ teachers: res.data });
        }).catch(error => {
            console.log(error);
        });
    }
    addTeacher() {
        this.props.history.push('/add-teacher')
    }
    render() {
        return (
            <div class="bimg-1">
                <LogoutNavbar />
                <div className="containers"  style={{paddingTop:20, paddingBottom:20}}>
                    <div className="row">
                        <div className="carda col-md-8 offset-md-2 offset-md-2" style={{borderRadius:12}}>
                            <h3 className="text-center">All Teachers</h3>
                            <div className="card-body">
                            

                                <div className="row" style={{paddingBottom:10}}>
                                    <button style={{borderRadius:10,cursor: 'pointer'}} className="btn btn-primary" onClick={this.addTeacher}>Register Teacher <FaPlusCircle/></button>
                                </div>
                                <div className="row">
                                    <table className="table table-striped table-bordered">
                                    <thead className="thead-dark">
                                            <tr>
                                                <th>Id</th>
                                                <th>Teacher Name</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Qualification</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.teachers.map(
                                                    teacher =>
                                                        <tr key={teacher.id}>
                                                            <td>{teacher.id}</td>
                                                            <td>{teacher.fullname}</td>
                                                            <td>{teacher.username}</td>
                                                            <td>{teacher.email}</td>
                                                            <td>{teacher.qualification}</td>

                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

export default TeacherRegistrationComponent; 