const express = require("express");
const router = express.Router();

router.get("/home", function(req, res){
    res.render("member/home", {data:{error: false}});
});

router.get("/category/bodyskin", function(req, res){
    res.render("category/bodyskin", {data:{error: false}});
});

module.exports = router;