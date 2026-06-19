console.log("NEW SERVER FILE RUNNING");

const express = require("express");
const db = require("./database/db");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


// Save Message API
app.post("/send-message", (req, res) => {

    let message = req.body.message;

    db.query(
        "INSERT INTO messages(sender,message,direction) VALUES(?,?,?)",
        [req.body.sender, message, "sent"],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Error");
            } else {
                res.send("Message Saved Successfully");
            }

        }
    );

});


// Get All Messages API
app.get("/messages", (req, res) => {

    db.query(
        "SELECT * FROM messages ORDER BY id ASC",
        (err, result) => {

            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(result);
            }

        }
    );

});

// Get Messages By Sender
app.get("/messages/:sender", (req, res) => {

    let sender = req.params.sender;

    db.query(
        "SELECT * FROM messages WHERE sender=? ORDER BY id ASC",
        [sender],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(result);
            }

        }
    );

});

// Get All Contacts API
app.get("/contacts", (req, res) => {

    db.query(
        "SELECT * FROM contacts ORDER BY id ASC",
        (err, result) => {

            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(result);
            }

        }
    );

});


app.get("/webhook", (req, res) => {

    const verify_token = "myverifytoken";

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token === verify_token) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});