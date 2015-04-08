//This module serves as the main control between 
//drove API flight commands and the Virtual Flight driver

MAXROLL = 30;
MINROLL = 30;



//takes a value from 
function roll(degrees) {   
    if (degrees > MAXROLL) {
        degrees = MAXROLL;
    }
    else if (degrees < MINROLL) {
        degrees = MINROLL;
    }
}

function tilt(degrees) {

}

function yaw(degrees) {

}

//Ctor
var Drone = function () {
    var arDrone = require('ar-drone');
    this.client = arDrone.createClient();

    this.tilt = tilt;
    this.yaw = yaw;
    this.roll = roll;
}

//Returns a client object
module.exports = Drone;