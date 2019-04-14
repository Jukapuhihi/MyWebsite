const q = require("q");
const db = require("../common/database");

let conn = db.getConnection();

function addAdmin(admin) {
    if (admin) {
        let defer = q.defer();
        let query = conn.query('INSERT INTO admin SET ?', admin, function (err, result) {
            if (err){
                defer.reject(err);
            }
            else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}


function getAdminByAdminName(adminName){
    if(adminName){
        let defer = q.defer();
        let query = conn.query('SELECT * FROM admin WHERE ?', {adminName:adminName}, function(err, result){
            if(err){
                defer.reject(err);
            }
            else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

module.exports = {
    addAdmin: addAdmin,
    getAdminByAdminName: getAdminByAdminName
}