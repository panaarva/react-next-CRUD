
const {Pool} = require('pg');
exports.pool = new Pool({
    user: 'nextjs',
    host: '127.0.0.1',
    database: 'nextjs',
    password: 'nextjs',
    port: 5432
});
exports.privateKey = `kn0wled9e#1998`;