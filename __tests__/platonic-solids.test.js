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

    it('#GET /platonic-solids/:id should return details about a platonic solid', async () => {
        const res = await request(app).get('/platonic-solids/1');
        expect(res.status).toEqual(200);

        const platonicSolid = res.body;

        expect(platonicSolid).toBeInstanceOf(Object);
        expect(platonicSolid).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            vertices: expect.any(Number),
            edges: expect.any(Number),
            faces: expect.any(Number),
            schlafliSymbol: expect.any(String)
        });
    });

    afterAll(async () => {
        await setup(pool);
        pool.end();
    });
});
