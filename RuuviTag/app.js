const ACC_SENSITIVITY =  222.75; //8G
var counter = 0;
var Ruuvitag = require("Ruuvitag");
function startAdv(){
  Ruuvitag.setAccelOn(true, function(xyz) {
    if(counter<3000){
      var d = [
        "A",
        xyz.x/ACC_SENSITIVITY,
        xyz.y/ACC_SENSITIVITY,
        xyz.z/ACC_SENSITIVITY,
      ];
      //print(d.join(","));eravamo
      Bluetooth.println(d.join(","));
      counter++;
    }
    else{
      Ruuvitag.setAccelOn(false);
      var f = ["F"];
      Bluetooth.println(f);
    }
  });
  //100hz
  Ruuvitag.accel.setPowerMode("normal");
  //Set 8G range
  Ruuvitag.accel.w(0x23,0x20);
}
setWatch( function() {
Ruuvitag.setAccelOn(false);
var f = ["F"];
Bluetooth.println(f);
}, BTN1, {repeat: true});
