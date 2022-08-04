const { PlatonicSolid } = require('../models/PlatonicSolid');
const { CrudRouter } = require('../utils/CrudRouter');

const router = new CrudRouter(PlatonicSolid);

module.exports = router;
