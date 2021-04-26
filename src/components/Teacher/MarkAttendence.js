
import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useParams } from 'react-router-dom';
import '../../css/teacher.css';
import axios from 'axios';
import TeacherNavBar1 from './TeacherNavBar1';
class MarkAttendence extends Component {

  constructor(props) {
    super(props)
    this.state = {

      teacher: [],
      lectures: [],
      ucount: '',
      count: [],

    }
  }
  componentWillMount() {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    console.log(this.props.match.params.teacherId)

    axios.get('http://localhost:9090/springfox/api/schedule/getbyteacherid' + '/' + this.props.match.params.teacherId + '/' + date).
      then((response) => {
        this.setState({ lectures: response.data });
      })

    axios.get('http://localhost:9090/springfox/api/higherAuthority/standardSubjects/teacher' + '/' + this.props.match.params.teacherId).
      then((response) => {
        this.setState({ teacher: response.data });
      })
  }

  render() {
    return (
      <div class="at-img">
        
 <TeacherNavBar1 teacherId={this.props.match.params.teacherId}></TeacherNavBar1>

        <br></br>
        <br></br>
        <div  style={{paddingTop:20 ,paddingBottom:20,paddingRight:70,paddingLeft:70}} >
        
        {this.state.lectures.length != 0 &&
          <table class="table table-striped table-bordered table-hover" >

<thead className="thead-dark">
  <tr>

            <th>STANDARD</th>
            <th>SUBJECT</th>
            <th>LECTURE LINK</th>
            <th>TIME</th>
            <th>MARK ATTENDANCE</th>

            
            </tr>
            </thead>

            <tbody>{


              this.state.lectures.map(
                (user) =>
                  <tr>

                    <td style={{color:"white"}}>{user.standard}</td>
                    <td style={{color:"white"}}>{user.subject}</td>
                    <td style={{color:"white"}}><a href={user.lectureLink}>{user.lectureLink}</a></td>
                    <td style={{color:"white"}}>{user.time}</td>
                  <a href={"/markattendance" + "/" + this.props.match.params.teacherId + "/" + user.standard + "/" + user.subject}>attendance</a>


                  </tr>


              )
            }

            </tbody>




          </table>

        }
        </div>
        
      

        {this.state.lectures.length == 0 &&
          <div>
             <div class="d-flex justify-content-center">
            <h4 class="text-light"><i>No Lectures Schedule for today to mark attendance, u can view attendane ---</i></h4>
           </div> 
           <br></br>
            <br></br>
            <div  style={{paddingTop:20 ,paddingBottom:20,paddingRight:70,paddingLeft:70}}>
        
            <table class="table table-striped table-bordered table-hover">


            <thead className="thead-dark">
             <tr>
              <th>CLASS NAME</th>
              <th>SUBJECT NAME</th>

              <th>VIEW ATTENDANCE</th>
            </tr>
            </thead>


              <tbody>{


                this.state.teacher.map(
                  (user) =>
                    <tr>

                      <td  style={{color:"white"}}>{user.standard.stdId}</td>
                      <td style={{color:"white"}}>{user.subject.subName}</td>
                      <td style={{color:"white"}}> <a href={"/viewattendance" + "/" + this.props.match.params.teacherId + "/" + user.standard.stdId + "/" + user.subject.subName}>view attendance</a></td>

                    </tr>


                )
              }

              </tbody>
            </table>
          </div>
          </div>
        
        }
       

      </div>
    );
  }
}
export default MarkAttendence;