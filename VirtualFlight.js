require("./helpers.js");
//Main driver for the Virtual Flight application

var drone = require("./drone.js");
var client = require("./oculus.js");


console.log("Booting up");

setTimeout(drone.takeoff, 0);
setTimeout(drone.pitch,5000, 3);
setTimeout(drone.pitch,6000, -10);
setTimeout(drone.pitch,7000, 0);

setTimeout(drone.roll,8000, 5);
setTimeout(drone.roll,9000, -5);
setTimeout(drone.roll,10000, 0);

setTimeout(drone.land, 14000);






//This function streams commands from the oculus rift device and calls the drone object
// function create_command_stream() {

// }
