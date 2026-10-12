import { useState, useEffect } from 'react';
import DisplayProjects from './DisplayProjects';

function ProjectMemberships() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

    useEffect(() => {
        async function fetchProjects() {
            try {
                const projectCredentials = await fetch(
                    "http://localhost:9000/projects"
                );

                const data = await projectCredentials.json();
                setProjects(data);
            } catch (error) {
                setMessage("Failed to fetch projects");
            }
        }

        fetchProjects();
    }, []);

    const projectData = projects.find(
        project => project._id === selectedProject
    );

    return (
        <div>
            <h2>Manage Project Memberships</h2>

            <DisplayProjects onSelectProject={setSelectedProject} />

            {projectData && selectedProject && (
                <div>
                    <p>Selected Project ID: {selectedProject}</p>
                    <p>Project Description: {projectData.projDescrip}</p>
                </div>
            )}
        </div>
    );
}

export default ProjectMemberships;