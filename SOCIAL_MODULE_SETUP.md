# Central Social • Guia de Configuração

Este guia resume como executar o backend local com SQLite e liberar o módulo privado de publicações (Instagram/LinkedIn).

## 1. Pré-requisitos
- Node.js 18.x (já utilizado pelo projeto)
- SQLite CLI (já instalado conforme `sqlite3 --version`)
- Dependências do frontend (já instaladas na raiz)

## 2. Backend Express + SQLite
```
cd server
npm install
npm run dev
```
O servidor inicia em `http://localhost:4000` por padrão. Variáveis suportadas (`.env` na raiz ou dentro de `server/`):
- `MEDIA_SOCIAL_PORT` – porta da API (default 4000)
- `MEDIA_SOCIAL_DB_PATH` – caminho do arquivo SQLite
- `MEDIA_SOCIAL_JWT_SECRET` – segredo usado nos tokens JWT (obrigatório em produção)
- `MEDIA_SOCIAL_SETUP_KEY` – chave obrigatória para criar novos administradores via endpoint protegido
- `MEDIA_SOCIAL_ALLOWED_ORIGINS` – lista de origens separadas por vírgula autorizadas no CORS (ex.: `http://localhost:5173`)

Ao iniciar, o arquivo do banco é criado em `server/data/media-social.db`.

## 3. Cadastrando administradores
### Via script CLI
```
cd server
npm run seed:admin -- --email=voce@media.com.br --password=SenhaForte123
```
O script utiliza o mesmo banco e aplica hash (bcrypt) automaticamente. Execute-o para você e para o secretário.

### Via API (opcional)
Envie um POST para `POST /auth/register` com body `{ email, password }` e header `x-setup-key: <MEDIA_SOCIAL_SETUP_KEY>`. Esse caminho é útil se quiser automatizar cadastros no futuro.

## 4. Configurando o frontend
Defina o endpoint no Vite:
```
VITE_SOCIAL_API_URL=http://localhost:4000
```
Caso deseje alterar o storage padrão, ajuste `SOCIAL_STORAGE_KEYS` em `constants.ts`.

## 5. Utilização diária
1. Inicie o backend (`npm run dev` dentro de `server/`).
2. Rode o frontend (`npm run dev` na raiz).
3. Abra `http://localhost:5173/#/social` ou use o atalho `Ctrl/Cmd + Shift + M`.
4. Faça login com seu email + senha. O token fica salvo somente no navegador local.
5. Utilize o Social Studio para montar posts, biblioteca de artes, agenda e exportações (`Exportar backup`).
6. Clique em “Encerrar sessão staff” para sair (o token é removido do storage).

## 6. APIs expostas
| Método | Rota          | Descrição                                 |
|--------|---------------|--------------------------------------------|
| GET    | `/health`     | Verifica se o backend está ativo           |
| POST   | `/auth/register` | Cria administrador (requer `x-setup-key`) |
| POST   | `/auth/login` | Retorna `{ token, admin }`                 |
| GET    | `/auth/me`    | Valida token Bearer                        |

Mantenha o arquivo `.env` fora do versionamento para proteger o segredo do JWT e a chave de cadastro.
