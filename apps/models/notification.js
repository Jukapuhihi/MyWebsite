const q = require("q");
const db = require("../common/database");

const conn = db.getConnection();

function getAllNotification() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM notification', function (err, notification) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(notification);
        }
    });
    return defer.promise;
}

function addNotification(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('INSERT INTO notification SET ?', params, function (err, result) {
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

function getNotificationByNotificationID(notiID) {
    if (notiID) {
        const defer = q.defer();
        const query = conn.query('SELECT * FROM notification WHERE ?', { notiID: notiID }, function (err, result) {
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

function updateNotification(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('UPDATE notification SET notiTitle=?, notiContent=?  WHERE notiID=?', [params.notiTitle, params.notiContent, params.notiID], function (err, result) {
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

function deleteNotification(notiID) {
    if (notiID) {
        const defer = q.defer();
        const query = conn.query('DELETE FROM notification WHERE ?', { notiID: notiID }, function (err, result) {
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
    getAllNotification: getAllNotification,
    addNotification: addNotification,
    getNotificationByNotificationID: getNotificationByNotificationID,
    updateNotification: updateNotification,
    deleteNotification: deleteNotification
}