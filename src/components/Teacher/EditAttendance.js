
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";

import moment from 'moment';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';

import Icon from "react-crud-icons";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
class EditAttendance extends Component {

  constructor(props) {
    super(props)
    this.state = {

      postattendance: [],
      rollNo: [],
      sta: "",

    }
  }
  componentWillMount() {

    console.log("yess")



    axios.get('http://localhost:9090/springfox/api/attendance/getatten' + '/' + this.props.match.params.standard + '/' + this.props.match.params.date + '/' + this.props.match.params.subject).
      then((response) => {
        this.setState({ postattendance: response.data })

        ;
      })

  }








  handleEdit(user, e) {
    console.log(this.state.sta)
    if(this.state.sta=="p" ||  this.state.sta=="a"){
    this.state.postattendance.map(
      (u) => {
        this.state.rollNo.push(u.rollNo)
      }
    )

    var index = this.state.rollNo.indexOf(user.rollNo);
    console.log(index)

    axios.get('http://localhost:9090/springfox/api/attendance/modifystatus' + '/' + this.props.match.params.standard + '/' + this.props.match.params.date
      + '/' + this.props.match.params.subject + '/' + index + '/' + this.state.sta).
      then(
        alert("Modify Attendance Status Successfully !!")

      )
    window.location.reload();
      }
      else{
        toast.error("Kindly check status that u entered either entered p (Present) or a(absent)")
      }
  }
  render() {
    return (
      <div class="att">
         <br></br>
         <div class="d-flex justify-content-center">
          <p class="text-primary"><b>Mark p for 'present' and a for 'absent'</b></p>
          </div>
       
        <div class="d-flex justify-content-center">
        <table>
          <tr>

            <td>
              <p class="text-success"><b>Standard</b></p>
              <input
                type="text"
                value={this.props.match.params.standard}

                class="form-control"

              />
            </td>

            <td>
              <p class="text-success"><b>Subject</b></p>
              <input
                type="text"
                value={this.props.match.params.subject}

                class="form-control"

              />
            </td>

            <td>
              <p class="text-success"><b>Date</b></p>
              <input
                type="text"
                value={this.props.match.params.date}

                class="form-control"

              />
            </td>
          </tr>
        </table>

</div>


        <br></br>
        <br></br>
        <div  style={{paddingTop:20 ,paddingBottom:20,paddingLeft:60,paddingRight:60}}>
       

        <div  style={{borderRadius:12,paddingTop:20,paddingLeft:20}}></div>
        
        <table class="align-middle" class="table table-striped table-bordered table-hover">

<thead className="thead-dark">
  <tr>


          <th>ROLL NO</th>
          <th>FULL NAME</th>
          <th>STUDENT EMAIL</th>
          <th>PARENT EMAIL</th>
          <th>PARENT CONTACTNO.</th>
          <th>ATTENDENCE STATUS</th>
          <th>CHANGE STATUS</th>

          <th></th>

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

                  <td> <input
                    type="text"

                    onChange={(e) => this.setState({ sta: e.target.value })}

                    class="form-control"
                  ></input></td>
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


        </table>

      </div>
      </div>
      
    );
  }
}
export default EditAttendance;