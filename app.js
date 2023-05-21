const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

require('dotenv').config();

const appRoutes = require('./routes/index');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const { dbLink } = require('./utils/config');

const { NODE_ENV, DB_URL } = process.env;

const app = express();

try {
  mongoose.connect(NODE_ENV === 'production' ? DB_URL : dbLink);
} catch (err) {
  process.exit();
}

app.use(helmet());

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use(limiter);
app.use('/api', appRoutes);
app.use(errorLogger);

app.use(errors());
app.use(centralErrorHandler);

module.exports = app;
