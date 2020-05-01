import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Countdown from 'react-countdown';
import {Message} from 'rsuite';

export default function QuizTimer() {
    const questionState: any = useSelector(state => state);
  const dispatch = useDispatch();
  const [counter, setCounter] = React.useState(questionState.timeleft);
    React.useEffect(() => {
      if (counter > 0 && questionState.begin) {
         setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        dispatch({ type: "completeQuiz", payload: null })
      }





    }, [counter]);
  return (
    <div>
      <Message
        type="info"
        title="Time Left"
        description={
          <p >
            <div style={{ fontSize: '30px' }}>{Math.round((counter / 60) * 10) / 10} minutes</div>

          </p>
        }
      />


    </div>
  )
}
