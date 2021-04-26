import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



import './App.css';
import Home from './pages/Home';
import AdminHome from './components/AdminHome';
import Logout from './components/Logout';
import StudentLogin from './components/student/studentLogin';

import StudentRegister from './components/StudentRegister';
import StudentForgotPassword from './components/StudentForgotPassword';
import TeacherLogin from './components/TeacherLogin';

import TeacherForgotPassword from './components/TeacherForgotPassword';
import AdminLogin from './components/AdminLogin';
import ContactUs from './pages/ContactUs';

import LoginInitial from './components/LoginInitial';
import ListAllStatndardsComponent from './components/HigherAuthority/ListAllStatndardsComponent';
import ListAllSubjectsComponent from './components/HigherAuthority/ListAllSubjectsComponent';
import CreateStandardComponent from './components/HigherAuthority/CreateStandardComponent';
import CreateSubjectComponent from './components/HigherAuthority/CreateSubjectComponent';
import AssignSubjectComponent from './components/HigherAuthority/AssignSubjectComponent';
import TeacherRegistration from './components/HigherAuthority/TeacherRegistrationComponent';
import AddTeacherComponent from './components/HigherAuthority/AddTeacherComponent';
import ListAllStandardSubjectTeacherComponent from './components/HigherAuthority/ListAllStandardSubjectTeacherComponent';
import UpdateStandardComponent from './components/HigherAuthority/UpdateStandardComponent';
import UpdateSubjectComponent from './components/HigherAuthority/UpdateSubjectComponent';
import ViewTeacherWiseAllocation from './components/HigherAuthority/ViewTeacherWiseAllocation';
import ViewTeacherWiseAllocationComponent from './components/HigherAuthority/ViewTeacherWiseAllocationComponent';
import Profile from './components/Profile';
import Login from './components/Teacher/Login';
import TeacherNavBar from './components/Teacher/TeacherNavBar';
import updateProfile from './components/Teacher/updateProfile';
import initialcreatetest from './components/Teacher/initialcreatetest';
import createtest from './components/Teacher/createtest';
import Schedule from './components/Teacher/Schedule';
import viewtest from './components/Teacher/viewtest';
import onlyview from './components/Teacher/onlyview';
import edittest from './components/Teacher/edittest';
import edit from './components/Teacher/edit';
import MarkAttendence from './components/Teacher/MarkAttendence';
import FinalAttendance from './components/Teacher/FinalAttendance';
import ViewAttendance from './components/Teacher/ViewAttendance';
import BlockStudent from './components/Teacher/BlockStudent';
import EditAttendance from './components/Teacher/EditAttendance';
import AttendanceReport from './components/Teacher/AttendanceReport';
import StudentAttendanceReport from './components/Teacher/StudentAttendanceReport';
import StudentTestReport from './components/Teacher/StudentTestReport';
import StudentDashboard from './components/student/StudentDashboard';
import ViewTimetable from './components/student/Timetable';
import AttemptTest from './components/student/AttemptTest';
import ScheduledTests from './components/student/ScheduledTests';
import TestHistoryComponent from './components/student/TestHistory';
import TeacherHome from './components/Teacher/TeacherHome';

// Laleeta
// import 'react-crud-icons/dist/css/react-crud-icons.css';
// import 'react-datepicker/dist/react-datepicker.css';

// import Icon from "react-crud-icons";
// import createtest from './component/createtest';
// import Login from './components/Login';

// import viewtest from './component/viewtest';
// import onlyview from './component/onlyview';
// import edittest from './component/edittest';
// import edit from './component/edit';
// import StudLogin from './component/StudLogin';
// import BlockStudent from './component/BlockStudent';
// import Schedule from './component/Schedule';
// import NavBar from './component/NavBar';
// import dash from './component/dash';
// import Registration from './component/Registration';

// import initialcreatetest from './component/initialcreatetest';

// import MarkAttendence from './component/MarkAttendence';
// import FinalAttendance from './component/FinalAttendance';
// import updateProfile from './component/updateProfile';
// import EditAttendance from './component/EditAttendance';
// import AttendanceReport from './component/AttendanceReport';
// import StudentAttendanceReport from './component/StudentAttendanceReport';
// import ViewAttendance from './component/ViewAttendance';

// import StudentTestReport from './component/StudentTestReport';


class App extends React.Component {
    render() {
        return (
            <Router>

                <Switch>
                    <Route path='/' exact component={Home} />

                    <Route path='/home' component={Home} />
                    <Route path='/AdminHome' component={AdminHome} />
                    <Route path='/StudentLogin' component={StudentLogin} />
                    <Route path='/StudentRegister/:stdId/:teacherId' component={StudentRegister} />
                    <Route path='/StudentForgotPassword' component={StudentForgotPassword} />
                    <Route path='/TeacherLogin' component={TeacherLogin} />

                    <Route path='/TeacherForgotPassword' component={TeacherForgotPassword} />
                    <Route path='/AdminLogin' component={AdminLogin} />
                    <Route path='/Logout' component={Logout} />

                    <Route path='/sign-up' component={LoginInitial} />
                    <Route path='/contactUs' component={ContactUs} />

                    <Route path='/Profile' component={Profile} />
                    <Route path='/viewAllStandards' component={ListAllStatndardsComponent} />
                    <Route path='/viewAllSubjects' component={ListAllSubjectsComponent} />
                    <Route path='/add-standard' component={CreateStandardComponent}></Route>
                    <Route path='/add-subject' component={CreateSubjectComponent}></Route>
                    <Route path='/assign-subject-teacher' component={AssignSubjectComponent}></Route>
                    <Route path='/register-teacher' component={TeacherRegistration}></Route>
                    <Route path='/add-teacher' component={AddTeacherComponent}></Route>
                    <Route path='/ViewAllAllocations' component={ListAllStandardSubjectTeacherComponent}></Route>
                    <Route path='/ViewTeacherWise' component={ViewTeacherWiseAllocation}></Route>
                    <Route path='/view-teacherwise/:id' component={ViewTeacherWiseAllocationComponent}></Route>

                    <Route path='/update-standard/:id' component={UpdateStandardComponent}></Route>
                    <Route path='/update-subject/:id' component={UpdateSubjectComponent}></Route>




                    <Route path='/login' component={Login}></Route>
                    <Route path='/TeacherNavbar/:teacherId' component={TeacherNavBar} />
                    <Route path='/studentLogin' component={StudentLogin}/>
                    <Route path='/updateProfile/:teacherId' component={updateProfile}></Route>
                    <Route path='/itest/:teacherId'  component={initialcreatetest} />
                    <Route path='/test/:teacherId/:std/:sub' component={createtest}></Route>
                    <Route path='/sch/:teacherId/:std/:sub' component={Schedule}></Route>
                    <Route path='/viewtest/:teacherId' component={viewtest}></Route>
                    <Route path='/onlyview/:testId/:teacherId' component={onlyview}></Route>
                    <Route path='/edittest/:testId/:teacherId' component={edittest}></Route>
                    <Route path='/edit/:testId/:questionNo/:teacherId' component={edit}></Route>
                    <Route path='/attendance/:teacherId' component={MarkAttendence}></Route>
                    <Route path='/markattendance/:teacherId/:standard/:subject' component={FinalAttendance}></Route>    
                    <Route path='/viewattendance/:teacherId/:standard/:subject' component={ViewAttendance}></Route>
                    <Route path='/editattendance/:standard/:date/:subject' component={EditAttendance}></Route>
                    <Route path='/attendancereport/:teacherId' component={AttendanceReport}></Route>
                    <Route path='/viewattendencereport/:standard/:teacherId/:rollNo' component={StudentAttendanceReport}></Route>
                    <Route path='/viewtestreport/:standard/:teacherId/:rollNo' component={StudentTestReport}></Route>


                    <Route path='/studentDashBoard/:username/:password' component={StudentDashboard}></Route>
                   
                    <Route path='/Timetable' component = {ViewTimetable}/>
                    <Route path='/ScheduledTest' component = {ScheduledTests}/>
                    <Route path='/TestHistory' component = {TestHistoryComponent}/>

                    <Route path='/block/:teacherId' component={BlockStudent}></Route>
                    <Route path='/TeacherHome/:teacherId' component={TeacherHome}></Route>
                    <Route path='/AttemptTest' component={AttemptTest}/>
                   
                    {/* <Route path='/AttemptTest' component={Sch}/> */}
                    {/* <Route path='/TestHistory' component = {TestHistoryComponent}/>  */}
                   
                    {/* Laleeta */}

                    {/* <Route path='/updateProfile/:teacherId' component={updateProfile}></Route>
                    <Route path='/navbar/:teacherId' component={NavBar} />
                    <Route path='/dash/:teacherId' component={dash} />
                    <Route path='/itest/:teacherId' component={initialcreatetest} />
                    <Route path='/login' component={Login}></Route>

                    <Route path='/block/:teacherId' component={BlockStudent}></Route>
                    <Route path='/stulogin' component={StudLogin}></Route>
                    <Route path='/test/:teacherId/:std/:sub' component={createtest}></Route>
                    <Route path='/sch/:teacherId/:std/:sub' component={Schedule}></Route>
                    <Route path='/viewtest/:teacherId' component={viewtest}></Route>
                    <Route path='/onlyview/:testId/:teacherId' component={onlyview}></Route>
                    <Route path='/edittest/:testId/:teacherId' component={edittest}></Route>
                    <Route path='/editattendance/:standard/:date/:subject' component={EditAttendance}></Route>
                    <Route path='/edit/:testId/:questionNo/:teacherId' component={edit}></Route>

                    <Route path='/attendance/:teacherId' component={MarkAttendence}></Route>
                    <Route path='/attendancereport/:teacherId' component={AttendanceReport}></Route>
                    <Route path='/markattendance/:teacherId/:standard/:subject' component={FinalAttendance}></Route>
                    <Route path='/viewattendance/:teacherId/:standard/:subject' component={ViewAttendance}></Route>


                    <Route path='/viewattendencereport/:standard/:teacherId/:rollNo' component={StudentAttendanceReport}></Route>
                    <Route path='/viewtestreport/:standard/:teacherId/:rollNo' component={StudentTestReport}></Route>

                    <Route path='/studlogin' component={StudLogin}></Route> */}
                </Switch>
            </Router>
        );

    }

}
export default App;
