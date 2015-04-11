//Enables string formatting
if (!String.prototype.format) {
    String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

    
Math.sinDeg = function(num) {
    return Math.sin(num/180*Math.PI);
}


