import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'

import axios from 'axios';
import 'react-crud-icons/dist/css/react-crud-icons.css';
import 'react-datepicker/dist/react-datepicker.css';

import Icon from "react-crud-icons";

class edittest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      test: [{}],

    }
    this.baseState = this.state;
  }

  componentWillMount() {


    axios.get('http://localhost:9090/springfox/api/teacher/gettest' + '/' + this.props.match.params.testId).
      then((response) => {
        this.setState({ test: response.data });

      })



    axios.get('http://localhost:9090/springfox/api/teacher/initial' + '/' + this.props.match.params.testId)

  }
  handleEdit = (user) => {
    //e.preventDefault();
    this.props.history.push(`/edit/${this.props.match.params.testId}/${user.questionNo}/${this.props.match.params.teacherId}`);
  }
  handleDelete = (user) => {
    console.log("yes");
    axios.get('http://localhost:9090/springfox/api/teacher/deletequestion' + '/' + this.props.match.params.testId + '/' + user.questionNo + '/' + user.marks).
      then((response) => {
        alert("Deleted Succesfully !!")
        window.location.reload();
      })

  }

  detail() {
    this.props.history.push(`/viewtest/${this.props.match.params.teacherId}`);
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
          value.question.toLowerCase().includes(searchInput.toLowerCase())) ||
          value.questionNo.toString().toLowerCase().includes(searchInput.toLowerCase())




      });
    this.setState({ test: filteredData });
  };

  render() {
    return (

      <div class="vtt-img">
        <br></br>
        <br></br>
          <div class="d-flex justify-content-center">
        <h4 class="text-light"><i>NOTE -- After deleting refresh page once..</i></h4>
        </div>
    
        <div class="d-flex justify-content-center">
          <div class="row">

            <div class="column">
              <Icon name="search"
                size="medium"
                tooltip="Search"
                theme="dark"
                size="medium"

              />
              <input name="searchInput" onChange={this.handleSearch} value={this.state.searchInput} />

            </div>
          </div>
        </div>


        <div class="float-left">

          <Icon name="undo"
            size="large"
            tooltip="Back to View All test detail"
            theme="dark"
            size="medium"
            onClick={() => this.detail()}

          />
        </div>
        <br></br>
        <div  style={{paddingTop:20 ,paddingBottom:20,paddingRight:70,paddingLeft:70}}>
       
        {this.state.test.length != 0 &&
          <table class="table table-striped table-bordered table-hover">
<thead className="thead-dark">
  <tr>
            <th>Q.</th>
            <th>QUESTION</th>
            <th>OPTION A</th>
            <th>OPTION B</th>
            <th>OPTION C</th>
            <th>OPTION D</th>
            <th>ANSWER</th>

            <th>MARK</th>
            <th>ACTION</th>

            </tr>
            </thead>
            <tbody>{


              this.state.test.map(
                (user) =>
                  <tr>
                    <td style={{color:"white"}}>{user.questionNo}</td>
                    <td style={{color:"white"}}>{user.question}</td>
                    <td style={{color:"white"}}>{user.optionA}</td>
                    <td style={{color:"white"}}>{user.optionB}</td>
                    <td style={{color:"white"}}>{user.optionC}</td>

                    <td style={{color:"white"}}>{user.optionD}</td>
                    <td style={{color:"white"}}>{user.answer}</td>
                    <td style={{color:"white"}}>{user.marks}</td>
                    <td><Icon name="edit"
                      size="medium"
                      tooltip="Edit"
                      theme="dark"
                      size="medium"
                      onClick={() => this.handleEdit(user)}
                    />
                      <Icon name="delete"
                        size="medium"
                        tooltip="Delete"
                        theme="dark"
                        size="medium"
                        onClick={() => this.handleDelete(user)}
                      />
                    </td>

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
export default edittest;