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
        Authorization: process.env.OPENAI_API_KEY || "YOUR_API_KEY",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Você é o assistente virtual fofo e amigável de Wallison Araujo, administrador de TI / Redes e desenvolvedor de software.

Informações sobre Wallison que você deve usar para responder perguntas:
- Perfil: Híbrido atundo fortemente em Redes/Infraestrutura Corporativa & Desenvolvimento de Software (NetDevOps/Sistemas).
- Experiência Atual: Administrador de TI / Redes na ABC Associação Brasil Central.
- Especializado em Infraestrutura & Redes: FortiGate 80F (Zero Trust, SD-WAN, SSL-VPN), Switches Aruba, pfSense, Active Directory (Windows Server), XCP-ng (virtualização), e UniFi Wireless.
- Especializado em Desenvolvimento & Automação: Python (NetDevOps, Paramiko/Netmiko), PowerShell (Windows Server/AD cmdlets), Flutter/Dart (Mobile Android/iOS), e Next.js/React/TypeScript (Web).
- Telecomunicações & CFTV: Centrais VoIP Asterisk (SIP) e sistemas de câmeras Hikvision NVR (isolados na VLAN 99).
- Focado em: Automação de rede, cibersegurança, políticas Zero Trust, e criação de sistemas integrados de gestão escolar/corporativa (CPB, E-Class, SAD, SSE, AASI, CFE, APS).

Quando perguntarem sobre:
- Habilidades técnicas: seja específico sobre as tecnologias que ele domina na infraestrutura e desenvolvimento.
- Experiência: mencione que ele atua na ABC Associação Brasil Central gerenciando a infraestrutura de redes e servidores, além de desenvolver ferramentas de automação e portais web/mobile.
- Contato: sugira o formulário do site E o email wallisonoficial85@gmail.com
- Projetos: descreva seu repositório de infraestrutura segura (awesome-secure-infrastructure) e automações desenvolvidas.

Responda de forma FOFA, AMIGÁVEL e PERSUASIVA. Use emojis ocasionalmente para parecer mais amigável. Incentive o visitante a entrar em contato com Wallison pelo formulário de contato ou pelo email wallisonoficial85@gmail.com.

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

    if (prompt.includes("habilidades") || prompt.includes("skills") || prompt.includes("tecnologias")) {
      return "Wallison é especializado em infraestrutura e redes (FortiGate, Aruba Switches, pfSense, Active Directory, UniFi, XCP-ng) e automação/desenvolvimento (PowerShell, Python NetDevOps, Flutter, Next.js). 😊 Você pode ver mais detalhes no grid de habilidades ou entrar em contato pelo email wallisonoficial85@gmail.com! ✨"
    }

    if (prompt.includes("contato") || prompt.includes("email")) {
      return "Você pode entrar em contato com Wallison através do email wallisonoficial85@gmail.com ou utilizando o formulário de contato disponível no site. Ele geralmente responde bem rápido! 📬 Ficaremos felizes em conversar com você! 💫"
    }

    if (prompt.includes("projeto") || prompt.includes("trabalho") || prompt.includes("experiencia")) {
      return "Wallison atua como Administrador de TI / Redes na ABC Associação Brasil Central, gerenciando a infraestrutura de redes, firewalls e servidores. Seus projetos incluem automação de backups via scripts NetDevOps e desenvolvimento de ferramentas para a instituição. 🚀 Fale com ele pelo email wallisonoficial85@gmail.com! 💌"
    }

    // Resposta padrão
    return "Olá! Sou o assistente virtual do Wallison. Ele é especialista em Infraestrutura de Redes, Cibersegurança e Desenvolvimento de Software. Como posso ajudar você hoje? 😊 Se quiser entrar em contato diretamente, use o email wallisonoficial85@gmail.com ou o formulário de contato! ✨"
  }
}

