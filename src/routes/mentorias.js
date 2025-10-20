const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');
router.get('/', auth, async (_, res) => {
  const list = await prisma.mentoria.findMany({ include: { startup: true, mentor: true } });
  res.json(list);
});
router.post('/', auth, async (req, res) => {
  const m = await prisma.mentoria.create({ data: req.body });
  res.json(m);
});
module.exports = router;