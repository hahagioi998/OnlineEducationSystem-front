import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
class UpdateSubjectComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            subName: ''
        }
    }
    componentDidMount() {
        HigherAuthorityService.getSubjectById(this.state.id).then((res) => {
            let subject = res.data;
            this.setState({
                subName: subject.subName
            });
        });
    }
    updateSubject = (e) => {
        e.preventDefault();

        let subject = { subName: this.state.subName};
     
        HigherAuthorityService.updateSubject(subject,this.state.id).then( res => {
            this.props.history.push('/viewAllSubjects');
        });
    }

    cancelSubject = (e) => {
        this.props.history.push('/viewAllSubjects');
    }
    changeHandler = (event) => {
        const isCheckedbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckedbox
                ? event.target.isChecked
                : event.target.value
        });
    };


    render() {
        return (
            <div class="bimg-1">
                <LogoutNavbar/>
                <div className="containers">
                    <div className="row">
                        <div className="carda col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Subject</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Subject Name</label>
                                        <input placeholder="Subject Name" name="subName" className="form-control"
                                            value={this.state.subName} onChange={this.changeHandler} />
                                    </div>
                                    
                                    <button className="btn btn-success" onClick={this.updateSubject}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancelSubject} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} export default UpdateSubjectComponent;