const express = require("express");
const router = express.Router();

const userMd = require("../models/user");
const prodMd = require("../models/product");
const helper = require("../helpers/helper");
const orderMd = require("../models/order");

router.get("/home", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        const username = params.username;

        const data = userMd.getUserByUsername(username);

        if (data) {
            data.then(function (users) {
                const user = users[0];
                const data = {
                    user: user,
                    error: false
                };
                res.render("member/home", { data: data });
            }).catch(function (err) {
                res.render("member/home", { data: { error: "Đăng nhập thất bại, vui lòng đăng nhập lại!" } });
            });
        }
        else {
            res.render("member/home", { data: { error: "Đăng nhập thất bại, vui lòng đăng nhập lại!" } });
        }
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/cart", function (req, res) {
    console.log('cart info: ', req.session.cart)
    res.render("cart", { data: { cart: req.session.cart } });
});

router.get("/checkout", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        res.render("checkout", { data: {cart:  req.session.cart} });
    } else {
        res.redirect("/guess/signin");
    }
});

const checkProductIsValid = (productId, request_quantity) => {
    return new Promise((resolve, reject) => {
        prodMd.getProductByProductID(productId)
        .then((result) => {
            const product = result[0]
            // return reject(new Error('Sản phẩm ' + result.productName + ' không đủ số lượng đặt hàng'));
            if (product.quantity < request_quantity) {
                console.log('Khong du so luong')
                // return reject(new Error('Sản phẩm ' + product.productName + ' không đủ số lượng đặt hàng'))
                return reject({
                    message: 'Sản phẩm ' + product.productName + ' không đủ số lượng đặt hàng',
                });
            }
            return resolve({})
        })
    })
}

router.post("/checkout", function (req, res) {
    // req.session.cart.forEach((item) => {
    //     checkProductIsValid(item.productId)
    // })
    // return res.json({ status_code: 200 });
    // Check xem từng sản phẩm có đủ số lượng yêu cầu hay không
    const arrPromise = req.session.cart.map((item) => {
        return checkProductIsValid(item.productId, item.quantity);
    })
    Promise.all(arrPromise)
    .then((results) => {
        return res.json({ status_code: 200 })
    })
    .then(() => {
        // Nếu các sản phảm đều đủ, tiến hành đặt hàng
        // return;
        let totalPrice = 0;
        const cart = req.session.cart.map((item) => {
            totalPrice += parseInt(item.price) * item.quantity;
            return {
                productId: item.productId,
                quantity: item.quantity,
                prodName: item.prodName,
                price: item.price,
            }
        });
        const address = req.body.address;
        console.log('cart: ', cart);
        console.log('user: ', req.session.user);

        const params = {
            state: 'Chờ xử lý',
            userID: parseInt(req.session.user.userID),
            listprod: JSON.stringify(cart),
            createDate: new Date(),
            totalPrice: totalPrice,
        }
        console.log('address: ', address)
        if (address != undefined) {
            orderMd.addOrder(params)
            .then(function (result) {
                const arrPromise2 = req.session.cart.map((item) => {
                    return prodMd.decreaseProduct(item.productId, item.quantity);
                })
                return Promise.all(arrPromise2)            
            })
            .then(function () {
                req.session.cart = []
                res.json({ status_code: 200 });
            })
            .catch(function (error) {
                console.log('error: ', error);
                res.json({ status_code: 500, message: error.message });
            });
        } else {
            res.json({ status_code: 500 });
        }
    })
    .catch((err) => {
        console.log(err)
        return res.json({ status_code: 500, message: err.message })
    })

       
});

router.get("/accMgt/editprofile", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        res.render("member/accMgt/editprofile", { data: { error: false } });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/bodyskin", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductBodyskin();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/bodyskin", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/bodyskin", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/beautyservice", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductBeautyservice();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/beautyservice", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/beautyservice", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/faceskin", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductFaceskin();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/faceskin", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/faceskin", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/formen", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductFormen();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/formen", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/formen", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/hairnail", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductHairnail();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/hairnail", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/hairnail", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/makeup", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductMakeup();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/makeup", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/makeup", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/makeupcourse", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductMakeupcourse();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/makeupcourse", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/makeupcourse", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/makeupservice", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductMakeupservice();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/makeupservice", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/makeupservice", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/makeuptool", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductMakeuptool();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/makeuptool", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/makeuptool", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/ctcategory/perfume", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getProductPerfume();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("ctcategory/perfume", { data: data });
        }).catch(function (err) {
            res.render("ctcategory/perfume", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/userdetailprod/:productID", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        console.log('cart: ', req.session.cart)
        const params = req.params;
        const productID = params.productID;

        const data = prodMd.getProductByProductID(productID);
        if (data) {
            data.then(function (products) {
                const product = products[0];
                const data = {
                    product: product,
                    error: false
                };
                res.render("userdetailprod", { data: data });
            }).catch(function (err) {
                res.render("userdetailprod", { data: { error: "Không thể lấy dữ liệu sản phẩm này!" } });
            });
        } else {
            res.render("userdetailprod", { data: { error: "Không thể lấy dữ liệu sản phẩm này!" } });
        }
    } else {
        res.redirect("/guess/signin");
    }
});

router.post("/addtocart", function (req, res) {
    const { id, prodName, imageUrl, price } = req.body
    // res.redirect('/guess/ctdetailprod/' + productId)
    if (!req.session.cart) {
        req.session.cart = []
    }
    req.session.cart.push({
        productId: id,
        prodName,
        imageUrl,
        price
    });
    res.status(200).send({
        status_code: 200,
        message: 'OK'
    })
});

router.get("/logout", function (req, res) {
    if (req.session.user && req.session.user.roleID === 0) {
        req.session.destroy();
        res.redirect("/");
        return res.status(200).send();
    } else {
        res.redirect("/home");
    }
});

module.exports = router;