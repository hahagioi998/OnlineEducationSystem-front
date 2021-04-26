import { Component } from 'react';
class TeacherLogout extends Component {
    render() {
        window.location = "/home";
        return localStorage.clear();
    }
}
export default TeacherLogout;
