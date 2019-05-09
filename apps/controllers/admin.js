const express = require("express");
const router = express.Router();

const adminMd = require("../models/admin");
const userMd = require("../models/user");
const prodMd = require("../models/product");
const helper = require("../helpers/helper");

router.get("/", function (req, res) {
    if (req.session.admin) {
        // res.json({"message": "This is Admin Page"});
        const data = userMd.getAllUsers();
        data.then(function (user) {
            const data = {
                user: user,
                error: false
            };
            res.render("admin/dashboard", { data: data });
        }).catch(function (err) {
            res.render("admin/dashboard", { data: { error: "Không thể lấy danh sách người dùng!" } });
        });
    } else {
        res.redirect("/admin/signinadmin");
    }
});

router.get("/userMgt/detailuser/:userID", function (req, res) {
    if (req.session.admin) {
        const params = req.params;
        const userID = params.userID;

        const data = userMd.getUserByUserID(userID);

        if (data) {
            data.then(function (users) {
                const user = users[0];
                const data = {
                    user: user,
                    error: false
                };
                res.render("admin/userMgt/detailuser", { data: data });
            }).catch(function (err) {
                res.render("admin/userMgt/detailuser", { data: { error: "Không thể lấy dữ liệu của người dùng này!" } });
            });
        }
        else {
            res.render("admin/userMgt/detailuser", { data: { error: "Không thể lấy dữ liệu của người dùng này!" } });
        }
    } else {
        res.redirect("/admin/signinadmin");
    }

});

router.get("/userMgt/edituser/:userID", function (req, res) {
    if (req.session.admin) {
        const params = req.params;
        const userID = params.userID;

        const data = userMd.getUserByUserID(userID);

        if (data) {
            data.then(function (users) {
                const user = users[0];
                const data = {
                    user: user,
                    error: false
                };
                res.render("admin/userMgt/edituser", { data: data });
            }).catch(function (err) {
                res.render("admin/userMgt/edituser", { data: { error: "Không thể lấy dữ liệu của người dùng này!" } });
            });
        }
        else {
            res.render("admin/userMgt/edituser", { data: { error: "Không thể lấy dữ liệu của người dùng này!" } });
        }
    } else {
        res.redirect("/admin/signinadmin");
    }
});

router.put("/userMgt/edituser", function (req, res) {
    const params = req.body;
    console.log(params);
    data = userMd.updateRole(params);

    if (!data) {
        res.json({ status_code: 500 });
    }
    else {
        data.then(function (result) {
            res.json({ status_code: 200 });
        }).catch(function (err) {
            res.json({ status_code: 500 });
        });
    }
});

router.delete("/userMgt/delete", function (req, res) {
    const userID = req.body.userID;
    const data = userMd.deleteUser(userID);

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

// router.get("/signupadmin", function(req, res){
//     res.render("signupadmin", {data: {}});
// });

// router.post("/signupadmin", function(req, res){
//     let admin = req.body;
//     if(admin.adminName.trim().length === 0){
//         res.render("signupadmin", {data: {error: "Vui lòng nhập tên đăng nhập!"}});
//     }
//     else if(admin.email.trim().length === 0){
//         res.render("signupadmin", {data: {error: "Vui lòng nhập email!"}});
//     }
//     else if(admin.password.trim().length === 0){
//         res.render("signupadmin", {data: {error: "Vui lòng nhập mật khẩu!"}});
//     }
//     else if(admin.password.trim().length < 6){
//         res.render("signupadmin", {data: {error: "Mật khẩu gồm từ 6 ký tự trở lên!"}});
//     }
//     else if(admin.password != admin.repassword && admin.password.trim().length !== 0){
//         res.render("signupadmin", {data: {error: "Mật khẩu không khớp!"}});
//     }
//     else if(admin.phone.trim().length === 0){
//         res.render("signupadmin", {data: {error: "Vui lòng nhập số điện thoại!"}});
//     }
//     else {
//         //insert admin
//         let password = helper.hashPassword(admin.password);

//         admin = {
//             adminName: admin.adminName,
//             password: password,
//             email: admin.email,
//             phone: admin.phone,
//             address: admin.address,
//             createDate: admin.createDate,
//             roleID: admin.roleID
//         }
//         let result = adminMd.addAdmin(admin);

//         result.then(function(data){
//             res.redirect("/admin/signinadmin");
//         }).catch(function(err){
//             res.render("signupadmin", {data: {error: "Xin lỗi, bạn hãy thử lại nhé!"}});
//         });
//     }
// });

router.get("/signinadmin", function (req, res) {
    res.render("signinadmin", { data: {} });
});

router.post("/signinadmin", function (req, res) {
    let params = req.body;
    if (params.adminName.trim().length === 0) {
        res.render("signinadmin", { data: { error: "Vui lòng nhập tên đăng nhập!" } });
    }
    else if (params.password.trim().length === 0) {
        res.render("signinadmin", { data: { error: "Vui lòng nhập mật khẩu!" } });
    }
    else {
        const data = adminMd.getAdminByAdminName(params.adminName);

        if (data) {
            data.then(function (admins) {
                const admin = admins[0];

                const status = helper.comparePassword(params.password, admin.password);
                //comparePass(mã login, mã đã hash từ trước)
                if (!status) {
                    res.render("signinadmin", { data: { error: "Mật khẩu không đúng!" } });
                }
                else {
                    req.session.admin = admin; //lưu thông tin admin trong session
                    console.log(req.session.admin);
                    res.redirect("/admin/");
                }
            });
        }
        else {
            res.render("signinadmin", { data: { error: "Người dùng không tồn tại!" } });
        }
    }
});

router.get("/user", function (req, res) {
    res.redirect("/admin");
});


module.exports = router;