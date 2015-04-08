//This module serves as the main control between 
//drove API flight commands and the Virtual Flight driver
var arDrone = require('ar-drone');
var client = arDrone.createClient();


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
CLIMB_SPEED = 1

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
//translates degrees from OR to speed for parrot API
//must overcome YAW_TOLERANCE to generate movement commands.
function yaw(degrees) {
    var yaw_func;
    var yaw_speed;

    if (Math.abs(degrees) < YAW_TOLERANCE) {
        return;
    }
    if (degrees > 0) {
        if (degrees > MAX_YAW) {
            degrees = MAX_YAW;
            console.log("WARNING: limiting yaw from {0} to {1}.".format(degrees,MAX_YAW));
        }
        yaw_func = client.clockwise;
    } 
    else {
        if (degrees < MIN_YAW) {
            degrees = MIN_YAW;
            console.log("WARNING: limiting yaw from {0} to {1}.".format(degrees,MIN_YAW))
        }
        yaw_func = client.counterClockwise;
    }

    yaw_speed = Math.abs(Math.sin(degrees));
    yaw_func(yaw_speed);
    console.log("CMD: yaw at speed: {0}. Sensor={1}deg".format(yaw_speed, degree))
}

//takes a value between MIN_ROLL & MAX_ROLL and sends command to drone.
function roll(degrees) {   
    var roll_func;
    var roll_speed;

    if (degrees > 0){
        if (degrees > MAX_ROLL) {
            degrees = MAX_ROLL;
            console.log("WARNING: limiting roll from {0} to {1}.".format(degrees,MAX_ROLL));       
        }
        roll_func = client.back;
    }
    else {
        if (degrees < MIN_ROLL) {
            degrees = MIN_ROLL;
            console.log("WARNING: limiting roll from {0} to {1}.".format(degrees,MIN_ROLL));
        }
        roll_func = client.back;
    }

    roll_speed = Math.abs(Math.sin(degrees));
    roll_func(roll_speed);
    console.log("CMD: roll at speed: {0}. Sensor={1}deg.".format(roll_speed, degree));
}

//on keypress "w"
function ascend() {
    console.log("CMD: ascend at speed {0}.".format(CLIMB_SPEED));
    client.up(CLIMB_SPEED);
}

//on keypress "s"
function descend() {
    console.log("CMD: descend at speed {0}.".format(CLIMB_SPEED));
    client.down(CLIMB_SPEED);
}

//on keyrelease w or s
function hold_height() {
    console.log("CMD: stop climbing or descending.");
    client.up(0);
}

//Ctor
var drone = function () {
    this.drone = drone;
    this.client = client;

    this.pitch = pitch;
    this.yaw = yaw;
    this.roll = roll;
}

//Returns a client object
module.exports = drone;