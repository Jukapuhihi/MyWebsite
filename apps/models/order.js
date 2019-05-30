const q = require("q");
const db = require("../common/database");

const conn = db.getConnection();

function getAllOrder() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM order', function (err, order) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(order);
        }
    });
    return defer.promise;
}

function addOrder(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('INSERT INTO order SET ?', params, function (err, result) {
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

function getOrderByOrderID(orderID) {
    if (orderID) {
        const defer = q.defer();
        const query = conn.query('SELECT * FROM order WHERE ?', { orderID: orderID }, function (err, result) {
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

function updateOrder(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('UPDATE order SET state=? WHERE orderID=?', [params.state, params.orderID], function (err, result) {
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

function deleteOrder(orderID) {
    if (orderID) {
        const defer = q.defer();
        const query = conn.query('DELETE FROM order WHERE ?', { orderID: orderID }, function (err, result) {
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
    getAllOrder: getAllOrder,
    addOrder: addOrder,
    getOrderByOrderID: getOrderByOrderID,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
}