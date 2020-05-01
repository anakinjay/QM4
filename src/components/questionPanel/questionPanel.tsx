import React, {useRef} from 'react'
import {useSelector, useDispatch } from 'react-redux';
import {ButtonGroup, Button, Grid, Col, Row, Panel, PanelGroup } from 'rsuite';
import QuizTimer from '../quizTimer/QuizTimer';
import QuizResults from '../../quizResults/QuizResults';

const QuestionPanel = (props) => {
    const questionState:any = useSelector(state => state);
    const dispatch = useDispatch();


    console.log(props.question);
    let qtext = props.question.questionText.split('\n').map((item, i) => {
        return <p key={i}>{item}</p>;
    });

    let feedback = <div />;
    let timer = <div />;
    let score = <div />
    if (questionState.lastQuestion && questionState.begin == true) {
        feedback = <div>{questionState.lastQuestion.message}</div>;
        timer = <QuizTimer />
    }

    if (questionState.begin == false && questionState.qcomplete) {
        score = <QuizResults />
    }


    let ablocks = props.question.answers.map((e, i)=>{
        let payload = {
            type:'incorrect',
            correctAnswer: props.question.answers[props.question.correctAnswer]
        }
        if (i == props.question.correctAnswer) {
            payload.type = 'correct';
        }
    return <Col key={i}><Panel className='answerPanel' shaded key={i}  onClick={(e)=>dispatch({type:'questionAnswered',payload:payload})}>{e}</Panel></Col>
    });



    return (
        <div>
            <Panel >
            {timer}
            {feedback}
            {score}
                <span className='questionText'>
            {qtext}
            </span>
            <Grid>
                    <Row>
                      {ablocks}
                    </Row>
                </Grid>

            </Panel>

        </div>
    )
}

export default QuestionPanel;

