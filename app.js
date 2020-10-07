// Array di Acc e di Gyro. Ogni Acc o Gyro equivale a un sample.
var acc_data = [];
var gyro_data = [];

var pitch = [];
var roll = [];

var t = 0.0125; // 12.5Hz

function Acc(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

function Gyro(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

function complementaryFilter(acc_data, gyro_data){
  for(var i = 0; i < acc_data.length; i++) {
    var pitchAcc, rollAcc;
    var ax = acc_data[i].x, ay = acc_data[i].y, az = acc_data[i].z;
    var gx = gyro_data[i].x, gy = gyro_data[i].y, gz = gyro_data[i].z;

    /* Bisogna considerare la sensitività del giroscopio? */
    pitch.push(gx * t);
    roll.push(gy * t);

    /* Quale è la condizione dell'if?
       Quale dei due metodi usare per la correzione dell'angolo con accelerometro? */
    if(true) {
      pitchAcc = Math.atan2( Math.sqrt( Math.pow(ax, ax) + Math.pow(az, az)), ay ) * 180 / Math.PI;
      pitch[i] = pitch[i] * 0.98 + pitchAcc * 0.02;

      rollAcc = Math.atan2( Math.sqrt( Math.pow(ay, ay) + Math.pow(ax, ax)), az) * 180 / Math.PI;
      roll[i] = roll[i] * 0.98 + rollAcc * 0.02;

      /*
      pitchAcc = Math.atan2( ay, az ) * 180 / Math.PI;
      pitch[i] = pitch[i] * 0.98 + pitchAcc * 0.02;

      rollAcc = Math.atan2( ax, az ) * 180 / Math.PI;
      roll[i] = roll[i] * 0.98 + rollAcc * 0.02;
      */
    }
  }

  console.log("pitch", pitch);
  console.log("roll", roll);
}

for(var i = 0; i < 5; i++) {
  var data = Puck.accel();
  var acc = new Acc(data.acc.x, data.acc.y, data.acc.z);
  var gyro = new Gyro(data.gyro.x, data.gyro.y, data.gyro.z);
  acc_data.push(acc);
  gyro_data.push(gyro);
  console.log("acceleration " + acc.x + "     " + acc.y + "     " + acc.z);
  console.log("gyro " + gyro.x + "     " + gyro.y + "     " + gyro.z);
}

complementaryFilter(acc_data, gyro_data);



/*
// Metodo alternativo per raccogliere i dati.
// Puck.accel() resistuisce soltanto un sample;
// Puck.accelOn() streamma una serie di sample a 12.5Hz fin quando non viene chiamato Puck.accelOff().

Puck.accelOn(); // default 12.5Hz
Puck.on('accel', function(data) {
    var acc = new Acc(data.acc.x, data.acc.y, data.acc.z);
    var gyro = new Gyro(data.gyro.x, data.gyro.y, data.gyro.z);
    acc_data.push(acc);
    gyro_data.push(gyro);
    console.log("acceleration " + acc.x + "     " + acc.y + "     " + acc.z);
    console.log("gyro " + gyro.x + "     " + gyro.y + "     " + gyro.z);
});
//Turn events off with Puck.accelOff()
//Puck.accelOff();
*/


