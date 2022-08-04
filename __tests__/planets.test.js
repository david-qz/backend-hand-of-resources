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

    it('#GET /planets/:id should return details about a planet', async () => {
        const res = await request(app).get('/planets/1');
        expect(res.status).toEqual(200);

        const planet = res.body;

        expect(planet).toBeInstanceOf(Object);
        expect(planet).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            mass_kg: expect.any(String),
            mean_radius_km: expect.any(String),
            aphelion_au: expect.any(String),
            perihelion_au: expect.any(String),
        });
    });

    afterAll(async () => {
        await setup(pool);
        pool.end();
    });
});
