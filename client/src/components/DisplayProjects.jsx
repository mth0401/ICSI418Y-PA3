import { useState, useEffect } from "react";

function DisplayProjects({onSelectProject}) {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch(
                    "http://localhost:9000/projects"
                );

                const data = await response.json();
                setProjects(data);
            } catch (error) {
                setMessage("Failed to fetch projects");
            }
        }

        fetchProjects();
    }, []);
    
    function handleChange(event) {
        onSelectProject(event.target.value)
    }

    return(
        <div>
            <select onChange={handleChange} defaultValue="">
                <option value="">Select a Project</option>
                {projects.map((project) => (
                    <option key={project._id} value={project._id}>{project.projName}</option>
                ))}
            </select>
            <p>{message}</p>
        </div>
    );
}

export default DisplayProjects