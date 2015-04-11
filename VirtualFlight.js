require("./helpers.js");
//Main driver for the Virtual Flight application

var drone = require("./drone.js");
var stream = require("dronestream")
//require('ar-drone-png-stream');
var server = require("http").createServer(function(req, res) {
    require("fs").createReadStream(__dirname + "/public/index.html").pipe(res);
}).listen(8000);
// var client = require("./oculus.js");

// drone.stream_video();

console.log("Booting up");
// setTimeout(drone.takeoff, 0);


stream.listen(server); 
// stream(drone.client, {port: 8000});

// setTimeout(drone.takeoff, 0);

// setTimeout(drone.pitch,5000, 3);
// setTimeout(drone.pitch,6000, -10);
// setTimeout(drone.pitch,7000, 0);

// setTimeout(drone.roll,8000, 5);
// setTimeout(drone.roll,9000, -5);
// setTimeout(drone.roll,10000, 0);

// setTimeout(drone.land, 10000);






//This function streams commands from the oculus rift device and calls the drone object
// function create_command_stream() {

// }
