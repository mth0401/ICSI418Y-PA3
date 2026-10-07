import { useState } from "react";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handSubmit(event) {
    event.preventDefault();

    try {
        const credentials = await fetch(
                "http://localhost:9000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
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
            <h2>Login</h2>

            <form onSubmit={(handSubmit)}>
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
                <button type="submit">Login</button>
            </form>
            <h3>{message}</h3>
        </div>
    );
}

export default Login;