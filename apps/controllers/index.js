const express = require("express");

const router = express.Router();

router.use("/admin", require(__dirname + "/admin"));
router.use("/member", require(__dirname + "/member"));
router.use("/guess", require(__dirname + "/guess"));

router.get("/", function(req, res){
    res.render("home");
});

module.exports = router;