import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
import { FaUserEdit,FaPlusCircle } from "react-icons/fa";

class ListAllSubjectsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjects: []
        }
        this.addSubject = this.addSubject.bind(this);
        this.editSubject = this.editSubject.bind(this);
    }

    componentDidMount() {
        HigherAuthorityService.getSubjects().then((res) => {
            this.setState({ subjects: res.data });
        }).catch(error => {
            console.log(error);
        });
    }
    addSubject() {
        this.props.history.push('/add-subject')
    }
    editSubject(id) {
        this.props.history.push(`/update-subject/${id}`);
    }

    render() {
        return (
            <div class="bimg-1">
                <LogoutNavbar />
                <div className="containers"  style={{paddingTop:20,paddingBottom:20}}>
                    <div className="row">
                        <div className="carda col-md-6 offset-md-3 offset-md-3" style={{borderRadius:12}}>
                            <h3 className="text-center">All Subjects</h3>
                            <div className="card-body">

                            <div className="row"  style={{paddingBottom:10}}>
                                    <button style={{borderRadius:10,cursor: 'pointer'}} className="btn btn-primary" onClick={this.addSubject}>Add Subject <FaPlusCircle/></button>
                                </div>
                                <div className="row">
                                    <table className="table table-striped table-bordered" style={{ margin:0,padding:0}}>
                                    <thead className="thead-dark" >
                                            <tr>
                                                <th>Id</th>
                                                <th>Subject Name</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.subjects.map(
                                                    subject =>
                                                        <tr key={subject.subId}>
                                                            <td>{subject.subId}</td>
                                                            <td>{subject.subName}</td>
                                                            <td>

                                                                <button style={{ marginLeft:"10px",borderRadius:10,fontSize:14}} onClick={() => this.editSubject(subject.subId)} className="btn btn-info">Edit <FaUserEdit/></button>

                                                            </td>
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
            </div>

        );
    }
}

export default ListAllSubjectsComponent; 