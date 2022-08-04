const { Planet } = require('../models/Planet');
const { CrudRouter } = require('../utils/CrudRouter');

const router = new CrudRouter(Planet);

module.exports = router;
