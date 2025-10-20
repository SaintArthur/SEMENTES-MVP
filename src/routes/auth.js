const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { sign } = require('../utils/jwt');
const prisma = new PrismaClient();
router.post('/register', async (req, res) => {
  const { email, password, name, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { email, password: hashed, name, role } });
    res.json({ id: user.id, email: user.email });
  } catch { res.status(400).json({ error: 'Usuário já existe' }); }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });
  const token = sign({ id: user.id, email: user.email, role: user.role });
  res.json({ token, user });
});
module.exports = router;