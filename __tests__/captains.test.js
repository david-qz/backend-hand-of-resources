const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('/captains crud routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('#GET /captains should return a list of captains', async () => {
        const res = await request(app).get('/captains');
        expect(res.status).toEqual(200);

        const captains = res.body;

        expect(captains).toBeInstanceOf(Array);
        captains.map(x => expect(x).toMatchObject({
            id: expect.any(String),
            name: expect.any(String)
        }));
    });

    afterAll(() => {
        pool.end();
    });
});
