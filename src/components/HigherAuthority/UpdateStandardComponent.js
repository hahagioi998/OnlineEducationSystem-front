import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';

class UpdateStandardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            stdName: ''
        }
    }
    componentDidMount() {
        HigherAuthorityService.getStandardById(this.state.id).then((res) => {
            let standard = res.data;
            this.setState({
                stdName: standard.stdName
            });
        });
    }
    updateStandard = (e) => {
        e.preventDefault();

        let standard = { stdName: this.state.stdName};
     
        HigherAuthorityService.updateStandard(standard,this.state.id).then( res => {
            this.props.history.push('/viewAllStandards');
        });
    }

    cancelStandard = (e) => {
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
                <div className="containers"  style={{paddingTop:20, paddingBottom:20}}>
                    <div className="row">
                        <div className="carda col-md-6 offset-md-3 offset-md-3" style={{borderRadius:12}}>
                            <h3 className="text-center">Update Standard</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Standard Name</label>
                                        <input placeholder="Standard Name" name="stdName" className="form-control"
                                            value={this.state.stdName} onChange={this.changeHandler} />
                                    </div>
                                    
                                    <button style={{borderRadius:10,fontSize:14}} className="btn btn-success" onClick={this.updateStandard}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancelStandard} style={{ marginLeft:"10px",borderRadius:10,fontSize:14}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} export default UpdateStandardComponent;