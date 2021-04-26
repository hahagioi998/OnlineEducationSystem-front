import { Component } from 'react';
class StudentLogout extends Component {
    render() {
        window.location = "/home";
        return localStorage.clear();
    }
}
export default StudentLogout;
