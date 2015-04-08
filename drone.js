//This module serves as the main control between 
//drove API flight commands and the Virtual Flight driver

//yaw must exceed this in order to generate movement commands
YAWTOLERANCE = 10; 

MAXPITCH = 30;
MINPITCH = 30;

MAXYAW = 30;
MINYAW = 30;

MAXROLL = 30;
MINROLL = 30;

//takes a value between MINPITCH & MAXPITCH and sends command to drone
function pitch(degrees) {
    if (degrees > MAXPITCH) {
        degrees = MAXPITCH;
        console.log("WARNING: limiting pitch from {0} to {1}".format(degrees,MAXPITCH))
    }
    else if (degrees < MINPITCH) {
        degrees = MINPITCH;
        console.log("WARNING: limiting pitch from {0} to {1}".format(degrees,MINPITCH))
    }
    console.log("CMD: pitch {0}deg".format(degree))
    //TODO call pitch
}

//takes a value between MINYAW & MAXYAW and sends command to drone.
//must overcome YAWTOLERANCE to generate movement commands
function yaw(degrees) {
    if (Math.abs(degrees) < YAWTOLERANCE) {
        return;
    }

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

//Ctor
var drone = function () {
    var arDrone = require('ar-drone');
    this.client = arDrone.createClient();

    this.pitch = pitch;
    this.yaw = yaw;
    this.roll = roll;
}

//Returns a client object
module.exports = drone;