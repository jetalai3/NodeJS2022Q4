import express from 'express';
import { createUserRouter } from './createUserRouter';
import { UserService } from './UserService';
import { UserRepository } from './UserRepository';
import { db } from './db';

const PORT = Number(process.env.PORT) || 3001;

const app = express();

app.use(express.json()).use('/', createUserRouter(new UserService(new UserRepository(db))));
app.listen(PORT);
process.stdout.write(`Online on port ${PORT}\n`);
