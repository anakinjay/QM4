import React from 'react'
import largeSample from './largeSample';
import question from '../../interfaces/question';
import questionSource from '../../interfaces/questionSource';
import {useSelector, useDispatch } from 'react-redux';

const QuestionImport = (props:any) => {
    const questionState = useSelector(state => state);
    const dispatch = useDispatch();


   

  /*
    let ret = questionState.questions.map(element => {
       
      return <div>{element.questionText}</div>
        
    });
 */

    return (
        <div>
             </div>
    )
}

export default QuestionImport;
