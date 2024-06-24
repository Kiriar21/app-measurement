const mongoose = require('mongoose');
const {db_online} = require('../app/config');

async function connection() {
    
    try {
        await mongoose.connect(db_online);
        console.log("Connect to online database succesfull");
    } catch (e) {
        console.log("Connect to online database failed.");
    }
    
}

connection();