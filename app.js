const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const appRoutes = require('./routes/app');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

try {
  mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsbd');
} catch (err) {
  process.exit();
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

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
