# 🤖 waha-vendas-gabriel

> **Automação completa de vendas no WhatsApp** com WAHA + n8n + Google Sheets + RD Station  
> 100% open source • Docker • Pronto para produção

![Stack](https://img.shields.io/badge/WAHA-2026.3.x-25D366?style=flat-square)
![n8n](https://img.shields.io/badge/n8n-latest-EA4B71?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-26+-2496ED?style=flat-square)
![License](https://img.shields.io/badge/license-comercial-blue?style=flat-square)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Stack](#-stack)
- [Como Funciona](#-como-funciona)
- [Início Rápido](#-início-rápido)
- [Acessos](#-acessos)
- [Workflows n8n](#-workflows-n8n)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração do .env](#-configuração-do-env)
- [Segurança](#-segurança)
- [Documentação](#-documentação)

---

## 🎯 Visão Geral

O **waha-vendas-gabriel** é um sistema completo de automação de vendas via WhatsApp. Ele recebe leads automaticamente, conduz uma qualificação com 3 perguntas fixas, envia um link de agendamento, notifica o vendedor em tempo real e registra tudo no Google Sheets e no RD Station.

**Funcionalidades principais:**
- 🤖 Bot de qualificação automática com 3 perguntas fixas
- 📊 Registro automático de leads no Google Sheets
- 📅 Envio de link de agendamento via Google Calendar
- 🔔 Notificação em tempo real para o vendedor no WhatsApp
- 🏢 Criação automática de contato no RD Station CRM
- 🙋 Modo manual — lead digita "HUMANO" e vendedor assume
- 📈 Relatório semanal automático toda segunda-feira às 8h
- ♻️ Persistência de sessão WhatsApp (não perde ao reiniciar)

---

## 🚀 Stack

| Ferramenta | Versão | Função |
|------------|--------|--------|
| [WAHA](https://waha.devlike.pro/) | 2026.3.x | WhatsApp HTTP API (engine NOWEB) |
| [n8n](https://n8n.io/) | Latest | Plataforma de automação visual |
| PostgreSQL | 16 Alpine | Banco de dados do n8n |
| Redis | 7 Alpine | Fila de execução (queue mode) |
| Docker | 26+ | Orquestração de containers |
| Google Sheets | API v4 | CRM simplificado de leads |
| RD Station | API v3 | CRM (requer token do cliente) |

---

## 🤖 Como Funciona

```
Lead envia mensagem no WhatsApp
            ↓
[WAHA] recebe e dispara webhook para o n8n
            ↓
[n8n] verifica se é lead novo ou continuando conversa
            ↓
    ┌───────────────────────────────┐
    │  Digitou "HUMANO"?            │
    │  → Bot para + notifica vendedor│
    └───────────────────────────────┘
            ↓ (fluxo normal)
Boas-vindas → Pergunta 1 (modalidade)
            ↓
       Pergunta 2 (horário)
            ↓
       Pergunta 3 (como soube)
            ↓
  Link de agendamento (Google Calendar)
            ↓
  Notificação para o vendedor no WhatsApp
            ↓
  Criação de contato no RD Station
```

### Estados do Lead no Google Sheets

| Status | Descrição |
|--------|-----------|
| `NOVO` | Primeira mensagem — envia boas-vindas + pergunta 1 |
| `QUALIF_1` | Aguardando resposta da pergunta 1 (modalidade) |
| `QUALIF_2` | Aguardando resposta da pergunta 2 (horário) |
| `QUALIF_3` | Aguardando resposta da pergunta 3 (como soube) |
| `AGENDANDO` | Link enviado — aguardando agendamento |
| `MANUAL` | Vendedor assumiu a conversa |

---

## ⚡ Início Rápido

### Pré-requisitos

- [Docker Desktop](https://docker.com/products/docker-desktop) 26+
- [Git](https://git-scm.com/)
- Conta Google (para Sheets + Calendar)
- Número WhatsApp dedicado para o bot

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/Fredericrypto/waha-vendas-gabriel.git
cd waha-vendas-gabriel

# 2. Configurar variáveis de ambiente
cp .env.example .env
nano .env  # edite com suas credenciais

# 3. Subir todos os containers
docker compose up -d

# 4. Verificar que está tudo verde
docker compose ps
```

### Conectar o WhatsApp

```bash
# Criar a sessão com webhook configurado
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: SUA_API_KEY" \
  -d '{
    "name": "default",
    "start": true,
    "config": {
      "webhooks": [{
        "url": "http://n8n:5678/webhook/SEU-WEBHOOK-ID/waha",
        "events": ["message"]
      }]
    }
  }'
```

Depois acesse o WAHA Dashboard e escaneie o QR Code com o WhatsApp Business.

> ⚠️ **Importante:** No WAHA Dashboard, configure Webhook Retries para **"1 attempt every 20 seconds"** para evitar mensagens duplicadas.

---

## 🌐 Acessos

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| n8n (automação) | http://localhost:5678 | Ver `.env` |
| WAHA Dashboard | http://localhost:3000/dashboard | Ver `.env` |
| WAHA API Docs | http://localhost:3000/api | — |

---

## 📋 Workflows n8n

### 1. 🤖 Fluxo Principal de Vendas

**Arquivo:** `n8n/workflows/fluxo-principal-vendas.json`

Nós principais:
- **WAHA Trigger** — recebe mensagens em tempo real via webhook
- **Anti-duplicata** — filtra eventos duplicados do engine NOWEB
- **Extrai Dados** — processa telefone, nome e texto da mensagem
- **Quer Falar com Humano?** — detecta palavra-chave "HUMANO"
- **Busca Lead no Sheets** — consulta estado atual na planilha
- **Define Estado do Lead** — determina se é novo ou continuando
- **Roteador por Status** — direciona para o nó correto do fluxo
- **Códigos de cada etapa** — mensagens fixas configuráveis
- **WAHA Send** — envia resposta pelo WhatsApp
- **Google Sheets Update** — atualiza estado do lead
- **RD Station** — cria contato no CRM ao qualificar
- **Notifica Vendedor** — alerta no WhatsApp em tempo real

### 2. 📊 Relatório Semanal de Leads

**Arquivo:** `n8n/workflows/relatorio-semanal.json`

- Dispara automaticamente toda **segunda-feira às 8h**
- Lê todos os leads do Google Sheets
- Gera resumo por interesse, horário, origem e status
- Envia relatório formatado no WhatsApp do vendedor

---

## 📁 Estrutura do Projeto

```
waha-vendas-gabriel/
├── docker-compose.yml              # Stack completa Docker
├── .env.example                    # Template de variáveis (copie para .env)
├── .gitignore                      # Protege .env e volumes
├── README.md
│
├── docker/
│   └── volumes/                    # Dados persistentes (não versionado)
│       ├── waha_sessions/          # Sessão WhatsApp
│       ├── n8n_data/               # Dados e configurações do n8n
│       ├── postgres_data/          # Banco de dados
│       └── redis_data/             # Cache e filas
│
├── n8n/
│   └── workflows/
│       ├── fluxo-principal-vendas.json   # Workflow principal
│       ├── relatorio-semanal.json        # Relatório automático
│       ├── mensagens.js                  # Textos do bot (referência)
│       └── README.md                     # Documentação dos workflows
│
├── docs/
│   └── waha-vendas-gabriel-manual.pdf   # Manual completo PT-BR/EN
│
└── scripts/                        # Scripts auxiliares
```

---

## 🔧 Configuração do .env

```bash
cp .env.example .env
nano .env
```

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `WAHA_API_KEY` | Chave de segurança da API WAHA | ✅ |
| `WAHA_DASHBOARD_USER` | Usuário do painel WAHA | ✅ |
| `WAHA_DASHBOARD_PASS` | Senha do painel WAHA | ✅ |
| `N8N_BASIC_AUTH_USER` | Usuário do n8n | ✅ |
| `N8N_BASIC_AUTH_PASSWORD` | Senha do n8n | ✅ |
| `N8N_ENCRYPTION_KEY` | Chave de criptografia do n8n | ✅ |
| `POSTGRES_PASSWORD` | Senha do banco de dados | ✅ |
| `REDIS_PASSWORD` | Senha do Redis | ✅ |
| `VENDEDOR_WHATSAPP` | Número do vendedor (55XXXXXXXXXXX) | ✅ |
| `RDSTATION_CLIENT_ID` | Client ID do RD Station | ⚙️ Cliente |
| `RDSTATION_CLIENT_SECRET` | Client Secret do RD Station | ⚙️ Cliente |

---

## 🛡️ Segurança

- O arquivo `.env` **nunca** é versionado — protegido pelo `.gitignore`
- Todas as senhas ficam apenas no servidor do cliente
- Comunicação interna via rede Docker isolada (`waha_vendas_net`)
- Sessão WhatsApp persistida em volume local (não exposta)
- n8n rodando em modo `queue` com worker separado para resiliência

---

## 🔧 Comandos Úteis

```bash
# Subir tudo
docker compose up -d

# Ver status de todos os containers
docker compose ps

# Ver logs em tempo real
docker compose logs -f waha
docker compose logs -f n8n

# Reiniciar um serviço
docker compose restart n8n
docker compose restart waha

# Verificar sessão WhatsApp
curl -s http://localhost:3000/api/sessions/default \
  -H "X-Api-Key: SUA_API_KEY" | python3 -m json.tool

# Parar tudo
docker compose down
```

---

## 🩺 Troubleshooting

| Problema | Solução |
|----------|---------|
| Container como "exited" | `docker compose logs NOME --tail=30` |
| WhatsApp desconectou | `curl -X POST http://localhost:3000/api/sessions/default/start -H "X-Api-Key: SUA_KEY"` |
| Mensagem duplicada | WAHA Dashboard → Webhook Retries → 1 attempt / 20s |
| Workflow não dispara | Verificar se está com status **Published** no n8n |
| n8n não abre | `docker compose restart n8n && sleep 15` |

---

## 📚 Documentação

O manual completo está em [`docs/waha-vendas-gabriel-manual.pdf`](docs/waha-vendas-gabriel-manual.pdf)

Cobre instalação no **Linux**, **Windows** e **macOS**, todas as credenciais, troubleshooting completo, comandos úteis e FAQ — em **português e inglês**.

---

## 📄 Licença

Desenvolvido por **[Fredericrypto](https://github.com/Fredericrypto)**  
Uso comercial permitido mediante contratação.

---

*Desenvolvido com ❤️ usando Docker + n8n + WAHA — 100% Open Source*
