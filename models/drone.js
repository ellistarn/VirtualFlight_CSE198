//This module serves as the main control between 
//drove API flight commands and the Virtual Flight driver
var arDrone = require('ar-drone');
var client = arDrone.createClient();
var paused = false;
var flying = false;

//update drone flying state
client.on('navdata', function(data) {
    drone.flying = data.droneState.flying ? true : false;
});

//degrees limiters. [-90,90]deg
MAX_PITCH = 30;
MIN_PITCH = -30;

MAX_YAW = 30;
MIN_YAW = -30;

MAX_ROLL = 30;
MIN_ROLL = -30;

//yaw must exceed this in order to generate movement commands. [0,90]deg
YAW_TOLERANCE = 0.1;

//defines a fixed climb speed to be used with ascend and descend. [0,1]
CLIMB_SPEED = 1;
//number of milliseconds to climb before requiring a new command
CLIMB_PERIOD = 100;

//takes a value between MIN_PITCH & MAX_PITCH and sends command to drone.
function pitch(speed) {
    if (client.paused) {
        return false;
    }
    var pitch_func;
    var pitch_speed;

    if (speed > 0) {
        if (speed > MAX_PITCH) {
            console.log("WARNING: limiting pitch from {0} to {1}.".format(speed,MAX_PITCH));
            speed = MAX_PITCH;
        }
        pitch_speed = Math.abs(speed);
        console.log("CMD: pitch at speed: {0}. Sensor={1}deg".format(pitch_speed,speed));
        return client.back(pitch_speed);
    }
    else {
        if (speed < MIN_PITCH) {
            console.log("WARNING: limiting pitch from {0} to {1}.".format(speed,MIN_PITCH));
            speed = MIN_PITCH;
        }
        pitch_speed = Math.abs(speed);
        console.log("CMD: pitch at speed: {0}. Sensor={1}deg".format(pitch_speed,speed));
        return client.front(pitch_speed);
    }
}

//takes a value between MIN_YAW & MAX_YAW and sends command to drone.
//translates speed from OR to speed for parrot API
//must overcome YAW_TOLERANCE to generate movement commands.
function yaw(speed) {
    // if (client.paused) {
    //     return false;
    // }
    console.log("yawing");
    var yaw_func;
    var yaw_speed;

    if (Math.abs(speed) < YAW_TOLERANCE) {
        return;
    }
    if (speed > 0) {
        if (speed > MAX_YAW) {
            console.log("WARNING: limiting yaw from {0} to {1}.".format(speed,MAX_YAW));
            speed = MAX_YAW;
        }
        yaw_speed = Math.abs(speed);
        console.log("CMD: yaw at speed: {0}. Sensor={1}deg".format(yaw_speed, speed));
        return client.counterClockwise(yaw_speed);
    } 
    else {
        if (speed < MIN_YAW) {
            console.log("WARNING: limiting yaw from {0} to {1}.".format(speed,MIN_YAW));
            speed = MIN_YAW;
        }
        yaw_speed = Math.abs(speed);
        console.log("CMD: yaw at speed: {0}. Sensor={1}deg".format(yaw_speed, speed));
        return client.clockwise(yaw_speed);
    }
}

//takes a value between MIN_ROLL & MAX_ROLL and sends command to drone.
function roll(speed) {  
    if (client.paused) {
        return false;
    }
    var roll_func;
    var roll_speed;

    if (speed > 0){
        if (speed > MAX_ROLL) {
            console.log("WARNING: limiting roll from {0} to {1}.".format(speed,MAX_ROLL));       
            speed = MAX_ROLL;
        }
        roll_speed = Math.abs(speed);
        console.log("CMD: roll at speed: {0}. Sensor={1}deg.".format(roll_speed, speed));        
        return client.left(roll_speed);
    }
    else {
        if (speed < MIN_ROLL) {
            console.log("WARNING: limiting roll from {0} to {1}.".format(speed,MIN_ROLL));
            speed = MIN_ROLL;
        }
        roll_speed = Math.abs(speed);
        console.log("CMD: roll at speed: {0}. Sensor={1}deg.".format(roll_speed, speed));
        return client.right(roll_speed);
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
    if (!flying) {
        return false;
    }

    if (!this.paused) {
        console.log("CMD: unpause.");
        this.paused = false;
        return true;
    }
    else {
        console.log("CMD: pause.");
        this.paused = true;
        return client.stop();
    }
}

//on keypress "space"
function power() {
    console.log(this.flying);
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

