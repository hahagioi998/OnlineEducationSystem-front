import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
class AssignSubjectComponent extends Component {

    state = {
        standards: [],
        subjects: [],
        teachers: [],
        stdId: "",
        subId: "",
        id: "",
        teacherStatus: ""
    };

    componentDidMount() {
        HigherAuthorityService.getStandards().then((res) => {
            this.setState({ standards: res.data });
        })
            .catch(error => {
                console.log(error);
            });

        HigherAuthorityService.getSubjects().then((res) => {
            this.setState({ subjects: res.data });
        })
            .catch(error => {
                console.log(error);
            });

        HigherAuthorityService.getAllTeachers().then((res) => {
            this.setState({ teachers: res.data });
        })
            .catch(error => {
                console.log(error);
            });
    }
    changeTeacherStatusHandler = (e) => {
        this.setState({ teacherStatus: e.target.value });
    }
    changeStdIdHandler = (e) => {
        this.setState({ stdId: e.target.value });
    }
    changeSubIdHandler = (e) => {
        this.setState({ subId: e.target.value });
    }
    changeTeacherIdHandler = (e) => {
        this.setState({ id: e.target.value });
    }
    saveRow = (e) => {
        e.preventDefault();
        let newRow = { std_id: this.state.stdId, sub_id: this.state.subId, teacher_id: this.state.id, status: this.state.teacherStatus };
        console.log('New Row => ' + JSON.stringify(newRow))

        HigherAuthorityService.assignStandardSubjectTeacherRole(newRow).then(res => {

            console.log([res.data]);
            alert(res.data);
            this.props.history.push('/ViewAllAllocations');

            // this.props.history.push('/assign-subject-teacher');
        });

    }
    cancel = () => {
        this.props.history.push('/ViewAllAllocations');
    }
    render() {
        return (

            <div class="bimg-1">
                <LogoutNavbar />
                <div className="containers" style={{paddingTop:20,paddingBottom:20}}>
                    <div className="row">
                        <div className="carda col-md-6 offset-md-3 offset-md-3" style={{borderRadius:12}}>
                            <h3 className="text-center">Allocate Subjects and Teachers to Standard</h3>
                            <div className="card-body">
                                <form style={{ margin:0,padding:10}}>

                                    <div className="form-group">
                                        <label>Select Standard : </label>
                                       
                                        <select  name="stdId" className="form-control"
                                         value={this.state.stdId} onChange={this.changeStdIdHandler} >
                                             <option >Select</option>
                                            {this.state.standards.map(option => (
                                                <option key={option.stdId} value={option.stdId}>{option.stdName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Select Subject : </label>
                                        <select name="subId" className="form-control"
                                            value={this.state.subId} onChange={this.changeSubIdHandler} >
                                            <option >Select</option>
                                            {this.state.subjects.map((option) => (
                                                <option key={option.subId} value={option.subId}>{option.subName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Select Teacher : </label>
                                        <select name="id" className="form-control"
                                            value={this.state.id} onChange={this.changeTeacherIdHandler} >
                                            <option >Select</option>
                                            {this.state.teachers.map((option) => (
                                                <option key={option.id} value={option.id}>{option.fullname}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Select Teacher Status : </label>
                                        <select name="teacherStatus" className="form-control"
                                            value={this.state.teacherStatus} onChange={this.changeTeacherStatusHandler} >
                                            <option >Select</option>
                                            <option value="TEACHER">TEACHER</option>
                                            <option value="CLASS_TEACHER">CLASS_TEACHER</option>
                                        </select>
                                    </div>

                                    <button style={{borderRadius:10,fontSize:14}} className="btn btn-success" onClick={this.saveRow}>Save</button>
                                    <button style={{ marginLeft:"10px",borderRadius:10,fontSize:14}} className="btn btn-danger" onClick={this.cancel}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssignSubjectComponent;