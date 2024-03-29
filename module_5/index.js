import express from 'express';
import cors from 'cors';
import { createUserRouter } from './routes/createUserRouter';
import { UserService } from './services/UserService';
import { UserRepository } from './data-access/UserRepository';
import { db } from './datasource/db';
import { createGroupRouter } from './routes/createGroupRouter';
import { GroupService } from './services/GroupService';
import { GroupRepository } from './data-access/GroupRepository';
import loggingMiddleware from './logging/LoggingMiddleware';
import logger from './logging/appLogger';
import globalErrorMiddleware from './logging/GlobalErrorMiddleware';
import authorizationMiddleware from './authorization/AuthorizationMiddleware';
import { createLoginRouter } from './routes/createLoginRouter';

const PORT = Number(process.env.PORT) || 3001;

const app = express();
const userService = new UserService(new UserRepository(db));
app.use(cors()).use(express.json()).use(loggingMiddleware).use(createLoginRouter(userService)).use(authorizationMiddleware).use('/', createUserRouter(userService))
    .use('/', createGroupRouter(new GroupService(new GroupRepository(db)))).use(globalErrorMiddleware);
app.listen(PORT, () => logger.info(`server has started on port ${PORT}`));

function logUncaughtError(error) {
    console.log('error', error);
    logger.error(error.message, { ...error });
    process.exit(1);
}
process.on('uncaughtException', logUncaughtError);
process.on('unhandledRejection', logUncaughtError);
