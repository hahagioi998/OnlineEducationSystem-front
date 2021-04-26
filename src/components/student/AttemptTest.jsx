import axios from 'axios';
import { Button } from 'reactstrap';
import React, { Component, useState } from 'react';
import { Card, CardBody, Form } from 'reactstrap';
import NavBar from './StudentNavBar';

class AttemptTest extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username:"",
            password:"",
            std:'',
            rollNo:'',
            subject:'',
            testId:'',
            questions:[],
            score: 0,
            question :[],
            answer:[],
            correctAnswer:[],
            marks:[],
            answers:{
                "answerSheet":[
                    {
                        "question":'',
                        "answer":'',
                        "correctAnswer":''
                    }]
            },
            collectQuestions:[],
            examTime:{},
            time:{},
            testStatus:'',
            overAllScore: 0
            

        }
        this.interval=null;
    }

    componentWillMount()
    {
        const{state} = this.props.location
        const{data} = this.props.location
        const{time} = this.props.location
        
        console.log('State: ',{state});
        this.setState(
            {
                testId: data,
                rollNo:state.rollNo,
                username:state.username,
                password:state.password,
                examTime:time

            }
        )

        const apiBaseUrl=`http://localhost:9090/springfox/api/student/onlinetest/${data}`
        axios.get(apiBaseUrl)
        .then(
            res=>{
                console.log("Data", res.data);
                this.setState(
                    {
                        questions: res.data.questions,
                        subject: res.data.subject,
                        std: res.data.std,
                        score: 0,
                        overAllScore: res.data.totalMarks
                    }
                )
                this.state.questions.map(
                    questionDetails=>{
                        this.state.collectQuestions.push(questionDetails.question);
                    }
                )
            }
        )
    }
    componentDidMount(){
        this.startTimer();
    }

    handleChange(e, que, ans, mks)
    {
        // console.log("Length",this.state.questions.length)
        var i = 0
        i = this.state.collectQuestions.indexOf(que);
        console.log(i);
        if(i > this.state.question.length)
        {
            this.state.question.push(que);
            this.state.answer.push(e.target.value);
            this.state.correctAnswer.push(ans);
            this.state.marks.push(mks);
        }
        else{
            this.state.answer.splice(i,1,e.target.value);
            this.state.question.splice(i,1,que);
            this.state.correctAnswer.splice(i,1,ans);
            this.state.marks.splice(i,1,mks);
        }
        console.log("Array1" ,this.state.question);
        console.log("Array2",this.state.answer);
        console.log("Array3",this.state.correctAnswer);
        console.log("Array4",this.state.marks);
        //   
    }

    renderQuestionPaper(questions)
    {
        
        return questions.map(
        (questionStructure)=>
        {
            const{questionNo,question, optionA, optionB, optionC, optionD, answer, marks} = questionStructure;
            return(
                <div>
                <div key={questionNo}>
                    <div>
                        <h4> {question}
                       
                        <br></br>
                        <input type='radio' value={optionA} name={questionNo} onChange={(e)=>this.handleChange(e, question, answer, marks) }/>{optionA}
                        <br></br>
                        <input type='radio' value={optionB} name={questionNo} onChange={(e)=>this.handleChange(e, question, answer, marks) }/>{optionB}
                        <br></br>
                        <input type='radio' value={optionC} name={questionNo} onChange={(e)=>this.handleChange(e, question, answer, marks) }/>{optionC}
                        <br></br>
                        <input type='radio' value={optionD} name={questionNo} onChange={(e)=>this.handleChange(e, question, answer, marks) }/>{optionD}
                        </h4>
                    </div>
                    <hr></hr>
                    {/* {this.state.answers.answerSheet={
                        question:question,
                        answer: this.handleChange.data,
                        correctAnswer: correctAnswer
                    }}*/}
                    
                </div>
                </div>
            )
        }
    )
}

handleSubmit()
{
    var totalScore=0;
    var finalArray=[];
    //console.log(this.state.question);
    for(var i=0;i<this.state.question.length;i++)
    {
        if(this.state.answer[i]===this.state.correctAnswer[i])
        {
            let examScore = this.state.marks[i]
            totalScore = totalScore+examScore
        }
    }
    for(var i=0;i<this.state.question.length;i++)
    {
        this.state.answers.answerSheet={
            question: this.state.question[i],
            answer: this.state.answer[i],
            correctAnswer: this.state.correctAnswer[i]
        }
        finalArray.push(this.state.answers.answerSheet);
    }
    console.log("Final:",finalArray);
    console.log(totalScore);
    //console.log("Submitted")
    // alert("submitted!")
    this.state.answers={
        "testId": this.state.testId,
        "std": this.state.std,
        "subject": this.state.subject,
        "rollNo": this.state.rollNo,
        "answerSheet": finalArray,
        "score": totalScore,
        "totalScore": this.state.overAllScore,
        "status": "attempted"
    }

    console.log(this.state.answers);
  
    
        const URL = "http://localhost:9090/springfox/api/student/attempttest";
        axios.post(URL, this.state.answers).then((response)=>{
            alert("Test Submitted!");
            console.log(response);
            this.props.history.push(`/studentDashBoard/${this.state.username}/${this.state.password}`);
        })
        clearInterval(this.interval);
    
}
startTimer = ()=>
    {
        const countDownTime = Date.now() + (this.state.examTime*1000*60*60) + 1000;
        console.log("CountDownTime:",countDownTime);
        this.interval = setInterval(()=>
        {
            const now = new Date();
            const distance = countDownTime - now;
            const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
            console.log("Hours", hours);
            const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
            console.log("Minutes:",minutes);
            const seconds = Math.floor((distance%(1000*60))/1000);
            console.log("Seconds:",seconds)
            
            if(distance < 0)
            {
                clearInterval(this.interval);
                this.setState({
                    time:{
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    }
                }, ()=>{
                    this.handleSubmit();
                    clearInterval(this.interval);
                })
            }
            else
            {
                this.setState({
                    time:{
                        hours,
                        minutes,
                        seconds
                    }
                })
            }
        },1000);
    }

    render()
    {
        console.log("Status:", this.state.testStatus);
        console.log('Questions:',this.state.questions);
        console.log("Total Marks: ",this.state.overAllScore);
        // console.log('Subject:',this.state.subject);
        // console.log('Standard:',this.state.std);
        // console.log("TestId:",this.state.testId);
        // console.log("Roll No:", this.state.rollNo);
        console.log("Collect questions:", this.state.collectQuestions);
        const questions = this.state.questions
        console.log("Questions Array:",questions)
        return(
            <div class="bimg-1">
                <NavBar username={this.state.username} password={this.state.password}/>
                <div className='Custom-container'>
                    <CardBody className='border border-primary'>
                        <div align='center'>
                            <h1>Test-Page</h1>
                        </div>
                        <hr></hr>
                        <div align='right'>
                            Time: {this.state.time.hours}:{this.state.time.minutes}:{this.state.time.seconds}
                        </div>
                        <div>
                           <div>
                               {this.renderQuestionPaper(this.state.questions)}
                               <Button color='primary' type='button' onClick={this.handleSubmit.bind(this)}>Submit</Button>
                           </div>
                        </div>
                    </CardBody>
                    </div>
            </div>
        )        
    }
}

export default AttemptTest;  