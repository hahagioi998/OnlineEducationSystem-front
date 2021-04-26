import axios from 'axios';
import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
class ViewTeacherWiseAllocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newId: this.props.match.params.id,
            stdSub: [],
            teachers: [],
            id: ""
        }

        this.viewRow = this.viewRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {


        HigherAuthorityService.getAllTeachers().then((res) => {
            this.setState({ teachers: res.data });
        })
            .catch(error => {
                console.log(error);
            });

    }
    handleChange(e) {
        this.setState({ id: e.target.value });
    }


    viewRow(id) {

        this.props.history.push(`/view-teacherwise/${id}`);
    }
    cancel = () => {

    }
    render() {
        return (
            <div class="bimg-1">
                <LogoutNavbar />
                <div className="containers" style={{paddingTop:20}}>
                    <div className="row">
                        <div className="carda col-md-6 offset-md-3 offset-md-3" style={{borderRadius:12}}>
                            <h3 className="text-center">View Teacher Wise Standard And Subject</h3>
                            <div className="card-body">
                                <form style={{ margin:0,padding:10}}>
                                    <div className="form-group">
                                        <label>Select Teacher : </label>
                                        <select name="id" id="" className="form-control" value={this.state.id} onChange={this.handleChange}>
                                            <option >Select</option>
                                            {this.state.teachers.map((option) => (
                                                <option key={option.id} value={option.id}>{option.fullname}

                                                </option>
                                            ))}

                                        </select>
                                        <button style={{ margin: "10px" }} onClick={() => this.viewRow(this.state.id)} className="btn btn-info">View</button>
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

export default ViewTeacherWiseAllocation;