const q = require("q");
const db = require("../common/database");

const conn = db.getConnection();

function getCategoryByCategoryID(categoryID) {
    if (categoryID) {
        const defer = q.defer();
        const query = conn.query('SELECT * FROM category WHERE ?', { categoryID: categoryID }, function (err, result) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

module.exports = {
    getCategoryByCategoryID: getCategoryByCategoryID,
}