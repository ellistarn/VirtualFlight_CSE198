var express = require('express');
var router = express.Router();
var drone = require("../models/drone.js");
var oculus = require("../models/oculus.js");


//Pitch, Yaw, Roll update
var delta = 100 //ms
setInterval(function () {
    //Get new orientation data
    oculus.updateOrientation();

    //Send requests to drone
    if (drone.flying && !drone.paused) {
        drone.pitch(oculus.pitch_val);
        drone.yaw(oculus.yaw_val);
        drone.roll(oculus.roll_val);
    }
    
}, delta);

//Ascend, Descend, Pause, Power
router.route('/')
  .post(function(req, res) {
    command = req.body.command;

    var success;
    switch(command) {
        case "ascend":
            success = drone.ascend();
            break;
        case "descend":
            success = drone.descend();
            break;
        case "pause":
            oculus.setOrientationZero();
            success = drone.pause();
            break;
        case "power":
            oculus.setOrientationZero();
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