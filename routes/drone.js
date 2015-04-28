var express = require('express');
var router = express.Router();
var drone = require("../models/drone.js");

router.route('/')
  .post(function(req, res) {
    console.log(command = req.body.command);
    // console.log(req.body.command);

    var success;
    switch(command) {
        case "pitch":
            success = drone.pitch();
            break;
        case "yaw":
            success = drone.yaw();
            break;
        case "roll":
            success = drone.roll();
            break;
        case "ascend":
            success = drone.ascend();
            break;
        case "descend":
            success = drone.descend();
            break;
        case "hold_height":
            success = drone.hold_height();
            break;
        case "toggle_hover":
            success = drone.toggle_hover();
            break;
        case "takeoff":
            console.log("asdad");
            break;
            success = drone.takeoff();
        case "land":
            success = drone.land();
            break;
        default:
            success = false;
            console.log("Could not recognize req.command: %s", command);

        if (!success) {
            console.log("Post request failed")
            res.status(500).send("command failed");
        } else {
            res.status(200).send("success");
        }
    }
});

module.exports = router;