import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ProjectCreation from './components/ProjectCreation';
import './App.css'

function App() {
  const [page, setPage] = useState("login");

  return (
      <div>
          <nav>
              <button onClick={() => setPage("signup")}>Sign Up</button>
              <button onClick={() => setPage("login")}>Login</button>
              <button onClick={() => setPage("createProject")}>Create Project</button>
          </nav>

          {page === "signup" && <Signup />}
          {page === "login" && <Login />}
          {page === "createProject" && <ProjectCreation />}
      </div>
  );
}

export default App
