# 🏥 MedIA - Portal do Curso (Guia de Instalação Linux/Ubuntu)

Este guia orienta a instalação, configuração e hospedagem do portal MedIA no seu Mini-Desktop com Ubuntu.

## 📋 Pré-requisitos

Antes de começar, abra o terminal do Ubuntu e garanta que você tem o Node.js instalado.

```bash
# 1. Atualize os pacotes
sudo apt update

# 2. Instale o Node.js (Versão 18 ou superior recomendada) e NPM
# Se você ainda não tem, recomenda-se usar o NVM ou instalar direto:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Verifique as versões
node -v
npm -v
```

---

## 🚀 Passo a Passo da Instalação

Como o código fornecido é para um projeto React, utilizaremos o **Vite** para criar a estrutura base de forma leve e rápida.

### 1. Criar a estrutura do projeto
Navegue até a pasta onde deseja hospedar o site (ex: `/var/www` ou `~/projetos`).

```bash
# Cria o projeto React com TypeScript
npm create vite@latest media-portal -- --template react-ts

# Entre na pasta
cd media-portal

# Instale as dependências básicas
npm install

# Instale as bibliotecas usadas no código (Lucide, Tailwind, Google GenAI)
npm install lucide-react @google/genai clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
```

### 2. Configurar o Tailwind CSS
Inicialize o Tailwind:

```bash
npx tailwindcss init -p
```

Edite o arquivo `tailwind.config.js` gerado e substitua o conteúdo por:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mediaBlue: '#66BEF5',
        mediaPink: '#F778E6',
        mediaPurple: '#B16FF8',
        mediaGreen: '#5BFF8B',
      }
    },
  },
  plugins: [],
}
```

### 3. Transferir os Arquivos
Copie todos os arquivos `.tsx` e `.ts` fornecidos pela IA para a pasta `src/` do seu novo projeto.
*   `App.tsx`, `constants.ts`, `types.ts` -> direto na raiz de `src/`
*   Crie as pastas `src/components` e `src/services` e coloque os respectivos arquivos lá.

### 4. Configurar a Chave da API (IMPORTANTE)
Crie um arquivo chamado `.env` na **raiz** do projeto (fora da pasta src).

```bash
nano .env
```

Adicione o seguinte conteúdo:

```env
# No Vite, variáveis devem começar com VITE_ ou precisamos mapeá-las.
# Como o código usa process.env.API_KEY, configuramos o vite.config.ts para aceitar isso.
API_KEY=sua_chave_do_google_aistudio_aqui
```

---

## 🏃‍♂️ Rodando a Aplicação

### Modo Desenvolvimento (Para testar)
```bash
npm run dev
```
O terminal mostrará um link (geralmente `http://localhost:5173`). Abra no navegador.

### Modo Produção (Para deixar rodando no servidor)
Para hospedar de verdade no seu Mini-Desktop:

1.  **Gerar o Build:**
    ```bash
    npm run build
    ```
    Isso criará uma pasta `dist/` com arquivos HTML/CSS/JS otimizados.

2.  **Servir os arquivos:**
    A maneira mais simples de servir arquivos estáticos no Ubuntu sem configurar Apache/Nginx complexos é usar o pacote `serve`:

    ```bash
    # Instale o servidor estático globalmente
    sudo npm install -g serve

    # Rode o servidor na porta 80 (precisa de sudo) ou 3000
    serve -s dist -l 3000
    ```
    Agora, acesse `http://ip-do-seu-mini-desktop:3000` de qualquer computador na rede.

---

## ⚠️ Pitfalls (Erros Comuns e Pulos do Gato)

### 1. 🛑 "A IA não responde" (Erro de API Key)
*   **Sintoma:** O chat carrega, mas responde com mensagens de erro.
*   **Causa:** O Vite, por segurança, não expõe variáveis de ambiente automaticamente como o Node.js.
*   **Solução:** Certifique-se de ter usado o arquivo `vite.config.ts` fornecido pela IA (que contém o `define: { 'process.env': ... }`). Sem isso, `process.env.API_KEY` será `undefined`.

### 2. 🖼️ Imagens Quebradas (Foto do Professor)
*   **Sintoma:** A foto do professor não carrega.
*   **Causa:** O código usa um link do Google Photos (`photos.app.goo.gl`). O Google bloqueia o uso direto desses links em sites (hotlinking).
*   **Solução:** Baixe a foto, salve como `professor.jpg` dentro da pasta `public/` do projeto e altere no arquivo `Instructor.tsx`:
    ```tsx
    // De:
    src="https://photos.app.goo.gl/..."
    // Para:
    src="/professor.jpg"
    ```

### 3. 📝 "Onde estão os dados da inscrição?"
*   **Sintoma:** Você preenche o formulário, clica em pagar, vê a mensagem de sucesso, mas não recebe e-mail.
*   **Realidade:** Como este é um app Frontend (roda no navegador), ele **não tem banco de dados**.
*   **Solução:** Eu adicionei um `console.log` no componente `Registration.tsx`.
    *   No navegador, aperte `F12` -> Aba "Console".
    *   Lá aparecerá o JSON com os dados do aluno.
    *   **Futuro:** Para produção real, você precisará conectar isso a um backend (Python/Node) ou serviço como Firebase/Zapier.

### 4. 🌍 Acesso na Rede Local (LAN)
*   Se for rodar com `npm run dev`, adicione a flag `--host`:
    ```bash
    npm run dev -- --host
    ```
    Isso permite que você acesse o site pelo celular ou outro PC usando o IP do Mini-Desktop (ex: `http://192.168.1.15:5173`).

### 5. 🔄 Atualização de Conteúdo
*   Se você mudar o arquivo `constants.ts` (preços, datas), você precisa rodar `npm run build` novamente para que as alterações apareçam na versão de produção (`dist`).
