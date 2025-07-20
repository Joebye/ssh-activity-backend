import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import {logger} from './logger/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import limiter from './middleware/rateLimit.mjs';
import { loginEvents, loginEventsService } from './routes/loginEvents.mjs';
import { Server as SocketIOServer } from 'socket.io';
import LoginEvent from './model/LoginEvent.mjs';

const clientHost: any = config.get("General.client_host");
//const nodeEnv = process.env.NODE_ENV;

const app = express();
app.use(limiter);
app.use(cors({origin: clientHost, credentials: false }));
app.use(bodyParser.json());
app.use(errorHandler);

app.use('/events', loginEvents);




// app.use(cors());




// if (nodeEnv == 'production') {

// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
// })

// }



const port = config.get('General.server.port');
const server = app.listen(port);
const io = new SocketIOServer(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  logger.info('Frontend connected');
});

loginEventsService.startMonitoringLogFile((loginEvent:LoginEvent) => {
  io.emit('login', loginEvent);
});

server.on('listening', () => logger.info(`server is listening on port: ${port}`));

server.on('close', () => {
    logger.info('Server has been stopped.');
});
server.on('error', (error) => {
    logger.error('An error occurred on the server:', error);
});


const shutdown = (signal: any) => {
    logger.info(`${signal} received. Shutting down the server...`);
    server.close(() => {
        logger.info('Server closed successfully.');
        process.exit(0);
});

setTimeout(() => {
        logger.error('Server did not shut down in time. Forcing shutdown.');
        process.exit(1);
}, 10000);

}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));


