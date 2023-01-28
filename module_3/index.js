import express from 'express';
import { createUserRouter } from './routes/createUserRouter';
import { UserService } from './services/UserService';
import { UserRepository } from './data-access/UserRepository';
import { db } from './datasource/db';
import { createGroupRouter } from './routes/createGroupRouter';
import { GroupService } from './services/GroupService';
import { GroupRepository } from './data-access/GroupRepository';

const PORT = Number(process.env.PORT) || 3001;

const app = express();

app.use(express.json()).use('/', createUserRouter(new UserService(new UserRepository(db)))).use('/', createGroupRouter(new GroupService(new GroupRepository(db))));
app.listen(PORT);
process.stdout.write(`Online on port ${PORT}\n`);
