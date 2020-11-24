<html>
 <head>
  <title>Pressure sensor streaming</title>
 </head>
    <body>
    <script src="https://www.puck-js.com/puck.js"></script>
    <button id="btnConnect">Connect</button>
    <h1 id="info"></h1>
        <script>

        var csv = "";

        // When we click the connect button...
        var connection;
        document.getElementById("btnConnect").addEventListener("click", function() {
        // disconnect if connected already
        if (connection) {
            connection.close();
            connection = undefined;
        }
        // Connect
        Puck.connect(function(c) {
            if (!c) {
            alert("Couldn't connect!");
            return;
            }
            connection = c;
            // Handle the data we get back, and call 'onLine'
            // whenever we get a line
            document.getElementById("info").innerHTML = "Per terminare lo stream premi il pulsante sul Ruuvi";
            var buf = "";
            connection.on("data", function(d) {
            buf += d;
            var l = buf.split("\n");
            buf = l.pop();
            l.forEach(onLine);
            });
            // First, reset the Bangle
            connection.write("startAdv();\n", function() {});
        });
        });

        // When we get a line of data, check it and if it's
        // from the accelerometer, update it
        function onLine(line) {
            console.log("RECEIVED:"+line);
            var f = line;
            var d = line.split(",");
            if (d.length==3 && d[0]=="A") {
                // we have one more rotation
                var to_add = "";
                var reading = {
                value : parseFloat(d[1]),
                rotation : parseInt(d[2])
                };   
                to_add += reading.value +" "+ reading.rotation+" ";
                to_add += "\n";
                csv += to_add;

            } else if (f[0] == "F") {
                console.log(csv);
                saveFile(csv, "data.csv");
                sessionStorage.clear();
                localStorage.clear();
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
