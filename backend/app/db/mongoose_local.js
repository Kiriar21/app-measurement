const mongoose = require('mongoose');
const {db_local} = require('../app/config');

async function connection() {
    
    try {
        await mongoose.createConnection(db_local).asPromise();
        console.log("Connect to local database succesfull");
    } catch (e) {
        console.log("Connect to local database failed.");
        console.log("error: ", e);
    }
    
}

connection();