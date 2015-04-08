//Main driver for the Virtual Flight application

require("./drone.js");
require("./oculus.js");




function VF_init_video_stream(client) {
    var pngStream = client.getPngStream();
    pngStream.on('data', console.log);
}

function VF_takeoff(client) {
    console.log("Taking off");
    client.takeoff();
}
  
function VF_land() {
    console.log("Landing");
    this.stop();
    this.land();
}

//This function streams commands from the oculus rift device and calls the drone object
function create_command_stream() {

}


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

