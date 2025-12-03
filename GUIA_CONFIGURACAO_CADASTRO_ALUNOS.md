# 📋 GUIA DE CONFIGURAÇÃO - CADASTRO DE ALUNOS
## Integração com Google Sheets

---

## ✅ PASSO 1: Criar a Planilha do Google

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada **"Alunos MedIA"**
3. Na primeira linha (cabeçalho), adicione as colunas:

```
A1: Timestamp
B1: Nome Completo
C1: Email
D1: WhatsApp
E1: Módulo
F1: Cidade
G1: Estado
```

---

## ✅ PASSO 2: Criar o Google Apps Script

1. Na planilha, clique em **Extensões** → **Apps Script**
2. Apague o código padrão e cole este código:

```javascript
function doPost(e) {
  try {
    // Obtém a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dos dados recebidos
    var data = JSON.parse(e.postData.contents);
    
    // Adiciona uma nova linha com os dados
    sheet.appendRow([
      data.timestamp || new Date(),
      data.nome || '',
      data.email || '',
      data.whatsapp || '',
      data.modulo || '',
      data.cidade || '',
      data.estado || ''
    ]);
    
    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (opcional)
function testPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        nome: 'Teste da Silva',
        email: 'teste@email.com',
        whatsapp: '83987654321',
        modulo: 'ECG',
        cidade: 'João Pessoa',
        estado: 'PB'
      })
    }
  };
  
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

3. Clique em **Salvar** (ícone de disquete)
4. Dê um nome ao projeto: **"API Alunos MedIA"**

---

## ✅ PASSO 3: Implantar como Web App

1. Clique em **Implantar** → **Nova implantação**
2. Clique no ícone de **engrenagem** ao lado de "Selecionar tipo"
3. Escolha **Aplicativo da Web**
4. Configure:
   - **Descrição**: API Cadastro Alunos
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
5. Clique em **Implantar**
6. **COPIE A URL** que aparece (algo como: `https://script.google.com/macros/s/XXXX/exec`)
7. Clique em **Concluído**

---

## ✅ PASSO 4: Configurar a URL no Site

1. Abra o arquivo: `components/StudentArea.tsx`
2. Na linha 31, substitua:
   ```typescript
   const SCRIPT_URL = 'SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI';
   ```
   Por:
   ```typescript
   const SCRIPT_URL = 'https://script.google.com/macros/s/XXXX/exec';
   ```
   (Cole a URL que você copiou no passo anterior)

3. Salve o arquivo

---

## ✅ PASSO 5: Testar o Sistema

1. Faça commit e push das alterações:
   ```bash
   git add .
   git commit -m "Adiciona área do aluno com integração Google Sheets"
   git push
   ```

2. Aguarde o deploy no Vercel

3. Acesse o site e teste o formulário

4. Verifique se os dados aparecem na planilha do Google Sheets

---

## 📊 COMO USAR PARA COMUNICAÇÃO

### 1. **Envio de E-mails em Massa**

**Opção A - Usando Gmail (até 500/dia):**
- Exporte a coluna de emails do Google Sheets
- Use "Cco" (CCO/BCC) no Gmail para enviar
- ⚠️ Limite: 500 emails por dia

**Opção B - Brevo (gratuito até 300/dia):**
1. Crie conta em [brevo.com](https://www.brevo.com)
2. Importe os contatos do Google Sheets
3. Crie campanhas de email
4. ✅ Melhor para emails profissionais

**Opção C - Mailchimp:**
- Gratuito até 500 contatos
- Importar CSV do Google Sheets
- Templates profissionais prontos

---

### 2. **Envio de WhatsApp**

**Opção A - Grupos (mais simples):**
- Crie um grupo no WhatsApp
- Adicione os alunos manualmente
- Envie mensagens para todos
- ⚠️ Limite: 256 pessoas por grupo

**Opção B - Listas de Transmissão:**
- Crie uma lista de transmissão no WhatsApp
- Adicione os contatos
- Envie mensagens (aparece como individual)
- ⚠️ Só funciona se o aluno tiver seu número

**Opção C - WhatsApp Business API (profissional):**
1. Plataformas recomendadas:
   - **Twilio** (pago por mensagem)
   - **MessageBird** (similar ao Twilio)
   - **Zenvia** (nacional)
2. Conecte via API
3. Envie mensagens automatizadas

**Opção D - Ferramentas No-Code:**
- **Zapier**: Conecta Google Sheets + WhatsApp Business
- **Make (Integromat)**: Similar ao Zapier
- **n8n**: Open source, auto-hospedado

---

### 3. **Filtros e Segmentação**

No Google Sheets, você pode:
- **Filtrar por módulo**: ECG, Gasometria ou Ambos
- **Filtrar por localização**: Cidade/Estado
- **Criar abas diferentes**: Uma para cada turma/módulo

---

## 📁 COMPARTILHAMENTO DE MATERIAL

**Opção 1 - Google Drive:**
1. Crie uma pasta compartilhada
2. Gere link público ou específico
3. Envie por email/WhatsApp

**Opção 2 - Dropbox/OneDrive:**
- Similar ao Google Drive
- Links de compartilhamento

**Opção 3 - Notion:**
- Crie página com materiais
- Compartilhe link
- Organização por módulo/aula

---

## 🔒 SEGURANÇA E PRIVACIDADE

✅ **Boas Práticas:**
- Não compartilhe a URL do Google Apps Script publicamente
- Configure permissões corretas no Google Sheets
- Faça backup regular dos dados
- Use email profissional para comunicação oficial

---

## 🆘 PROBLEMAS COMUNS

### Erro: "Autorização necessária"
**Solução:** Reimplante o Apps Script e certifique-se de autorizar o script.

### Dados não aparecem na planilha
**Solução:** 
1. Verifique se a URL está correta em `StudentArea.tsx`
2. Teste a função `testPost()` no Apps Script
3. Verifique o console do navegador (F12) por erros

### Formulário não envia
**Solução:**
1. Verifique conexão com internet
2. Teste em navegador diferente
3. Limpe cache do navegador

---

## 📞 SUPORTE

Se precisar de ajuda:
1. Revise este guia passo a passo
2. Verifique os logs no Apps Script
3. Me avise e podemos evoluir para um sistema mais robusto!

---

**Criado em:** Dezembro 2025
**Versão:** 1.0 - Sistema Simples
