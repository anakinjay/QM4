import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useSelector, useDispatch } from 'react-redux';
import Confetti from 'react-confetti'


export default function QuizResults() {
  const questionState: any = useSelector(state => state);
  const { width, height } = useWindowSize()
  return (
    <div>
      <Confetti
      recycle={false}
        width={width}
        height={height}
      />
      <div style={{fontSize:"40px"}}>Quest Complete!</div>

      Your Score: {questionState.correct}/{questionState.attempted}
      <div style={{ fontSize: "30px", fontWeight:"bold" }}> {(Math.round((questionState.correct / questionState.attempted) * 10) * 10)}%</div>
    </div>
  )
}
