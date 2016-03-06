'use strict';

var _ = require("lodash");

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.static('../../target/build'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/countX', function (req, res) {
    var text = req.param("text");
    var length = _.filter(text, function (c) {
        return c === "X";
    }).length;
    res.send("" + length);
});

var server = app.listen(8080, function () {
    console.log('Listening on port %d', server.address().port);
});
