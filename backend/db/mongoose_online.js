const mongoose = require('mongoose');
const {db_online} = require('../app/config');

async function connection() {
    
    try {
        await mongoose.createConnection(db_online).asPromise();
        console.log("Connect to online database succesfull");
    } catch (e) {
        console.log("Connect to online database failed.");
        console.log("error: ", e);
    }
    
}

connection();