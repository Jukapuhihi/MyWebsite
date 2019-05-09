const q = require("q");
const db = require("../common/database");

const conn = db.getConnection();

function getAllProduct() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductBodyskin() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryID=1', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

// function getAllProduct(page) {
//     if (page) {
//         const defer = q.defer();
//         const query = conn.query('SELECT * FROM product LIMIT 2 OFFSET 2*?', page, function (err, product) {
//             if (err) {
//                 defer.reject(err);
//             }
//             else {
//                 defer.resolve(product);
//             }
//         });
//         return defer.promise;
//     }
//     return false;
// }

function addProduct(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('INSERT INTO product SET ?', params, function (err, result) {
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

function getProductByProductID(productID) {
    if (productID) {
        const defer = q.defer();
        const query = conn.query('SELECT * FROM product WHERE ?', { productID: productID }, function (err, result) {
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

function updateProd(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('UPDATE product SET productName=?, productBrand=?, price=?, productDescribe=?, productImg=?  WHERE productID=?', [params.productName, params.productBrand, params.price, params.productDescribe, params.productImg, params.productID], function (err, result) {
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

function deleteProduct(productID) {
    if (productID) {
        const defer = q.defer();
        const query = conn.query('DELETE FROM product WHERE ?', { productID: productID }, function (err, result) {
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
    getAllProduct: getAllProduct,
    addProduct: addProduct,
    getProductByProductID: getProductByProductID,
    updateProd: updateProd,
    deleteProduct: deleteProduct,
    getProductBodyskin: getProductBodyskin
}