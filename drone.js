//This module serves as the main control between 
//drove API flight commands and the Virtual Flight driver

MAXROLL = 30;
MINROLL = 30;

MAXTILT = 30;
MINTILT = 30;

MAXYAW = 30;
MINYAW = 30;

//takes a value between MINROLL & MAXROLL and sends command to drone
function roll(degrees) {   
    if (degrees > MAXROLL) {
        degrees = MAXROLL;
        console.log("WARNING: limiting roll from {0} to {1}".format(degrees,MAXROLL))
    }
    else if (degrees < MINROLL) {
        degrees = MINROLL;
        console.log("WARNING: limiting roll from {0} to {1}".format(degrees,MINROLL))
    }
    console.log("CMD: roll {0}deg".format(degree))
    //TODO call roll
}

//takes a value between MINTILT & MAXTILT and sends command to drone
function tilt(degrees) {
    if (degrees > MAXTILT) {
        degrees = MAXTILT;
        console.log("WARNING: limiting tilt from {0} to {1}".format(degrees,MAXTILT))
    }
    else if (degrees < MINTILT) {
        degrees = MINTILT;
        console.log("WARNING: limiting tilt from {0} to {1}".format(degrees,MINTILT))
    }
    console.log("CMD: tilt {0}deg".format(degree))
    //TODO call tilt
}

function yaw(degrees) {
    if (degrees > MAXYAW) {
        degrees = MAXYAW;
        console.log("WARNING: limiting yaw from {0} to {1}".format(degrees,MAXYAW))
    }
    else if (degrees < MINYAW) {
        degrees = MINYAW;
        console.log("WARNING: limiting yaw from {0} to {1}".format(degrees,MINYAW))
    }
    console.log("CMD: yaw {0}deg".format(degree))
    //TODO call yaw
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