import questionSource from '../interfaces/questionSource';
import questionStateInterface from '../interfaces/questionState';
import question from '../interfaces/question';
import { Icon, Message } from 'rsuite';
import largeSample from '../components/questionImport/largeSample';
import {useSelector, useDispatch } from 'react-redux';
import React from 'react';
import fs from "fs";



type params = {
    type:string,
    payload:any
}

const parseFile = (file:string):questionSource => {



    let lines = file.split('\n');
    let questions:questionSource = {questions:[]};
    let length = lines.length;
    let qflag = false;
    let aflag = false;
    let eflag = false;
    let aline = 0;

    let question:question = {
        questionText:'',
        correctAnswer:0,
        answers: []
    };;

    for(var i = 0; i < length; i+=1){

        if (lines[i].substr(0,1) != "*") {
        switch(lines[i].substr(0,2).toUpperCase()) {
            case "@Q":
                if (question.correctAnswer != 0 && question.answers.length > 0 && question.questionText != '') {
                    questions.questions.push(question);
                }

                 question = {
                    questionText:'',
                    correctAnswer:0,
                    answers: []
                };

                qflag = true;
                aflag = false;
                eflag = false;

                break;
            case "@A":
                aline = 0;
                qflag = false;
                aflag = true;
                eflag = false;
                break;
            case "@E":
                qflag = false;
                aflag = false;
                eflag = true;
                break;
            default:
                if (qflag){
                    question.questionText = question.questionText + "\n" + lines[i];
                } else if (aflag) {
                    if (aline == 0) {
                        question.correctAnswer = (Number(lines[i])-1);
                        aline = 1;
                    } else {
                        question.answers.push(lines[i])

                    }

                } else if (eflag) {
                    questions.questions.push(question);
                    question = {
                        questionText:'',
                        correctAnswer:0,
                        answers: []
                    };
                    eflag = false;                }

                break;

        }
    }


    }


   return questions;
}


let qinit:question[] = [];
const questionState:questionStateInterface = {
    questions:qinit,
    attempted:0,
   correct:0,
   lastQuestion:false,
   begin:false,
   timeleft:600,
   questionsleft:10,
   qcomplete:false,
   questionEl:10,
   timerEl:10


}




export function questionReducer(
    state:questionStateInterface = questionState,
    action: params
  ): questionStateInterface {

    let qmcor = localStorage.getItem("qmcorrect");
    let qmtotal = localStorage.getItem("qmtotal");





    switch (action.type) {
        case "updateTimer":
            return { ...state, timerEl:action.payload, timeleft: (action.payload * 60) }
        break;
        case "updateQuestions":
            return { ...state, questionEl:action.payload, questionsleft: action.payload }
        break;
        case "startQuiz" :
            return { ...state, questionsleft: state.questionEl, timeleft:(state.timerEl * 60), lastQuestion:false,  begin:true, qcomplete:false }
        break;
        case "restartQuiz":
            console.log("RESTARTING QUIZ");
            return { ...state, correct: 0,lastQuestion:false, attempted:0, begin: false, qcomplete:false }
            break;
        case "completeQuiz":
            return { ...state, lastQuestion: false, begin: false, qcomplete: true }
            break;
        case "fileSelected":

            let questions = parseFile(action.payload);

            return {...state,attempted:0, correct:0, questions:questions.questions}
        break;
        case "questionAnswered":


            let correct = 0;
            let lastQuestion = {
                  message: <Message type="error" title="Sorry" description={"Corect answer was:  "+action.payload.correctAnswer} />
            };
            if (action.payload.type == 'correct') {
                correct = 1;

                if (qmcor != null) {
                    localStorage.setItem("qmcorrect", (parseInt(qmcor) + 1).toString())
                } else {
                    localStorage.setItem("qmcorrect", "1");

                }


                lastQuestion.message = <Message type="success" title="Correct" description={"Great Job!"} />
            }




            if (qmtotal != null) {
                localStorage.setItem("qmtotal", (parseInt(qmtotal) + 1).toString())
            } else {
                localStorage.setItem("qmtotal", "1")
            }
            let ltcorrect = localStorage.getItem("qmcorrect");
            let lttotal = localStorage.getItem("qmtotal");
            let begin = true;
            let qcomplete = false;
            if (state.questionsleft < 2) {
                begin = false;
                qcomplete = true;
            }

            return { ...state,begin:begin, qcomplete:qcomplete, questionsleft: (state.questionsleft - 1), lastQuestion:lastQuestion, attempted:state.attempted +1, correct:state.correct +correct }
      default:
        return state
    }
  }



    export default questionReducer;
