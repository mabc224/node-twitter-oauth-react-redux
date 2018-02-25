var express = require('express');
var router = express.Router();

router.route('/').get(function (req, res) {
    res.status(200);
    res.send("API working");
});


module.exports = router;
