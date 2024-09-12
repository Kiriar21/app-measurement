const mongoose = require('mongoose');
const { db_local } = require('../config');

async function connection() {
    try {
        await mongoose.connect(db_local, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to local database successfully");
    } catch (e) {
        console.log("Connection to local database failed.");
        console.log("Error: ", e);
    }
}

connection();
