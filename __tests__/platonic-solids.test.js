const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('/platonic-solids crud routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('#GET /platonic-solids should return a list of platonic solids', async () => {
        const res = await request(app).get('/platonic-solids');
        expect(res.status).toEqual(200);

        const platonicSolids = res.body;

        expect(platonicSolids).toBeInstanceOf(Array);
        platonicSolids.map(x => expect(x).toMatchObject({
            id: expect.any(String),
            name: expect.any(String)
        }));
    });

    afterAll(async () => {
        await setup(pool);
        pool.end();
    });
});
