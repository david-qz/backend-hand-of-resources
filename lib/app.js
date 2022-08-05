const express = require('express');
const path = require('path');

const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// App routes
app.use('/captains', require('./controllers/captains-controller'));
app.use('/planets', require('./controllers/planets-controller'));
app.use('/beverages', require('./controllers/beverages-controller'));
app.use('/inventions', require('./controllers/inventions-controller'));
app.use('/platonic-solids', require('./controllers/platonic-solids-controller'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
