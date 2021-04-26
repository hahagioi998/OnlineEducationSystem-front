import React from 'react';
import axios from 'axios';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/teacher.css';

import Icon from "react-crud-icons";
class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "status": false,
      "timetable": [{}],
      "teacher": {},
      "std": "",
      "date": "",

      "time": "",
      "LectureLink": "",
      "subject": "",
      "teacherName": "",
      "teacherMail": "",

      schedule:
      {
        "std": "",
        "date": "",
        "lectures": [{
          "time": "",
          "LectureLink": "",
          "subject": "",
          "teacherName": "",
          "teacherMail": ""
        }]
      },

      errors: {}
    }
  }

  componentWillMount() {

    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.setState({ date: date });

    axios.get('http://localhost:9090/springfox/api/higherAuthority/teacherRegistration/getbyid' + '/' + this.props.match.params.teacherId).
      then((response) => {


        this.setState({ teacher: response.data })
        console.log(this.state.teacher)

      })






    axios.get('http://localhost:9090/springfox/api/schedule/get' + '/' + this.props.match.params.std + '/' + date).
      then((response) => {


        console.log(response.data)
        this.setState({ timetable: response.data })
        if (this.state.timetable.length != 0) {
          this.setState({ status: true })
        }

      })
  }





  validateForm() {

    let errors = {};

    let formIsValid = true;

    if (!this.state.LectureLink) {

        formIsValid = false;

        errors["LectureLink"] = "*Please enter Lecture Link.";

    }
    

    if (typeof this.state.LectureLink !== "undefined") {

        //regular expression for email validation

        var pattern = new RegExp(/^meet\.[A-Za-z_]+\.com/);

        if (!pattern.test(this.state.LectureLink)) {

            formIsValid = false;

            errors["LectureLink"] = "*Please enter valid Lecture Link.";

        }

    }

    if (!this.state.time) {

      formIsValid = false;

      errors["time"] = "*Please enter time .";

  }

  if (typeof this.state.time !== "undefined") {

    //regular expression for email validation

    var pattern = new RegExp(/[0-9-]/);

    if (!pattern.test(this.state.time)) {

        formIsValid = false;

        errors["time"] = "*Please enter valid time.";

    }

}
    this.setState({

      errors: errors

  });

  return formIsValid;
  }


  handleschedule = () => {

    var patternt = new RegExp(/[0-9-]/);

  

    var pattern = new RegExp(/^meet\.[A-Za-z_]+\.com/);
    var pt=true;
if(this.state.LectureLink ===" " || this.state.time===" "){
  alert("Empty Field not accepted inside time and link section")
  pt=false;
}
   else if (!pattern.test(this.state.LectureLink)) {

       pt=false;
       alert("Lecture link not valid...e.g, lecture link --meet.fgsgs.com")

    }
else   if (!patternt.test(this.state.time)) {
  pt=false;
  alert("Entered lecture time not valid..plz enter in the format of interval e.g - 10-11")
}


else{
if(pt){

    var pfinal = [];


    this.state.schedule.lectures =


    {
      standard: this.props.match.params.std,
      id: this.props.match.params.teacherId,
      time: this.state.time,
      lectureLink: this.state.LectureLink,
      subject: this.props.match.params.sub,
      teacherName: this.state.teacher.fullname,
      teacherMail: this.state.teacher.email

    }

    pfinal.push(this.state.schedule.lectures);



    this.state.schedule =
    {
      "std": this.props.match.params.std,
      "date": this.state.date,
      "lectures": pfinal
    }
    console.log(this.state.schedule)

    const URI = 'http://localhost:9090/springfox/api/schedule/savep' + '/' + this.props.match.params.std + '/' + this.state.date;
    axios.post(URI, this.state.schedule).then((response) => {

      alert("Scheduled Succesfully!!");
      window.location.reload();

    })
  }
}
  }

  getallt = (e) => {

  }
  detail() {
    this.props.history.push(`/itest/${this.props.match.params.teacherId}`);
  }

  render() {
    return (
      <div class="ett1-img">

        <br></br>


        <div class="float-left">

          <Icon name="undo"
            size="large"
            tooltip="Back to crete test / schedule lecture page"
            theme="dark"
            size="medium"
            onClick={() => this.detail()}

          />
        </div>

        <br></br>
        <div className="cardb col-lg-6 offset-md-3 offset-md-3">
        <div>
          <br />
          <br />
          <br />
          <p class="text-left" style={{color: "black"}}><b>Enter Standard</b></p>
          <input
            type="text"
            value={this.props.match.params.std}

            class="form-control"
          />
          <p class="text-left" style={{color: "black"}}><b>Enter Subject</b></p>

          <input
            type="text"
            value={this.props.match.params.sub}

            class="form-control"
          />
          <p class="text-left" style={{color: "black"}}><b>Date</b></p>

          <input
            type="text"

            value={this.state.date}
            class="form-control"
          />
          <p class="text-left" style={{color: "black"}}><b>Lecture Link</b></p>

          <input
            type="text"

            onChange={(e) => this.setState({ LectureLink: e.target.value })}
            class="form-control"
          />
          <div className="errorMsg">{this.state.errors.LectureLink}</div>

          <p class="text-left" style={{color: "black"}}><b>Time</b></p>

          <input
            type="text"

            onChange={(e) => this.setState({ time: e.target.value })}
            class="form-control"
          />
          <div className="errorMsg">{this.state.errors.time}</div>
        </div>
        <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-success"
          onClick={() => this.handleschedule()}>
          Schedule
    </button>
    </div>
    </div>

        <div>
          <br></br>
          <br></br>
          <div class="d-flex justify-content-center">
          {this.state.timetable.length == 0 &&
            <h3 class="text-light"><b>yet no lectures scheduled for today</b></h3>
          }
          </div>
          {this.state.status &&



            <div>
                <div style={{paddingTop:20 ,paddingBottom:20}}>
     

        <div  style={{borderRadius:12,paddingTop:20,paddingLeft:20}}></div>
              {this.state.timetable.length != 0 &&
                <table  class="table table-striped table-bordered table-hover">

<thead className="thead-dark">
  <tr>
                  <th>TEACHER NAME</th>
                  <th>TEACHER MAIL</th>
                  <th>SUBJECT</th>
                  <th>LECTURE LINK</th>
                  <th>TIME</th>


                  

                  </tr>
                  </thead>
                  <tbody>{


                    this.state.timetable.map(
                      (user) =>
                        <tr>

                          <td style={{color: "white"}}>{user.teacherName}</td>
                          <td style={{color: "white"}}>{user.teacherMail}</td>
                          <td style={{color: "white"}}>{user.subject}</td>
                          <td style={{color: "white"}}><a href={user.lectureLink}>{user.lectureLink}</a></td>
                          <td style={{color: "white"}}>{user.time}</td>


                        </tr>


                    )
                  }

                  </tbody>




                </table>

              }
            </div>
            </div>
           
          }
        </div>
       
      </div>
    )

  }
}
export default Schedule
