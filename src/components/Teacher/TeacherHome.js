
import React,{Component} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import '../../css/teacher.css';

import axios from 'axios';
import TeacherNavBar from './TeacherNavBar';
import TeacherNavBar1 from './TeacherNavBar1';
class TeacherHome extends Component {

  constructor(props){
    super(props)
    this.state={
     
        sidebar:false,
        teacher:[],
        teachers:{},
        teach:{},
        
    }}
    componentWillMount(){
      axios.get('http://localhost:9090/springfox/api/higherAuthority/teacherRegistration'+ '/' +  this.props.match.params.teacherId).then((response)=>{
            
        this.setState({teachers: response.data} )
        
     })
     
    console.log( this.props.match.params.teacherId)
    
      axios.get('http://localhost:9090/springfox/api/higherAuthority/standardSubjects/teacher'+ '/' +  this.props.match.params.teacherId).
      then((response)=>{this.setState({teacher: response.data}) ;
      
      console.log(response.data)
    })
    }
  
    render(){
  return (
    <div class="homi">
      
   <TeacherNavBar1 teacherId={this.props.match.params.teacherId}></TeacherNavBar1>
 
   
       
   <div  style={{paddingTop:20 ,paddingBottom:20,paddingRight:70,paddingLeft:70}}>
        

        <div style={{borderRadius:12,paddingTop:20,paddingLeft:20}}>
            <div > <h3 class="pro"><b>PROFILE :</b></h3>

              <p class="pdd">Mail Id - {this.state.teachers.email} </p>
              <p class="pdd">Qualification -  {this.state.teachers.qualification} </p>
              <p class="pdd">Username -  {this.state.teachers.username}</p>
            </div>
        
       <br></br>
       <br></br>
          {this.state.teacher.length != 0 &&
            <table  class="table table-striped table-bordered table-hover">
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

                      <td >{user.standard.stdName}</td>
                      <td >{user.subject.subName}</td>
                      <td >{user.status}</td>
                      
                      {user.status == "CLASS_TEACHER" &&
                        <td>  <a href={"/StudentRegister" + "/" + user.standard.stdId + "/" + this.props.match.params.teacherId}>Student registration</a> </td>
                      }
                    </tr>
                )
              }
              </tbody>
             
            </table>
          }
        </div>
        
      </div>

  

    </div>
  );
}
}
export default TeacherHome;