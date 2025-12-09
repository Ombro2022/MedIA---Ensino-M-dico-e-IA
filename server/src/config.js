import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';

// Load root .env (../.env) first, then local .env if present
const rootEnvPath = path.resolve(process.cwd(), '..', '.env');
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}
dotenv.config();

const dataDir = process.env.MEDIA_SOCIAL_DATA_DIR || path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const PORT = Number(process.env.MEDIA_SOCIAL_PORT || process.env.PORT || 4000);
export const JWT_SECRET = process.env.MEDIA_SOCIAL_JWT_SECRET || process.env.JWT_SECRET || 'change-me-please';
export const ADMIN_SETUP_KEY = process.env.MEDIA_SOCIAL_SETUP_KEY || process.env.ADMIN_SETUP_KEY || 'setup-secret';
export const ALLOWED_ORIGINS = process.env.MEDIA_SOCIAL_ALLOWED_ORIGINS
  ? process.env.MEDIA_SOCIAL_ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : undefined;
export const DB_PATH = process.env.MEDIA_SOCIAL_DB_PATH || path.join(dataDir, 'media-social.db');
export const TOKEN_EXPIRATION = process.env.MEDIA_SOCIAL_TOKEN_EXPIRATION || '12h';
