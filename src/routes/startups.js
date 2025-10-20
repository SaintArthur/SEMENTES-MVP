const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');
router.get('/', auth, async (_, res) => {
  const startups = await prisma.startup.findMany({ include: { mentor: true } });
  res.json(startups);
});
router.post('/', auth, async (req, res) => {
  const s = await prisma.startup.create({ data: req.body });
  res.json(s);
});
module.exports = router;