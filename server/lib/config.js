
const {Pool} = require('pg');
exports.pool = new Pool({
    connectionString: 'postgres://rvxfsqlulhpphm:da2bfe91bfdb0f7e197624559651475678b11d4d2d6604f11c252bd975a793f8@ec2-52-48-65-240.eu-west-1.compute.amazonaws.com:5432/d6u5k9nv28q1v6'
});
exports.privateKey = `kn0wled9e#1998`;