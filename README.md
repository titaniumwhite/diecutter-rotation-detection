# Espruino Repository per conteggio rotazioni 

## Force sensing resistor
### Installazione
- [XAMPP](https://www.apachefriends.org/it/index.html)
- PHP (io uso versione 7.4.12)
- InfluxDB (porta di default 8086) Necessaria versione 1.8+
- [influxdb-php](https://github.com/influxdata/influxdb-php) che si può installare tramite Composer 
        ```
       $ composer require influxdata/influxdb-client-php
       ```
- Edge o Chrome, in quanto è necessario il Web Bluetooth.
       
### Utilizzo
Nella cartella sono presenti tre file:
- ``` app.js ``` è lo script flashato nel Ruuvi, non è necessario il suo utilizzo
- ``` influxRequest.php ``` è lo script che si occupa di fare richieste di scrittura su InfluxDB
- ``` stream.php ``` è lo script che si occupa di stabilire la connessione col Ruuvi e di fare richieste a influxRequest.php quando necessario

Per il corretto funzionamento, ``` influxRequest.php ``` necessita del file autoload.php presente nel path .\xampp\htdocs\vendor\autoload.php. 

1) Inserire i file da usare (*influxRequest.php* e *stream.php*) nella cartella htdocs (.\xampp\htdocs), ossia la DocumentRoot di defaul di XAMPP in Windows.
    In questo modo il file autoload.php sarà automaticamente trovato da influxRequest.php;
2) avviare il server Apache da XAMPP;
3) avviare influxd;
4) creare un database chiamato *ruuvi* (è importante che abbia questo nome, altrimenti le richieste di salvataggio non andranno a buon fine);
3) accedere a http://localhost/stream.php;
4) premere *connect* per avviare la connessione e scegliere il Ruuvitag desiderato;
5) una volta effettuata la connessione l'acquisizione inizierà dopo circa 1-2 secondi, è possibile visualizzare i pacchetti ricevuti dalla console del browser;
6) una volta terminata l'acquisizione dati, premere prima *Stop Ruuvi* per notificare al RuuviTag che può interrompere l'acquisizione dati, e poi premere *Stop Connection* per notificare a stream.php che può chiudere la connessione col RuuviTag.


Se, per qualche motivo, fosse necessario flashare nuovamente il Ruuvi:
1) andare sull'[IDE Espruino](https://www.espruino.com/ide/) tramite Chrome o Edge;
2) incollare lo script presente su ``` app.js ```;
3) cliccare su Flash, effettuare la connessione col RuuviTag desiderato e aspettare che la barra in basso a destra si carichi completamente;
4) il flashing è andato a buon fine se sulla console vengono stampati due simboli maggiore (>). 
