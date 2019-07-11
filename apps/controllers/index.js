const express = require("express");

const router = express.Router();

router.use("/admin", require(__dirname + "/admin"));
router.use("/member", require(__dirname + "/member"));
router.use("/guest", require(__dirname + "/guest"));
router.use("/manager", require(__dirname + "/manager"));

router.get("/", function(req, res){
    if (req.session.user && req.session.user.roleID === 0) {
        res.redirect("/member/home");
    } else {
        res.render("home");
    };
});

module.exports = router;