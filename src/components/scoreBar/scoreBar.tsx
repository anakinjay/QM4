import React from 'react'
import {useSelector, useDispatch } from 'react-redux';
import {Nav, Navbar, Icon, Dropdown,  Grid, Row, Col, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import QuizOptions from '../quizOptions/quizOptions';


const ScoreBar = (props) => {

    const questionState:any = useSelector(state => state);
    const dispatch = useDispatch();

    const loadFile = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e:any)=>{

            let reader = new FileReader();
            reader.readAsText(e.target.files[0]);

            reader.onload=(e:any)=>{

                dispatch({type:'fileSelected',payload:e.target.result});
            };


          //
        };
        input.click();

    }



    if (localStorage.getItem("qmcorrect") == null) {
        localStorage.setItem("qmcorrect",'0');
    }
    if (localStorage.getItem("qmtotal") == "NaN") {
        localStorage.setItem("qmtotal", '0');
    }



    let quizOp = <div />;
    let restart = <div />;
    if (questionState.questions.length > 0 && questionState.begin == false) {
        quizOp = <QuizOptions />;
    }
    if (questionState.questions.length > 0 && questionState.begin == true) {
        restart = <Button onClick={(e) =>{

            dispatch({ type: 'restartQuiz', payload: false });

        }}>Restart Quiz</Button>;
    };



    return (
        <div>
            <Grid fluid>
                <Row className="qmHeader">
                <Col  xs={3}><img className='qmLogo' src='qmlogo.png'></img></Col>

                    <Col xs={9}>Current Score: {questionState.correct}/{questionState.attempted} -- Lifetime Score: {localStorage.getItem("qmcorrect")} / {localStorage.getItem("qmtotal")} </Col>
                    <Col xs={3} ><Button onClick={(e) => loadFile()}>Load Question File</Button> </Col>
                    <Col xs={3} >{restart}  </Col>
                </Row>
                <Row>
                    {quizOp}
                </Row>
            </Grid>

        </div>
    )
}

export default ScoreBar

