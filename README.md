# Counting Die-Cutter rotations using a force sensing resistor and a Ruuvitag
This project is part of my Bachelor Thesis. I weld a force sensing resistor to an IoT device (RuuviTag) and I developed a script to establish a Bluetooth communication and data acquisition between the RuuviTag and a server. The idea is to stick the force sensing resistor with the IoT device to the Die-Cutter so that, each time it does a rotation, it is counted thanks to a specific script installed on the RuuviTag. Than the data regarding the rotations are sent to the server and saved in InfluxDB database.

## Technologies Used ##
- [XAMPP](https://www.apachefriends.org/it/index.html)
- PHP 
- InfluxDB (default port 8086), version 1.8 at least
- [influxdb-php](https://github.com/influxdata/influxdb-php), it can be installed through Composer 
        ```
       $ composer require influxdata/influxdb-client-php
       ```
- Chromium browser (it used the Web Bluetooth).
       
## How To Use
In [Force Sensing Resistor](./Force sensing resistor) there are three files:
- ``` app.js ``` is the script flashed in the RuuviTag 
- ``` influxRequest.php ``` is used to write on InfluxDB
- ``` stream.php ``` is used to establish the Bluetooth connection with the RuuviTag

``` influxRequest.php ``` needs of autoload.php file that is in the following path .\xampp\htdocs\vendor\autoload.php. 

1) Insert files to be used (*influxRequest.php* e *stream.php*) in the folcer htdocs (.\xampp\htdocs), that is the default DocumentRoot XAMPP on Windows.
    In this way autoload.php will be automatically found from influxRequest.php;
2) start Apache server from XAMPP;
3) start InfluxDB;
4) create a database table called *ruuvi*;
3) access to http://localhost/stream.php;
4) press *connect* to establish the connection, choose the desired RuuviTag;
5) once established the connection, the data acquisition will begin after 1-2 seconds;
6) once finished the data connection, press *Stop Ruuvi* to notify the RuuviTag it can stop the data acquisition; then press *Stop Connection* to close the Bluetooth connection.


## How To Flash RuuviTag
1) go on [IDE Espruino](https://www.espruino.com/ide/) through a Chromium web browser;
2) copy paste the script in ``` app.js ```;
3) click on Flash, establish the connection with the desired RuuviTag and wait for the completion of the process;
4) flashing succeed if two greater than symbol (>) appears on the console. 
