const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

require('dotenv').config();

const appRoutes = require('./routes/app');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const app = express();

try {
  mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsbd');
} catch (err) {
  process.exit();
}

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use('/api', appRoutes);
app.use(errorLogger);

app.use(errors());
app.use(centralErrorHandler);

module.exports = app;
