import { useState } from "react";

function ProjectCreation() {
    const [projName, setProjName] = useState("");
    const [projDescrip, setProjDescrip] = useState("");
    const [projStatus, setProjStatus] = useState("planning");
    const [projLead, setProjLead] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        try{
            const projCredentials = await fetch(
                "http://localhost:9000/projects", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        projName: projName.trim(),
                        projDescrip:  projDescrip.trim(),
                        projStatus: projStatus.trim(),
                        projLead: projLead.trim()
                    })
                }
            );

            const data = await projCredentials.json();
            setMessage(data.message);
        }
        catch(error) {
            setMessage("could not reach server")
        }
    }


    return (
        <div>
            <h2>Create Project</h2>

            <form onSubmit={(handleSubmit)}>
                <label>Name: </label>
                <input
                    type="text"
                    value={projName}
                    onChange={(event) => setProjName(event.target.value)}
                />
                <br />
                <br />
                <label>Description: </label>
                <textarea
                    name = "projDescription"
                    rows="5"
                    cols="50"
                    value = {projDescrip}
                    onChange={(event) => setProjDescrip(event.target.value)}
                />
                <br />
                <label>Status: </label>
                <select value={projStatus} onChange={(event) => setProjStatus(event.target.value)}>
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
                <br />
                <label>Lead Team Member Username: </label>
                <input 
                    
                />
                <br />
                <button type="submit">Create Project</button>
            </form>
            <h3>{message}</h3>
        </div>
    );
}

export default ProjectCreation;