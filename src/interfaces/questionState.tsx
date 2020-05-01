import question from './question';
interface questionStateInterface  {
    questions:question[],
    attempted:number,
    correct:number,
    lastQuestion:object | false,
    begin: boolean,
    timeleft: number,
    questionsleft: number,
    qcomplete: boolean,
    questionEl: number,
    timerEl: number



}

export default questionStateInterface;
