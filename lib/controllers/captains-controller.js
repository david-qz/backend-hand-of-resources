const { Captain } = require('../models/Captain');
const { Router } = require('express');

const router = new Router();

router.get('/', async (req, res, next) => {
    try {
        const captains = await Captain.getAll();
        res.json(captains);
    } catch(error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const captain = await Captain.getById(req.params.id);
        res.json(captain);
    } catch(error) {
        next(error);
    }
});

module.exports = router;
