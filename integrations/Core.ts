// Integração com serviços externos
// Otimizado para melhor desempenho e uso real da OpenAI

export async function SendEmail(options: {
  to: string
  subject: string
  body: string
}) {
  // Simulação de envio de email
  console.log("Enviando email para:", options.to)
  console.log("Assunto:", options.subject)
  console.log("Corpo:", options.body)

  // Simula um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simula sucesso (em produção, isso seria uma chamada real a um serviço de email)
  return { success: true, messageId: `msg_${Date.now()}` }
}

export async function InvokeLLM(options: {
  prompt: string
}) {
  // Integração real com a OpenAI
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Você é o assistente virtual fofo e amigável de Wallison Pereira, um desenvolvedor Full Stack Junior.

Informações sobre Wallison que você deve usar para responder perguntas:
- Especializado em: HTML5 (semântica web e acessibilidade), CSS3 (layouts responsivos com Flexbox e Grid), JavaScript (ES6+, DOM, Promises), React (Hooks, Context API)
- Conhecimento também em: Node.js (Express, APIs), MongoDB, MySQL, Git, Bootstrap, TypeScript, Sass
- Formado em Análise e Desenvolvimento de Sistemas (2024-2025, em andamento)
- Experiência como desenvolvedor web junior desde 2022
- Focado em criar soluções web modernas, responsivas e intuitivas
- Disponível para projetos freelance e posições permanentes

Quando perguntarem sobre:
- Habilidades técnicas: seja específico sobre as tecnologias que ele domina e o nível (como listado acima)
- Experiência: mencione os projetos e clientes anteriores relevantes à pergunta
- Contato: sugira o formulário do site E o email wallisonpereiradev@gmail.com
- Projetos: descreva os recentes como e-commerce, sistemas de gestão e aplicativos web

Responda de forma FOFA, AMIGÁVEL e PERSUASIVA. Use emojis ocasionalmente para parecer mais amigável. Incentive o visitante a entrar em contato com Wallison pelo formulário de contato ou pelo email wallisonpereiradev@gmail.com.

Mantenha as respostas concisas (até 3 parágrafos) e personalizadas à pergunta.`,
          },
          {
            role: "user",
            content: options.prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Erro ao chamar a OpenAI:", error)

    // Fallback para respostas pré-definidas em caso de erro
    const prompt = options.prompt.toLowerCase()

    if (prompt.includes("habilidades") || prompt.includes("skills")) {
      return "Wallison é especializado em HTML5, CSS3, JavaScript e React no frontend, com conhecimentos em Node.js, MongoDB e MySQL no backend. Ele tem experiência com desenvolvimento responsivo, acessibilidade web e integração de APIs. 😊 Você pode entrar em contato pelo email wallisonpereiradev@gmail.com ou pelo formulário de contato para saber mais! ✨"
    }

    if (prompt.includes("contato") || prompt.includes("email")) {
      return "Você pode entrar em contato com Wallison através do email wallisonpereiradev@gmail.com ou utilizando o formulário de contato disponível neste site. Ele geralmente responde em até 24 horas úteis! 📬 Ficaremos felizes em conversar sobre seu projeto! 💫"
    }

    if (prompt.includes("projeto") || prompt.includes("trabalho")) {
      return "Wallison trabalhou em diversos projetos, incluindo e-commerce, sistemas de gestão e aplicativos web. Seu portfólio inclui trabalhos para pequenas empresas e startups, com foco em experiências de usuário intuitivas e código limpo. 🚀 Entre em contato pelo email wallisonpereiradev@gmail.com para discutir seu projeto! 💌"
    }

    // Resposta padrão
    return "Olá! Sou o assistente virtual do Wallison. Ele é um desenvolvedor Full Stack Junior com experiência em React, Node.js e outras tecnologias web modernas. Como posso ajudar você hoje? 😊 Se quiser entrar em contato diretamente, use o email wallisonpereiradev@gmail.com ou o formulário de contato! ✨"
  }
}

