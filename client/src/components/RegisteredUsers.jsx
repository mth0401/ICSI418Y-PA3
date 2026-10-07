import { useState } from "react";

function RegisteredAccounts() {
    const [accounts, setAccounts] = useState([]);

    async function handleChange(event) {
        event.preventDefault();
        try{
            const registeredAccountCredentials = await fetch(
                "http://localhost:9000/accounts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        accounts: ,
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
}