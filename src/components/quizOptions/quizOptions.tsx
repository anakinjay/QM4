import React, {useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Navbar, Icon, Dropdown, InputNumber, Grid, Row, Col, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


export default function QuizOptions() {
  const questionState: any = useSelector(state => state);
  const dispatch = useDispatch();
  const timerEl = useRef(null);
  const questionsEl = useRef(null);

  const updateTimer = ()=>{

  }

  const updateQuestions = ()=>{

  }

  return (<div className='qmOptions'>
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={24} sm={24} md={8}>
          <InputNumber onChange={(e) => {

            dispatch({ type: "updateTimer", payload: e})}

            }  ref={timerEl} prefix={'Time Limit'} postfix={'minutes'} defaultValue={questionState.timerEl} max={1000} min={1} step={5} />
          </Col>
          <Col xs={24} sm={24} md={8}>
          <InputNumber onChange={(e) =>{

             dispatch({ type: "updateQuestions", payload: e })}

          }

            ref={questionsEl} prefix={'Ask'} postfix={'questions'} value={questionState.questionEl} max={10000} min={1} step={1} />
          </Col>
          <Col xs={24} sm={24} md={8}>
          <Button onClick={()=>{
            dispatch({ type: 'startQuiz', payload: { time: '0', questions: '0' }});
          }} color='green'>Start Quiz!</Button>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}
