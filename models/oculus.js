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

    // console.log("Absolute Pitch: "+ Math.round(orientation[0]*100)/100);
    // console.log("Absolute Yaw: "+ Math.round(orientation[1]*100)/100);
    // console.log("Absolute Roll: "+ Math.round(orientation[2]*100)/100);

    // console.log("Relative Pitch: "+ Math.round(this.pitch_val*100)/100);
    // console.log("Relative Yaw: "+ Math.round(this.yaw_val*100)/100);
    // console.log("Relative Roll: "+ Math.round(this.roll_val*100)/100);
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