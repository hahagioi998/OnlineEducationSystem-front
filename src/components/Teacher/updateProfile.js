import React from 'react';
import axios from 'axios';
import TeacherNavBar1 from './TeacherNavBar1';
import '../../css/teacher.css';
class updateProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      teacher:
      {
        "id": "",
        "fullname": "",
        "username": "",
        "email": "",
        "password": "",
        "qualification": ""

      },
    }
  }

  componentWillMount() {
    axios.get('http://localhost:9090/springfox/api/higherAuthority/teacherRegistration' + '/' + this.props.match.params.teacherId).then((response) => {

      this.setState({ teacher: response.data })

    })
  }


  handleSave = () => {
    var pt=true;
    var pattern= new RegExp(/[A-Za-z]*@gmail.com/);
    
    if(this.state.teacher.fullname==='' || this.state.teacher.email==='' ||this.state.teacher.qualification===''){
pt=false;
alert("Blank field not allowed kindly check....")
    }

    else if (!pattern.test(this.state.teacher.email)) {
      pt=false;
alert("Enter valid emailid....e.g;fggg@gmail.com")
    }
    else{
if(pt){
    const URI = 'http://localhost:9090/springfox/api/higherAuthority/teacherRegistration/editprofile' + '/' + this.props.match.params.teacherId;
    axios.put(URI, this.state.teacher).then((response) => {
      alert("Edited succesfully");
      this.props.history.push(`/TeacherHome/${this.props.match.params.teacherId}`);
    })
  }
    }
  }


  render() {
    return (
      <div class="ett1-img">
        
        <TeacherNavBar1 teacherId={this.props.match.params.teacherId}></TeacherNavBar1>
        <br></br>
        <br></br>

        <br></br>
        <div  style={{borderColor:"blue"}}>
        <h1 class="pdd1"><b>Edit Profile</b></h1>
          <div className="cardb col-lg-6 offset-md-3 offset-md-3">
          <div>
            <br />
            <br />
            <br />
           
            <div class="card-body">
            
              <div class="row">
                <p class="text-left" style={{color: "black"}}><b>Teacher Id</b></p>
                <input
                  type="text"
                  value={this.state.teacher.id}

                  class="form-control"
                />
              </div>


              <div class="row">
                <p class="text-left" style={{color: "black"}}><b>Full Name</b></p>
                <input
                  type="text"
                  value={this.state.teacher.fullname}
                  onChange={(e) => this.setState({ teacher: { ...this.state.teacher, fullname: e.target.value } })}
                  class="form-control"
                />
              </div>


              <div class="row">
                <p class="text-left" style={{color: "black"}}><b>Username</b></p>
                <input
                  type="text"
                  value={this.state.teacher.username}

                  class="form-control"
                />
              </div>


              <div class="row">
                <p class="text-left" style={{color: "black"}}><b>Email</b></p>
                <input
                  type="text"
                  value={this.state.teacher.email}
                  onChange={(e) => this.setState({ teacher: { ...this.state.teacher, email: e.target.value } })}
                  class="form-control"
                />
              </div>


              <div class="row">
                <p class="text-left" style={{color: "black"}}><b>Password</b></p>
                <input
                  type="text"
                  value={this.state.teacher.password}

                  class="form-control"
                />
              </div>


              <div class="row">
                <p class="text-left" style={{color: "black"}}><b>Qualification</b></p>
                <input
                  type="text"
                  value={this.state.teacher.qualification}
                  onChange={(e) => this.setState({ teacher: { ...this.state.teacher, qualification: e.target.value } })}
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary" 
          onClick={() => this.handleSave()}>
          Edit
   </button>
   </div>
        </div>
        </div>
        </div>
       
    

    )
  }
}
export default updateProfile;