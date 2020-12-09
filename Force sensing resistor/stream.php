<html>
 <head>
  <title>Pressure sensor streaming</title>
 </head>
    <body>
    <script src="https://www.puck-js.com/puck.js"></script>
    <button id="btnConnect">Connect</button>
    <button id="btnStopRuuvi">Stop Ruuvi</button>
    <button id="btnStopConnection">Stop Connection</button>
    <br> <br> <br>
    <h2>
    Per terminare lo stream premere in ordine:
    <br>
    1) <u> Stop Ruuvi</u> per fermare lo stream sul RuuviTag e salvare un file csv in locale
    <br>
    2) <u> Stop Connection</u> per interrompere la connessione aperta dal computer
    <br> <br>
    Dalla console del browser si possono vedere i pacchetti ricevuti.
    </h2>
    <h1 id="info"></h1>
        
        <script>

        var csv = "";   
        var oneTime = 0; //avoid to download more than one csv

        var connection;
        document.getElementById("btnConnect").addEventListener("click", function() {
        // disconnect if connected already
            if (connection) {
                connection.close();
                connection = undefined;
            }
            
            Puck.connect(function(c) {
                if (!c) {
                    alert("Couldn't connect!");
                    return;
                }
                
                connection = c;

                var buf = "";
                connection.on("data", function(d) {
                    buf += d;
                    var l = buf.split("\n");
                    buf = l.pop();
                    l.forEach(onLine);
                });

                connection.write("startAdv();\n", function() {});

                document.getElementById("btnStopRuuvi").addEventListener("click", function() {
                    connection.write("stopAdv();\n", function() {});
                    oneTime = 0;
                });

                document.getElementById("btnStopConnection").addEventListener("click", function() {
                    if(connection) connection.close();
                })

            });
        });

        function onLine(line) {
            console.log("RECEIVED:"+line);
            var f = line;
            var d = line.split(",");
            if (d.length==3 && d[0]=="A") {
                var xmlhttp = new XMLHttpRequest();

                // we have one more rotation
                var to_add = "";
                var reading = {
                value : parseFloat(d[1]),
                rotation : parseInt(d[2])
                };   

                xmlhttp.open("GET", "influxRequest.php?v=" + reading.value + "&r=" + reading.rotation, true);
                xmlhttp.send();
                
                to_add += reading.value +" "+ reading.rotation+" ";
                to_add += "\n";
                csv += to_add;

            } else if (f[0] == "F" && oneTime == 0) {
                oneTime = 1;
                console.log(csv);
                saveFile(csv, "data.csv");
            }
        }

        function saveFile(csvText, fileName) {
        var saver = document.createElement("a");
        var blob = new Blob([csvText], {type : 'text/csv'});
        var blobURL = saver.href = URL.createObjectURL(blob),
            body = document.body;
        saver.download = fileName;
        body.appendChild(saver);
        saver.dispatchEvent(new MouseEvent("click"));
        body.removeChild(saver);
        URL.revokeObjectURL(blobURL);
        }

        </script>
    
    </body>
</html>  
