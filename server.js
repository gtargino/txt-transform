const express = require('express');
const server = express();
server.use(express.json());
server.use(express.static(__dirname + '/public'));
server.listen(3333);

server.get('/', function (req,res) {
    res.sendFile(__dirname + '/public/page.html');
});
