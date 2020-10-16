const ACC_SENSITIVITY =  1023;
var Ruuvitag = require("Ruuvitag");
function startAdv(){
  Ruuvitag.setAccelOn(true, function(xyz) {
  var d = [
      "A",
      xyz.x/ACC_SENSITIVITY,
      xyz.y/ACC_SENSITIVITY,
      xyz.z/ACC_SENSITIVITY
  ];
  //console.log(d.join(","));
  Bluetooth.println(d.join(","));
  });
          Ruuvitag.accel.setPowerMode("normal");
}
setWatch( function() {
Ruuvitag.setAccelOn(false);
var f = ["F"];
Bluetooth.println(f);
}, BTN1, {repeat: true});