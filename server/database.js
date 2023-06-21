const {Pool} = require("pg");

const pool = new Pool ({
    database: "linkedout",
    user: "suraj",
    password: "suraj",
    host: "localhost",
    port: 5432
})

module.exports = pool;