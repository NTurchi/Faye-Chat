import { createLogger, format, transports, info } from 'winston';

const customForm = format.printf(log => {
    return `[${log.timestamp}] - [${log.label}] - ${log.level} => ${log.message}`;
});

export const logger = createLogger({
    format: format.combine(
        format.label({ label : 'FayeServer' }),
        format.timestamp(),
        customForm
    ),
    transports: [new transports.Console()]
});
