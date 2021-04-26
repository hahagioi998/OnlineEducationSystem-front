import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Table } from 'reactstrap';
import NavBar from './StudentNavBar';


class ScheduledTests extends Component
{
    state={
        onlinetests:[],
        std:'',
        rollNo:'',
        testStatus:'',
        username:"",
        password:""
    }

    componentWillMount()
    {
        console.log(this.props.location)
        const{state} = this.props.location;
        this.setState({
            std: state.std,
            rollNo: state.rollNo,
            username:state.userName,
            password:state.studentPassword

        })

        console.log(state.std)
        const apiBaseUrl=`http://localhost:9090/springfox/api/student/scheduledtest/${state.std}/${state.rollNo}`
        axios.get(apiBaseUrl)
        .then(
            res=>{
                console.log("Data:",res.data);
                this.setState({onlinetests:res.data})
                // this.setState(
                //     {
                //         tests: res.data,
                //     }
                // )
            }
        )
        .catch(
            error => {
                console.log("error Response:",error.response)
                console.log("data:",error.response.data.message);
                alert(error.response.data.message);
                this.props.history.push(`/studentDashBoard/${state.userName}/${state.studentPassword}`);
              
            }
        )
        
        //const URI = `http://localhost:9090/student/teststatus/${state.rollNo}/${this.state.testIdTemp}`
    }
    render()
    {
        let {URI}='';
        return(
            <div className="bimg-1">
                     <NavBar username={this.state.username} password={this.state.password}/>
                <div className="Custom-container">
                        <CardBody className='border border-primary'>
                            {/* <CardText>{this.state.std}</CardText> */}
                            {/* <CardText>{this.state.tests.map(test=><div>{test.subject}</div>)}</CardText> */}
                            {this.state.onlinetests.length!=0 &&
                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th>Test-ID</th>
                                        <th>Subject</th>
                                        <th>Total Questions</th>
                                        <th>Total Marks</th>
                                        <th>Duration (in hrs)</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {renderTestDetails(this.state.tests)} */}
                                    {this.state.onlinetests.map(
                                        test=><tr key={test.testId}>
                                            <td>{test.testId}</td>
                                            <td>{test.subject}</td>
                                            <td>{test.totalQuestions}</td>
                                            <td>{test.totalMarks}</td>
                                            <td>{test.time}</td>
                                            <td>{test.conductedDate}</td>
                                            <td>
                                                {/* {URI=`http://localhost:9090/springfox/api/student/teststatus/${this.state.rollNo}/${test.testId}`}
                                                {axios.get(URI).then(res=>{
                                                    this.setState(
                                                        {
                                                            testStatus: res.data
                                                        }
                                                    )
                                                })} */}
                                                {console.log(this.state.testStatus)}
                                                    <Button color='warning' ><Link to={{pathname:'/AttemptTest', state: this.state, data: test.testId,time: test.time}}>Attempt</Link></Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
    }
                            
                        </CardBody>
                </div>
            </div>
        )
    }
}

export default ScheduledTests;