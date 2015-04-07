var arDrone = require('ar-drone');
var client = arDrone.createClient();

function VF_takeoff(client) {
  console.log("Taking off");
  client.takeoff();
}

function VF_land() {
  console.log("Landing");
  this.stop();
  this.land();
}

// function VF_delay(client, delay) {
//   console.log("Paused");
//   client.after(delay, function() { console.log("Resumed")});
// }


// VF_takeoff(client);
// VF_takeoff();
// client.after(5000, VF_land);


client.takeoff();


client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  // .after(3000, function() {
  //   this.animate('flipLeft', 15);
  // // })
  .after(10000, function() {
    this.stop();
    this.land();
  });

