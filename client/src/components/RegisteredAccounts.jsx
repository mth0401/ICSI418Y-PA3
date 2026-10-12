import { useState, useEffect } from "react";

function RegisteredAccounts({onSelectAccount}) {
    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchAccounts() {
            try{
                const registeredAccountCredentials = await fetch(
                    "http://localhost:9000/accounts");

                if(!registeredAccountCredentials.ok) {
                    setMessage("failed to fetch accounts");
                }

                const data = await registeredAccountCredentials.json();
                setAccounts(data);
                }
            catch(error) {
                setMessage("could not reach server")
            }
        }
        fetchAccounts();
    }, []);

    function handleChange(event) {
        onSelectAccount(event.target.value)
    }

    return(
        <div>
            <select onChange={handleChange} defaultValue="">
                <option value="">Select an Account</option>
                {accounts.map((account) => (
                    <option key={account._id} value={account._id}>{account.username}</option>
                ))}
            </select>
            <p>{message}</p>
        </div>
    )
}

export default RegisteredAccounts