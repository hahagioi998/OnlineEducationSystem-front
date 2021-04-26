import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from "react-datepicker";
import moment from 'moment';
import '../../css/teacher.css';
import Icon from "react-crud-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
export default class createtest extends React.Component {
  constructor(props) {

    super(props);

    this.state = {


      tot: [],
      totalMarks: "",
      ucount: '',

      time: "",

      messageq: "",
      messagen: "",
      messagea: "",
      messageb: "",
      messagec: "",
      messaged: "",
      messageans: "",
      messagem: "",
      questionno: [],
      question: [],
      optionA: [],
      optionB: [],
      optionC: [],
      optionD: [],
      answer: [],
      mark: [],
      testid: "",
      created: "",
      conducted: "",
      std: "",
      subject: "",

      test:
      {

        "questions": [
          {
            "question": "",
            "questionNo": "",

            "optionA": "",
            "optionB": "",
            "optionC": "",
            "optionD": "",
            "answer": "",
            "marks": "",

          }
        ]

      }
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.handleItemChangedA = this.handleItemChangedA.bind(this);
    this.handleItemChangedAns = this.handleItemChangedAns.bind(this);
    this.handleItemChangedB = this.handleItemChangedB.bind(this);
    this.handleItemChangedC = this.handleItemChangedC.bind(this);
    this.handleItemChangedD = this.handleItemChangedD.bind(this);
    this.handleItemChangedM = this.handleItemChangedM.bind(this);
    this.handleItemChangedQ = this.handleItemChangedQ.bind(this);
    this.handleItemDeleted = this.handleItemDeleted.bind(this);
    this.renderRowsA = this.renderRowsA.bind(this);
    this.renderRowsB = this.renderRowsB.bind(this);
    this.renderRowsC =this.renderRowsC.bind(this);
    this.renderRowsD = this.renderRowsD.bind(this);
    this.renderRowsM = this.renderRowsM.bind(this);
    this.renderRowsQ = this.renderRowsQ.bind(this);
    this.renderRowsAns = this.renderRowsAns.bind(this);
    this.datechange = this.datechange.bind(this);
    this.detail= this.detail.bind(this);
    
  }
  componentWillMount() {

    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.setState({ created: date });
    var t = Math.floor(Math.random() * 10000);
    this.setState({ testid: t });
    axios.get('http://localhost:9090/springfox/api/teacher/countoftest' + '/' + this.props.match.params.std + '/' + this.props.match.params.sub).
      then((response) => {
        this.setState({ ucount: response.data });

      })
  }

  handleClick() {

    console.log(Date.now);
    var questionno = this.state.questionno;
    var question = this.state.question;
    var optionA = this.state.optionA;
    var optionB = this.state.optionB;
    var optionC = this.state.optionC;
    var optionD = this.state.optionD;
    var answer = this.state.answer;
    var mark = this.state.mark;

    questionno.push(this.state.messagen);
    question.push(this.state.messageq);
    optionA.push(this.state.messagea);
    optionB.push(this.state.messageb);
    optionC.push(this.state.messagec);
    optionD.push(this.state.messaged);
    answer.push(this.state.messageans);
    mark.push(this.state.messagem);


    //progress.push(this.state.messagep);

    this.setState({
      messageq: "",
      messagen: "",
      messagea: "",
      messageb: "",
      messagec: "",
      messaged: "",
      messageans: "",
      messagem: "",

      questionno: questionno,
      question: question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      answer: answer,
      mark: mark,



    });

  }

  handleInsert() {

    var pfinal = [];
    var pt=true;
    var today = new Date();
    var l = this.state.optionA.length;
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    for (var i = 0; i < this.state.optionA.length; i++) {
      if(this.state.question[i]==='' || this.state.optionA[i]==='' || this.state.optionB[i]==='' || this.state.optionC[i]==='' ||
      this.state.optionD==='' || this.state.answer[i]==='' || this.state.mark[i]===''){
        var nn=i+1;
        toast.error("Blank feild detected for question no  " +  nn +" kindly fill it")
      pt=false;
      }
      else if(!Number(this.state.mark[i])){
        var nn=i+1;
        toast.error("Marks should be in numeric format at question no  " +  nn +" kindly fill it properly like 2,3..")
        pt=false;
      }
      else{
      this.state.tot.push(Number(this.state.mark[i]));
      this.state.test.questions =


      {
        question: this.state.question[i],
        questionNo: i + 1,

        optionA: this.state.optionA[i],
        optionB: this.state.optionB[i],
        optionC: this.state.optionC[i],
        optionD: this.state.optionD[i],
        answer: this.state.answer[i],
        marks: this.state.mark[i],

      }

      pfinal.push(this.state.test.questions);

    }

    }
    if(pt){
    this.setState({ totalMarks: this.state.tot.reduce((a, b) => a + b, 0) })
    console.log(this.state.totalMarks)
    console.log(pfinal);
    this.state.test = {
      "testId": this.state.testid,
      "teacherId": this.props.match.params.teacherId,
      "totalMarks": this.state.tot.reduce((a, b) => a + b, 0),
      "totalQuestions": l,
      "time": this.state.time,
      "createdDate": this.state.created,
      "conductedDate": this.state.conducted,
      "status": "not attempted",
      "questions": pfinal,
      "std": this.props.match.params.std,
      "subject": this.props.match.params.sub

    }

    const URI = 'http://localhost:9090/springfox/api/teacher/save/';
    axios.post(URI, this.state.test).then((response) => {

      alert("test created");
      this.props.history.push(`/onlyview/${this.state.testid}/${this.props.match.params.teacherId}`);

    })
  }

  }



  handleItemDeleted(i) {

    var question = this.state.question;
    var optionA = this.state.optionA;
    var optionB = this.state.optionB;
    var optionC = this.state.optionC;
    var optionD = this.state.optionD;
    var mark = this.state.mark;
    var answer = this.state.answer;


    question.splice(i, 1);
    optionA.splice(i, 1);
    optionB.splice(i, 1);
    optionC.splice(i, 1);
    optionD.splice(i, 1);
    mark.splice(i, 1);
    answer.splice(i, 1);


    this.setState({
      question: question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,

      mark: mark,
      answer: answer

    });
  }

  handleItemChangedQ(i, event) {
    var question = this.state.question;
    question[i] = event.target.value;

    this.setState({
      question: question
    });
  }

  renderRowsQ() {
    var context = this;

    return this.state.question.map(function (o, i) {
      return (
        <tr >
          <td>

            <input
              type="text"
              value={o}
              onChange={context.handleItemChangedQ.bind(context, i)}
            />
          </td>
        </tr>
      );
    });
  }

  handleItemChangedA(i, event) {
    var optionA = this.state.optionA;
    optionA[i] = event.target.value;

    this.setState({
      optionA: optionA
    });
  }

  renderRowsA() {
    var context = this;


    return this.state.optionA.map(function (o, i) {
      return (
        <tr >
          <td>

            <input
              type="text"
              value={o}
              onChange={context.handleItemChangedA.bind(context, i)}
            />
          </td>

        </tr>
      );
    });
  }


  handleItemChangedB(i, event) {
    var optionB = this.state.optionB;
    optionB[i] = event.target.value;

    this.setState({
      optionB: optionB
    });
  }

  renderRowsB() {
    var context = this;


    return this.state.optionB.map(function (o, i) {
      return (
        <tr >
          <td>

            <input
              type="text"
              value={o}
              onChange={context.handleItemChangedB.bind(context, i)}
            />
          </td>

        </tr>
      );
    });
  }



  handleItemChangedC(i, event) {
    var optionC = this.state.optionC;
    optionC[i] = event.target.value;

    this.setState({
      optionC: optionC
    });
  }

  renderRowsC() {
    var context = this;


    return this.state.optionC.map(function (o, i) {
      return (
        <tr >
          <td>

            <input
              type="text"
              value={o}
              onChange={context.handleItemChangedC.bind(context, i)}
            />
          </td>

        </tr>
      );
    });
  }

  handleItemChangedD(i, event) {
    var optionD = this.state.optionD;
    
    optionD[i] = event.target.value;

    this.setState({
      optionD: optionD
    });
  }

  renderRowsD() {
    var context = this;


    return this.state.optionD.map(function (o, i) {
      return (
        <tr >
          <td>

            <input
              type="text"
              value={o}
              onChange={context.handleItemChangedD.bind(context, i)}
            />
          </td>

        </tr>
      );
    });
  }



  handleItemChangedM(i, event) {
    var mark = this.state.mark;
   

    mark[i] = event.target.value;

    this.setState({
      mark: mark
    });
  }

  renderRowsM() {
    var context = this;


    return this.state.mark.map(function (o, i) {
      return (
        <tr >
          <td>

            <input
              type="text"
              value={o}
              onChange={context.handleItemChangedM.bind(context, i)}
            />
          </td>

        </tr>
      );
    });
  }

  handleItemChangedAns(i, event) {
    var answer = this.state.answer;
    answer[i] = event.target.value;

    this.setState({
      answer: answer
    });
  }

  renderRowsAns() {
    var context = this;


    return this.state.answer.map(function (o, i) {
      return (
        <tr >
          <td>

            <input
              type="text"
              value={o}
              onChange={context.handleItemChangedAns.bind(context, i)}
            />
          </td>
          <td>
            <Icon name="delete"
              size="small"
              tooltip="Delete"
              theme="dark"
              size="medium"
              onClick={context.handleItemDeleted.bind(context)}
            />

          </td>
        </tr>
      );
    });
  }
  datechange(date) {
    
    var d = moment(date).format("DD-M-yyyy")
    this.setState({ conducted: d })
    console.log(this.state.conducted);
  }
  detail() {
    this.props.history.push(`/itest/${this.props.match.params.teacherId}`);
  }
  render() {
    return (
      <div class="test-img">
        <br></br>


        <div class="float-left">

          <Icon name="undo"
            size="large"
            tooltip="Back to crete test / schedule lecture page"
            theme="dark"
            size="medium"
            onClick={() => this.detail()}

          />
        </div>
        <br></br>

        <table>
          <tr>
            <td>
              <p class="text-light"><i>Class</i></p>
              <input
                type="text"
                value={this.props.match.params.std}

                class="form-control"

              />
            </td>
            <td>
              <p class="text-light"><i>Subject</i></p>
              <input
                type="text"
                value={this.props.match.params.sub}
                class="form-control"

              />
            </td>
          </tr>
          <tr>
            <td>
              <p class="text-light"><i>Question Paper No</i></p>
              <input
                type="text"

                value={this.state.testid}


                class="form-control"

              />
            </td>
            <td>
              <p class="text-light"><i>Created on</i></p>
              <input
                type="text"

                value={this.state.created}


                class="form-control"

              />
            </td>
            <td>
              <p class="text-light"><i>test will conducted on </i></p>
              <div style={{color:"black"}}>
              <DatePicker
              style={{color:"black"}}


                dateFormat="dd-MM-yyyy"

                value={this.state.conducted}
                minDate={new Date()}
                onChange={date => this.datechange(date)}
              ></DatePicker>
  </div>
            </td>
            <td>
              <p class="text-light"><i>Test Time</i></p>
              <input
                type="text"
                onChange={(e) => { this.setState({ time: e.target.value }) }}
                class="form-control"

              />
            </td>


          </tr>
        </table>
        <br />
        <br />
        <br />
        <br />
        <table class="table table-striped table-bordered table-hover">
          <thead class="thead-dark">
            <tr>

              <th>Question</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Mark</th>

              <th>Ans</th>


            </tr>
          </thead>
          <tbody>
            <tr scope="row">

              <td>{this.renderRowsQ()}</td>
              <td>{this.renderRowsA()}</td>
              <td>{this.renderRowsB()}</td>
              <td>{this.renderRowsC()}</td>
              <td>{this.renderRowsD()}</td>
              <td>{this.renderRowsM()}</td>
              <td>{this.renderRowsAns()}</td>



            </tr>

            <td>
              <Icon name="add"
                size="medium"
                tooltip="Add"
                theme="dark"
                size="medium"
                onClick={this.handleClick.bind(this)}
              />

              <br />

            </td>
          </tbody>
        </table>
        <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-success"
          onClick={this.handleInsert.bind(this)}
        >
          create test
          </button>
  </div>
        <table>
          <tr>
            <td> <p class="text-light"><i>Total Questions</i></p>
              <input
                type="text"

                value={this.state.question.length}


                class="form-control"

              />

            </td>


          </tr>
        </table>
       
      </div>
    );
  }

}