const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('/planets crud routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('#GET /planets should return a list of planets', async () => {
        const res = await request(app).get('/planets');
        expect(res.status).toEqual(200);

        const planets = res.body;

        expect(planets).toBeInstanceOf(Array);
        planets.map(x => expect(x).toMatchObject({
            id: expect.any(String),
            name: expect.any(String)
        }));
    });

    afterAll(async () => {
        await setup(pool);
        pool.end();
    });
});
