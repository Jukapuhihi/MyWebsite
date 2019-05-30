const express = require("express");
const router = express.Router();

const userMd = require("../models/user");
const prodMd = require("../models/product");
const helper = require("../helpers/helper");

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
        res.render("checkout", { data: { error: false } });
    } else {
        res.redirect("/guess/signin");
    }
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