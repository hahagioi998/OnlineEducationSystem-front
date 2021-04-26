import axios from 'axios';
import React, { Component } from 'react';
import { Card, CardBody, Table } from 'reactstrap';
import NavBar from './StudentNavBar';

var today = new Date();
class ViewTimetable extends Component
{
    state={
        std:'',
        date: today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
        lecture:[],
        username:"",
        password:""

    }
    componentWillMount()
    {
        
        const{state} = this.props.location
        console.log(this.props.location)
        const apiBaseUrl = `http://localhost:9090/springfox/api/schedule/get/${state.std}/${this.state.date}`
        this.setState({username:state.userName})
        this.setState({password:state.studentPassword})
        axios.get(apiBaseUrl)
        .then(res=>
            {
            console.log(res.data)
            this.setState(
                {
                    lecture: res.data
                }
            )
        });
    }
    render()
    {
       
        return(
        <div class="bimg-1">
            <div>
            
                <NavBar username={this.state.username} password={this.state.password}/>
                </div>
            <main>
            <section className='Customs-container'>
            <div className='border border-primary'>
                <CardBody>
                    <h1>Your Timetable for Date: {this.state.date}</h1>
                    <br></br>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Subject</th>
                                <th>Faculty</th>
                                <th>Lecture Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderLectures(this.state.lecture)}
                        </tbody>
                    </Table>
                </CardBody>
            </div>
            </section>
            </main>
        </div>
    )}

}

function renderLectures(lecture)
{
    return lecture.map((lectures, std)=>{
        const{time, subject, teacherName, lectureLink} = lectures;
        return(
            <tr key={std}>
                <td>{time}</td>
                <td>{subject}</td>
                <td>{teacherName}</td>
                <td>
                <a href={lectureLink}>{lectureLink}</a></td>
            </tr>
        )
    })
}

export default ViewTimetable;