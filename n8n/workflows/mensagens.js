// ============================================================
// mensagens.js — waha-vendas-gabriel
// Todas as mensagens fixas do bot em um só lugar
// O cliente pode editar os textos aqui sem mexer no fluxo
// ============================================================

const MENSAGENS = {

  // ----------------------------------------------------------
  // ETAPA 1 — Boas-vindas (lead novo)
  // ----------------------------------------------------------
  BOAS_VINDAS: (nome) => `Olá, ${nome}! 👋

Seja bem-vindo(a)! Aqui é o time da *Escola de Natação Gabriel* 🏊

Ficamos felizes com seu interesse! Para te ajudar melhor, vou fazer algumas perguntinhas rápidas, tudo bem?

*Pergunta 1 de 3:*
Qual modalidade te interessa mais?

1️⃣ Natação adulto
2️⃣ Natação infantil
3️⃣ Hidroginástica
4️⃣ Outra modalidade`,

  // ----------------------------------------------------------
  // ETAPA 2 — Qualificação pergunta 2
  // ----------------------------------------------------------
  QUALIF_2: `Ótimo! 😊

*Pergunta 2 de 3:*
Qual a sua disponibilidade de horário?

1️⃣ Manhã (6h às 12h)
2️⃣ Tarde (12h às 18h)
3️⃣ Noite (18h às 22h)
4️⃣ Finais de semana`,

  // ----------------------------------------------------------
  // ETAPA 3 — Qualificação pergunta 3
  // ----------------------------------------------------------
  QUALIF_3: `Perfeito! Quase lá 🎯

*Pergunta 3 de 3:*
Como você ficou sabendo da gente?

1️⃣ Instagram
2️⃣ Indicação de amigo
3️⃣ Google
4️⃣ Outro`,

  // ----------------------------------------------------------
  // ETAPA 4 — Convite para aula experimental
  // ----------------------------------------------------------
  CONVITE_AULA: (nome) => `Que legal, ${nome}! 🎉

Com base nas suas respostas, temos a turma *perfeita* para você!

Que tal vir fazer uma *aula experimental gratuita* e conhecer nossa estrutura pessoalmente? 🏊✨

👇 Clique no link abaixo para escolher o melhor dia e horário para você:

🗓️ *AGENDAR MINHA AULA GRÁTIS:*
https://calendar.google.com/calendar/appointments/COLE_SEU_LINK_AQUI

_Escolha o horário que preferir, confirmamos na hora!_ ✅`,

  // ----------------------------------------------------------
  // ETAPA 5 — Confirmação do agendamento
  // ----------------------------------------------------------
  CONFIRMACAO: (nome, dataHora) => `*Aula confirmada, ${nome}!* 🎊🏊

Aqui está o resumo do seu agendamento:

📅 *Data e horário:* ${dataHora}
📍 *Local:* Rua da Escola, 123 — bairro Centro
🧴 *O que trazer:* Roupa de banho, toalha e boa disposição!

Qualquer dúvida é só responder aqui. Estamos te esperando! 😊

_— Time Gabriel Natação_`,

  // ----------------------------------------------------------
  // ETAPA 6 — Mensagem quando vendedor assume (modo manual)
  // ----------------------------------------------------------
  TRANSFERINDO: `Um momento! 😊

Vou te conectar com um de nossos consultores agora.

Ele vai continuar o atendimento em instantes! ⚡`,

  // ----------------------------------------------------------
  // NOTIFICAÇÃO para o vendedor (enviada no próprio WhatsApp)
  // ----------------------------------------------------------
  ALERTA_VENDEDOR: (nome, telefone, interesse, disponibilidade) =>
`🔔 *NOVO LEAD QUALIFICADO*

👤 Nome: ${nome}
📱 Telefone: ${telefone}
🏊 Interesse: ${interesse}
🕐 Disponibilidade: ${disponibilidade}

👉 Acesse o n8n para ver o histórico completo.`,

  // ----------------------------------------------------------
  // Resposta para mensagens fora do fluxo (não entendeu)
  // ----------------------------------------------------------
  NAO_ENTENDI: `Desculpe, não entendi muito bem 😅

Por favor, responda com o *número* da opção desejada:
*1, 2, 3 ou 4*

Se precisar falar com um atendente, digite *HUMANO* a qualquer momento. 👨‍💼`,

};

module.exports = MENSAGENS;
