import React, { Component } from 'react';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/teacher.css';

import Icon from "react-crud-icons";

import axios from 'axios';
import TeacherNavBar1 from './TeacherNavBar1';
import '../../css/teacher.css';
class viewtest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      test: [{}],
      da: ""
    }
    this.baseState = this.state;
  }

  componentWillMount() {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.setState({ da: date })
    axios.get('http://localhost:9090/springfox/api/teacher/all' + '/' + this.props.match.params.teacherId).
      then((response) => {
        this.setState({ test: response.data });

      })
  }
  handleSearch = event => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };
  globalSearch = () => {
    let { searchInput } = this.state;
    let originalData = [...this.state.test];
    let filteredData = originalData.filter(

      value => {
        return (
          value.subject.toLowerCase().includes(searchInput.toLowerCase())) ||
          value.std.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
          value.testId.toString().toLowerCase().includes(searchInput.toLowerCase())



      });
    this.setState({ test: filteredData });
  };
  render() {
    return (
  
      <div class="vt-img">
      
           <TeacherNavBar1 teacherId={this.props.match.params.teacherId}></TeacherNavBar1>
           <br></br>
        <div class="d-flex justify-content-center">
          <div class="row">

            <div class="column">
              <Icon name="search"
                size="medium"
                tooltip="Search"
                theme="light"
                size="medium"

              />
              <input name="searchInput" onChange={this.handleSearch} value={this.state.searchInput} />

            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <div style={{paddingTop:20 ,paddingBottom:20,paddingRight:70,paddingLeft:70}}>
       
        {this.state.test.length != 0 &&
          <table class="table table-striped table-bordered table-hover">

<thead className="thead-dark">
  <tr>
            <th>TEST ID</th>
            <th>CLASS</th>
            <th>SUBJECT</th>
            <th>QUESTION COUNT</th>
            <th>TOTAL MARK</th>
            <th>TIME ALLOCATE</th>
            <th>TEST CREATED ON</th>
            <th>TEST WILL CONDUCTED ON</th>
            <th>ACTION</th>
            </tr>
            </thead>


            <tbody>{


              this.state.test.map(
                (user) =>
                  <tr>

                    <td>{user.testId}</td>
                    <td>{user.std}</td>
                    <td>{user.subject}</td>
                    <td>{user.totalQuestions}</td>
                    <td>{user.totalMarks}</td>
                    <td>{user.time}</td>

                    <td>{user.createdDate}</td>
                    <td>{user.conductedDate}</td>



                    {user.conductedDate > this.state.da &&
                      <td><a href={"/edittest/" + user.testId + "/" + this.props.match.params.teacherId}> Edit/View Test</a></td>
                    }

                    {user.conductedDate <= this.state.da &&
                      <td><a href={"/onlyview/" + user.testId + "/" + this.props.match.params.teacherId}>view Test</a></td>
                    }
                  </tr>


              )
            }

            </tbody>




          </table>

        }
        </div>
        
        
       
      </div>
    )
  }
}
export default viewtest;