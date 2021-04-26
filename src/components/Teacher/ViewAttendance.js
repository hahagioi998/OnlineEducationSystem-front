
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";

import moment from 'moment';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';

import Icon from "react-crud-icons";
import axios from 'axios';
class ViewAttendance extends Component {

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
            tooltip="Back to view attendace page"
            theme="lig6ht"
            size="medium"
            onClick={() => this.detail()}

          />
        </div>
        <br></br>
        <br></br>
        <div class="d-flex justify-content-center">
        <p className="text-success"><i>Select Date to view attendence sheet</i></p>
  </div>


        <div class="d-flex justify-content-center">
        <DatePicker


          id="dp"
          value={this.state.deliveryda}

          dateFormat="dd-MM-yyyy"
          maxDate={new Date()}

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
            <div class="text-center">
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
export default ViewAttendance;