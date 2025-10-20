const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateDataUrl } = require('../services/qrService');
const auth = require('../middleware/auth');
router.get('/', auth, async (_, res) => {
  const list = await prisma.evento.findMany();
  res.json(list);
});
router.post('/', auth, async (req, res) => {
  const { title, description, date, location } = req.body;
  const qrText = `evento:${title}:${Date.now()}`;
  const ev = await prisma.evento.create({ data: { title, description, date: new Date(date), location, qrCode: qrText } });
  const qrDataUrl = await generateDataUrl(qrText);
  res.json({ evento: ev, qrDataUrl });
});
router.post('/:id/checkin', auth, async (req, res) => {
  const eventoId = Number(req.params.id);
  const { qrText, userId } = req.body;
  const ev = await prisma.evento.findUnique({ where: { id: eventoId } });
  if (!ev || qrText !== ev.qrCode) return res.status(400).json({ error: 'QR inválido' });
  const pres = await prisma.presenca.create({ data: { eventoId, userId } });
  res.json(pres);
});
module.exports = router;