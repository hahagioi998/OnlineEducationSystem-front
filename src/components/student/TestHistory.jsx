import axios from 'axios';
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle, Table } from 'reactstrap';
import NavBar from './StudentNavBar';

class TestHistoryComponent extends Component
{
    state=
    {
        std:'',
        rollNo:'',
        tests:[],
        username:"",
        password:""
    }

    componentWillMount()
    {
        const{state} = this.props.location;
        console.log(state);
        this.setState({username:state.userName,
            password : state.studentPassword
        })
        const apiBaseUrl=`http://localhost:9090/springfox/api/student/testhistory/${state.std}/${state.rollNo}`
        axios.get(apiBaseUrl)
        .then(res=>
            {
                console.log(res.data)
                this.setState(
                    {
                        tests: res.data,
                        
                    }
                )
            });
    }
    render()
    {
        return(
        <div class="bimg-1">
               <NavBar username={this.state.username} password={this.state.password}/>
            <div className="Custom-container">
                    <CardBody className='border border-primary'>
                        <h2>Your Test History</h2>
                        <br></br>
                        {/* <p>{this.state.tests.map(test=><div>Subject: {test.subject}</div>)}</p> */}
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>TestId</th>
                                    <th>Subject</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                               {renderTests(this.state.tests)}
                            </tbody>
                        </Table>
                    </CardBody>
            </div>
        </div>
        )
    }
}

function renderTests(tests)
{
    return tests.map((test,rollNo)=>{
        const{testId, subject, score} = test;
        return(
            <tr key={rollNo}>
                <td>{testId}</td>
                <td>{subject}</td>
                <td>{score}</td>
            </tr>
        )

    })
}

export default TestHistoryComponent