import { useState, useEffect } from "react";

function RegisteredAccounts({onSelectAccount}) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function fetchAccounts() {
            try{
                const registeredAccountCredentials = await fetch(
                    "http://localhost:9000/accounts");

                if(!registeredAccountCredentials.ok) {
                    console.error("failed to fetch accounts");
                }

                const data = await registeredAccountCredentials.json();
                setAccounts(data);
                }
            catch(error) {
                console.error("could not reach server")
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
                <option>Select Project Lead</option>
                {accounts.map((account) => (
                    <option key={account._id} value={account.username}>{account.username}</option>
                ))}
            </select>
        </div>
    )
}

export default RegisteredAccounts