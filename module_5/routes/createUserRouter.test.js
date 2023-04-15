import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

import { createUserRouter } from './createUserRouter';
import UserService from '../services/UserService';
import { createLoginRouter } from './createLoginRouter';

const app = express();

const id = uuidv4();
const mockUserData = {
    login: 'test',
    password: 'test',
    age: 20
};
const mockUserDataWithId = { id, ...mockUserData };

jest.mock('../services/UserService', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getUsers: jest.fn().mockImplementation(() => [mockUserData]),
            getUserById: jest.fn().mockImplementation(() => mockUserData),
            createUser: jest.fn().mockImplementation(() => mockUserData),
            updateUser: jest.fn().mockImplementation(() => mockUserData),
            markUserAsDeleted: jest.fn().mockImplementation(() => mockUserData),
            getSuggestedUsers: jest.fn().mockImplementation(() => [mockUserData]),
            getUserByLoginAndPassword: jest.fn().mockImplementation(() => mockUserDataWithId)
        };
    });
});

const mockUserService = new UserService();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(createUserRouter(mockUserService));
app.use(createLoginRouter(mockUserService));

describe('Users route', () => {
    test('createUser', (done) => {
        request(app)
            .post('/users')
            .send(mockUserData)
            .expect('Content-Type', /json/)
            .expect(mockUserData)
            .expect(200, done);
    });

    test('getUsers', (done) => {
        request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect([mockUserData])
            .expect(200, done);
    });

    test('updateUser', (done) => {
        request(app)
            .put('/users/1')
            .send(mockUserData)
            .expect('Content-Type', /json/)
            .expect(mockUserData)
            .expect(200, done);
    });

    test('markUserAsDeleted', (done) => {
        request(app)
            .delete('/users/1')
            .expect(204, done);
    });

    test('getSuggestedUsers', (done) => {
        request(app)
            .post('/users/autosuggest?login=t&limit=10')
            .expect('Content-Type', /json/)
            .expect([mockUserData])
            .expect(200, done);
    });

    test('getUserByLoginAndPassword', (done) => {
        request(app)
            .post('/login')
            .send(mockUserDataWithId)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(404, done);
    });
});
