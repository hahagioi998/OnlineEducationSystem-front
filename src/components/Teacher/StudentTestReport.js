
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";

import moment from 'moment';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';

import Icon from "react-crud-icons";
import axios from 'axios';
import '../../css/teacher.css';

class StudentTestReport extends Component {

  constructor(props) {
    super(props)
    this.state = {

      rollno: '',
      testreport: [],
      teacher: [],
      st: false,
      student: {},
      testpercent: ""





    }
  }
  componentWillMount() {

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






    console.log("yess")



    var i = 0;
    var totalscore = 0;
    axios.get('http://localhost:9090/springfox/api/student' + '/' + this.props.match.params.standard + '/' + this.props.match.params.rollNo).
      then((response) => {

        this.setState({ student: response.data })
        console.log(response.data)

      }).catch((error) => {
        alert(error.response.data.message);



      })
    axios.get('http://localhost:9090/springfox/api/student/gettestreporttoteacher' + '/' + this.props.match.params.standard + '/' + this.props.match.params.rollNo).
      then((response) => {
        this.setState({ testreport: response.data })
        console.log(response.data)

        this.state.testreport.map(
          (user) => {
            i = i + user.score;
            totalscore = totalscore + user.totalScore;
          }
        )
        var t =  Math.round((i / totalscore) * 100);
        
        this.setState({ testpercent: t })
        console.log(t)
          ;
      })


  }
  detail() {
    this.props.history.push(`/attendancereport/${this.props.match.params.teacherId}`);
  }

  sendmails() {

    var m = this.state.student.fullName + " " + ", roll no" + " " + this.props.match.params.rollNo + " " + "Test Report card (with overall performance) scored percentage -" + " " + this.state.testpercent + "% ";
    this.state.sentmail = {
      "subject": "Test Report",
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
      <div  class="re-img">
        <br></br>
        <br></br>
        

        <div class="float-left">

          <Icon name="undo"
            size="large"
            tooltip="Back to View Test Report page"
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
        <br></br>



        <div  style={{paddingRight:180,paddingLeft:180}}>
        <table class="align-middle" class="table table-bordered table-sm table-striped ">

        <thead className="thead-dark">
              <tr>


          <th>TEST ID</th>
          <th>SUBJECT NAME</th>
          <th>TOTAL SCORE</th>
          <th>MARK SCORED</th>
          </tr>
  </thead>

          <tbody>{


            this.state.testreport.map(
              (user) =>
                <tr>

                  <td>{user.testId}</td>
                  <td>{user.subject}</td>
                  <td>{user.totalScore}</td>
                  <td>{user.score}</td>
                </tr>


            )
          }

          </tbody>



        </table>
        </div>
        <br></br>
        <div class="d-flex justify-content-center">
        <h4 class="text-primary"><b> Percentage (Average performance) :{this.state.testpercent}%</b></h4>
         </div>
        <br></br>
        <div class="d-flex justify-content-center">
        {Number(this.state.testpercent) <= 50 &&
          <div>
            <p class="text-danger"><b>{this.state.student.fullName} , roll no {this.props.match.params.rollNo}Bad Performance... Need to Improve</b></p>
            <p class="text-danger"><b>Grade obtained : C</b></p>

          </div>
        }
        </div>
        <div class="d-flex justify-content-center">
        {Number(this.state.testpercent) > 50 && Number(this.state.testpercent) < 70 &&
          <div>
            <p class="text-success"><b>{this.state.student.fullName} , roll no {this.props.match.params.rollNo} Average performance..Need to Improve</b></p>
            <p class="text-success"><b>Grade obtained : B</b></p>
          </div>
        }
        </div>
        <div class="d-flex justify-content-center">
        {Number(this.state.testpercent) >= 70 && Number(this.state.testpercent) < 85 &&
          <div>
            <p class="text-success"><b>{this.state.student.fullName} , roll no {this.props.match.params.rollNo} Good performance</b></p>
            <p class="text-success"><b>Grade obtained : A</b></p>
          </div>
        }
        </div>
        <div class="d-flex justify-content-center">
        {Number(this.state.testpercent) >= 85 && Number(this.state.testpercent) <= 100 &&
          <div>
            <p class="text-success"><b>{this.state.student.fullName} , roll no {this.props.match.params.rollNo} Very Good Keep it Up !!!</b></p>
            <p class="text-success"><b>Grade obtained : A+</b></p>
          </div>
        }
        </div>
        <br></br>






      </div>
    );
  }
}
export default StudentTestReport;