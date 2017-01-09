var exec = require('child_process').execSync;
var express = require('express');
var app = express();
app.use(express.static('www'));
app.listen(8080);
console.log('Running static development at http://localhost:8080...');
exec('open http://localhost:8080');