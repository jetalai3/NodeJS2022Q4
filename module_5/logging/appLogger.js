import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

function createLogger(filename) {
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.json(),
            winston.format.colorize({ all: true })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.DailyRotateFile({
                filename,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d'
            })
        ]
    });
}

const logger = createLogger(
    path.join(process.cwd(), 'logs', 'application-%DATE%.log')
);

export default logger;
