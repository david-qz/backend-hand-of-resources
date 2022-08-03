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

    it('#GET /captains/:id should return details about a captain', async () => {
        const res = await request(app).get('/captains/1');
        expect(res.status).toEqual(200);

        const captain = res.body;

        expect(captain).toBeInstanceOf(Object);
        expect(captain).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            ship: expect.any(String),
        });
        // Nullable columns
        expect(captain).toHaveProperty('association');
    });

    it('#POST /captains should create a new captain', async () => {
        const newCaptain = {
            name: 'Captain Nemo',
            ship: 'Nautilus'
        };

        const resp = await request(app).post('/captains').send(newCaptain);
        expect(resp.status).toEqual(200);

        const captain = resp.body;

        expect(captain).toEqual({
            id: expect.any(String),
            name: 'Captain Nemo',
            ship: 'Nautilus',
            association: null
        });
    });

    afterAll(() => {
        pool.end();
    });
});
