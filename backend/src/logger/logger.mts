import pino from 'pino';
import config from 'config';
import moment from 'moment';

const nodeEnv = process.env.NODE_ENV;


const defineOutput = () => {
if (nodeEnv === 'production' || nodeEnv === 'staging' || nodeEnv === 'development' ) {
    const logs_path = config.get('Pino.logs_path')
        const dateNow = moment().format('DD-MM-YYYY')
        const fileTransport = pino.transport({
            target: 'pino/file',
            options: { destination: `${logs_path}/${dateNow}.log` }
  })
  return fileTransport;
}
}

export const logger = pino({
    level: config.get('Pino.PINO_LOG_LEVEL') || 'info',
    formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
        bindings :(bindings) => {
            return {pid: bindings.pid, host: nodeEnv === 'production'
               || nodeEnv === 'staging' || nodeEnv === 'development'
                    ? bindings.hostname: undefined}            
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      },
    defineOutput()
);