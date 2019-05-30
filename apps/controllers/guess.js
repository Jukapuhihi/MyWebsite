const express = require("express");
const router = express.Router();

const userMd = require("../models/user");
const prodMd = require("../models/product");
const helper = require("../helpers/helper");

router.get("/", function (req, res) {
    console.log('req.session.user.userID: ', req.session.user.userID);
    if (req.session.user.userID === 0) {
        res.redirect("/member/home");
    } else {
        res.redirect("home", { data: {} });
    };
});

router.get("/category/bodyskin", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductBodyskin();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/bodyskin", {data: data});
    }).catch(function(err){
        res.render("category/bodyskin", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/beautyservice", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductBeautyservice();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/beautyservice", {data: data});
    }).catch(function(err){
        res.render("category/beautyservice", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/faceskin", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductFaceskin();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/faceskin", {data: data});
    }).catch(function(err){
        res.render("category/faceskin", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/formen", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductFormen();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/formen", {data: data});
    }).catch(function(err){
        res.render("category/formen", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/hairnail", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductHairnail();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/hairnail", {data: data});
    }).catch(function(err){
        res.render("category/hairnail", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/makeup", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductMakeup();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/makeup", {data: data});
    }).catch(function(err){
        res.render("category/makeup", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/makeupcourse", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductMakeupcourse();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/makeupcourse", {data: data});
    }).catch(function(err){
        res.render("category/makeupcourse", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/makeupservice", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductMakeupservice();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/makeupservice", {data: data});
    }).catch(function(err){
        res.render("category/makeupservice", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/makeuptool", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductMakeuptool();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/makeuptool", {data: data});
    }).catch(function(err){
        res.render("category/makeuptool", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/category/perfume", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getProductPerfume();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("category/perfume", {data: data});
    }).catch(function(err){
        res.render("category/perfume", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.get("/ctdetailprod/:productID", function (req, res) {
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
            res.render("ctdetailprod", { data: data });
        }).catch(function (err) {
            res.render("ctdetailprod", { data: { error: "Không thể lấy dữ liệu sản phẩm này!"} });
        });
    } else {
        res.render("ctdetailprod", { data: { error:"Không thể lấy dữ liệu sản phẩm này!"}});
    }
});

router.get("/cart", function (req,res) {
    console.log('cart info: ', req.session.cart)
    res.render("cart", { data : {cart:  req.session.cart}});
});

router.get("/signup", function (req, res) {
    res.render("signup", { data: {} });
});

router.post("/signup", function (req, res) {

    let user = req.body;

    if (user.username.trim().length === 0) {
        res.render("signup", { data: { error: "Vui lòng nhập tên đăng nhập!" } });
    }
    else if (user.email.trim().length === 0) {
        res.render("signup", { data: { error: "Vui lòng nhập email!" } });
    }
    else if (user.password.trim().length === 0) {
        res.render("signup", { data: { error: "Vui lòng nhập mật khẩu!" } });
    }
    else if (user.password.trim().length < 6) {
        res.render("signup", { data: { error: "Mật khẩu gồm từ 6 ký tự trở lên!" } });
    }
    else if (user.password != user.repassword && user.password.trim().length !== 0) {
        res.render("signup", { data: { error: "Mật khẩu không khớp!" } });
    }
    else if (user.phone.trim().length === 0) {
        res.render("signup", { data: { error: "Vui lòng nhập số điện thoại!" } });
    }
    else {
        //insert to DB
        const password = helper.hashPassword(user.password);

        const now = new Date();
        user.createDate = now;

        user = {
            username: user.username,
            password: password,
            email: user.email,
            phone: user.phone,
            address: user.address,
            createDate: user.createDate,
            roleID: user.roleID
        }
        const result = userMd.addUser(user);

        result.then(function (data) {
            res.redirect("/guess/signin");
        }).catch(function (err) {
            res.render("signup", { data: { error: "Xin lỗi, bạn hãy thử lại nhé!" } });
        });
    }
});

router.get("/signin", function (req, res) {
    res.render("signin", { data: {} });
});

router.post("/signin", function (req, res) {
    let params = req.body;
    if (params.username.trim().length === 0) {
        res.render("signin", { data: { error: "Vui lòng nhập tên đăng nhập!" } });
    }
    else if (params.password.trim().length === 0) {
        res.render("signin", { data: { error: "Vui lòng nhập mật khẩu!" } });
    }
    else {
        const data = userMd.getUserByUsername(params.username);

        if (data) {
            data.then(function (users) {
                const user = users[0];

                const status = helper.comparePassword(params.password, user.password);
                //comparePass(mã login, mã đã hash từ trước)
                if (!status) {
                    res.render("signin", { data: { error: "Mật khẩu không đúng!" } });
                }
                else {
                    req.session.user = user; //lưu thông tin user trong session
                    console.log(req.session);
                    if (req.session.user.roleID === 0) {
                        res.redirect("/member/home");
                    }
                    else if (req.session.user.roleID === 1) {
                        res.redirect("/manager/prodMgt/listprod");
                    }
                }
            });
        }
        else {
            res.render("signin", { data: { error: "Người dùng không tồn tại!" } });
        }
    }
});

router.post("/addtocart", function(req, res){

    const {id, prodName, quantity = 1, imageUrl, price} = req.body;
    // res.redirect('/guess/ctdetailprod/' + productId)
    if (!req.session.cart) {
        req.session.cart = []
    };
    req.session.cart.push({
        productId: id,
        quantity: quantity,
        prodName,
        imageUrl,
        price
    });
    // for(let i; i < req.session.cart.length; i++) {
    //     let totalPrice = 0;
    //     totalprice = totalPrice + req.session.cart.price[i];
    //     req.session.cart.push({
    //         totalPrice: totalPrice
    //     });
    // }
    res.status(200).send({
        message: 'OK'
    });
});

router.delete("/cart/delete", function (req, res) {
    const productId = req.body.productId;
    // for(let i=0; i < req.session.cart.length; i++) {
    //     if(req.session.cart[i].productId === productId) {
    //         req.session.cart.splice(i, 1);
    //         console.log(req.session.cart);
    //     }
    // }
    app = req.session.cart;
    const removeIndex = app.map(function(el){ return el.productId; }).indexOf(productId);
    app.splice(removeIndex, 1);

    if (!data) {
        res.json({ status_code: 500 });
    }
    else {
        data.then(function (result) {
            res.json({ status_code: 200 });
        }).catch(function () {
            res.json({ status_code: 500 });
        });
    }
});

module.exports = router;