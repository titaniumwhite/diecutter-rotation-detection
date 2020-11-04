//ADC pin used is 31
const sensitivity = 0.9;
var Ruuvitag = require("Ruuvitag");
var rotation = 0;

var idInterval = setInterval(function(){
  pinMode(31, "analog");
  if(analogRead(31) < sensitivity) {
    rotation++;
    console.log("One more rotation --> " + rotation);
  }
}, 50);

setWatch( function() {
  clearInterval(idInterval);
  var f = ["F"];
  Bluetooth.println(f);
}, BTN1, {repeat: true});
