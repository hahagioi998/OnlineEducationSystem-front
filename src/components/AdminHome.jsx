import React from 'react';
import LogoutNavbar from '../components/LogoutNavbar';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../css/admin.css';

function AdminHome() {
  let data = localStorage.getItem('admin');
  data = JSON.parse(data);
  return (
    <div class="bimg-1">
      <LogoutNavbar />
      <div className='row'  style={{padding:60}}>
        <div className="col-sm-4" style={{paddingBottom:40}}>
          <div className="card" style={{backgroundColor:'#cce6ff',border:'solid',borderColor:'#00284d'}}>
            <div className="card-body">
              <h5 className="card-title">New Teacher Registration</h5>
              <p className="card-text">
                Add a teacher with personal information.
        </p>
              <Link to='/register-teacher'>Register</Link>

              {/* <button component={Link} to="/register-teacher" className="btn btn-primary">Register</button> */}
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card" style={{backgroundColor:'#cce6ff',border:'solid',borderColor:'#00284d'}}>
            <div className="card-body">
              <h5 className="card-title">All Standards</h5>
              <p className="card-text">
                Add a new standard or edit existing one.
        </p>
              <Link to='/viewAllStandards'>Manage Standards</Link>

              {/* <button component={Link} to="/register" className="btn btn-primary">Register</button> */}
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card" style={{backgroundColor:'#cce6ff',border:'solid',borderColor:'#00284d'}}>
            <div className="card-body">
              <h5 className="card-title">All Subjects</h5>
              <p className="card-text">
              Add a new subject or edit and existing one.
        </p>
              <Link to='/viewAllSubjects'>Manage Subjects</Link>

              {/* <button component={Link} to="/register" className="btn btn-primary">Register</button> */}
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card" style={{backgroundColor:'#cce6ff',border:'solid',borderColor:'#00284d'}}>
            <div className="card-body">
              <h5 className="card-title">Assign subjects,teachers to standard</h5>
              <p className="card-text">
              Assign subjects,teacher to particular standard.
        </p>
              <Link to='/assign-subject-teacher'>Allocate</Link>

              {/* <button component={Link} to="/register" className="btn btn-primary">Register</button> */}
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card" style={{backgroundColor:'#cce6ff',border:'solid',borderColor:'#00284d'}}>
            <div className="card-body">
              <h5 className="card-title">View All Allocations</h5>
              <p className="card-text">
               View standard subject and teacher allocations.
        </p>
              <Link to='/ViewAllAllocations'>View</Link>

              {/* <button component={Link} to="/register" className="btn btn-primary">Register</button> */}
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card" style={{backgroundColor:'#cce6ff',border:'solid',borderColor:'#00284d'}}>
            <div className="card-body">
              <h5 className="card-title">View teacher wise allocation</h5>
              <p className="card-text">
                Select teacher to view allocations.
        </p>
              <Link to='/ViewTeacherWise'>View Teacher wise</Link>

              {/* <button component={Link} to="/register" className="btn btn-primary">Register</button> */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminHome;