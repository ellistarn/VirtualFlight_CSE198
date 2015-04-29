//This module serves as the main control between 
//drove API flight commands and the Virtual Flight driver
var arDrone = require('ar-drone');
var client = arDrone.createClient();
var paused = false;
var flying = false;

//update drone flying state
client.on('navdata', function(data) {
    flying = data.droneState.flying;
});

//degrees limiters. [-90,90]deg
MAX_PITCH = 30;
MIN_PITCH = -30;

MAX_YAW = 30;
MIN_YAW = -30;

MAX_ROLL = 30;
MIN_ROLL = -30;

//yaw must exceed this in order to generate movement commands. [0,90]deg
YAW_TOLERANCE = 10;

//defines a fixed climb speed to be used with ascend and descend. [0,1]
CLIMB_SPEED = 1;
//number of milliseconds to climb before requiring a new command
CLIMB_PERIOD = 250;

//takes a value between MIN_PITCH & MAX_PITCH and sends command to drone.
function pitch(degrees) {
    if (client.paused) {
        return false;
    }
    var pitch_func;
    var pitch_speed;

    if (degrees > 0) {
        if (degrees > MAX_PITCH) {
            console.log("WARNING: limiting pitch from {0} to {1}.".format(degrees,MAX_PITCH));
            degrees = MAX_PITCH;
        }
        pitch_speed = Math.abs(Math.sinDeg(degrees));
        console.log("CMD: pitch at speed: {0}. Sensor={1}deg".format(pitch_speed,degrees));
        return client.front(pitch_speed);
    }
    else {
        if (degrees < MIN_PITCH) {
            console.log("WARNING: limiting pitch from {0} to {1}.".format(degrees,MIN_PITCH));
            degrees = MIN_PITCH;
        }
        pitch_speed = Math.abs(Math.sinDeg(degrees));
        console.log("CMD: pitch at speed: {0}. Sensor={1}deg".format(pitch_speed,degrees));
        return client.back(pitch_speed);
    }
}

//takes a value between MIN_YAW & MAX_YAW and sends command to drone.
//translates degrees from OR to speed for parrot API
//must overcome YAW_TOLERANCE to generate movement commands.
function yaw(degrees) {
    if (client.paused) {
        return false;
    }
    var yaw_func;
    var yaw_speed;

    if (Math.abs(degrees) < YAW_TOLERANCE) {
        return;
    }
    if (degrees > 0) {
        if (degrees > MAX_YAW) {
            console.log("WARNING: limiting yaw from {0} to {1}.".format(degrees,MAX_YAW));
            degrees = MAX_YAW;
        }
        yaw_speed = Math.abs(Math.sinDeg(degrees));
        console.log("CMD: yaw at speed: {0}. Sensor={1}deg".format(yaw_speed, degrees));
        return client.clockwise(yaw_speed);
    } 
    else {
        if (degrees < MIN_YAW) {
            console.log("WARNING: limiting yaw from {0} to {1}.".format(degrees,MIN_YAW));
            degrees = MIN_YAW;
        }
        yaw_speed = Math.abs(Math.sinDeg(degrees));
        console.log("CMD: yaw at speed: {0}. Sensor={1}deg".format(yaw_speed, degrees));
        return client.counterClockwise(yaw_speed);
    }
}

//takes a value between MIN_ROLL & MAX_ROLL and sends command to drone.
function roll(degrees) {  
    if (client.paused) {
        return false;
    }
    var roll_func;
    var roll_speed;

    if (degrees > 0){
        if (degrees > MAX_ROLL) {
            console.log("WARNING: limiting roll from {0} to {1}.".format(degrees,MAX_ROLL));       
            degrees = MAX_ROLL;
        }
        roll_speed = Math.abs(Math.sinDeg(degrees));
        console.log("CMD: roll at speed: {0}. Sensor={1}deg.".format(roll_speed, degrees));        
        return client.right(roll_speed);
    }
    else {
        if (degrees < MIN_ROLL) {
            console.log("WARNING: limiting roll from {0} to {1}.".format(degrees,MIN_ROLL));
            degrees = MIN_ROLL;
        }
        roll_speed = Math.abs(Math.sinDeg(degrees));
        console.log("CMD: roll at speed: {0}. Sensor={1}deg.".format(roll_speed, degrees));
        return client.left(roll_speed);
    }
}

//on keypress "w"
function ascend() {
    console.log("CMD: ascend at speed {0}.".format(CLIMB_SPEED));
    client.up(CLIMB_SPEED);
    client.after(CLIMB_PERIOD, function() {this.up(0)});
    return true;
}

//on keypress "s"
function descend() {
    console.log("CMD: descend at speed {0}.".format(CLIMB_SPEED));
    client.down(CLIMB_SPEED);
    client.after(CLIMB_PERIOD, function() {this.down(0)});
    return true;
}

//on keypress "p"
function pause() {
    if (!this.paused) {
        console.log("CMD: unpause.");
        this.paused = false;
    }
    else {
        console.log("CMD: pause.");
        this.paused = true;
        client.stop()
    }
}

//on keypress "space"
function power() {
    if (this.flying) {
        console.log("CMD: Land");
        client.stop();
        return client.land();
    }
    else {
        console.log("CMD: Takeoff");
        return client.takeoff();
    }
}

//Ctor
var drone =  {
    //functions
    pitch: pitch,
    yaw: yaw,
    roll: roll,

    ascend: ascend,
    descend: descend,

    pause: pause,
    power: power,

    //variables
    flying: flying,
    paused: paused
}

//Returns a client object
module.exports = drone;

