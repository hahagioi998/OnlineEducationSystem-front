import React from 'react';
import axios from 'axios';
import TeacherNavBar1 from './TeacherNavBar1';
import '../../css/teacher.css';
class BlockStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ans: "",
      std: "",
      rollno: "",
      students: [{}],

      student:
      {

      },
    }
  }

  componentWillMount() {

    axios.get('http://localhost:9090/springfox/api/student/getallblock').
      then((response) => {
        this.setState({ students: response.data });

      })
  }


  getstudent = (e) => {
    if (e.key === 'Enter') {
      this.setState({ rollno: e.target.value })
      axios.get('http://localhost:9090/springfox/api/student' + '/' + this.state.std + '/' + e.target.value).
        then((response) => {

          this.setState({ student: response.data })
          console.log(response.data)

        }).catch((error) => {
          alert(error.response.data.message);



        })
    }

  }

  handleblock = () => {
    axios.get('http://localhost:9090/springfox/api/student/block' + '/' + this.state.std + '/' + this.state.rollno).
      then((response) => {
        alert("Blocked!!!")
      })

  }

  handleunblock = (user) => {
    axios.get('http://localhost:9090/springfox/api/student/unblock' + '/' + user.std + '/' + user.rollNo).
      then((response) => {
        alert("Unblock!!!")
        window.location.reload();
      })

  }


  render() {
    return (
      <div class="ett1-img">
        
         <TeacherNavBar1 teacherId={this.props.match.params.teacherId}></TeacherNavBar1>
        <br></br>
        <br></br>
        <div class="d-flex justify-content-center">
        <p class="text-success"><b>After entering roll no click on "Enter" !!</b></p>
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

            onChange={(e) => this.setState({ std: e.target.value })}
            class="form-control"
          />
          <p class="text-left" style={{color: "black"}}><b>Enter Roll No</b></p>

          <input
            type="text"

            onKeyDown={(e) => this.getstudent(e)}
            class="form-control"
          />
          <div class="card-body">

            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Student Name</b></p>
              <input
                type="text"
                value={this.state.student.fullName}

                class="form-control"
              />
            </div>

            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Student Email</b></p>
              <input
                type="text"
                value={this.state.student.studentEmail}
                class="form-control"
              />


              <p class="text-left" style={{color: "black"}}><b>Parent Email</b></p>
              <input
                type="text"
                value={this.state.student.parentEmail}
                class="form-control"

              />
            </div>


          </div>
          </div>

        </div>
        <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-danger"
          onClick={() => this.handleblock()}>
          Block
    </button>
  </div>

        <div>
          <br></br>
          <br></br>
          <div  style={{paddingRight:80,paddingLeft:80}}>
          {this.state.students.length != 0 &&
            <table class="align-middle" class="table table-striped table-bordered table-hover" >
   <thead className="thead-dark">
              <tr>

              <th>ROLL NO</th>
              <th>STUDENT NAME</th>
              <th>STANDARD</th>
              <th>STUDENT EMAIL</th>
              <th>TEACHER EMAIL</th>


              <th></th>
              </tr>
              </thead>

              <tbody>{


                this.state.students.map(
                  (user) =>
                    <tr>

                      <td style={{color: "white"}}>{user.rollNo}</td>
                      <td style={{color: "white"}}>{user.fullName}</td>
                      <td style={{color: "white"}}>{user.std}</td>
                      <td style={{color: "white"}}>{user.studentEmail}</td>

                      <td style={{color: "white"}}>{user.parentEmail}</td>
                      <td style={{color: "white"}}>  <button type="button" class="btn btn-success"
                        onClick={() => this.handleunblock(user)}>
                        Unblock
    </button></td>

                    </tr>


                )
              }
              </tbody>
            </table>
            
          }
 </div>
        </div>
       
      </div>
    )

  }
}
export default BlockStudent
