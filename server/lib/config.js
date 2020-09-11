
const {Pool} = require('pg');
exports.pool = new Pool({
    connectionString: 'postgres://krrudgocngkwmx:b307fe80bdcaeb1825606173a38bcd11778a9b78332edb321a3609c95f032fc1@ec2-54-75-150-32.eu-west-1.compute.amazonaws.com:5432/de6g0vt6hnieqp'
});
exports.privateKey = `kn0wled9e#1998`;