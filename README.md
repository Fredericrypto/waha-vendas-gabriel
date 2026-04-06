# 🤖 waha-vendas-gabriel

> Automação de Vendas no WhatsApp com WAHA + n8n + RD Station

## Stack
- **WAHA** — WhatsApp HTTP API (open source)
- **n8n** — Plataforma de automação visual (open source)
- **PostgreSQL 16** — Banco de dados
- **Redis 7** — Fila de execução
- **Docker** — Orquestração de containers

## Início Rápido
```bash
cp .env.example .env   # configure suas variáveis
docker compose up -d   # sobe tudo
```

## Acessos
| Serviço | URL | Usuário |
|---------|-----|---------|
| n8n | http://localhost:5678 | Ver .env |
| WAHA Dashboard | http://localhost:3000/dashboard | Ver .env |
| WAHA API Docs | http://localhost:3000/api | — |

## Fases do Projeto
- [x] Phase 1 — Estrutura e configuração base
- [x] Phase 2 — Docker rodando (verde!)
- [x] Phase 3 — Fluxo de vendas n8n
- [x] Phase 4 — Integração RD Station
- [x] Phase 5 — Handoff manual
- [x] Phase 6 — Testes e extras
- [x] Phase 7 — Manual do usuário PDF
