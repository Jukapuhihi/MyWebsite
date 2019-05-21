const express = require("express");
const router = express.Router();

const userMd = require("../models/user");
const prodMd = require("../models/product");
const newsMd = require("../models/news");
const helper = require("../helpers/helper");


router.get("/prodMgt/listprod", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = prodMd.getAllProduct();

        data.then(function (product) {
            const data = {
                product: product,
                error: false
            }
            res.render("manager/prodMgt/listprod", { data: data });
        }).catch(function (err) {
            res.render("manager/prodMgt/listprod", { data: { error: "Không thể lấy danh sách sản phẩm!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.post("/prodMgt/listprod/searchprod", (req, res) => {
    let search = req.body.data;
    let sql = "select * from product where lower(productName) like lower('%" + searchprod + "%')";

    res.send(searchprod);
});

router.get("/prodMgt/listprod/searchprod", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        res.render("manager/prodMgt/listprod/searchprod", { data: { error: false } });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/prodMgt/new", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        res.render("manager/prodMgt/new", { data: { error: false } });
    } else {
        res.redirect("/guess/signin");
    }
});

router.post("/prodMgt/new", function (req, res) {
    const params = req.body;

    if (params.productName.trim().length === 0) {
        const data = {
            error: "Vui lòng nhập tên sản phẩm!"
        };
        res.render("manager/prodMgt/new", { data: data });
    }

    // if (!params.productImg) return res.status(400).send('Không có file nào được tải lên!');

    // var file = params.productImg.uploaded_image;
    // // var img_name = file.name;

    // if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

    //     file.mv('public/imgs/' + file.name, function (err) {

    //         if (err)
    //         return res.status(500).send(err);
    //         // var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";

    //         // var query = db.query(sql, function (err, result) {
    //         //     res.redirect('/manager/prodMgt/listprod' + result.insertId);
    //         // });
    //     });
    // } 
    // // else {
    // //     message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    // //     res.render('/manager/prodMgt/new', { message: message });
    // // }


    const now = new Date();
    params.createDate = now;
    data = prodMd.addProduct(params);

    data.then(function (result) {
        res.redirect("/manager/prodMgt/listprod");
    }).catch(function (error) {
        const data = {
            error: "Không thể thêm sản phẩm mới!"
        };
        res.render("/manager/prodMgt/new", { data: data });
    });
});

router.get("/prodMgt/detailprod/:productID", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
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
                res.render("manager/prodMgt/detailprod", { data: data });
            }).catch(function (err) {
                res.render("manager/prodMgt/detailprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
            });
        }
        else {
            res.render("manager/prodMgt/detailprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
        }
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/prodMgt/editprod/:productID", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
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
                res.render("manager/prodMgt/editprod", { data: data });
            }).catch(function (err) {
                res.render("manager/prodMgt/editprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
            });
        }
        else {
            res.render("manager/prodMgt/editprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
        }
    } else {
        res.redirect("/guess/signin");
    }
});

router.post("/prodMgt/listprod/searchprod", (req, res) => {
    const search = req.body.data;
    const sql = "select * from product where lower(productName) like lower('%" + searchprod + "%')";

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


//news
router.get("/newsMgt/listnews", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const data = newsMd.getAllNews();

        data.then(function (news) {
            const data = {
                news: news,
                error: false
            }
            res.render("manager/newsMgt/listnews", { data: data });
        }).catch(function (err) {
            res.render("manager/newsprodMgt/listnews", { data: { error: "Không thể lấy danh sách tin tức!" } });
        });
    } else {
        res.redirect("/guess/signin");
    }
});

router.post("/newsMgt/listnews/searchnews", (req, res) => {
    let search = req.body.data;
    let sql = "select * from news where lower(newsTitle)) like lower('%" + searchnews + "%')";

    res.send(searchnews);
});

router.get("/newsMgt/listnews/searchnews", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        res.render("manager/newsMgt/listnews/searchnews", { data: { error: false } });
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/newsMgt/new", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        res.render("manager/newsMgt/new", { data: { error: false } });
    } else {
        res.redirect("/guess/signin");
    }
});

router.post("/newsMgt/new", function (req, res) {
    const params = req.body;

    if (params.newsTitle.trim().length === 0 || params.newsContent.trim().length === 0) {
        const data = {
            error: "Vui lòng nhập đầy đủ các mục!"
        };
        res.render("manager/newsMgt/new", { data: data });
    }

    const now = new Date();
    params.createDate = now;

    data = newsMd.addNews(params);

    data.then(function (result) {
        res.redirect("/manager/newsMgt/listnews");
    }).catch(function (error) {
        const data = {
            error: "Không thể thêm tin tức mới!"
        };
        res.render("/manager/newsMgt/new", { data: data });
    });
});

router.get("/newsMgt/detailnews/:newsID", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        const newsID = params.newsID;

        const data = newsMd.getNewsByNewsID(newsID);

        if (data) {
            data.then(function (arrnews) {
                const news = arrnews[0];
                const data = {
                    news: news,
                    error: false
                };
                res.render("manager/newsMgt/detailnews", { data: data });
            }).catch(function (err) {
                res.render("manager/newsMgt/detailnews", { data: { error: "Không thể lấy dữ liệu tin tức này!" } });
            });
        }
        else {
            res.render("manager/newsMgt/detailnews", { data: { error: "Không thể lấy dữ liệu tin tức này!" } });
        }
    } else {
        res.redirect("/guess/signin");
    }
});

router.get("/newsMgt/editnews/:newsID", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        const newsID = params.newsID;

        const data = newsMd.getNewsByNewsID(newsID);

        if (data) {
            data.then(function (arrnews) {
                const news = arrnews[0];
                const data = {
                    news: news,
                    error: false
                };
                console.log(data);
                res.render("manager/newsMgt/editnews", { data: data });
            }).catch(function (err) {
                res.render("manager/newsMgt/editnews", { data: { error: "Không thể lấy dữ liệu tin tức này!" } });
            });
        }
        else {
            res.render("manager/newsMgt/editnews", { data: { error: "Không thể lấy dữ liệu tin tức này!" } });
        }
    } else {
        res.redirect("/guess/signin");
    }
});

router.post("/newsMgt/listnews/searchnews", (req, res) => {
    const search = req.body.data;
    const sql = "select * from news where lower(newsTitle) like lower('%" + searchnews + "%')";

    res.send(search);
});

router.put("/newsMgt/editnews", function (req, res) {
    const params = req.body;
    console.log(params);
    data = newsMd.updateNews(params);

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

router.delete("/newsMgt/delete", function (req, res) {
    const newsID = req.body.newsID;
    const data = newsMd.deleteNews(newsID);

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
//end news

module.exports = router;