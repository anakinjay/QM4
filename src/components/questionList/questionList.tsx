import React from 'react'
import {useSelector, useDispatch } from 'react-redux';
import questionStateInterface from '../../interfaces/questionState';
import QuestionPanel from '../questionPanel/questionPanel';


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


const QuestionList = () => {
    const dispatch = useDispatch();
    const questionState:any = useSelector(state => state);


    let questions = [
        {questionText:"Please load a question file", answers:[], correct:0}
    ];


    let rnum = 0;
    if (questionState.questions.length > 0 && questionState.begin) {
        questions = questionState.questions;
        rnum = getRandomInt(0, questionState.questions.length)
    }
     if (questionState.questions.length > 0 && questionState.begin == false) {
        questions = [
            { questionText: "Select your quiz options and press the start quiz button", answers: [], correct: 0 }
        ];
    }






    return (
        <div>
            <QuestionPanel question={questions[rnum]}></QuestionPanel>

        </div>
    )
}

export default QuestionList;
