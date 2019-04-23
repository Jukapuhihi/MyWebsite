const express = require("express");
const router = express.Router();

const userMd = require("../models/user");
const prodMd = require("../models/product");
const helper = require("../helpers/helper");

router.get("/home/:username", function(req, res){
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
});

router.get("/accMgt/editprofile", function(req, res){
    res.render("member/accMgt/editprofile", {data:{error: false}});
});

router.get("/category/bodyskin", function(req, res){
    res.render("category/bodyskin", {data:{error: false}});
});



module.exports = router;