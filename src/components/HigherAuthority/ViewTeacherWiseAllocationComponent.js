import React, { Component } from 'react';
import HigherAuthorityService from '../../services/HigherAuthorityService';
import LogoutNavbar from '../LogoutNavbar';
import '../../css/admin.css';
class ViewTeacherWiseAllocationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            stdSub: []
        }
        this.back = this.back.bind(this);
    }

    back(){
        this.props.history.push('/ViewTeacherWise/');
    }
    componentDidMount() {
        HigherAuthorityService.getAllByTeacherId(this.state.id).then(res => {
            this.setState({ stdSub: res.data });
        })
        console.log(this.state.id);
    }

    render() {
        return (
            <div class="bimg-1">
                <LogoutNavbar />
                <div className="containers" style={{paddingTop:20 ,paddingBottom:20}}>

                <div className="carda col-md-6 offset-md-3 card-view" style={{borderRadius:12}}>
                    <h3 className="text-center mt-4">View Teacher Wise Standard And Subjects</h3>
                    <div className="card-body">
                        
                        <div className="row" >
                            <table className="table" style={{ margin:0,padding:0}}>
                                <thead className="thead-dark">
                                    <tr>
                                        
                                        <th>Standards</th>
                                        <th>Subjects</th>
                                        <th>Teacher Name</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>


                                <tbody>
                                    {
                                        this.state.stdSub.map(
                                            stdsub1 =>
                                                <tr key={stdsub1.id}>
                                                    
                                                    <td>{stdsub1.standard.stdName}</td>
                                                    <td>{stdsub1.subject.subName}</td>
                                                    <td>{stdsub1.teacher.fullname}</td>
                                                    <td>{stdsub1.status}</td >

                                                </tr>
                                        )
                                    }
                                </tbody>


                            </table>
                        </div>
                        <div className="row">
                            <button style={{ marginLeft:"450px",borderRadius:10,fontSize:14}}  className="btn btn-primary" onClick={this.back}>Back</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default ViewTeacherWiseAllocationComponent;