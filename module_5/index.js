import express from 'express';
import { createUserRouter } from './routes/createUserRouter';
import { UserService } from './services/UserService';
import { UserRepository } from './data-access/UserRepository';
import { db } from './datasource/db';
import { createGroupRouter } from './routes/createGroupRouter';
import { GroupService } from './services/GroupService';
import { GroupRepository } from './data-access/GroupRepository';
// import handler from './logging/LoggingMiddleware';
import logger from './logging/appLogger';
import requestLoggerInstance from './logging/RequestLogger';

const PORT = Number(process.env.PORT) || 3001;

const app = express();

app.use(express.json()).use('/', createUserRouter(new UserService(new UserRepository(db)), requestLoggerInstance))
    .use('/', createGroupRouter(new GroupService(new GroupRepository(db))));
app.listen(PORT, () => logger.info(`server has started on port ${PORT}`));

function logUncaughtError(error) {
    console.log('error', error);
    logger.info(error.message, { ...error });
    process.exit(1);
}
process.on('uncaughtException', logUncaughtError);
process.on('unhandledRejection', logUncaughtError);
