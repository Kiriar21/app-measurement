const app = require('./app');
const { port } = require('./config.js');

app.listen(port, (req, res) => {
    console.log('listening on port: ', port);
})