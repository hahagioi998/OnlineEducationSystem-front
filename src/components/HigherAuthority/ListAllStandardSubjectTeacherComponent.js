import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
import {FaTrashAlt,FaAngleDoubleLeft} from "react-icons/fa";
class ListAllStandardSubjectTeacherComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            StdSubTeachers: []
        }
        this.back = this.back.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    deleteRow(id){
        HigherAuthorityService.deleteStdSubAllocation(id).then(res => {
            this.setState({StdSubTeachers:this.state.StdSubTeachers.filter(std =>std.id!=id)});
        });
    }
    back(){
        this.props.history.push('/assign-subject-teacher/');
    }
    componentDidMount() {
        HigherAuthorityService.getAllStdSubTeachers().then((res) => {
            this.setState({ StdSubTeachers: res.data });
            console.log(this.StdSubTeachers);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div class="bimg-1">
                <LogoutNavbar />
                <div className="containers" style={{paddingTop:20, paddingBottom:20}}>
                    <div className="row">
                        <div className="carda col-md-8 offset-md-2 offset-md-2"  style={{borderRadius:12}}>
                            <h3 className="text-center">All Standards Subjects Teachers</h3>
                            <div className="card-body">

                            <form>
                            <div className="form-group">
                                <div className="row">
                                    <table className="table table-striped table-bordered" style={{ margin:0,padding:0}}>
                                    <thead className="thead-dark">
                                            <tr>

                                                <th>Standard Name</th>
                                                <th>Subject Name</th>
                                                <th>Teacher Name</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.StdSubTeachers.map(
                                                    stdsub =>
                                                        <tr key={stdsub.id}>

                                                            <td>{stdsub.standard.stdName}</td>
                                                            <td>{stdsub.subject.subName}</td>
                                                            <td>{stdsub.teacher.fullname}</td>
                                                            <td>{stdsub.status}</td >
                                                            <td>
                                                                <button className="btn btn-danger" style={{ marginLeft:"10px",borderRadius:10,fontSize:13}} onClick={() => this.deleteRow(stdsub.id)}><FaTrashAlt/></button>
                                                                
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                
                            <div className="row">
                            <button style={{ marginLeft: "570px" ,borderRadius:10,fontSize:14}}  className="btn btn-primary" onClick={this.back}><FaAngleDoubleLeft/> Back</button>
                        </div>
                                </form>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListAllStandardSubjectTeacherComponent; 