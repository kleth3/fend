const request = require('supertest');
const app = require('../src/server/index');

describe('Post Endpoints', () => {
    test('Call location api', async () => {
        const data = {
            city: "atlanta"
        };
        const response = await request(app).post('/location').send(data);

        expect(response.status).toEqual(200);

    })
})
