const express = require("express");
const router = express.Router();

const adminMd = require("../models/admin");
const userMd = require("../models/user");
const prodMd = require("../models/product");
const helper = require("../helpers/helper");

router.get("/", function (req, res) {
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
});

router.get("/userMgt/detailuser/:userID", function (req, res) {
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
});

router.get("/userMgt/edituser/:userID", function (req, res) {
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

router.get("/user", function(req,res){
    res.redirect("/admin");
});


//manager
router.get("/prodMgt/listprod", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getAllProduct();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("admin/prodMgt/listprod", {data: data});
    }).catch(function(err){
        res.render("admin/prodMgt/listprod", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.post("/prodMgt/listprod/searchprod", (req, res) => {
    let search = req.body.data;
    let sql = "select * from product where lower(productName) like lower('%"+searchprod+"%')";

    res.send(searchprod);
});

router.get("/prodMgt/listprod/searchprod", function(req, res){
    res.render("admin/prodMgt/listprod/searchprod", {data:{error: false}});
});

router.get("/prodMgt/new", function(req, res){
    res.render("admin/prodMgt/new", {data:{error: false}});
});

router.post("/prodMgt/new", function(req, res){
    const params = req.body;

    if(params.productName.trim().length === 0){
        const data = {
            error: "Vui lòng nhập tên sản phẩm!"
        };
        res.render("admin/prodMgt/new", {data: data});
    }

    const now = new Date();
    params.createDate = now;

    data = prodMd.addProduct(params);

    data.then(function(result){
        res.redirect("/admin/prodMgt/listprod");
    }).catch(function(error){
        const data = {
            error: "Không thể thêm sản phẩm mới!"
        };
        res.render("/admin/prodMgt/new", {data: data});
    });
});

router.get("/prodMgt/detailprod/:productID", function (req, res) {
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
            res.render("admin/prodMgt/detailprod", { data: data });
        }).catch(function (err) {
            res.render("admin/prodMgt/detailprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
        });
    }
    else {
        res.render("admin/prodMgt/detailprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
    }
});

router.get("/prodMgt/editprod/:productID", function (req, res) {
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
            res.render("admin/prodMgt/editprod", { data: data });
        }).catch(function (err) {
            res.render("admin/prodMgt/editprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
        });
    }
    else {
        res.render("admin/prodMgt/editprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
    }
});

router.post("/prodMgt/listprod/searchprod", (req, res) => {
    const search = req.body.data;
    const sql = "select * from product where lower(productName) like lower('%"+searchprod+"%')";
    
    res.send(search);
});

router.put("/prodMgt/editprod", function (req, res) {
    const params = req.body;
    console.log(params);
    data = prodMd.updateProd(params);

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

router.delete("/prodMgt/delete", function (req, res) {
    const productID = req.body.productID;
    const data = prodMd.deleteProduct(productID);

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