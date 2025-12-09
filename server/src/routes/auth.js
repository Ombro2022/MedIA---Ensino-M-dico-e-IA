import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ADMIN_SETUP_KEY, JWT_SECRET, TOKEN_EXPIRATION } from '../config.js';
import { authenticate } from '../middleware/auth.js';
import { findAdminByEmail, insertAdmin } from '../db.js';

const router = Router();

const normalizeEmail = (email) => email.trim().toLowerCase();

router.post('/register', async (req, res) => {
  try {
    const setupKey = req.headers['x-setup-key'];
    if (!setupKey || setupKey !== ADMIN_SETUP_KEY) {
      return res.status(403).json({ message: 'Chave não autorizada' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Informe email e senha' });
    }

    const sanitizedEmail = normalizeEmail(email);
    const existing = await findAdminByEmail(sanitizedEmail);
    if (existing) {
      return res.status(409).json({ message: 'Administrador já existente' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await insertAdmin(sanitizedEmail, passwordHash);

    return res.status(201).json({ message: 'Administrador cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro no registro', error);
    return res.status(500).json({ message: 'Erro interno' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Informe email e senha' });
    }

    const admin = await findAdminByEmail(normalizeEmail(email));
    if (!admin) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    return res.json({ token, admin: { email: admin.email, createdAt: admin.created_at } });
  } catch (error) {
    console.error('Erro no login', error);
    return res.status(500).json({ message: 'Erro interno' });
  }
});

router.get('/me', authenticate, (req, res) => {
  return res.json({ email: req.user.email });
});

export default router;
