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
    const query = conn.query('SELECT * FROM product WHERE categoryName="Chăm sóc da toàn thân"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductFaceskin() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Chăm sóc da mặt"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductBeautyservice() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Dịch vụ làm đẹp"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductFormen() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Dành cho quý ông"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductHairnail() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Chăm sóc tóc và móng"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductMakeup() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Trang điểm"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductMakeupcourse() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Khóa học trang điểm"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductMakeupservice() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Dịch vụ trang điểm"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductMakeuptool() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Dụng cụ trang điểm"', function (err, product) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(product);
        }
    });
    return defer.promise;
}

function getProductPerfume() {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM product WHERE categoryName="Nước hoa"', function (err, product) {
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
        const query = conn.query('UPDATE product SET productName=?, productBrand=?, categoryName=?, price=?, productDescribe=?, productImg=?  WHERE productID=?', [params.productName, params.productBrand, params.categoryName, params.price, params.productDescribe, params.productImg, params.productID], function (err, result) {
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
    getProductBodyskin: getProductBodyskin,
    getProductBeautyservice: getProductBeautyservice,
    getProductFaceskin: getProductFaceskin,
    getProductFormen: getProductFormen,
    getProductHairnail: getProductHairnail,
    getProductMakeup: getProductMakeup,
    getProductMakeupcourse: getProductMakeupcourse,
    getProductMakeupservice: getProductMakeupservice,
    getProductMakeuptool: getProductMakeuptool,
    getProductPerfume: getProductPerfume
}