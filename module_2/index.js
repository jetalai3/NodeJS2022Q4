import express from 'express';
import { createUserRouter } from './UserRouter';
import { UserService } from './UserService';

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.json()).use('/', createUserRouter(new UserService));
app.listen(PORT);
process.stdout.write(`Online on port ${PORT}\n`);
