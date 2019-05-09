const express = require("express");
const router = express.Router();

const userMd = require("../models/user");
const prodMd = require("../models/product");
const helper = require("../helpers/helper");

router.get("/", function (req, res) {
    res.render("home", { data: {} });
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

router.get("/ctdetailprod/:productID", function (req, res) {
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
    res.render("cart", { data : {}});
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
                    console.log(req.session.user);
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

module.exports = router;