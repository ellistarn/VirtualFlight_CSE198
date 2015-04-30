 $(document).on('keydown', function(ev) {
        var command;
        console.log(ev.keyCode);
        if(ev.keyCode === 87){
            command = "ascend";
        }
        else if(ev.keyCode === 83){
            command = "descend";
        }
        else if(ev.keyCode == 32) {
            command = "power";
        }
        else if(ev.keyCode == 80) {
            command = "pause";
        }

        //TEMPORARY
        else if(ev.keyCode == 65) {
            command = "left";
        }
        else if(ev.keyCode == 68) {
            command = "right";
        }
        else if(ev.keyCode == 37) {
            command = "rollleft";
        }
        else if(ev.keyCode == 38) {
            command = "rollright";
        }
        else if(ev.keyCode == 39) {
            command = "forward";
        }
        else if(ev.keyCode == 40) {
            command = "back";
        }


        else {
            return;
        }
        var data = JSON.stringify({"command":command});
        var url = "/drone";
        console.log(data);
        
        $.ajax({
          type: "POST",
          url: url,
          data: data,
          contentType: "application/json"
        });
    });