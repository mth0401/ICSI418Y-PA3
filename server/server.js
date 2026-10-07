require("dotenv").config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("ICS418Y-PA2");
const accounts = db.collection("accounts");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
});

async function connectDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
    }
}
connectDatabase();

app.post("/signup", async (req, res) => {
    const f_name = req.body.f_name;
    const l_name = req.body.l_name;
    const username = req.body.username;
    const password = req.body.password;

    if(f_name === "" || l_name === "" || username === "" || password === "") {
        res.status(400).json({
            message: "one or more fields is empty"
        })
    }
    else {
        try {
            const existingAccount = await accounts.findOne({
                username: username
            });

            if(existingAccount === null) {
                const account = {
                    f_name: f_name,
                    l_name: l_name,
                    username: username,
                    password: password
                };
                await accounts.insertOne(account);

                res.status(201).json({
                    message: "account created"
                });
            }
            else {
                res.status(409).json({
                    message: "An account with that username already exists"
                });
            }
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Server Error"
            });
        }
    }
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username === "" || password === "") {
        res.status(400).json({
            message: "username or password is empty"
        })
    }
    else {
        try {
            const existingUsername = await accounts.findOne({
                username: username
            });

            if(existingUsername === null) {
                res.status(401).json({
                    message: "An account with associated username does not exist"
                });
            }
            else {
                const existingAccount = await accounts.findOne({
                    username: username,
                    password: password
                })
                
                if(existingAccount === null) {
                    res.status(401).json({
                        message: "password is incorrect"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Login successful"
                    });
                }
            }
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Server Error"
            });
        }
    }
});