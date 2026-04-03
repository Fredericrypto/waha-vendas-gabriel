# Workflows n8n — waha-vendas-gabriel

## Workflow 1: fluxo-principal-vendas
Arquivo: fluxo-principal-vendas.json
Descrição: Fluxo completo de qualificação e agendamento de aula experimental

## Etapas do fluxo
1. WAHA Trigger — recebe mensagem do WhatsApp
2. Google Sheets Read — verifica estado atual do lead
3. Switch — roteia pelo estado (novo, qualificando, agendando, manual)
4. Mensagens fixas por etapa
5. Google Sheets Write — atualiza estado do lead
6. Google Calendar — cria evento da aula experimental
7. WAHA Send — envia confirmação
8. HTTP Request — cria lead no RD Station
9. WAHA Send — notifica vendedor

## Estados possíveis do lead (coluna "status" no Google Sheets)
- NOVO          → primeira mensagem, envia boas-vindas
- QUALIF_1      → aguardando resposta da pergunta 1
- QUALIF_2      → aguardando resposta da pergunta 2  
- QUALIF_3      → aguardando resposta da pergunta 3
- AGENDANDO     → enviou link do calendar, aguardando confirmação
- AGENDADO      → aula confirmada, aguarda aula
- MANUAL        → vendedor assumiu a conversa
- FINALIZADO    → lead convertido ou descartado
