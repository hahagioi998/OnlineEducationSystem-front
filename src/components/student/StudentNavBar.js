import React,{Component} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
//import { SidebarItem } from './SidebarItem';
//import './Navbar.css'
import { IconContext } from 'react-icons';
import { useParams } from 'react-router-dom';
import '../../css/student.css';

import axios from 'axios';

let data = localStorage.getItem('student');
data = JSON.parse(data);
class NavBar extends Component
{
    constructor(props)
    {
        super(props)
        this.state=
        {
            username:"",
            password:"",
            sidebar:false,
            teacher:[],
            students:{}
        }
    }
    
    componentWillMount()
    {
        this.setState({
            username:this.props.username,
            password:this.props.password

        })

        axios.get('http://localhost:9090/springfox/api/student/details/' + this.props.username +'/'+ this.props.password)
        .then((response)=>
        {
            console.log(response.data);
            this.setState({students: response.data} )
            console.log(this.state.students)
        })
        // console.log( data.userName)
        // console.log( data.studentPassword)
        // axios.get('http://localhost:9090/higherAuthority/standardSubjects/teacher'+ '/' + this.props.match.params.teacherId)
        // .then(
        //     (response)=>{
        //         this.setState({teacher: response.data
        //         });
        //         console.log( response.data)
        //     }
        // )
    }
    
    showSidebar()
    {
        this.setState({sidebar: (!this.state.sidebar)})
    }
    
    render()
    {
        return(
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div class ="student-navbar">
                    <Link to='#' className='student-menu-bars'>
                        <FaIcons.FaBars onClick={() =>this.showSidebar()} />
                    </Link>
                    <div class="student-navwelcome">
                        <h4 class="student-neon mb-3">
                            WELCOME {this.state.students.fullName} !!
                        </h4>
                        
                    </div>
                    <Link to='/sign-up' className='btn-mobile'>

<button className="buttonLogouts" ><span>Logout</span></button>
</Link>
                </div>
                <nav className={this.state.sidebar ? 'student-nav-menu active' : 'student-nav-menu'}>
                    <ul className='student-nav-menu-items'   onClick={() =>this.showSidebar()}>
                        <li className='student-navbar-toggle'>
                            <Link to='#' className='student-menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <div class="student-navbar1">
                            <h4>
                                <Link className='student-neon1' to={{pathname:`/studentDashBoard/${this.state.students.userName}/${this.state.students.studentPassword}`, state: this.state.students}}>
                                    Home
                                </Link>
                            </h4>
                            <br></br>
                            <h4>
                                <Link className='student-neon1' to={{pathname:"/Timetable", state: this.state.students}}>
                                    View Timetable
                                </Link>
                            </h4>
                            <br></br>
                            <h4>
                                <Link className='student-neon1' to={{pathname:"/ScheduledTest", state: this.state.students}}>
                                    Attempt-Test
                                </Link>
                            </h4>
                            <br></br>
                            <h4>
                                <Link className='student-neon1' to={{pathname:"/TestHistory", state: this.state.students}}>
                                    Test History
                                </Link>
                            </h4>
                            <br></br>
                        </div>
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>);
    }
}

export default NavBar;

