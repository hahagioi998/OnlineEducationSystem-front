import React from 'react';
import axios from 'axios';
import '../../css/teacher.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
class edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {



      question:
      {
        "question": "",
        "questionNo": "",
        "optionA": "",
        "optionB": "",
        "optionC": "",
        "optionD": "",
        "answer": "",
        "marks": ""
      },


    }
  }
  componentWillMount() {

    axios.get('http://localhost:9090/springfox/api/teacher/getquestion' + '/' + this.props.match.params.testId + '/' + this.props.match.params.questionNo).then((response) => {

      this.setState({ question: response.data })

    })
  }

  handleSave = () => {
    var pt=true;
if(this.state.question.question==='' || this.state.question.optionA==='' || this.state.question.optionB==='' || this.state.question.optionC==='' ||
this.state.question.optionD==='' || this.state.question.answer==='' || this.state.question.marks===''){
  toast.error("Blank feild detected  kindly fill it")
  pt=false;
}
else if(!Number(this.state.question.marks)){
  
  toast.error("Marks should be in numeric format, kindly fill it properly like 2,3..")
  pt=false;
}
else{
  if(pt){
    const URI = 'http://localhost:9090/springfox/api/teacher/edittest' + '/' + this.props.match.params.testId + '/' + this.props.match.params.questionNo;
    axios.put(URI, this.state.question).then((response) => {
      alert("Edited succesfully");
      this.props.history.push(`/edittest/${this.props.match.params.testId}/${this.props.match.params.teacherId}`);
    })
  }
}
  }




  render() {
    return (
      <div class="ett1-img">
        <br></br>
        <br></br>

        <br></br>
        <div className="cardb col-lg-6 offset-md-3 offset-md-3">
          <div >
          <br />
          <br />
          <br />
          <div class="card-body">

            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Q.</b></p>
              <input
                type="text"
                value={this.state.question.questionNo}

                class="form-control"
              />
            </div>

            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Question</b></p>
              <input
                type="text"
                value={this.state.question.question}
                onChange={(e) => this.setState({ question: { ...this.state.question, question: e.target.value } })}
                class="form-control"
              />
            </div>
            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Option A</b></p>
              <input
                type="text"
                value={this.state.question.optionA}
                onChange={(e) => this.setState({ question: { ...this.state.question, optionA: e.target.value } })}
                class="form-control"
              />
            </div>
            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Option B</b></p>
              <input
                type="text"
                value={this.state.question.optionB}
                onChange={(e) => this.setState({ question: { ...this.state.question, optionB: e.target.value } })}
                class="form-control"
              />
            </div>
            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Option C</b></p>
              <input
                type="text"
                value={this.state.question.optionC}
                onChange={(e) => this.setState({ question: { ...this.state.question, optionC: e.target.value } })}
                class="form-control"
              />
            </div>
            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Option D</b></p>
              <input
                type="text"
                value={this.state.question.optionD}
                onChange={(e) => this.setState({ question: { ...this.state.question, optionD: e.target.value } })}
                class="form-control"
              />
            </div>

            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Answer</b></p>
              <input
                type="text"
                value={this.state.question.answer}
                onChange={(e) => this.setState({ question: { ...this.state.question, answer: e.target.value } })}
                class="form-control"
              />
            </div>

            <div class="row">
              <p class="text-left" style={{color: "black"}}><b>Marks</b></p>
              <input
                type="text"
                value={this.state.question.marks}
                onChange={(e) => this.setState({ question: { ...this.state.question, marks: e.target.value } })}
                class="form-control"
              />
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
export default edit
