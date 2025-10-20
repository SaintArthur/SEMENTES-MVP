const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const startupsRoutes = require('./routes/startups');
const mentoriasRoutes = require('./routes/mentorias');
const eventosRoutes = require('./routes/eventos');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/startups', startupsRoutes);
app.use('/api/mentorias', mentoriasRoutes);
app.use('/api/eventos', eventosRoutes);
app.get('/health', (_, res) => res.json({ status: 'ok' }));
module.exports = app;0