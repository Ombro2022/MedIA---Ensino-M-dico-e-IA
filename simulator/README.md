# Simulador Clínico MVP

## 📍 O que é

Módulo mínimo de **simulação clínica** integrado ao Portal MedIA.

- **1 cenário**: Sepse de foco urinário
- **1 componente**: `SimulatorMVP.tsx`
- **1 rota**: `#/simulator/sepsis`

## 🎯 Objetivo

Permitir que alunos pratiquem condutas clínicas em um cenário controlado, recebendo feedback imediato sobre decisões.

## 🚀 Como usar

### Via Portal do Aluno
1. Acesse o Portal do Aluno
2. Clique no botão "Simulador Clínico"
3. Execute as condutas apropriadas
4. Finalize e veja o resultado

### Via URL direta
Acesse: `#/simulator/sepsis`

## 📂 Estrutura

```
simulator/
├── SimulatorMVP.tsx      # Componente principal (all-in-one)
├── sepsisScenario.ts     # Dados do cenário de sepse
└── types.ts              # Tipos TypeScript mínimos
```

## ✅ O que este MVP faz

- Apresenta caso clínico de sepse inicial
- Oferece condutas disponíveis (exames, medicações, procedimentos)
- Rastreia ações do usuário em timeline
- Calcula score baseado em ações críticas
- Gera feedback clínico específico
- Mostra desfecho (sucesso/parcial/falha)

## ❌ O que este MVP NÃO faz

- Não gerencia usuários (usa auth do portal)
- Não cria layout próprio (usa layout global)
- Não tem múltiplos cenários (apenas sepse)
- Não tem modo docente/editor
- Não usa backend próprio

## 🔌 Integração

O simulador é integrado ao App.tsx via:

```typescript
import { SimulatorMVP } from './simulator/SimulatorMVP';

// Na lógica de rotas
{currentView === 'simulator' && (
  <SimulatorMVP onBack={handleBackToHome} />
)}
```

## 🧪 Cenário: Sepse Inicial

**Paciente**: Maria Silva, 68 anos, diabética, com ITU de repetição

**Apresentação**: Febre + confusão mental + hipotensão

**Condutas críticas**:
- Hemoculturas (antes do ATB)
- Cristaloide 30ml/kg
- Antibiótico EV
- Lactato sérico

**Score**: Baseado em condutas críticas realizadas (0-100)

## 🎨 Tecnologias

- React 19 + TypeScript
- State local (useState)
- Lucide React (ícones)
- Tailwind CSS (via classes do portal)

## 📝 Próximos passos (fora do MVP)

Após validação do MVP:
- Refinar feedback clínico
- Adicionar novos cenários
- Integrar IA para feedback adaptativo
- Adicionar animações de progressão temporal
