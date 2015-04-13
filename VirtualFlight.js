//Main driver for the Virtual Flight application

require("./helpers.js");
/*
================Drone Object================
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



// var client = require("./oculus.js");



console.log("Booting up");



// setTimeout(drone.takeoff, 0);

// setTimeout(drone.pitch,5000, 3);
// setTimeout(drone.pitch,6000, -10);
// setTimeout(drone.pitch,7000, 0);

// setTimeout(drone.roll,8000, 5);
// setTimeout(drone.roll,9000, -5);
// setTimeout(drone.roll,10000, 0);

// setTimeout(drone.land, 14000);

