const ADC = 31;
const sensitivity = 0.9;
var Ruuvitag = require("Ruuvitag");
var rotation = 0;
var flag = 0;

function startAdv(){
  console.log("PRESSURE SENSOR READY");
  var idInterval = setInterval(function(){
    pinMode(ADC, "analog");
    var analog = analogRead(ADC);
    //console.log(analog);
    if(analog < sensitivity && flag == 0) {
      rotation++;
      flag = 1;
      var d = ["A", analog, rotation];
      Bluetooth.print("\n" + d.join(","));
    } else if (analog > sensitivity && flag == 1) {
        flag = 0;
    }
  }, 50);

  setWatch(function() {
    console.log("PRESSING THE BUTTON");
    clearInterval(idInterval);
    rotation = 0;
    Bluetooth.print(["F"]);
  }, BTN1, {repeat: true});
}