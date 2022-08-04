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

    it('#POST /planets should create a new planet', async () => {
        const newPlanet = {
            name: 'Pluto',
            mass_kg: 1.303e22,
            mean_radius_km: 1188.3,
            aphelion_au: 49.305,
            perihelion_au: 29.658
        };

        const resp = await request(app).post('/planets').send(newPlanet);
        expect(resp.status).toEqual(200);

        const planet = resp.body;

        expect(planet).toEqual({
            id: expect.any(String),
            name: 'Pluto',
            mass_kg: '13030000000000000000000',
            mean_radius_km: '1188.3',
            aphelion_au: '49.305',
            perihelion_au: '29.658'
        });
    });

    it('#PUT /planets/:id should update an existing planet', async () => {
        const updatedEarth = {
            aphelion_au: 1,
            perihelion_au: 1
        };

        const resp = await request(app).put('/planets/3').send(updatedEarth);
        expect(resp.status).toEqual(200);

        const newEarth = resp.body;

        expect(newEarth).toEqual({
            id: '3',
            name: 'Earth',
            mass_kg: '5972400000000000000000000',
            mean_radius_km: '6371.0',
            aphelion_au: '1',
            perihelion_au: '1'
        });
    });

    afterAll(async () => {
        await setup(pool);
        pool.end();
    });
});
