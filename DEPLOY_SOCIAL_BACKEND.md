# 🚀 Deploy do Backend Social Studio (Railway)

## 📋 Pré-requisitos

- Conta no Railway (https://railway.app)
- Backend funcionando localmente (testado em `http://localhost:4000`)

---

## 🛤️ Passo 1: Deploy no Railway

### 1.1 Criar novo projeto

1. Acesse https://railway.app
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Autorize Railway a acessar seu repositório GitHub
5. Selecione o repositório `MedIA---Ensino-M-dico-e-IA`

### 1.2 Configurar o serviço

1. Railway detectará automaticamente Node.js
2. Configure o **Root Directory**: `server`
3. Configure o **Build Command**: `npm install`
4. Configure o **Start Command**: `npm start`

---

## 🔐 Passo 2: Configurar Variáveis de Ambiente no Railway

No painel do Railway, vá em **Variables** e adicione:

```bash
# Obrigatórias
MEDIA_SOCIAL_JWT_SECRET=<gere-um-secret-forte-aqui>
MEDIA_SOCIAL_SETUP_KEY=<chave-para-criar-admins>
MEDIA_SOCIAL_ALLOWED_ORIGINS=https://seu-app.vercel.app

# Opcionais (Railway configura PORT automaticamente)
PORT=${{RAILWAY_PUBLIC_PORT}}
```

### Como gerar secrets seguros:

```bash
# No terminal local:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Execute duas vezes para gerar `JWT_SECRET` e `SETUP_KEY`.

---

## 🌐 Passo 3: Obter URL do Backend

1. No Railway, vá em **Settings** → **Networking**
2. Clique em **Generate Domain**
3. Railway gerará uma URL pública: `https://seu-backend.up.railway.app`
4. **Copie esta URL** - você precisará dela no frontend

---

## 👤 Passo 4: Criar Administrador

### Opção A: Via script (recomendado para primeiro admin)

Após deploy, execute via Railway CLI ou web console:

```bash
npm run seed:admin -- --email=seu@email.com --password=SuaSenhaForte123
```

### Opção B: Via API (para admins adicionais)

```bash
curl -X POST https://seu-backend.up.railway.app/auth/register \
  -H "Content-Type: application/json" \
  -H "x-setup-key: <MEDIA_SOCIAL_SETUP_KEY>" \
  -d '{
    "email": "admin@media.com",
    "password": "senha-segura"
  }'
```

---

## ✅ Passo 5: Testar Backend

### Verificar health:

```bash
curl https://seu-backend.up.railway.app/health
```

Deve retornar: `{"status":"ok"}`

### Testar login:

```bash
curl -X POST https://seu-backend.up.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu@email.com",
    "password": "SuaSenhaForte123"
  }'
```

Deve retornar um `token` JWT.

---

## 🎨 Passo 6: Configurar Frontend na Vercel

1. Acesse o painel da Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:

```
VITE_SOCIAL_API_URL=https://seu-backend.up.railway.app
```

4. **Importante**: Adicione para todos os ambientes (Production, Preview, Development)
5. Faça **Redeploy** do frontend na Vercel

---

## 🧪 Passo 7: Validar em Produção

1. Acesse sua app na Vercel: `https://seu-app.vercel.app`
2. Pressione `Ctrl+Shift+M` (ou `Cmd+Shift+M` no Mac)
3. Faça login com seu email/senha
4. **Sucesso**: Você deve entrar no Social Studio
5. **Falha**: Verifique console do browser para erros

---

## 🔍 Troubleshooting

### Erro: "Failed to fetch"

**Causa**: Backend offline ou URL incorreta

**Solução**:
1. Verifique se backend está rodando no Railway
2. Confirme URL em `VITE_SOCIAL_API_URL`
3. Teste com `curl` conforme Passo 5

### Erro: "CORS blocked"

**Causa**: `MEDIA_SOCIAL_ALLOWED_ORIGINS` não inclui domínio Vercel

**Solução**:
1. No Railway, edite `MEDIA_SOCIAL_ALLOWED_ORIGINS`
2. Adicione: `https://seu-app.vercel.app`
3. Reinicie o serviço no Railway

### Erro: "Backend não configurado"

**Causa**: `VITE_SOCIAL_API_URL` não definida na Vercel

**Solução**:
1. Adicione a variável na Vercel
2. Faça redeploy do frontend

---

## 📊 Resumo de URLs

| Ambiente | URL | Configurado em |
|----------|-----|----------------|
| Backend (Railway) | `https://seu-backend.up.railway.app` | Railway |
| Frontend (Vercel) | `https://seu-app.vercel.app` | Vercel |
| API URL (Frontend) | `VITE_SOCIAL_API_URL` | Vercel env vars |
| CORS (Backend) | `MEDIA_SOCIAL_ALLOWED_ORIGINS` | Railway env vars |

---

## 🎯 Checklist Final

- [ ] Backend deployado no Railway
- [ ] `MEDIA_SOCIAL_JWT_SECRET` configurado (Railway)
- [ ] `MEDIA_SOCIAL_SETUP_KEY` configurado (Railway)
- [ ] `MEDIA_SOCIAL_ALLOWED_ORIGINS` configurado (Railway)
- [ ] URL pública do Railway obtida
- [ ] Administrador criado via `seed:admin`
- [ ] Health check testado (`/health`)
- [ ] Login testado via curl
- [ ] `VITE_SOCIAL_API_URL` configurado (Vercel)
- [ ] Frontend redeployado na Vercel
- [ ] Login testado em produção (`Ctrl+Shift+M`)

---

## 💡 Dicas

- **Banco de dados**: Railway usa SQLite por padrão (arquivo persistente)
- **Logs**: Veja logs em tempo real no dashboard do Railway
- **Backup**: Use `Exportar backup` no Social Studio regularmente
- **Segurança**: Nunca compartilhe `JWT_SECRET` ou `SETUP_KEY`

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique logs do Railway
2. Verifique console do browser (F12)
3. Confirme todas env vars configuradas
4. Teste endpoints individualmente com `curl`
