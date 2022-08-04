const { Invention } = require('../models/Invention');
const { CrudRouter } = require('../utils/CrudRouter');

const router = new CrudRouter(Invention);

module.exports = router;
