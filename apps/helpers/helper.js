//hash pw
const bcrypt = require("bcrypt");
const config = require("config");

function hashPassword(password){
    const saltRounds = config.get("salt");

    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);

    return hash;
}

function comparePassword(password, hash){
    return bcrypt.compareSync(password, hash); //true
}


module.exports = {
    hashPassword : hashPassword,
    comparePassword : comparePassword
}