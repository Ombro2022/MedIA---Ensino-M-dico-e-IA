# 🚀 Deploy do Backend Social Studio (Render)

## 📋 Pré-requisitos

- Conta no Render (https://render.com)
- Backend funcionando localmente (testado em `http://localhost:4000`)

---

## 🌐 Passo 1: Deploy no Render

### 1.1 Criar novo Web Service

**Opção A: Deploy via Dashboard (Recomendado para primeira vez)**

1. Acesse https://dashboard.render.com
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub
4. Autorize Render a acessar seu repositório GitHub
5. Selecione o repositório `MedIA---Ensino-M-dico-e-IA`

**Opção B: Deploy via Blueprint (Automático com render.yaml)**

O projeto já inclui `render.yaml` na raiz. Render detectará automaticamente as configurações.

### 1.2 Configurar o serviço

**Configurações obrigatórias**:
- **Name**: `media-social-backend` (ou nome de sua preferência)
- **Root Directory**: `server`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free` (para testes) ou `Starter` (para produção)

**Nota**: Se usar `render.yaml`, essas configurações são aplicadas automaticamente.

---

## 🔐 Passo 2: Configurar Variáveis de Ambiente no Render

No painel do Render, vá em **Environment** e adicione:

```bash
# Obrigatórias
MEDIA_SOCIAL_JWT_SECRET=<gere-um-secret-forte-aqui>
MEDIA_SOCIAL_SETUP_KEY=<chave-para-criar-admins>
MEDIA_SOCIAL_ALLOWED_ORIGINS=https://seu-app.vercel.app

# Opcional (Render configura PORT automaticamente)
# PORT será definido automaticamente pelo Render
```

### Como gerar secrets seguros:

```bash
# No terminal local:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Execute duas vezes para gerar `JWT_SECRET` e `SETUP_KEY`.

---

## 🌐 Passo 3: Obter URL do Backend

1. No Render, após o deploy ser concluído, vá em **Settings**
2. A URL pública estará visível no topo: `https://seu-backend.onrender.com`
3. **Copie esta URL** - você precisará dela para configurar o frontend na Vercel

**Importante**: A URL do Render será algo como:
- `https://media-social-backend.onrender.com`
- `https://media-social-backend-xyz.onrender.com`

---

## 👤 Passo 4: Criar Administrador

### Opção A: Via script (recomendado para primeiro admin)

Após deploy, execute via Render Shell (Dashboard → Shell):

```bash
npm run seed:admin -- --email=seu@email.com --password=SuaSenhaForte123
```

### Opção B: Via API (para admins adicionais)

```bash
curl -X POST https://seu-backend.onrender.com/auth/register \
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
curl https://seu-backend.onrender.com/health
```

Deve retornar: `{"status":"ok"}`

### Testar login:

```bash
curl -X POST https://seu-backend.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu@email.com",
    "password": "SuaSenhaForte123"
  }'
```

Deve retornar um `token` JWT.

---

## 🎨 Passo 6: Configurar Frontend na Vercel

### ⚠️ Importante: Use Project Environment Variables

1. Acesse o painel da Vercel
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione como **Project Variable** (NÃO Team Variable):

```
VITE_SOCIAL_API_URL=https://seu-backend.onrender.com
```

5. **Importante**: Adicione para todos os ambientes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. Faça **Redeploy** do frontend na Vercel

**Nota**: A comunicação entre Vercel (frontend) e Render (backend) acontece via HTTPS pública. Não há compartilhamento de variáveis entre as plataformas.

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
1. Verifique se backend está rodando no Render
2. Confirme URL em `VITE_SOCIAL_API_URL`
3. Teste com `curl` conforme Passo 5

### Erro: "CORS blocked"

**Causa**: `MEDIA_SOCIAL_ALLOWED_ORIGINS` não inclui domínio Vercel

**Solução**:
1. No Render, edite `MEDIA_SOCIAL_ALLOWED_ORIGINS`
2. Adicione: `https://seu-app.vercel.app`
3. Reinicie o serviço no Render (Deploy → Manual Deploy)

### Erro: "Backend não configurado"

**Causa**: `VITE_SOCIAL_API_URL` não definida na Vercel

**Solução**:
1. Adicione a variável na Vercel como **Project Environment Variable**
2. Faça redeploy do frontend

### Render Free Tier: Service "Spinning Down"

**Causa**: Plano gratuito do Render coloca serviços inativos em "sleep" após 15 minutos

**Solução**:
- Primeiro acesso pode demorar 30-60 segundos (cold start)
- Para produção, considere plano pago (Starter $7/mês) que mantém serviço sempre ativo

---

## 📊 Resumo de URLs e Configurações

### Arquitetura

```
Frontend (Vercel)  →  HTTPS  →  Backend (Render)
     ↓                              ↓
Project Env Vars            Environment Variables
VITE_SOCIAL_API_URL         MEDIA_SOCIAL_JWT_SECRET
                            MEDIA_SOCIAL_SETUP_KEY
                            MEDIA_SOCIAL_ALLOWED_ORIGINS
```

| Componente | Plataforma | URL Exemplo | Variáveis |
|------------|------------|-------------|-----------|
| Frontend | Vercel | `https://seu-app.vercel.app` | `VITE_SOCIAL_API_URL` |
| Backend | Render | `https://seu-backend.onrender.com` | JWT_SECRET, SETUP_KEY, ALLOWED_ORIGINS |

**Importante**: Vercel e Render são plataformas **independentes**. A comunicação acontece via URL pública HTTPS.

---

## 🎯 Checklist Final

- [ ] Backend deployado no Render
- [ ] `MEDIA_SOCIAL_JWT_SECRET` configurado (Render)
- [ ] `MEDIA_SOCIAL_SETUP_KEY` configurado (Render)
- [ ] `MEDIA_SOCIAL_ALLOWED_ORIGINS` configurado (Render)
- [ ] URL pública do Render obtida
- [ ] Administrador criado via `seed:admin`
- [ ] Health check testado (`/health`)
- [ ] Login testado via curl
- [ ] `VITE_SOCIAL_API_URL` configurado (Vercel - Project Variable)
- [ ] Frontend redeployado na Vercel
- [ ] Login testado em produção (`Ctrl+Shift+M`)

---

## 💡 Dicas

- **Banco de dados**: Render usa SQLite por padrão (arquivo persistente no disco)
- **Logs**: Veja logs em tempo real no dashboard do Render (Logs tab)
- **Backup**: Use `Exportar backup` no Social Studio regularmente
- **Segurança**: Nunca compartilhe `JWT_SECRET` ou `SETUP_KEY`
- **Cold Starts**: Free tier do Render tem sleep após inatividade (primeiro acesso demora ~30s)
- **Persistência**: Arquivos SQLite persistem entre deploys no Render

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique logs do Render (Dashboard → Logs)
2. Verifique console do browser (F12)
3. Confirme todas env vars configuradas (Render + Vercel)
4. Teste endpoints individualmente com `curl`
5. Verifique se `VITE_SOCIAL_API_URL` está como **Project Variable** (não Team Variable)
