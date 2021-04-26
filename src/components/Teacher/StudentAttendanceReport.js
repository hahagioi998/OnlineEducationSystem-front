
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";

import moment from 'moment';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';

import Icon from "react-crud-icons";
import axios from 'axios';
import '../../css/teacher.css';
import TeacherRegistrationComponent from '../HigherAuthority/TeacherRegistrationComponent';
import TeacherNavBar1 from './TeacherNavBar1';

class StudentAttendanceReport extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      rollno: '',
      attendance: [],

      attenpercent: "",
      message: "",
      subject: "",
      email: "",
      st: false,
      teacher: [],
      student: {},
      sentmail: {

      }


    }
  }
  componentWillMount() {

    console.log("yess")

    var i = 0;
    axios.get('http://localhost:9090/springfox/api/student' + '/' + this.props.match.params.standard + '/' + this.props.match.params.rollNo).
      then((response) => { this.setState({ student: response.data }); })
    axios.get('http://localhost:9090/springfox/api/higherAuthority/standardSubjects/teacher' + '/' + this.props.match.params.teacherId).
      then((response) => {
        this.setState({ teacher: response.data });
        this.state.teacher.map(
          (user) => {
            if (user.standard.stdId == this.props.match.params.standard) {
              if (user.status == "CLASS_TEACHER") {
                this.setState({ st: true });
              }
            }
          })



        console.log(response.data)
      })

    axios.get('http://localhost:9090/springfox/api/attendance/getreport' + '/' + this.props.match.params.standard).
      then((response) => {
        this.setState({ attendance: response.data })
        console.log(response.data)

        this.state.attendance.map(
          (user) => {
            user.attendancesheet.map(
              (user1) => {
                if (user1.rollNo == this.props.match.params.rollNo) {
                  this.setState({ name: user1.studentName })
                  if (user1.status == "p") {
                    i++;

                  }
                }


              }
            )
          }

        )
        var t =   Math.round((i / this.state.attendance.length) * 100);
        
        this.setState({ attenpercent: t })
        console.log(t)
          ;
      })
  }
  detail() {
    this.props.history.push(`/attendancereport/${this.props.match.params.teacherId}`);
  }
  sendmails() {

    var m = this.state.name + " " + ", roll no" + " " + this.props.match.params.rollNo + " " + "have attendance" + " " + this.state.attenpercent + "% ";
    this.state.sentmail = {
      "subject": "Attendence Report",
      "message": m,
      "email": this.state.student.parentEmail

    }
    const URI = 'http://localhost:9090/springfox/api/teacher/reportbymail/';
    axios.post(URI, this.state.sentmail).then((response) => {

      alert("mail sent!!");


    })
    console.log(this.state.sentmail)
  }
  render() {
    return (
      <div class="re-img">
        <br></br>
       
<br></br>
        <div class="float-left">

          <Icon name="undo"
            size="large"
            tooltip="Back to View  Attendance Report page"
            theme="lig6ht"
            size="medium"
            onClick={() => this.detail()}

          />
        </div>
        <div class="d-flex justify-content-center">
        {this.state.st &&
          <div class="float-center">
            <Icon name="export"
              size="large"
              tooltip="send mail"
              theme="lig6ht"
              size="medium"
              onClick={() => this.sendmails()}

            />
          </div>
        }

   </div>
        <br></br>


       
        <div  style={{paddingRight:180,paddingLeft:180}}>

        <table class="align-middle" class="table table-bordered table-sm table-striped ">
        <thead className="thead-dark">
              <tr>


          <th>DATE</th>
          <th>SUBJECT NAME</th>
          <th>ATTENDENCE STATUS</th>
  </tr>
  </thead>

          <tbody>{


            this.state.attendance.map(
              (user) =>
                <tr>

                  <td>{user.date}</td>
                  <td>{user.subjectName}</td>
                  {
                    user.attendancesheet.map(
                      (user1) =>
                        user1.rollNo == this.props.match.params.rollNo &&
                        <td>{user1.status}</td>




                    )
                  }


                </tr>


            )
          }

          </tbody>



        </table>
        </div>
        
        <br></br>
        <div class="d-flex justify-content-center">
        <h4 class="text-primary"><b>Attendence Percent :{this.state.attenpercent}%</b></h4>
        </div>
        <br></br>
        <div class="d-flex justify-content-center">
        {Number(this.state.attenpercent) <= 35 &&
          <div>
            <p class="text-danger"><b>{this.state.name} , roll no {this.props.match.params.rollNo} is in Defaulter List</b></p>

            <div class="bg-del"></div>
          </div>
        }
        </div>
        <div class="d-flex justify-content-center">
        {Number(this.state.attenpercent) > 35 &&
          <div>
            <p class="text-success"><b>{this.state.name} , roll no {this.props.match.params.rollNo} have attendace {this.state.attenpercent} % </b></p>
            <div class="bg-suc"></div></div>
        }
        <br></br>

   </div>




      </div>
    );
  }
}
export default StudentAttendanceReport;