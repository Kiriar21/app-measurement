const mongoose = require('mongoose');
const {db_local} = require('../app/config');

async function connection() {
    
    try {
        await mongoose.connect(db_local);
        console.log("Connect to local database succesfull");
    } catch (e) {
        console.log("Connect to local database failed.");
    }
    
}

connection();