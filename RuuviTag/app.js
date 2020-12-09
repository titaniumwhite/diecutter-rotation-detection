//function LIS2DH12_FROM_FS_8g_NM_TO_mg(lsb){return (float)((int16_t)lsb>>6)* 16.0f}
const ACC_SENSITIVITY =  128; //16G
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
  //100hz @12bit
  Ruuvitag.accel.setPowerMode("highres");
  //Set 16G range
  Ruuvitag.accel.w(0x23,0b00111000);
}

function stop(){
  Ruuvitag.setAccelOn(false);
  var f = ["F"];
  Bluetooth.println(f);
}

setWatch( function() {
Ruuvitag.setAccelOn(false);
var f = ["F"];
Bluetooth.println(f);
}, BTN1, {repeat: true});
