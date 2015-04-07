// var arDrone = require('ar-drone');

// console.log('Booting Drone');
// var client = arDrone.createClient();

// console.log('Executing Takeoff');
// client.takeoff();

// console.log('Land');
// client.stop();
// client.land();


// function VF_takeoff(drone) {
//   console.log("Taking off")
// }

// function VF_land(drone) {
//   console.log("Landing");
//   // drone.stop();
//   // drone.land();
// }

var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.takeoff();

client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .after(3000, function() {
    this.animate('flipLeft', 15);
  })
  .after(1000, function() {
    this.stop();
    this.land();
  });