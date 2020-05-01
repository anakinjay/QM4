import React from 'react'
import QuestionImport from '../questionImport/questionImport';
import ScoreBar from '../scoreBar/scoreBar';
import QuestionList from '../questionList/questionList';

const QuestionDisplay = (props) => {
  
    return (
        <div>
            <ScoreBar />
            <QuestionImport></QuestionImport>
            <QuestionList></QuestionList>
        </div>
    )
}


export default QuestionDisplay

