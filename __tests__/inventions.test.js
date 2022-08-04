const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('/inventions crud routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('#GET /inventions should return a list of inventions', async () => {
        const res = await request(app).get('/inventions');
        expect(res.status).toEqual(200);

        const inventions = res.body;

        expect(inventions).toBeInstanceOf(Array);
        inventions.map(x => expect(x).toMatchObject({
            id: expect.any(String),
            name: expect.any(String)
        }));
    });

    afterAll(async () => {
        await setup(pool);
        pool.end();
    });
});
