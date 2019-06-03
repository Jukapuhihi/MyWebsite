const q = require("q");
const db = require("../common/database");

const conn = db.getConnection();

function addUser(user) {
    if (user) {
        const defer = q.defer();
        const query = conn.query('INSERT INTO user SET ?', user, function (err, result) {
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

function updateRole(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('UPDATE user SET roleID = ? WHERE userID = ?', [params.roleID, params.userID], function (err, result) {
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

function getUserByUsername(username) {
    if (username) {
        const defer = q.defer();
        const query = conn.query('SELECT * FROM user WHERE ?', { username: username }, function (err, result) {
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

function getUserByUserID(userID) {
    if (userID) {
        const defer = q.defer();
        const query = conn.query('SELECT * FROM user WHERE ?', { userID: userID }, function (err, result) {
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

function getAllUsers(keyword) {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM user WHERE username LIKE ?',['%' + keyword + '%'], function (err, user) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(user);
        }
    });
    return defer.promise;
}

function deleteUser(userID) {
    if (userID) {
        const defer = q.defer();
        const query = conn.query('DELETE FROM user WHERE ?', {userID: userID}, function (err, result) {
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
    addUser: addUser,
    getUserByUsername: getUserByUsername,
    getUserByUserID: getUserByUserID,
    getAllUsers: getAllUsers,
    updateRole: updateRole,
    deleteUser: deleteUser
}