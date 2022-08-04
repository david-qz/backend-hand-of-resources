const { Router } = require('express');

/*
 * Creates an express "Router" with routes set up for restful CRUD operations. This makes a whole bunch of assumptions
 * about how the Model behaves (bad), but also will save a lot of code duplication for this project (good). To alleviate
 * the former issue somewhat, this is set up so any of the naive route handlers can be overriden after the fact (by
 * assigning a new async handler to getListHandler, getDetailHandler, etc after construction).
 */
function CrudRouter(Model) {
    const router = Router();

    router.getListHandler = async (req, res, next) => {
        try {
            const instance = await Model.getAll();
            res.json(instance);
        } catch(error) {
            next(error);
        }
    };

    router.getDetailHandler = async (req, res, next) => {
        try {
            const instance = await Model.getById(req.params.id);
            res.json(instance);
        } catch(error) {
            next(error);
        }
    };

    router.postHandler = async (req, res, next) => {
        try {
            const instance = await Model.insert(req.body);
            res.json(instance);
        } catch(error) {
            next(error);
        }
    };

    router.putHandler = async (req, res, next) => {
        try {
            const instance = await Model.updateById(req.params.id, req.body);
            res.json(instance);
        } catch(error) {
            next(error);
        }
    };

    router.deleteHandler = async (req, res, next) => {
        try {
            const instance = await Model.deleteById(req.params.id);
            res.json(instance);
        } catch(error) {
            next(error);
        }
    };

    // Each of these handlers is wrapped in an arrow function so that
    return router
        .get('/', async (req, res, next) => {
            await router.getListHandler(req, res, next);
        })
        .get('/:id', async (req, res, next) => {
            await router.getDetailHandler(req, res, next);
        })
        .post('/', async (req, res, next) => {
            await router.postHandler(req, res, next);
        })
        .put('/:id', async (req, res, next) => {
            await router.putHandler(req, res, next);
        })
        .delete('/:id', async (req, res, next) => {
            await router.deleteHandler(req, res, next);
        });
}

module.exports = { CrudRouter };
