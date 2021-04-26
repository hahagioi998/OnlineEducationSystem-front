import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
const initialState={
    stdId:'',
    stdName:'',
    nameError:''
}
class CreateStandardComponent extends Component {
    constructor(props){
        super(props)
        this.state = initialState;
    }
    validate = () =>{
        let nameError = '';
        const regForName = RegExp(/^Standard[_][0-9]+$/);
        if (!regForName.test(this.state.stdName)) {
            nameError = 'Standard must be in format: Standard_{digit}';
        }
        if(!this.state.stdName){
            nameError = 'standard name cannot be blank';
        }
        if(nameError){
            this.setState({nameError});
            return false;
        }
        return true;
    }
    saveStandard = (e) =>{
        e.preventDefault();

        const isValid = this.validate();
        if (isValid) {

            let standard = { stdName: this.state.stdName};
            console.log('standard => ' + JSON.stringify(standard))

            HigherAuthorityService.CreateStandard(standard).then(res => {
                this.props.history.push('/viewAllStandards');
            });

            this.setState(initialState);
        }
    }
        cancel = (e) => {
            this.props.history.push('/viewAllStandards');
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
                <div className="containers" style={{paddingTop:20,paddingBottom:20}}>
                    <div className="row">
                        <div className="carda col-md-6 offset-md-3 offset-md-3" style={{borderRadius:12}}>
                            <h3 className="text-center">Add Standard</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Standard Name</label>
                                        <input placeholder="Standard Name" name="stdName" className="form-control"
                                            value={this.state.stdName} onChange={this.changeHandler} />
                                    </div>
                                    <div style={{ color: 'red' }}>{this.state.nameError}</div>
                                    
                                    <button style={{ borderRadius:10,fontSize:14}} className="btn btn-success" onClick={this.saveStandard}>Save</button>
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

export default CreateStandardComponent;