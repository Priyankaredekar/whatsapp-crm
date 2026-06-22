const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "mysql-15b502b8-priyankaredekar83-96d9.j.aivencloud.com",
    port: 28448,
    user: "avnadmin",
    password: "AVNS_eUC9rGliIkuexrGJgFl",
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

module.exports = db;