var nodeOculus = require('node-oculus');
var client = nodeOculus.createOculus();

var orientation;

client.discoverSensor();

function trackOrientation() {
    this.orientation = client.getOrientationQuat();
    console.log(this.orientation);
}

var oculus =  {
    //function
    trackOrientation: trackOrientation,

    //variables
    orientation: orientation
}


//Returns a client object
module.exports = oculus;