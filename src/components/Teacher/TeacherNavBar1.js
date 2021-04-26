import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import '../../css/teacher.css';


import axios from 'axios';
class TeacherNavBar1 extends Component {

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
    axios.get('http://localhost:9090/springfox/api/higherAuthority/teacherRegistration' + '/' + this.props.teacherId).then((response) => {

      this.setState({ teachers: response.data })

    })

  

    axios.get('http://localhost:9090/springfox/api/higherAuthority/standardSubjects/teacher' + '/' + this.props.teacherId).
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
      <div>
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
                  <a class="neon1" href={"/TeacherHome/" + this.props.teacherId}>Home</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/updateProfile/" + this.props.teacherId}>Edit Profile</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/itest/" + this.props.teacherId}>Schedule Lecture</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/itest/" + this.props.teacherId}>Create Test</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/viewtest/" + this.props.teacherId}>View / Edit Test</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/attendance/" + this.props.teacherId}>Mark / View Attendance</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/attendancereport/" + this.props.teacherId}>View Attendance Report</a>
                </h4>
                <br></br>
                <h4>
                  <a class="neon1" href={"/attendancereport/" + this.props.teacherId}>View Test Report</a>
                </h4>
                <br></br>

                <h4>
                  <a class="neon1" href={"/block/" + this.props.teacherId}>Block Student</a>
                </h4>

              </div>
            </ul>
          </nav>
        </IconContext.Provider>
       

      </div>
     
    );
  }
}
export default TeacherNavBar1;