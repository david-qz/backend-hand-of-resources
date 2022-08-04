const { Planet } = require('../models/Planet');
const { Router } = require('express');

const router = new Router();

router.get('/', async (req, res, next) => {
    try {
        const planets = await Planet.getAll();
        res.json(planets);
    } catch(error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const planet = await Planet.getById(req.params.id);
        res.json(planet);
    } catch(error) {
        next(error);
    }
});

module.exports = router;
