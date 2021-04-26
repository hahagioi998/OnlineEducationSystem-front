import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import '../../css/teacher.css';


import axios from 'axios';
class TeacherNavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {

      sidebar: false,
      teacher: [],
      teachers: {},
      teach: {},

    }
  }
  componentWillMount() {
    axios.get('http://localhost:9090/springfox/api/higherAuthority/teacherRegistration' + '/' + this.props.match.params.teacherId).then((response) => {

      this.setState({ teachers: response.data })

    })

    console.log(this.props.match.params.teacherId)

    axios.get('http://localhost:9090/springfox/api/higherAuthority/standardSubjects/teacher' + '/' + this.props.match.params.teacherId).
      then((response) => {
        this.setState({ teacher: response.data });

        console.log(response.data)
      })
  }
  showSidebar() {
    this.setState({ sidebar: (!this.state.sidebar) })
  }
  render() {
    return (
      <div class="fi">
        <IconContext.Provider value={{ color: '#fff' }}>
          <div class="TeacherNavbar">
            <Link to='#' className='menu-barsL'>
              <FaIcons.FaBars onClick={() => this.showSidebar()} />
            </Link>
            <div class="navwelcome">
              <h4 class="neon" data-text="[WELCOME {this.state.teachers.fullname} !!]">WELCOME {this.state.teachers.fullname} !!</h4>
            </div>
           
            

            <Link to='/sign-up' className='btn-mobile'>

<button className="buttonLogouts" ><span>Logout</span></button>
</Link>
          </div>
          <nav className={this.state.sidebar ? 'nav-menuL activeL' : 'nav-menuL'}>
            <ul className='nav-menuL-itemsL' onClick={() => this.showSidebar()}>
              <li className='TeacherNavbar-toggle'>
                <Link to='#' className='menu-barsL'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              <div class="TeacherNavbar1">
              <h4>
                  <a class="neon1" href={"/TeacherHome/" + this.props.match.params.teacherId}>Home</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/updateProfile/" + this.props.match.params.teacherId}>Edit Profile</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/itest/" + this.props.match.params.teacherId}>Schedule Lecture</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/itest/" + this.props.match.params.teacherId}>Create Test</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/viewtest/" + this.props.match.params.teacherId}>View / Edit Test</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/attendance/" + this.props.match.params.teacherId}>Mark / View Attendance</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/attendancereport/" + this.props.match.params.teacherId}>View Attendance Report</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/attendancereport/" + this.props.match.params.teacherId}>View Test Report</a>
                </h4>
                <br></br>

                <h4>
                  <a class="neon1" href={"/block/" + this.props.match.params.teacherId}>Block Student</a>
                </h4>

              </div>
            </ul>
          </nav>
        </IconContext.Provider>
        {/* <div className="container" style={{paddingTop:20 ,paddingBottom:20}}>
        <div className="row">

        <div className="card col-md-6 offset-md-3 offset-md-3" style={{borderRadius:12,paddingTop:20,paddingLeft:20}}> */}
            {/* <div > <div class="pro"><b>PROFILE :</b></div>

              <p class="text-success">Mail Id - {this.state.teachers.email} </p>
              <p class="text-success">Qualification -  {this.state.teachers.qualification} </p>
              <p class="text-success">Username -  {this.state.teachers.username}</p>
            </div> */}
        
       
          {/* {this.state.teacher.length != 0 &&
            <table class="table table-sm table-bordered table-striped">
              <thead className="thead-dark">
              <tr>
              <th>CLASS NAME</th>
              <th>SUBJECT NAME</th>
              <th>ROLE</th>

              <th>Action</th>
              </tr>
              </thead>
              <tbody>{
                this.state.teacher.map(
                  (user) =>
                    <tr>

                      <td>{user.standard.stdName}</td>
                      <td>{user.subject.subName}</td>
                      <td>{user.status}</td>
                      
                      {user.status == "CLASS_TEACHER" &&
                        <td>  <a href={"/StudentRegister" + "/" + user.standard.stdId + "/" + this.props.match.params.teacherId}>Student registration</a> </td>
                      }
                    </tr>
                )
              }
              </tbody>
             
            </table>
          } */}
        {/* </div>
        </div> */}
      {/* </div> */}

      </div>
     
    );
  }
}
export default TeacherNavBar;