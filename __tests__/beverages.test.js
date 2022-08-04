const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('/beverages crud routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('#GET /beverages should return a list of beverages', async () => {
        const res = await request(app).get('/beverages');
        expect(res.status).toEqual(200);

        const beverages = res.body;

        expect(beverages).toBeInstanceOf(Array);
        beverages.map(x => expect(x).toMatchObject({
            id: expect.any(String),
            name: expect.any(String)
        }));
    });

    it('#GET /beverages/:id should return details about a beverage', async () => {
        const res = await request(app).get('/beverages/1');
        expect(res.status).toEqual(200);

        const beverage = res.body;

        expect(beverage).toBeInstanceOf(Object);
        expect(beverage).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            rating: expect.any(Number),
        });
    });

    afterAll(async () => {
        await setup(pool);
        pool.end();
    });
});
