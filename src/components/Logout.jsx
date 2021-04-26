import { Component } from 'react';
class Logout extends Component {
    render() {
        window.location = "/sign-up";
        return localStorage.clear();
    }
}
export default Logout;
