var express = require('express');
var router = express.Router();
var drone = require("../models/drone.js");
var oculus = require("../models/oculus.js");

var orientation;

// function trackOrientation() {
//     this.orientation = oculus.getOrientation();
// }
setInterval(oculus.updateOrientation, 1000);

router.route('/')
  .post(function(req, res) {
    command = req.body.command;
    // console.log(command = req.body.command);
    // console.log(req.body.command);

    var success;
    switch(command) {
        // case "pitch":
        //     success = drone.pitch();
        //     break;
        // case "yaw":
        //     success = drone.yaw();
        //     break;
        // case "roll":
        //     success = drone.roll();
        //     break;
        case "ascend":
            success = drone.ascend();
            break;
        case "descend":
            success = drone.descend();
            break;
        case "pause":
            success = drone.pause();
            break;
        case "power":
            success = drone.power();
            break;
        default:
            success = false;
            console.log("Could not recognize req.command: %s", command);
        }

    if (!success) {
        console.log("Post request failed")
        res.status(500).send("command failed");
    } else {
        res.status(200).send(success);
    }
});

module.exports = router;