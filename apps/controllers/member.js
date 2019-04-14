const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
    res.json({"message": "This is Member Page"});
});

module.exports = router;