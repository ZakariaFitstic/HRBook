var app = require('express')();
var http = require('http').createServer(app);
var mysql = require('mysql');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!LukeBYes1994",
    database: "hrbook"
});
con.connect(function(err) {
    if (err) console(err);
    console.log("Connesso con successo al database MySQL!");
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.get('/aggiungicandidato', function(req, res) {
    res.sendFile(__dirname + '/aggiungi_candidato.html');
})
app.get('/scriptCandidato', function(req, res) {
    res.sendFile(__dirname + '/candidato.js');
})

app.get('/api/candidate', function(req, res) {
    const sql = "SELECT * from candidati";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
});
app.post('/ricerca', function(req, res) {
    const sql = "SELECT * from candidati where formazione = '"+req.body.ricerca+"'";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log("Risultato query!")
        res.send(result);
    })
})
app.post('/api/candidate', function(req, res) {
    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var data_nascita = req.body.data_nascita;
    var data_nota = req.body.data_nota;
    var data_scadenza = req.body.data_scadenza;
    var contatto = req.body.contatto;
    var skill = req.body.skill;
    var formazione = req.body.formaz;
    var nota = req.body.nota;
    const sql = "INSERT INTO candidati (nome, cognome, data_nascita, contatto, skill, formazione, data_scadenza, data_nota, nota) VALUES ('"+nome+"','"+cognome+"','"+data_nascita+"','"+contatto+"','"+skill+"','"+formazione+"','"+data_scadenza+"','"+data_nota+"','"+nota+"')";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Inserimento effettuato");
        res.sendStatus(200);
    })
});

app.put('/api/candidate', function(req, res) {
    con.query("UPDATE candidati set skill = '"+req.body.skill+"' where id = "+req.body.id+"", function(err) {
        if (err) throw err;
        console.log("Updated!");
        res.sendStatus(200);
    });
});

app.delete('/api/candidate', function(req, res) {
    con.query("DELETE from candidati where id = " + req.body.id, function() {
        console.log("Deleted!");
        res.sendStatus(200);
    })
});

http.listen(8080, function() {
    console.log("Server HR di AGM Solution attivato co successo!");
})