const ADC = 31;
const fallCorrectionFactor = 0.9;
const riseCorrectionFactor = 1.05;
var Ruuvitag = require("Ruuvitag");
var rotation = 0;
var flag = 0;
var idInterval;
var runningAverage = null;
const learningFactor = 0.1;

function startAdv(){
  console.log("PRESSURE SENSOR READY");
  idInterval = setInterval(function(){
    pinMode(ADC, "analog");
    var analog = analogRead(ADC);
    if (runningAverage == null) {
      runningAverage = analog;
    } else {
      runningAverage = (1-learningFactor)*runningAverage + learningFactor * analog;
    }
    //console.log(analog);
    if(analog < runningAverage * fallCorrectionFactor && flag == 0) {
      rotation++;
      flag = 1;
      var d = ["A", analog, rotation];
      Bluetooth.print("\n" + d.join(","));
    } else if (analog > runningAverage * riseCorrectionFactor && flag == 1) {
        flag = 0;
    }
  }, 50);
}

function stopAdv() {
    console.log("STOP THE CONNECTION");
    clearInterval(idInterval);
    rotation = 0;
    Bluetooth.print(["F"]);
}