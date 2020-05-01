import React from 'react';
import logo from './logo.svg';
import QuestionImport  from './components/questionImport/questionImport';
import QuestionDisplay from './components/questionDisplay/questionDisplay'
import './App.css';



const App = () => {
  return (
    <div className="App">
     <QuestionDisplay></QuestionDisplay>
    </div>
  );
}

export default App;
