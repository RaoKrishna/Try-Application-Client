var express = require('express');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');
var fs = require('fs');
var https = require('https');

var app = express();
var privateKey = fs.readFileSync('./privatekey.key', 'utf8');
var certificate = fs.readFileSync('./certificate.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
    noInfo: true
}));

//app.use(express.logger('dev'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

var port = 4000;
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, function(error) {
    if (error) throw error;
    console.log("Express server listening on port", port);
});