"use client"
import { motion } from "framer-motion"
import {
  Code,
  Server,
  Globe,
  Database,
  UserRound,
  GraduationCap,
  Calendar,
  Briefcase,
  Heart,
  Coffee,
  MapPin,
  Shield,
  Network,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function BioSection() {
  return (
    <section className="py-14 px-4" id="about">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }} // Optimize by only animating once
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-500">
          Sobre Mim
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-900/70 backdrop-blur-sm shadow-xl border-none h-full hover:shadow-cyan-500/10 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-full mr-4">
                    <UserRound className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                    Quem sou eu
                  </h3>
                </div>

                <p className="text-gray-300 mb-5 leading-relaxed">
                  Olá! Sou o Wallison Araujo, profissional de TI com perfil júnior e híbrido, atuando tanto na administração prática de **infraestrutura de redes, servidores e cibersegurança** quanto no **desenvolvimento de sistemas (Web/Mobile)**.
                </p>

                <p className="text-gray-300 mb-5 leading-relaxed">
                  Atualmente trabalho como **Assistente de Informática / Técnico de TI** na *ABC Associação Brasil Central*. No meu dia a dia, gerencio ativamente equipamentos de redes e segurança física e virtual (switches Aruba, firewalls FortiGate/pfSense sob o conceito de **Zero Trust**, redes UniFi e servidores de virtualização XCP-ng).
                </p>

                <p className="text-gray-300 mb-5 leading-relaxed">
                  Também sou encarregado pela operação de sistemas corporativos/escolares integrados (CPB, E-Class, SAD, SSE, AASI, CFE, APS, etc.) e pela documentação centralizada de infraestrutura no **Obsidian**, aplicando automações com scripts Python e PowerShell.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="flex items-center text-sm bg-gray-800/80 px-3 py-1 rounded-full">
                    <Heart className="h-3 w-3 text-pink-500 mr-2" />
                    <span className="text-gray-300">Coding</span>
                  </div>
                  <div className="flex items-center text-sm bg-gray-800/80 px-3 py-1 rounded-full">
                    <Coffee className="h-3 w-3 text-amber-500 mr-2" />
                    <span className="text-gray-300">Café</span>
                  </div>
                  <div className="flex items-center text-sm bg-gray-800/80 px-3 py-1 rounded-full">
                    <MapPin className="h-3 w-3 text-red-500 mr-2" />
                    <span className="text-gray-300">Brasil</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-gray-900/70 backdrop-blur-sm shadow-xl border-none hover:shadow-purple-500/10 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-full mr-4">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Formação
                  </h3>
                </div>

                <div className="ml-12">
                  <div className="flex items-start mb-4 group">
                    <div className="w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full absolute -ml-6 mt-1 h-[70px]"></div>
                    <Calendar className="h-4 w-4 text-purple-400 mr-2 mt-1 flex-shrink-0 group-hover:text-purple-300 transition-colors" />
                    <div>
                      <p className="font-medium text-gray-300 group-hover:text-white transition-colors">
                        2026 - Presente <span className="text-purple-400">(Em andamento)</span>
                      </p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Bacharelado em Engenharia da Computação
                      </p>
                      <p className="text-xs text-gray-500 italic">Ensino Superior / Graduação</p>
                    </div>
                  </div>

                  <div className="flex items-start mb-4 group">
                    <div className="w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full absolute -ml-6 mt-1 h-[70px]"></div>
                    <Calendar className="h-4 w-4 text-purple-400 mr-2 mt-1 flex-shrink-0 group-hover:text-purple-300 transition-colors" />
                    <div>
                      <p className="font-medium text-gray-300 group-hover:text-white transition-colors">
                        2024 - 2025 <span className="text-emerald-400 font-semibold">(Concluído)</span>
                      </p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Análise e Desenvolvimento de Sistemas
                      </p>
                      <p className="text-xs text-gray-500 italic">Ensino Superior de Tecnologia</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full absolute -ml-6 mt-1 h-[60px]"></div>
                    <Calendar className="h-4 w-4 text-purple-400 mr-2 mt-1 flex-shrink-0 group-hover:text-purple-300 transition-colors" />
                    <div>
                      <p className="font-medium text-gray-300 group-hover:text-white transition-colors">2023 - 2024</p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Certificações & Cursos de Especialização em Redes
                      </p>
                      <p className="text-xs text-gray-500 italic">Fortinet Training, pfSense, CISCO CCNA</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/70 backdrop-blur-sm shadow-xl border-none hover:shadow-teal-500/10 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-2 rounded-full mr-4">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
                    Experiência
                  </h3>
                </div>

                <div className="ml-12">
                  <div className="flex items-start mb-4 group">
                    <div className="w-1 h-full bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full absolute -ml-6 mt-1 h-[160px]"></div>
                    <Calendar className="h-4 w-4 text-teal-400 mr-2 mt-1 flex-shrink-0 group-hover:text-teal-300 transition-colors" />
                    <div>
                      <p className="font-medium text-gray-300 group-hover:text-white transition-colors">
                        2022 - Presente
                      </p>
                      <p className="text-sm text-gray-200 group-hover:text-white transition-colors font-semibold">
                        Assistente de Informática (Reg. Carteira) / Técnico de TI & Redes
                      </p>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed mt-1">
                        Embora registrado oficialmente como Assistente de Informática, atuo como profissional de TI responsável por toda a infraestrutura de redes e servidores locais. Opero switches Aruba, firewalls FortiGate/pfSense, virtualização XCP-ng, Active Directory e VoIP Asterisk. Realizo a gestão diária de sistemas integrados (CPB, E-Class, SAD, SSE, AASI, CFE, APS) documentados no Obsidian.
                      </p>
                      <p className="text-[10px] text-teal-400 font-mono mt-1">ABC Associação Brasil Central</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-1 h-full bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full absolute -ml-6 mt-1 h-[70px]"></div>
                    <Calendar className="h-4 w-4 text-teal-400 mr-2 mt-1 flex-shrink-0 group-hover:text-teal-300 transition-colors" />
                    <div>
                      <p className="font-medium text-gray-300 group-hover:text-white transition-colors">2021 - Presente</p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Desenvolvedor Web & Mobile (Freelancer - Nível Júnior)
                      </p>
                      <p className="text-xs text-gray-500 italic">Projetos Pessoais & Soluções Customizadas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          <Card className="bg-gray-900/70 backdrop-blur-sm border-none shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:translate-y-[-5px] group overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center p-5">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all"></div>
                <Code className="h-8 w-8 text-blue-400 mb-3 relative z-10 group-hover:text-blue-300" />
              </div>
              <h3 className="text-center font-medium text-gray-300 group-hover:text-white">Software Dev</h3>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-sm border-none shadow-lg transition-all duration-300 hover:shadow-green-500/20 hover:translate-y-[-5px] group overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center p-5">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full group-hover:bg-green-500/30 transition-all"></div>
                <Network className="h-8 w-8 text-green-400 mb-3 relative z-10 group-hover:text-green-300" />
              </div>
              <h3 className="text-center font-medium text-gray-300 group-hover:text-white">Redes & Switches</h3>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-sm border-none shadow-lg transition-all duration-300 hover:shadow-red-500/20 hover:translate-y-[-5px] group overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center p-5">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full group-hover:bg-red-500/30 transition-all"></div>
                <Shield className="h-8 w-8 text-red-400 mb-3 relative z-10 group-hover:text-red-300" />
              </div>
              <h3 className="text-center font-medium text-gray-300 group-hover:text-white">Cibersegurança</h3>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-sm border-none shadow-lg transition-all duration-300 hover:shadow-amber-500/20 hover:translate-y-[-5px] group overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center p-5">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full group-hover:bg-amber-500/30 transition-all"></div>
                <Server className="h-8 w-8 text-amber-400 mb-3 relative z-10 group-hover:text-amber-300" />
              </div>
              <h3 className="text-center font-medium text-gray-300 group-hover:text-white">Servidores & Cloud</h3>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

