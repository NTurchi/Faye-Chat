import { FayeServer } from './src/services/fayeServer';
import { TelnetServer } from './src/services/telnetServer';
import { logger } from './src/services/logger';
import * as path from 'path';
import * as https from 'https';
import * as express from 'express';
import * as fs from 'fs';

const app = express();

// bonus task : TLS security

const options: https.ServerOptions = {
    key: fs.readFileSync('./src/certs/fayeserver_key.pem'),
    cert: fs.readFileSync('./src/certs/fayeserver_crt.pem'),
    passphrase: 'password'
};

// Set express app
app.use(express.static(__dirname));
app.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const server = https.createServer(options, app);
const telnetServer = new TelnetServer();
FayeServer.Instance.attach(server);
server.listen(443);
telnetServer.start();
FayeServer.Instance.initServerSideClient();

logger.info(`Server listening on ${(server.address() as any).port}`);
