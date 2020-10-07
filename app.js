const GYRO_SENSITIVITY =  65;
const ACC_SENSITIVITY =  8192;
const T = 0.014; // 104Hz

var pitch_data = [];
var roll_data = [];
var yaw_data = [];

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

function complementaryFilter(acc, gyro){
  var pitchAcc, rollAcc, yawAcc;
  var ax = acc.x, ay = acc.y, az = acc.z;
  var gx = gyro.x, gy = gyro.y, gz = gyro.z;

  var pitch = (gx / GYRO_SENSITIVITY) + ((gx / GYRO_SENSITIVITY) * T);
  var roll = (gy / GYRO_SENSITIVITY) - ((gy / GYRO_SENSITIVITY) * T);
  var yaw = ((gz / GYRO_SENSITIVITY) * T);

  pitchAcc = Math.atan2( ay, az ) * 180 / Math.PI;
  pitch = pitch * 0.98 + pitchAcc * 0.02;
  pitch_data.push(pitch);

  rollAcc = Math.atan(ax, az ) * 180 / Math.PI;
  roll = roll * 0.98 + rollAcc * 0.02;
  roll_data.push(roll);

  /*
  yawAcc = Math.atan( az / Math.sqrt(ax*ax + az*az) ) * 180 / Math.PI;
  yaw = yaw * 0.98 + yawAcc * 0.02;
  */
}

Puck.accelOn(104); // default 12.5Hz
Puck.on('accel', function(data) {
  var acc = new Acc(data.acc.x, data.acc.y, data.acc.z);
  var gyro = new Gyro(data.gyro.x, data.gyro.y, data.gyro.z);

  console.log("acceleration " + acc.x / ACC_SENSITIVITY + "     " + acc.y / ACC_SENSITIVITY+ "     " + acc.z / ACC_SENSITIVITY);
  console.log("gyro " + gyro.x / GYRO_SENSITIVITY + "     " + gyro.y / GYRO_SENSITIVITY + "     " + gyro.z / GYRO_SENSITIVITY);

  complementaryFilter(acc, gyro);
});

//Turn events off with Puck.accelOff()
setWatch( function() {
  console.log("pitch", pitch_data);
  console.log("roll", roll_data);
  Puck.accelOff();
}, BTN1, {repeat: true});
