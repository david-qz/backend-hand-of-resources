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

    it('#GET /inventions/:id should return details about a invention', async () => {
        const res = await request(app).get('/inventions/1');
        expect(res.status).toEqual(200);

        const invention = res.body;

        expect(invention).toBeInstanceOf(Object);
        expect(invention).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            description: expect.any(String)
        });
        // Nullable columns
        expect(invention).toHaveProperty('inventor');
        expect(invention).toHaveProperty('year');
    });

    it('#POST /inventions should create a new invention', async () => {
        const newInvention = {
            name: 'The Daguerreotype',
            description: 'The first publicly available photographic process.',
            inventor: 'Louis Daguerre',
            year: 1839
        };

        const resp = await request(app).post('/inventions').send(newInvention);
        expect(resp.status).toEqual(200);

        const invention = resp.body;

        expect(invention).toEqual({
            id: expect.any(String),
            name: 'The Daguerreotype',
            description: 'The first publicly available photographic process.',
            inventor: 'Louis Daguerre',
            year: 1839
        });
    });

    it('#PUT /inventions/:id should update an existing invention', async () => {
        const updatedTelephone = {
            description: 'Tin cans with a string between them.'
        };

        const resp = await request(app).put('/inventions/3').send(updatedTelephone);
        expect(resp.status).toEqual(200);

        const newTelephone = resp.body;

        expect(newTelephone).toEqual({
            id: '3',
            description: 'Tin cans with a string between them.',
            inventor: 'Alexander Graham Bell',
            name: 'The Telephone',
            year: 1876
        });
    });

    afterAll(async () => {
        await setup(pool);
        pool.end();
    });
});
