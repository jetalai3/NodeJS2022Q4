import request from 'supertest';
import express from 'express';

import { createGroupRouter } from './createGroupRouter';
import GroupService from '../services/GroupService';

const app = express();

const mockGroupData = {
    name: 'test group',
    permissions: ['READ', 'WRITE']
};

jest.mock('../services/GroupService', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getGroups: jest.fn().mockImplementation(() => [mockGroupData]),
            getGroupById: jest.fn().mockImplementation(() => mockGroupData),
            createGroup: jest.fn().mockImplementation(() => mockGroupData),
            updateGroup: jest.fn().mockImplementation(() => mockGroupData),
            deleteGroup: jest.fn().mockImplementation(() => {}),
            addUsersToGroup: jest.fn().mockImplementation(() => {})
        };
    });
});

const mockGroupService = new GroupService();

app.use(express.json());
app.use(createGroupRouter(mockGroupService));

describe('Groups route', () => {
    test('getGroups', (done) => {
        request(app)
            .get('/groups')
            .expect([mockGroupData])
            .expect(200, done);
    });

    test('getGroupById', (done) => {
        request(app)
            .get('/groups/1')
            .expect(mockGroupData)
            .expect(200, done);
    });

    test('createGroup', (done) => {
        request(app)
            .post('/groups')
            .send(mockGroupData)
            .expect('Content-Type', /json/)
            .expect(mockGroupData)
            .expect(200, done);
    });

    test('updateGroup', (done) => {
        request(app)
            .put('/groups/1')
            .send(mockGroupData)
            .expect('Content-Type', /json/)
            .expect(mockGroupData)
            .expect(200, done);
    });

    test('deleteGroup', (done) => {
        request(app)
            .delete('/groups/1')
            .expect(204, done);
    });

    test('addUsersToGroup', (done) => {
        request(app)
            .post('/groups/adduserstogroup')
            .expect(201, done);
    });
});
