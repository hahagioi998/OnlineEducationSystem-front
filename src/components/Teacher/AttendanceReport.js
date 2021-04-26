
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";

import moment from 'moment';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/teacher.css';
import Icon from "react-crud-icons";
import axios from 'axios';
import TeacherNavBar1 from './TeacherNavBar1';
class AttendanceReport extends Component {

  constructor(props) {
    super(props)
    this.state = {
      standard: "",
      student: [],
      teacher: [],
      rollNo: [],
      sta: "",
    }
  }
  componentWillMount() {

    console.log("yess")



    axios.get('http://localhost:9090/springfox/api/higherAuthority/standardSubjects/teacher' + '/' + this.props.match.params.teacherId).
      then((response) => {
        this.setState({ teacher: response.data })

        ;
      })

  }

  getstudent(std) {
    this.setState({ standard: std })
    axios.get('http://localhost:9090/springfox/api/student/getallstudentfromstandard' + '/' + std).
      then((response) => { this.setState({ student: response.data }); })

  }

  render() {
    return (
      <div class="ett1-img">
        
         <TeacherNavBar1 teacherId={this.props.match.params.teacherId}></TeacherNavBar1>
        <br></br>
        <br></br>
        <div class="d-flex justify-content-center">
        <h4 class="text-success"><i>Select standard from dropdown</i></h4>
        </div>
        <div class="d-flex justify-content-center">
        <select onChange={(e) => this.getstudent(e.target.value)}>
          <option></option>
          {

            this.state.teacher.map(

              (user) =>
                <option>{user.standard.stdId}</option>


            )
          }

        </select>
        </div>
        <br></br>
        <br></br>

        <div  style={{paddingTop:20 ,paddingBottom:20,paddingRight:70,paddingLeft:70}}>
      

    
        {this.state.student.length != 0 &&

          <table  class="table table-striped table-bordered table-hover">

   
<thead className="thead-dark">
  <tr>

            <th>ROLL NO</th>
            <th>FULL NAME</th>
            <th>STUDENT EMAIL</th>
            <th>PARENT EMAIL</th>
            <th>PARENT CONTACTNO.</th>
            <th>VIEW ATTENDANCE REPORT</th>
            <th>VIEW TEST REPORT</th>

            </tr>
            </thead>
            


            <tbody>{


              this.state.student.map(
                (user) =>
                  <tr>

                    <td style={{color: "white"}}>{user.rollNo}</td>
                    <td style={{color: "white"}}>{user.fullName}</td>
                    <td style={{color: "white"}}>{user.studentEmail}</td>
                    <td style={{color: "white"}}>{user.parentEmail}</td>
                    <td style={{color: "white"}}>{user.parentMobile}</td>
                    <td style={{color: "white"}}><a href={"/viewattendencereport/" + this.state.standard + "/" + this.props.match.params.teacherId + "/" + user.rollNo}>view report</a></td>
                    <td style={{color: "white"}}><a href={"/viewtestreport/" + this.state.standard + "/" + this.props.match.params.teacherId + "/" + user.rollNo}>view report</a></td>
                  </tr>
              )
            }
            </tbody>
          </table>
        }
        </div>
        
        <br></br>
        
      </div>
    );
  }
}
export default AttendanceReport;