import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ProjectCreation from './components/ProjectCreation';
import ViewAllProjects from './components/ViewAllProjects'
import './App.css'

function App() {
  const [page, setPage] = useState("login");

  return (
      <div>
          <nav>
              <button onClick={() => setPage("signup")}>Sign Up</button>
              <button onClick={() => setPage("login")}>Login</button>
              <button onClick={() => setPage("createProject")}>Create Projects</button>
              <button onClick={() => setPage("projects")}>View Projects</button>
          </nav>

          {page === "signup" && <Signup />}
          {page === "login" && <Login />}
          {page === "createProject" && <ProjectCreation />}
          {page === "projects" && <ViewAllProjects />}
      </div>
  );
}

export default App
