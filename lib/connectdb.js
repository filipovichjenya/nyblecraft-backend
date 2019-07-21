const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'randomusername',
    password: 'randompass',
    database: 'nybletest'
})
connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;