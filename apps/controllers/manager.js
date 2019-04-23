const express = require("express");
const router = express.Router();

const userMd = require("../models/user");
const prodMd = require("../models/product");
const helper = require("../helpers/helper");


router.get("/prodMgt/listprod", function(req, res){
    const params = req.params;
    let page = parseInt(req.query.page) || 1;
    const data = prodMd.getAllProduct();

    data.then(function(product){
        const data = {
            product: product,
            error: false
        }
        res.render("manager/prodMgt/listprod", {data: data});
    }).catch(function(err){
        res.render("manager/prodMgt/listprod", {data: {error: "Không thể lấy danh sách sản phẩm!"}});
    });
});

router.post("/prodMgt/listprod/searchprod", (req, res) => {
    let search = req.body.data;
    let sql = "select * from product where lower(productName) like lower('%"+searchprod+"%')";

    res.send(searchprod);
});

router.get("/prodMgt/listprod/searchprod", function(req, res){
    res.render("manager/prodMgt/listprod/searchprod", {data:{error: false}});
});

router.get("/prodMgt/new", function(req, res){
    res.render("manager/prodMgt/new", {data:{error: false}});
});

router.post("/prodMgt/new", function(req, res){
    const params = req.body;

    if(params.productName.trim().length === 0){
        const data = {
            error: "Vui lòng nhập tên sản phẩm!"
        };
        res.render("manager/prodMgt/new", {data: data});
    }

    const now = new Date();
    params.createDate = now;

    data = prodMd.addProduct(params);

    data.then(function(result){
        res.redirect("/manager/prodMgt/listprod");
    }).catch(function(error){
        const data = {
            error: "Không thể thêm sản phẩm mới!"
        };
        res.render("/manager/prodMgt/new", {data: data});
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
            res.render("manager/prodMgt/detailprod", { data: data });
        }).catch(function (err) {
            res.render("manager/prodMgt/detailprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
        });
    }
    else {
        res.render("manager/prodMgt/detailprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
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
            res.render("manager/prodMgt/editprod", { data: data });
        }).catch(function (err) {
            res.render("manager/prodMgt/editprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
        });
    }
    else {
        res.render("manager/prodMgt/editprod", { data: { error: "Không thể lấy dữ liệu của sản phẩm này!" } });
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