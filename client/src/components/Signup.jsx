import { useState } from "react";


function Signup() {
    const [f_name, setF_name] = useState("");
    const [l_name, setL_name] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handSubmit(event) {
    event.preventDefault();

    try {
        const credentials = await fetch(
                "http://localhost:9000/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                            f_name: f_name.trim(),
                            l_name: l_name.trim(),
                            username: username.trim(),
                            password: password.trim()
                    })
                }
        );
        
        const data = await credentials.json();
        
        setMessage(data.message);
        
    } catch (error) {
        setMessage("Could not reach server");
    }
}

    return (
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={(handSubmit)}>
                <label>First Name: </label>
                <input
                    type="text"
                    value={f_name}
                    onChange={(event) => setF_name(event.target.value)}
                />
                <br />
                <label>Last Name: </label>
                <input
                    type="text"
                    value={l_name}
                    onChange={(event) => setL_name(event.target.value)}
                />
                <br />
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <label>Password: </label>
                <input
                    type = "text"
                    value = {password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <h3>{message}</h3>
        </div>
    );
}

export default Signup;