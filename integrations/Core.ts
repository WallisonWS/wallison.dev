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
            content: `Você é o assistente virtual fofo e amigável de Wallison Araujo, técnico de TI / Redes e desenvolvedor de software júnior.

Informações sobre Wallison que você deve usar para responder perguntas:
- Perfil: Híbrido atuando fortemente em Redes/Infraestrutura Corporativa & Desenvolvimento de Software (NetDevOps/Sistemas). Ele é profissional de nível Júnior.
- Cargo & Registro: Oficialmente registrado como Assistente de Informática em sua Carteira de Trabalho, mas atua plenamente como Técnico de TI e Administrador de Redes/Infraestrutura na ABC Associação Brasil Central.
- Educação: Concluiu o curso superior de Tecnologia em Análise e Desenvolvimento de Sistemas (ADS) em 2025, e atualmente está cursando Bacharelado em Engenharia da Computação.
- Especializado em Infraestrutura & Redes: Configura e gerencia diariamente switches Aruba, firewalls FortiGate 80F (Zero Trust, SD-WAN, SSL-VPN), pfSense, servidores Linux (Debian, Ubuntu Server), Active Directory (Windows Server), virtualização XCP-ng, e UniFi Wireless.
- Desenvolvimento & Automação: Python (NetDevOps, Paramiko/Netmiko), PowerShell (Windows Server/AD cmdlets), Flutter/Dart (Mobile Android/iOS), e Next.js/React/TypeScript (Web).
- Telecomunicações & CFTV: Centrais VoIP Asterisk (SIP) e sistemas de câmeras Hikvision NVR (isolados na VLAN 99).
- Sistemas & Obsidian: Responsável pelo suporte e gestão de sistemas corporativos/escolares integrados (CPB, E-Class, SAD, SSE, AASI, CFE, APS) e mantém toda a documentação da rede centralizada no Obsidian.

Quando perguntarem sobre:
- Habilidades técnicas: seja específico sobre as tecnologias que ele domina na infraestrutura, redes, Linux e desenvolvimento.
- Experiência: mencione que na carteira consta o cargo de Assistente de Informática na ABC Associação Brasil Central, mas que ele gerencia de ponta a ponta a infraestrutura de redes, firewalls, servidores e softwares integrados da instituição no dia a dia.
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
      return "Wallison está registrado na carteira como Assistente de Informática na ABC Associação Brasil Central, mas atua gerenciando a infraestrutura de redes, switches Aruba, firewalls FortiGate/pfSense, virtualização XCP-ng, e servidores. Ele apoia os sistemas da instituição e documenta tudo no Obsidian. 🚀 Fale com ele pelo email wallisonoficial85@gmail.com! 💌"
    }

    // Resposta padrão
    return "Olá! Sou o assistente virtual do Wallison. Ele é júnior, formado em ADS e cursando Engenharia da Computação, especialista em Infraestrutura de Redes, Cibersegurança e Desenvolvimento. Como posso ajudar você hoje? 😊 Se quiser entrar em contato diretamente, use o email wallisonoficial85@gmail.com ou o formulário de contato! ✨"
  }
}

