import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
const initialState={
    subId:'',
    subName:'',
    nameError:''
}
class CreateSubjectComponent extends Component {
    constructor(props){
        super(props)
        this.state = initialState;
    }
    validate = () =>{
        let nameError = '';
        
        const regForName = RegExp(/^[A-Z]*$/);
        if (!regForName.test(this.state.subName)) {
            nameError = 'Subject Name must contains only capital characters';
        }
        if(!this.state.subName){
            nameError = 'Subject name cannot be blank';
        }
        if(nameError){
            this.setState({nameError});
            return false;
        }
        return true;
    }
    saveSubject = (e) =>{
        e.preventDefault();

        const isValid = this.validate();
        if (isValid) {

            let subject = { subName: this.state.subName};
            console.log('subject => ' + JSON.stringify(subject))

            HigherAuthorityService.CreateSubject(subject).then(res => {
                this.props.history.push('/viewAllSubjects');
            });

            this.setState(initialState);
        }
    }
        cancel = (e) => {
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
                <LogoutNavbar />
                <div className="containers"  style={{paddingTop:20,paddingBottom:20}}>
                    <div className="row">
                        <div className="carda col-md-6 offset-md-3 offset-md-3" style={{borderRadius:12}}>
                            <h3 className="text-center">Add Subjects</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Subject Name</label>
                                        <input placeholder="Subject Name" name="subName" className="form-control"
                                            value={this.state.subName} onChange={this.changeHandler} />
                                    </div>
                                    <div style={{ color: 'red' }}>{this.state.nameError}</div>
                                    
                                    <button style={{borderRadius:10,fontSize:14}} className="btn btn-success" onClick={this.saveSubject}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft:"10px",borderRadius:10,fontSize:14}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateSubjectComponent;