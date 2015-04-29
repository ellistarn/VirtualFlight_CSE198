var nodeOculus = require('node-oculus');
var client = nodeOculus.createOculus();


var pitch_val = 0;
var yaw_val = 0;
var roll_val = 0;


var pitch_zero;
var yaw_zero;
var roll_zero;

client.discoverSensor();


//Sets current "zero" to readings
function setOrientationZero() {
    var orientation = client.getOrientationQuat();
    this.pitch_zero = orientation[0];
    this.yaw_zero = orientation[1];
    this.roll_zero = orientation[2];
}

function updateOrientation() {
    var orientation = client.getOrientationQuat();

    this.pitch_val = orientation[0] - this.pitch_zero;
    this.yaw_val = orientation[1] - this.yaw_zero;
    this.roll_val = orientation[2] - this.roll_zero;

    // console.log("Relative Pitch: "+ this.pitch_val);
    // console.log("Relative Yaw: "+ this.yaw_val);
    // console.log("Relative Roll: "+ this.roll_val);
}

var oculus = {
    //function
    setOrientationZero: setOrientationZero,
    updateOrientation: updateOrientation,

    //variables
    pitch_zero: pitch_zero,
    yaw_zero: yaw_zero,
    roll_zero: roll_zero,

    pitch_val: pitch_val,
    yaw_val: yaw_val,
    roll_val: roll_val
}

//zeroes the device
oculus.setOrientationZero();

//Returns a client object
module.exports = oculus;