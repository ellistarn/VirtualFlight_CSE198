//This module serves as the main control between 
//drove API flight commands and the Virtual Flight driver

//degree limiters. [-90,90]deg
MAX_PITCH = 30;
MIN_PITCH = -30;

MAX_YAW = 30;
MIN_YAW = -30;

MAX_ROLL = 30;
MIN_ROLL = -30;

//yaw must exceed this in order to generate movement commands. [0,90]deg
YAW_TOLERANCE = 10;

//defines a fixed climb speed to be used with ascend and descend. [0,1]
CLIMB_SPEED = 
//defines the length of time ascend/descend will modify the height. [0,inf]sec
CLIMB_PERIOD = 1

//takes a value between MIN_PITCH & MAX_PITCH and sends command to drone.
function pitch(degrees) {
    if (degrees > MAX_PITCH) {
        degrees = MAX_PITCH;
        console.log("WARNING: limiting pitch from {0} to {1}".format(degrees,MAX_PITCH))
    }
    else if (degrees < MIN_PITCH) {
        degrees = MIN_PITCH;
        console.log("WARNING: limiting pitch from {0} to {1}".format(degrees,MIN_PITCH))
    }
    console.log("CMD: pitch {0}deg".format(degree))
    //TODO call pitch
}

//takes a value between MIN_YAW & MAX_YAW and sends command to drone.
//must overcome YAW_TOLERANCE to generate movement commands.
function yaw(degrees) {
    if (Math.abs(degrees) < YAW_TOLERANCE) {
        return;
    }

    if (degrees > MAX_YAW) {
        degrees = MAX_YAW;
        console.log("WARNING: limiting yaw from {0} to {1}".format(degrees,MAX_YAW))
    }
    else if (degrees < MIN_YAW) {
        degrees = MIN_YAW;
        console.log("WARNING: limiting yaw from {0} to {1}".format(degrees,MIN_YAW))
    }
    console.log("CMD: yaw {0}deg".format(degree))
    //TODO call yaw
}

//takes a value between MIN_ROLL & MAX_ROLL and sends command to drone.
function roll(degrees) {   
    if (degrees > MAX_ROLL) {
        degrees = MAX_ROLL;
        console.log("WARNING: limiting roll from {0} to {1}".format(degrees,MAX_ROLL))
    }
    else if (degrees < MIN_ROLL) {
        degrees = MIN_ROLL;
        console.log("WARNING: limiting roll from {0} to {1}".format(degrees,MIN_ROLL))
    }
    console.log("CMD: roll {0}deg".format(degree))
    //TODO call roll
}

//symmetric unary function 
function ascend() {

}

function descend() {
    
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