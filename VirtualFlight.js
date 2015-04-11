//Main driver for the Virtual Flight application

require("./helpers.js");

/*
================Stream Video================
*/
var drone = require("./drone.js");

/*
================Stream Video================
*/
var PORT = 8000;
var PAGE = "/public/index.html"
var stream = require("dronestream");
var server = require("http").createServer(function(req, res) {
    require("fs").createReadStream(__dirname + PAGE).pipe(res);
}).listen(PORT);
stream.listen(server); 



// var keypress = require('keypress');
 
// // make `process.stdin` begin emitting "keypress" events 
// keypress(process.stdin);
 
// // listen for the "keypress" event 
// process.stdin.on('keypress', function (ch, key) {
//   console.log('got "keypress"', key);
//   if (key.ctrl && key.name == 'c') {
//     process.stdin.pause();
//   }
// });
 
// process.stdin.resume();


// var client = require("./oculus.js");



console.log("Booting up");



// setTimeout(drone.takeoff, 0);

// setTimeout(drone.takeoff, 0);

// setTimeout(drone.pitch,5000, 3);
// setTimeout(drone.pitch,6000, -10);
// setTimeout(drone.pitch,7000, 0);

// setTimeout(drone.roll,8000, 5);
// setTimeout(drone.roll,9000, -5);
// setTimeout(drone.roll,10000, 0);

// setTimeout(drone.land, 4000);






//This function streams commands from the oculus rift device and calls the drone object
// function create_command_stream() {

// }
