require('dotenv').config()

module.exports = {
    port : process.env.PORT || 5001,
    sessionKeySecret: process.env.SESSION_KEY_SECRET,
    db_local : process.env.CONNECTION_STRING_LOCAL,
    db_online : process.env.CONNECTION_STRING_ONLINE,
}