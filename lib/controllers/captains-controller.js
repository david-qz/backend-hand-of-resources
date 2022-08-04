const { Captain } = require('../models/Captain');
const { CrudRouter } = require('../utils/CrudRouter');

const router = new CrudRouter(Captain);

module.exports = router;
