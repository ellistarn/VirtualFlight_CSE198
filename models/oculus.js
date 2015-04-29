var nodeOculus = require('node-oculus');
var client = nodeOculus.createOculus();

// var orientation;

client.discoverSensor();

function updateOrientation() {
    return client.getOrientationQuat();
}

var oculus =  {
    //function
    updateOrientation: updateOrientation,

    //variables
    // orientation: orientation
}


//Returns a client object
module.exports = oculus;