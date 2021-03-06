const express = require("express");
const router = express.Router();

const userMd = require("../models/user");
const prodMd = require("../models/product");
const newsMd = require("../models/news");
const orderMd = require("../models/order");
const notiMd = require("../models/notification");
const helper = require("../helpers/helper");


router.get("/prodMgt/listprod", function (req, res) {
    console.log('manager session: ', req.session)
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        const keyword = req.query.keyword;

        const data = keyword == undefined ? prodMd.getAllProduct('') : prodMd.getAllProduct(keyword.trim());

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
        res.redirect("/guest/signin");
    }
});


router.get("/prodMgt/new", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        res.render("manager/prodMgt/new", { data: { error: false } });
    } else {
        res.redirect("/guest/signin");
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
        res.redirect("/guest/signin");
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
        res.redirect("/guest/signin");
    }
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
        // const data = newsMd.getAllNews();
        const keyword = req.query.keyword;

        const data = keyword == undefined ? newsMd.getAllNews('') : newsMd.getAllNews(keyword.trim());

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
        res.redirect("/guest/signin");
    }
});

router.get("/newsMgt/new", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        res.render("manager/newsMgt/new", { data: { error: false } });
    } else {
        res.redirect("/guest/signin");
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
        res.redirect("/guest/signin");
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
        res.redirect("/guest/signin");
    }
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

//notification
router.get("/notiMgt/listnoti", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        // const data = notiMd.getAllNotification();
        const keyword = req.query.keyword;

        const data = keyword == undefined ? notiMd.getAllNotification('') : notiMd.getAllNotification(keyword.trim());

        data.then(function (notification) {
            const data = {
                notification: notification,
                error: false
            }
            res.render("manager/notiMgt/listnoti", { data: data });
        }).catch(function (err) {
            res.render("manager/notiprodMgt/listnoti", { data: { error: "Không thể lấy danh sách thông báo!" } });
        });
    } else {
        res.redirect("/guest/signin");
    }
});

router.get("/notiMgt/new", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        res.render("manager/notiMgt/new", { data: { error: false } });
    } else {
        res.redirect("/guest/signin");
    }
});

router.post("/notiMgt/new", function (req, res) {
    const params = req.body;

    if (params.notiTitle.trim().length === 0 || params.notiContent.trim().length === 0) {
        const data = {
            error: "Vui lòng nhập đầy đủ các mục!"
        };
        res.render("manager/notiMgt/new", { data: data });
    }

    const now = new Date();
    params.createDate = now;

    data = notiMd.addNotification(params);

    data.then(function (result) {
        res.redirect("/manager/notiMgt/listnoti");
    }).catch(function (error) {
        const data = {
            error: "Không thể thêm thông báo mới!"
        };
        res.render("/manager/notiMgt/new", { data: data });
    });
});

router.get("/notiMgt/detailnoti/:notiID", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        const notiID = params.notiID;

        const data = notiMd.getNotificationByNotificationID(notiID);

        if (data) {
            data.then(function (arrnoti) {
                const notification = arrnoti[0];
                const data = {
                    notification: notification,
                    error: false
                };
                res.render("manager/notiMgt/detailnoti", { data: data });
            }).catch(function (err) {
                res.render("manager/notiMgt/detailnoti", { data: { error: "Không thể lấy dữ liệu thông báo này!" } });
            });
        }
        else {
            res.render("manager/notiMgt/detailnoti", { data: { error: "Không thể lấy dữ liệu thông báo này!" } });
        }
    } else {
        res.redirect("/guest/signin");
    }
});

router.get("/notiMgt/editnoti/:notiID", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        const notiID = params.notiID;

        const data = notiMd.getNotificationByNotificationID(notiID);

        if (data) {
            data.then(function (arrnoti) {
                const notification = arrnoti[0];
                const data = {
                    notification: notification,
                    error: false
                };
                console.log(data);
                res.render("manager/notiMgt/editnoti", { data: data });
            }).catch(function (err) {
                res.render("manager/notiMgt/editnoti", { data: { error: "Không thể lấy dữ liệu thông báo này!" } });
            });
        }
        else {
            res.render("manager/notiMgt/editnoti", { data: { error: "Không thể lấy dữ liệu thông báo này!" } });
        }
    } else {
        res.redirect("/guest/signin");
    }
});

router.put("/notiMgt/editnoti", function (req, res) {
    const params = req.body;
    console.log(params);
    data = notiMd.updateNotification(params);

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

router.delete("/notiMgt/delete", function (req, res) {
    const notiID = req.body.notiID;
    const data = notiMd.deleteNotification(notiID);

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
//end notification

//order
router.get("/orderMgt/listorder", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        let page = parseInt(req.query.page) || 1;
        // const data = orderMd.getAllOrder();
        const keyword = req.query.keyword;

        const data = keyword == undefined ? orderMd.getAllOrder('') : orderMd.getAllOrder(keyword.trim());

        data.then(function (ordertable) {
            const data = {
                ordertable: ordertable,
                error: false
            }
            res.render("manager/orderMgt/listorder", { data: data });
        }).catch(function (err) {
            res.render("manager/orderMgt/listorder", { data: { error: "Không thể lấy danh sách đơn bán!" } });
        });
    } else {
        res.redirect("/guest/signin");
    }
});

router.get("/orderMgt/editorder/:orderID", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        const params = req.params;
        const orderID = params.orderID;
        console.log('orderID: ', orderID)

        const data = orderMd.getOrderByOrderID(orderID);

        if (data) {
            data.then(function (arrorder) {
                const ordertable = arrorder[0];
                const data = {
                    ordertable: ordertable,
                    error: false
                };
                console.log(data);
                res.render("manager/orderMgt/editorder", { data: data });
            }).catch(function (err) {
                res.render("manager/orderMgt/editorder", { data: { error: "Không thể lấy dữ liệu đơn hàng này!" } });
            });
        }
        else {
            res.render("manager/orderMgt/editorder", { data: { error: "Không thể lấy dữ liệu đơn hàng này!" } });
        }
    } else {
        res.redirect("/guest/signin");
    }
});

router.put("/orderMgt/editorder", function (req, res) {
    const params = req.body;
    console.log('params', params);
    data = orderMd.updateOrder(params);

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
//endorder

router.get("/logout", function (req, res) {
    if (req.session.user && req.session.user.roleID === 1) {
        req.session.destroy();
        res.redirect("/");
        return res.status(200).send();
    } else {
        res.redirect("/guest/signin");
    }
});

module.exports = router;