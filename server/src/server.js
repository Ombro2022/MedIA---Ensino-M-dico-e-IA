import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS, PORT } from './config.js';
import authRoutes from './routes/auth.js';

const app = express();

const corsOptions = {
  origin: ALLOWED_ORIGINS || true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);

app.use((err, _req, res, _next) => {
  console.error('Erro não tratado', err);
  res.status(500).json({ message: 'Erro inesperado' });
});

app.listen(PORT, () => {
  console.log(`API social rodando na porta ${PORT}`);
});
