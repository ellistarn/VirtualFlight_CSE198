//This module serves as the main control between 
//drove API flight commands and the Virtual Flight driver
var arDrone = require('ar-drone');
var client = arDrone.createClient();

var hovering = false;
var flying = false;
var taking_off = false;
var landing = false;

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
CLIMB_SPEED = .25

//takes a value between MIN_PITCH & MAX_PITCH and sends command to drone.
function pitch(degrees) {
    var pitch_func;
    var pitch_speed;

    if (degrees > 0) {
        if (degrees > MAX_PITCH) {
            console.log("WARNING: limiting pitch from {0} to {1}.".format(degrees,MAX_PITCH));
            degrees = MAX_PITCH;
        } 
        pitch_func = client.forward;       
    }
    else {
        if (degrees < MIN_PITCH) {
            console.log("WARNING: limiting pitch from {0} to {1}.".format(degrees,MIN_PITCH));
            degrees = MIN_PITCH;
        }
        pitch_func = client.back;
    }

    pitch_speed = Math.abs(sinDeg(degrees));
    pitch_func(pitch_speed);
    console.log("CMD: pitch at speed: {0}. Sensor={1}deg".format(pitch_speed,degree));
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
            console.log("WARNING: limiting yaw from {0} to {1}.".format(degrees,MAX_YAW));
            degrees = MAX_YAW;
        }
        yaw_speed = Math.abs(sinDeg(degrees));
        client.clockwise(yaw_speed);
        console.log("CMD: yaw at speed: {0}. Sensor={1}deg".format(yaw_speed, degrees));
    } 
    else {
        if (degrees < MIN_YAW) {
            console.log("WARNING: limiting yaw from {0} to {1}.".format(degrees,MIN_YAW));
            degrees = MIN_YAW;
        }
        yaw_speed = Math.abs(sinDeg(degrees));
        client.counterClockwise(yaw_speed);
        console.log("CMD: yaw at speed: {0}. Sensor={1}deg".format(yaw_speed, degrees));
    }
}

//takes a value between MIN_ROLL & MAX_ROLL and sends command to drone.
function roll(degrees) {   
    var roll_func;
    var roll_speed;

    if (degrees > 0){
        if (degrees > MAX_ROLL) {
            console.log("WARNING: limiting roll from {0} to {1}.".format(degrees,MAX_ROLL));       
            degrees = MAX_ROLL;
        }
        roll_func = client.left;
    }
    else {
        if (degrees < MIN_ROLL) {
            console.log("WARNING: limiting roll from {0} to {1}.".format(degrees,MIN_ROLL));
            degrees = MIN_ROLL;
        }
        roll_func = client.right;
    }

    roll_speed = Math.abs(sinDeg(degrees));
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

//on keyrelease "w" or "s"
function hold_height() {
    console.log("CMD: stop climbing or descending.");
    client.up(0);
}

//on keypress "space"
function toggle_hover() {
    if (!this.hovering) {
        console.log("CMD: hover.");
        client.stop();
    }
    console.log("CMD: stop hovering.");
    this.hovering = !this.hovering;
}

//on keyhold "space"?
function takeoff() {
    client.takeoff();
    // if(!this.flying) {
        console.log("CMD: taking off.");
    //     this.taking_off = true;
    // }
    // console.log("WARNING: already flying.");
}

//on keyhold "space"?
function land() {
    client.stop();
    client.land();
    // if(!this.landing) {
        console.log("CMD: landing.")
    //     this.landing = true;
    // }
}


function video_stream(client) {
    var pngStream = client.getPngStream();
    pngStream.on('data', console.log);
    return pngStream;
}

//Ctor
var drone =  {
    //functions
    pitch: pitch,
    yaw: yaw,
    roll: roll,

    ascend: ascend,
    descend: descend,
    hold_height: hold_height,

    toggle_hover: toggle_hover,

    takeoff: takeoff,
    land: land,

    video_stream: video_stream,

    //variables
    client: client,
    hovering: hovering,
    flying: flying,
    taking_off: taking_off,
    landing: landing

    //functions
    // this.pitch = pitch;
    // this.yaw = yaw;
    // this.roll = roll;

    // this.ascend = ascend;
    // this.descend = descend;
    // this.hold_height = hold_height;

    // this.toggle_hover = toggle_hover;

    // this.takeoff = takeoff;
    // this.land = land;

    // this.video_stream = video_stream;

    // //variables
    // this.client = client;
    // this.hovering = false;
    // this.flying = false;
    // this.taking_off = false;
    // this.landing = false;
}

//Returns a client object
module.exports = drone;

