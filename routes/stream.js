var express = require('express');
var router = express.Router();
var stream = require("dronestream");

router.route('/')
  .get(function(req, res){
    stream.listen(server);

});
