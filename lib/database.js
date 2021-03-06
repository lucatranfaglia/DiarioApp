import { createConnection } from 'mysql2';

/**
 * Create connection
 */
const connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true
});

/**
 * Custom format - escape
 */
connection.config.queryFormat = function(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

connection.connect();

connection.on('close', function(err) {
    if (err) {
        console.log(err);
        connection = createConnection(connection.config);
    } else {
        console.log('Connection closed normally.');
    }
});


export default connection;