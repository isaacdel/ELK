//import external libraries
const express = require('express');
const multer = require('multer');
const elastic = require('./elasticsearch');
const fileManager = require('./fileManager');
const monitorOS = require('./OSMonitor');

//run external libraries
var app = express();

/**
 * run server on port 80
 */
app.listen(3000, function () {
    fileManager.createNewFile();
    console.log('App is up and running');
});

app.put('/text', function (req, res) {
    writeLog(req, "put");
    var body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        fileManager.addText(JSON.parse(body.toString()).text);
    });
    res.status('200');
    res.send('SUCCESS');
});

app.get('/text', function (req, res) {
    writeLog(req, "get");
    fileManager.readLines(req.query.rows, function (err, value) {
        if(err) {
            res.status('500');
        }else {
            res.status('200');
            res.send(value);
        }
    });
});

app.delete('/text', function (req, res) {
    writeLog(req, "delete");
    fileManager.deleteLines(req.query.rows);
    res.status('200');
    res.send('SUCCESS');
});

app.get('/', function (req, res) {
    writeLog(req, "get");
    res.status('200');
    res.send('SUCCESS');
});

app.post('/', function (req, res) {
    writeLog(req, "post");
    res.status('200');
    res.send('SUCCESS');
});

function writeLog(req, reqtype){
    var data ={};
    data["reqtype"] = reqtype;
    data["ipAddress"] = req.connection.remoteAddress;
    data["useragent"] = req.get("User-Agent");
    data["timestamp"] = new Date();
    data["filesize"] = fileManager.getFileSize();
    monitorOS.monitorOSCPU(function(err, value){
        data["cpu"] = value;
        if(data["memory"] != undefined){
            elastic.addLog(data);
        }
    });
    monitorOS.monitorOSMemory(function(err, value){
        data["memory"] = value;
        if(data["cpu"] != undefined){
            elastic.addLog(data);
        }
    });
}
