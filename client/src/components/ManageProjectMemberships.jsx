import { useState, useEffect } from 'react';
import DisplayProjects from './DisplayProjects';
import RegisteredAccounts from './RegisteredAccounts';

function ProjectMemberships() {
    const [accounts, setAccounts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");
    const [accountMemberships, setAccountMemberships] = useState([]);
    const [message, setMessage] = useState("");

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

        async function fetchAccounts() {
            try{
                const registeredAccountCredentials = await fetch(
                    "http://localhost:9000/accounts"
                );

                const data = await registeredAccountCredentials.json();
                setAccounts(data);
            }
            catch(error) {
                setMessage("could not reach server")
            }
        }

        async function fetchTogether() {
            try {
                await fetchAccounts();
                await fetchProjects();
            } catch(error) {
                setMessage("could not reach server");
            }
        }

        fetchTogether();
    }, []);

    async function fetchMemberships() {
            try {
                if(!selectedProject) {
                    setAccountMemberships([]);
                }
                else {
                    const memberships = await fetch(
                        "http://localhost:9000/projects/"+ selectedProject +"/members"
                    );

                    const data = await memberships.json();
                    setAccountMemberships(data);
                }
            } catch(error) {
                setMessage("could not reach server");
            }
        }

    useEffect(() => {
        fetchMemberships();
    }, [selectedProject])

    const projectData = projects.find(
        project => project._id === selectedProject
    );
    
    async function handleAddMember(event) {
        event.preventDefault();
        try {
            if (!selectedAccount || !selectedProject) {
                setMessage("Please select a project and an account");
            }
            else {
                const memberCredentials = await fetch(
                    "http://localhost:9000/projects/"+ selectedProject +"/members", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            accountId: selectedAccount
                        })
                    }
                );

                const data = await memberCredentials.json();
                setMessage(data.message);
                await fetchMemberships();
            }
        } catch(error) {
            setMessage("could not reach server");
        }


    };

    async function handleDeleteMember(event) {
        event.preventDefault();
        try {
            if (!selectedAccount || !selectedProject) {
                setMessage("Please select a project and an account");
            }
            else {
                const memberCredentials = await fetch(
                    "http://localhost:9000/projects/"+ selectedProject +"/members/"+ selectedAccount, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            accountId: selectedAccount
                        })
                    }
                );

                const data = await memberCredentials.json();
                setMessage(data.message);
                await fetchMemberships();
            }
        } catch (error) {
            setMessage("could not reach server");
        }
    }

    return (
        <div>
            <h2>Manage Project Memberships</h2>

            <DisplayProjects onSelectProject={setSelectedProject} />
            <RegisteredAccounts onSelectAccount={setSelectedAccount} useUsername={false} />
            {projectData && selectedProject && (
                <div>
                    <button onClick={handleAddMember}>Add Member</button>
                    <button onClick={handleDeleteMember}>Delete Member</button>
                    <p>Selected Project ID: {selectedProject}</p>
                    <p>Project Description: {projectData.projDescrip}</p>
                    <h3>Members</h3>
                    {accountMemberships.map((member) => {
                        const account = accounts.find(
                            account => account._id === member.projMemberId
                        )
                        return <p key={member._id}>{account.username}</p>
                    })}
                </div>
            )}
            <h3>{message}</h3>
        </div>
    )
}

export default ProjectMemberships