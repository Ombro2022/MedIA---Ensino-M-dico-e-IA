import bcrypt from 'bcrypt';
import { insertAdmin, findAdminByEmail } from '../db.js';

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value] = arg.split('=');
    return [key.replace(/^--/, ''), value];
  })
);

const email = args.email;
const password = args.password;

if (!email || !password) {
  console.error('Uso: npm run seed:admin -- --email=seu@email --password=SenhaForte');
  process.exit(1);
}

const run = async () => {
  const existing = await findAdminByEmail(email);
  if (existing) {
    console.error('Já existe um administrador com esse email.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  await insertAdmin(email, hash);
  console.log(`Administrador ${email} criado com sucesso.`);
  process.exit(0);
};

run().catch((error) => {
  console.error('Erro ao criar administrador', error);
  process.exit(1);
});
