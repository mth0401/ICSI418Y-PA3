import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ProjectCreation from './components/ProjectCreation';
import './App.css'

function App() {

  return (
    <div>
      <Signup />
      <br />
      <br />
      <Login />
      <br />
      <br />
      <ProjectCreation />
    </div>
  );
}

export default App
