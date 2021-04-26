
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";

import moment from 'moment';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';

import Icon from "react-crud-icons";
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
class FinalAttendance extends Component {

  constructor(props) {
    super(props)
    this.state = {
      check: false,
      deliveryDate: "",
      deliveryda: "",
      postattendance: [],
      nextpostattendance: [],
      student: [],
      ucount: '',
      count: [],
      rollNo: [],
      studentName: [],
      parentEmail: [],
      studentEmail: [],
      parentMobile: [],
      status: [],
      sta: "",
      date: "",
      markattendance:
      {

        "attendance": [
          {

            "rollNo": "",
            "studentName": "",
            "parentEmail": "",
            "studentEmail": "",
            "parentMobile": "",
            "status": ""

          }
        ]

      }




    }
  }
  componentWillMount() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;

    this.setState({ date: today })
    this.setState({ deliveryda: today });
    console.log(this.props.match.params.teacherId)

    axios.get('http://localhost:9090/springfox/api/student/getallstudentfromstandard' + '/' + this.props.match.params.standard).
      then((response) => { this.setState({ student: response.data }); })

    axios.get('http://localhost:9090/springfox/api/attendance/getatten' + '/' + this.props.match.params.standard + '/' + today + '/' + this.props.match.params.subject).
      then((response) => {
        this.setState({ postattendance: response.data })
        if (this.state.postattendance.length != 0) {

        }
        ;
      })

  }

  viewdate(date) {


    console.log(moment(date).format("DD-MM-yyyy"))
    var d = moment(date).format("DD-MM-yyyy")
    console.log(d)
    this.setState({ deliveryda: d })
    axios.get('http://localhost:9090/springfox/api/attendance/getatten' + '/' + this.props.match.params.standard + '/' + d + '/' + this.props.match.params.subject).
      then((response) => {
        console.log(response.data)
        this.setState({ check: true })
        this.setState({ nextpostattendance: response.data });
      })


  }

  markattendance(user, e) {
  
    if (e.key === 'Enter') {
      if(e.target.value=="p" ||  e.target.value=="a"){
      this.state.rollNo.push(user.rollNo);
      this.state.studentName.push(user.fullName);
      this.state.parentEmail.push(user.parentEmail);
      this.state.studentEmail.push(user.studentEmail);
      this.state.parentMobile.push(user.parentMobile);
      this.state.status.push(e.target.value)
      }
      else{
        toast.error("Kindly check status that u entered either entered p (Present) or a(absent)")
      }
    }
  }

  handleInsert() {

    var pfinal = [];

    for (var i = 0; i < this.state.status.length; i++) {

      this.state.markattendance.attendance =


      {
        rollNo: this.state.rollNo[i],
        studentName: this.state.studentName[i],
        parentEmail: this.state.parentEmail[i],
        studentEmail: this.state.studentEmail[i],
        parentMobile: this.state.parentMobile[i],
        status: this.state.status[i]

      }

      pfinal.push(this.state.markattendance.attendance);



    }

    console.log(pfinal);
    this.state.markattendance = {
      "std": this.props.match.params.standard,
      "date": this.state.date,
      "subjectName": this.props.match.params.subject,
      "attendancesheet": pfinal
    }
    console.log(this.state.markattendance);

    const URI = 'http://localhost:9090/springfox/api/attendance/savep';
    axios.post(URI, this.state.markattendance).then((response) => {

      alert("Mark Attendance Successfully");


    })

  }
  handleEdit(user, e) {
    var index = this.state.rollNo.indexOf(user.rollNo);
    console.log(this.state.sta)
    this.state.status.splice(index, 1, this.state.sta);
    console.log(this.state.status)
  }
  handleEditAttendance = () => {
    this.props.history.push(`/editattendance/${this.props.match.params.standard}/${this.state.deliveryda}/${this.props.match.params.subject}`);
  }

  detail() {
    this.props.history.push(`/attendance/${this.props.match.params.teacherId}`);
  }



  render() {
    return (
      <div class="att">
        <br></br>
        <br></br>
        <div class="float-left">

          <Icon name="undo"
            size="large"
            tooltip="Back to Mark Attendance page"
            theme="lig6ht"
            size="medium"
            onClick={() => this.detail()}

          />
        </div>
        <br></br>
        <br></br>
        <div class="d-flex justify-content-center">
        <p className="text-success">Select Date to view attendence sheet</p>
        </div>
        <div class="d-flex justify-content-center">
        <DatePicker
          selected={this.state.deliveryDate}

          id="dp"
          dateFormat="dd-MM-yyyy"
          maxDate={new Date()}
          value={this.state.deliveryda}
          onChange={date => this.viewdate(date)}


        ></DatePicker>
         </div>
        <br></br>
        <br></br>
        <div class="d-flex justify-content-center">
        {this.state.nextpostattendance.length == 0 && this.state.check &&
          <p className="text-danger"><b>Records not found</b></p>
        }
  </div>
  <div  style={{paddingLeft:60,paddingRight:60}}>
  
        {this.state.nextpostattendance.length != 0 && this.state.check &&
          <table class="table table-striped table-bordered table-hover">


<thead className="thead-dark">
  <tr>
            <th>ROLL NO</th>
            <th>FULL NAME</th>
            <th>STUDENT EMAIL</th>
            <th>PARENT EMAIL</th>
            <th>PARENT CONTACTNO.</th>
            <th>MARK ATTENDENCE</th>

            
            </tr>
            </thead>

            <tbody>{


              this.state.nextpostattendance.map(
                (user) =>
                  <tr>

                    <td>{user.rollNo}</td>
                    <td>{user.studentName}</td>
                    <td>{user.studentEmail}</td>
                    <td>{user.parentEmail}</td>
                    <td>{user.parentMobile}</td>
                    <td>{user.status}</td>

                  </tr>


              )
            }

            </tbody>

            <br></br>
            <br></br>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-success"
                onClick={(e) => this.handleEditAttendance()}
              >
                Edit Attendance
 </button>
            </div>
          </table>




        }

</div>

       
<div  style={{paddingLeft:60,paddingRight:60}}>
        {this.state.postattendance.length == 0 && !this.state.check &&
          <div>
              <div class="d-flex justify-content-center">
             <p className="text-primary"><b>Mark p for 'present' and a for 'absent'</b></p>
            <p className="text-primary"><b> **Kindly Note That If U r Choosing previous date to view attendance records then refresh page  for mark current date attendance !!!</b></p>
            </div>
            <table class="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
  <tr>
              <th>ROLL NO</th>
              <th>FULL NAME</th>
              <th>STUDENT EMAIL</th>
              <th>PARENT EMAIL</th>
              <th>PARENT CONTACTNO.</th>
              <th>MARK ATTENDENCE</th>

              <th></th>

</tr>
</thead>
        <tbody>{


                this.state.student.map(
                  (user) =>
                    <tr>

                      <td>{user.rollNo}</td>
                      <td>{user.fullName}</td>
                      <td>{user.studentEmail}</td>
                      <td>{user.parentEmail}</td>
                      <td>{user.parentMobile}</td>
                      <td> <input
                        type="text"
                        onChange={(e) => this.setState({ sta: e.target.value })}
                        onKeyDown={(e) => this.markattendance(user, e)}
                        class="form-control"
                      /></td>
                      <td><Icon name="edit"
                        size="medium"
                        tooltip="Edit"
                        theme="light"
                        size="medium"
                        onClick={(e) => this.handleEdit(user, e)}
                      />   </td>

                    </tr>


                )
              }

              </tbody>

              <br></br>
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-success"
                  onClick={(e) => this.handleInsert()}
                >
                  Save
    </button>
              </div>
            </table>
            
          </div>
        }
        </div>




        <br></br>
        <br></br>
        <div  style={{paddingLeft:60,paddingRight:60}}>
        {this.state.postattendance.length != 0 && !this.state.check &&
          <table class="table table-striped table-bordered table-hover">
         
<thead className="thead-dark">
  <tr>


            <th>ROLL NO</th>
            <th>FULL NAME</th>
            <th>STUDENT EMAIL</th>
            <th>PARENT EMAIL</th>
            <th>PARENT CONTACTNO.</th>
            <th>MARK ATTENDENCE</th>

            
            </tr>
            </thead>

            <tbody>{


              this.state.postattendance.map(
                (user) =>
                  <tr>

                    <td>{user.rollNo}</td>
                    <td>{user.studentName}</td>
                    <td>{user.studentEmail}</td>
                    <td>{user.parentEmail}</td>
                    <td>{user.parentMobile}</td>
                    <td>{user.status}</td>

                  </tr>


              )
            }

            </tbody>

            <br></br>
            <div class="d-flex justify-content-center">
               <button type="button" class="btn btn-success"
                onClick={(e) => this.handleEditAttendance()}
              >
                Edit Attendance
 </button>
           
            </div>
          </table>


        }
    
    </div>
        
      </div>
    );
  }
}
export default FinalAttendance;