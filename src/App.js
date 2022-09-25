import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesContainer from './Components/NotesContainer/NotesContainer';

const App = () => {
  return (
    <div className="App">
      <h1>Notes App</h1>
      <NotesContainer />
    </div>
  );
}

export default App;