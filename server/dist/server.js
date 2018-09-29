"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fayeServer_1 = require("./src/services/fayeServer");
const telnetServer_1 = require("./src/services/telnetServer");
const logger_1 = require("./src/services/logger");
const path = require("path");
const https = require("https");
const express = require("express");
const fs = require("fs");
const app = express();
// bonus task : TLS security
const options = {
    key: fs.readFileSync('./src/certs/fayeserver_key.pem'),
    cert: fs.readFileSync('./src/certs/fayeserver_crt.pem'),
    passphrase: 'password'
};
// Set express app
app.use(express.static(__dirname));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const server = https.createServer(options, app);
const telnetServer = new telnetServer_1.TelnetServer();
fayeServer_1.FayeServer.Instance.attach(server);
server.listen(443);
telnetServer.start();
fayeServer_1.FayeServer.Instance.initServerSideClient();
logger_1.logger.info(`Server listening on ${server.address().port}`);
