const { Beverage } = require('../models/Beverage');
const { CrudRouter } = require('../utils/CrudRouter');

const router = new CrudRouter(Beverage);

module.exports = router;
