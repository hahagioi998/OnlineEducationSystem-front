import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';


import { IconContext } from 'react-icons';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import TeacherNavBar from './TeacherNavBar';
import TeacherNavBar1 from './TeacherNavBar1';
import '../../css/teacher.css';
class initialcreatetest extends Component {

  constructor(props) {
    super(props)
    this.state = {

      teacher: [],
      ucount: '',
      count: [],

    }
  }
  componentWillMount() {
    console.log(this.props.match.params.teacherId)

    axios.get('http://localhost:9090/springfox/api/higherAuthority/standardSubjects/teacher' + '/' + this.props.match.params.teacherId).
      then((response) => {
        this.setState({ teacher: response.data });

        this.state.teacher.map(
          (user) => {
            axios.get('http://localhost:9090/springfox/api/teacher/countoftest' + '/' + user.standard.stdName + '/' + user.subject.subName).
              then((response) => {
                this.setState({ ucount: response.data });
                this.state.count.push(this.state.ucount);
              })
            }
        )
      })
  }

  render() {
    return (
      <div  class="vt-img">
        <TeacherNavBar1 teacherId={this.props.match.params.teacherId}></TeacherNavBar1>
        <div  >
        
        <div class="teachertest">
        <br></br>
        <br></br>
        <div  style={{paddingTop:20 ,paddingBottom:20,paddingRight:70,paddingLeft:70}}>
       
     
          
        {this.state.teacher.length != 0 &&
          <table class="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
            <th>CLASS NAME</th>
            <th>SUBJECT NAME</th>
            <th>CREATE TEST</th>
            <th>SCHEDULE LECTURE</th>
         
            
            </tr>
            </thead>
            <tbody>{
              this.state.teacher.map(
                (user) =>
                  <tr>
                    <td>{user.standard.stdName}</td>
                    <td>{user.subject.subName}</td>
                    <td> <a href={"/test" + "/" + this.props.match.params.teacherId + "/" + user.standard.stdId + "/" + user.subject.subName}>create</a></td>

                    <td> <a href={"/sch" + "/" + this.props.match.params.teacherId + "/" + user.standard.stdId + "/" + user.subject.subName}>schedule</a></td>
                  </tr>
              )
            }
            
            </tbody>
            
          </table>
        }
       
       </div>
      </div>
      </div>
      </div>
      
      
    );
  }
}
export default initialcreatetest;