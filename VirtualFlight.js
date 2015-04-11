require("./helpers.js");
//Main driver for the Virtual Flight application

var drone = require("./drone.js");
var client = require("./oculus.js");


console.log("Booting up");

setTimeout(drone.takeoff, 000);
setTimeout(drone.yaw(30));
setTimeout(drone.land, 10000);






//This function streams commands from the oculus rift device and calls the drone object
// function create_command_stream() {

// }
