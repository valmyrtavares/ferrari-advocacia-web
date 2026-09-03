import lawyer1 from '../assets/images/lawyer1.png';
import lawyer2 from '../assets/images/lawyer2.png';
import lawyer3 from '../assets/images/lawyer3.png';

export const INITIAL_LAWYERS = [
  {
    id: 'eduardo',
    label: 'DR. EDUARDO FERRARI',
    name: 'Dr. Eduardo Ferrari',
    role: 'Sócio Fundador | OAB/SP 245.890',
    specialty: 'Direito Empresarial, Fusões e Aquisições (M&A) e Contratos',
    image: lawyer1,
    initials: 'EF',
    paragraphs: [
      'Graduado em Direito pela Universidade de São Paulo (USP) e Mestre em Direito Comercial pela Pontifícia Universidade Católica de São Paulo (PUC-SP).',
      'Com mais de 20 anos de experiência na advocacia corporativa de alta performance, lidera a condução de reestruturações societárias, governança corporativa, planejamento estratégico e assessoria jurídica em negociações complexas para empresas nacionais e multinacionais.',
      'Membro efetivo de comissões especializadas em Direito Empresarial e autor de diversos artigos sobre segurança jurídica e governança nos negócios.'
    ],
    credentials: [
      'Mestre em Direito Comercial - PUC-SP',
      'Especialista em Direito Societário e M&A - FGV Direito SP',
      'Graduado em Direito - Universidade de São Paulo (USP)'
    ]
  },
  {
    id: 'mariana',
    label: 'DRA. MARIANA ZATS',
    name: 'Dra. Mariana Zats',
    role: 'Sócia Coordenadora | OAB/SP 289.412',
    specialty: 'Direito de Família, Planejamento Sucessório e Patrimonial',
    image: lawyer2,
    initials: 'MZ',
    paragraphs: [
      'Especialista em Direito das Famílias e Sucessões pela Escola de Direito da Fundação Getulio Vargas (FGV-SP).',
      'Possui sólida atuação na condução e mediação de inventários de grande porte, divórcios com partilha complexa de bens, governança familiar e elaboração de planos sucessórios estruturados para proteção e longevidade do patrimônio.',
      'Destaca-se pelo atendimento humanizado, sigiloso e de alto rigor técnico em temas de alta sensibilidade pessoal e patrimonial.'
    ],
    credentials: [
      'Especialista em Família e Sucessões - FGV Direito SP',
      'Membro do Instituto Brasileiro de Direito de Família (IBDFAM)',
      'Graduada em Direito - Universidade Presbiteriana Mackenzie'
    ]
  },
  {
    id: 'carlos',
    label: 'DR. CARLOS SIMONACCI',
    name: 'Dr. Carlos Simonacci',
    role: 'Advogado Associado Sênior | OAB/SP 312.754',
    specialty: 'Direito Imobiliário, Regularização Fundiária e Urbanístico',
    image: lawyer3,
    initials: 'CS',
    paragraphs: [
      'Pós-graduado em Direito Imobiliário e Notarial pela Escola Paulista de Direito (EPD).',
      'Consultor especializado em due diligence para aquisições de ativos imobiliários, estruturação de empreendimentos comerciais e residenciais, regularizações fundiárias, incorporações e gestão de contratos de locação atípicos (Built to Suit).',
      'Atua fortemente na mitigação de riscos contratuais e na viabilização jurídica de investimentos no setor imobiliário.'
    ],
    credentials: [
      'Pós-Graduado em Direito Imobiliário - EPD',
      'Especialista em Contratos Imobiliários e Negócios - Secovi-SP',
      'Graduado em Direito - Pontifícia Universidade Católica (PUC-SP)'
    ]
  },
  {
    id: 'beatriz',
    label: 'DRA. BEATRIZ ALBUQUERQUE',
    name: 'Dra. Beatriz Albuquerque',
    role: 'Advogada Associada | OAB/SP 365.189',
    specialty: 'Direito Trabalhista Corporativo e Compliance',
    image: null,
    initials: 'BA',
    paragraphs: [
      'Especialista em Direito e Processo do Trabalho pela Faculdade de Direito da Universidade de São Paulo (USP).',
      'Com ampla vivência em consultoria preventiva para departamentos jurídicos e de recursos humanos, conduz auditorias de conformidade trabalhista (compliance), negociações sindicais e defesas estratégicas patronais perante a Justiça do Trabalho.',
      'Foco direcionado na redução sustentável de passivos trabalhistas e modernização de políticas internas corporativas.'
    ],
    credentials: [
      'Especialista em Direito do Trabalho - USP',
      'Certificação em Compliance Trabalhista - Legal, Ethics & Compliance (LEC)',
      'Graduada em Direito - Pontifícia Universidade Católica (PUC-SP)'
    ]
  },
  {
    id: 'rodrigo',
    label: 'DR. RODRIGO MEIRELLES',
    name: 'Dr. Rodrigo Meirelles',
    role: 'Advogado Associado | OAB/SP 398.621',
    specialty: 'Direito do Consumidor e Responsabilidade Civil',
    image: null,
    initials: 'RM',
    paragraphs: [
      'Pós-graduado em Direito Civil e Processual Civil pela Pontifícia Universidade Católica de São Paulo (PUC-SP).',
      'Dedicado ao contencioso cível estratégico e à resolução de disputas complexas nas relações de consumo, elaborando pareceres de risco, atuando perante órgãos de fiscalização e tribunais estaduais e superiores.',
      'Experiência destacada na defesa de empresas em litígios de responsabilidade civil e adequação a normas consumeristas.'
    ],
    credentials: [
      'Pós-Graduado em Processo Civil - PUC-SP',
      'Especialista em Responsabilidade Civil - Escola Paulista da Magistratura (EPM)',
      'Graduado em Direito - Universidade Presbiteriana Mackenzie'
    ]
  }
];

export const INITIAL_AREAS = [
  {
    id: 'quem-somos',
    label: 'QUEM SOMOS',
    title: 'Quem Somos',
    paragraphs: [
      'Eduardo Ferrari Advogados Associados é um escritório boutique, especializado em oferecer atendimento jurídico personalizado e de excelência.',
      'Atuamos nas áreas cível, família, sucessões, imobiliária, empresarial e trabalhista, com foco na prevenção e solução de conflitos através de estratégias sob medida para cada cliente.',
      'Nosso objetivo precípuo é o sucesso integral de nossos clientes. Para isso, não medimos esforços para alcançar resultados excepcionais em cada demanda. Combinamos proximidade, entendimento profundo das necessidades, agilidade e expertise técnica para garantir soluções jurídicas de alto impacto, sempre com acompanhamento dedicado em todas as etapas do processo.'
    ]
  },
  {
    id: 'familia',
    label: 'FAMÍLIA E SUCESSÕES',
    title: 'Direito de Família e Sucessões',
    paragraphs: [
      'Oferecemos assessoria jurídica completa e sensível para questões familiares e patrimoniais, como divórcios, inventários, partilha de bens, planejamento sucessório e pactos antenupciais.',
      'Nossa atuação prioriza a prevenção de conflitos, garantindo a proteção do patrimônio familiar e a tranquilidade das partes envolvidas em cada fase da vida.'
    ]
  },
  {
    id: 'imobiliario',
    label: 'IMOBILIÁRIO',
    title: 'Direito Imobiliário',
    paragraphs: [
      'Atuação especializada em regularização de imóveis, elaboração e análise de contratos de compra e venda, locações residenciais e comerciais, usucapião e estruturação de empreendimentos.',
      'Oferecemos segurança jurídica completa para investidores, proprietários e empresas do setor imobiliário.'
    ]
  },
  {
    id: 'consumidor',
    label: 'CONSUMIDOR',
    title: 'Direito do Consumidor',
    paragraphs: [
      'Defesa estratégica de direitos em relações de consumo, atenuando litígios e atuando na reparação de danos morais e materiais, cobranças indevidas e vícios de produtos ou serviços.',
      'Prestamos consultoria preventiva para empresas visando a total adequação às normas do Código de Defesa do Consumidor.'
    ]
  },
  {
    id: 'empresarial',
    label: 'EMPRESARIAL',
    title: 'Direito Empresarial',
    paragraphs: [
      'Consultoria e assessoria corporativa estratégica para empresas de todos os portes: constituição de sociedades, governança corporativa, planejamento tributário, fusões e aquisições (M&A).',
      'Protegemos o desenvolvimento e a estabilidade da sua empresa através da mitigação de riscos jurídicos e elaboração de contratos comerciais de alta complexidade.'
    ]
  },
  {
    id: 'trabalhista',
    label: 'TRABALHISTA',
    title: 'Direito Trabalhista',
    paragraphs: [
      'Assessoria trabalhista preventiva e contenciosa, focada na redução de passivos trabalhistas, negociações coletivas e representação em processos trabalhistas.',
      'Garantimos a conformidade com a legislação vigente e as melhores práticas de recursos humanos e compliance corporativo.'
    ]
  },
  {
    id: 'contratos',
    label: 'RESPONSABILIDADE CIVIL E CONTRATOS',
    title: 'Responsabilidade Civil e Contratos',
    paragraphs: [
      'Elaboração, análise e negociação de contratos nacionais e internacionais, bem como atuação em ações de reparação de danos morais, materiais e estéticos.',
      'Buscamos defender e resguardar os interesses de nossos clientes com rigor técnico e estratégias ágeis de ressarcimento e proteção contratual.'
    ]
  }
];

export const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'Planejamento Sucessório Familiar em 2026: Estratégias e Blindagem',
    category: 'Direito de Família e Sucessões',
    date: '15 de Junho, 2026',
    author: 'Dra. Mariana Zats',
    desc: 'Entenda os impactos das novas regras jurídicas e como proteger o patrimônio da sua família de forma estratégica e legal.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    paragraphs: [
      'O planejamento sucessório tem se consolidado como uma das ferramentas jurídicas mais eficazes para a preservação patrimonial e a prevenção de litígios familiares. Em um cenário econômico dinâmico e diante de constantes atualizações legislativas e tributárias, antecipar a sucessão de bens deixou de ser uma exclusividade de grandes fortunas e passou a ser uma medida indispensável para famílias e grupos empresariais.',
      'A estruturação adequada envolve instrumentos como a criação de holdings patrimoniais familiares, doações com reserva de usufruto, cláusulas de incomunicabilidade, inalienabilidade e impenhorabilidade, bem como a celebração de acordos de sócios e protocolos de família bem delimitados.',
      'Além de reduzir substancialmente os custos com processos de inventário judicial ou extrajudicial e tributos como o ITCMD, o planejamento sucessório assegura a continuidade dos negócios familiares sem interrupções operacionais e com a harmonia que todos desejam preservar entre os herdeiros.'
    ]
  },
  {
    id: 'art-2',
    title: 'Reestruturação Tributária pós-Reforma: Oportunidades para o Setor Produtivo',
    category: 'Direito Tributário e Empresarial',
    date: '08 de Junho, 2026',
    author: 'Dr. Eduardo Ferrari',
    desc: 'Uma análise detalhada sobre a transição de tributos e as oportunidades legais de elisão fiscal para o setor industrial brasileiro.',
    videoUrl: '', // Sem vídeo (leitura em texto)
    paragraphs: [
      'Com o avanço e a regulamentação gradual das novas diretrizes da Reforma Tributária sobre o consumo e a renda, as empresas brasileiras são desafiadas a repensar suas cadeias de suprimentos, modelos contratuais e regimes de apuração fiscal.',
      'A unificação e simplificação de tributos trazem oportunidades claras de elisão fiscal estratégica, mas exigem uma auditoria minuciosa dos contratos em vigor e das margens operacionais de cada segmento industrial e comercial.',
      'Nossa equipe societária e tributária tem assessorado clientes de diversos setores na modelagem de cenários preditivos, permitindo a tomada de decisões ágeis para a manutenção da competitividade e conformidade fiscal.'
    ]
  },
  {
    id: 'art-3',
    title: 'LGPD e a Responsabilidade dos Sócios e Administradores',
    category: 'Compliance Digital',
    date: '28 de Maio, 2026',
    author: 'Dra. Beatriz Albuquerque',
    desc: 'Como as recentes decisões judiciais responsabilizam administradores pela segurança da informação e proteção de dados nas empresas.',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    paragraphs: [
      'A jurisprudência dos tribunais brasileiros tem demonstrado um rigor cada vez maior quanto à responsabilização direta de diretores e administradores por incidentes de segurança da informação e vazamento de dados pessoais.',
      'Não basta mais ter uma política de privacidade genérica no site; a Lei Geral de Proteção de Dados (LGPD) exige governança ativa, nomeação de encarregado de dados (DPO), relatórios de impacto à proteção de dados e planos de resposta a incidentes comprovadamente operacionais.',
      'A implementação de um programa robusto de compliance digital previne sanções severas da Autoridade Nacional de Proteção de Dados (ANPD), além de resguardar o patrimônio pessoal dos executivos e a reputação da companhia no mercado.'
    ]
  }
];

export const INITIAL_CONTACT = {
  title: 'Fale Conosco',
  companyName: 'EDUARDO FERRARI ADVOGADOS ASSOCIADOS',
  subtitle: 'Agende uma consulta presencial ou remota com nossa equipe de especialistas jurídicos.',
  address: 'Al. Tangará, 80, Sala 1, The Point Office, Cotia-SP, CEP 06711-020',
  phone: '+55 (11) 98899-4871',
  whatsappNumber: '5511988994871',
  email: 'contato@zsaa.com.br',
  hours: 'Segunda a Sexta - 09:00 às 18:00'
};

const STORAGE_KEY_LAWYERS = 'ef_cms_lawyers_v1';
const STORAGE_KEY_AREAS = 'ef_cms_areas_v1';
const STORAGE_KEY_ARTICLES = 'ef_cms_articles_v1';
const STORAGE_KEY_CONTACT = 'ef_cms_contact_v1';

export function getStoredLawyers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAWYERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_LAWYERS, JSON.stringify(INITIAL_LAWYERS));
      return INITIAL_LAWYERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_LAWYERS;
  } catch {
    return INITIAL_LAWYERS;
  }
}

export function saveStoredLawyers(lawyers) {
  try {
    localStorage.setItem(STORAGE_KEY_LAWYERS, JSON.stringify(lawyers));
    window.dispatchEvent(new Event('cms_data_updated'));
  } catch (e) {
    console.error('Error saving lawyers to localStorage:', e);
  }
}

export function getStoredAreas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AREAS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_AREAS, JSON.stringify(INITIAL_AREAS));
      return INITIAL_AREAS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_AREAS;
  } catch {
    return INITIAL_AREAS;
  }
}

export function saveStoredAreas(areas) {
  try {
    localStorage.setItem(STORAGE_KEY_AREAS, JSON.stringify(areas));
    window.dispatchEvent(new Event('cms_data_updated'));
  } catch (e) {
    console.error('Error saving areas to localStorage:', e);
  }
}

export function getStoredArticles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(INITIAL_ARTICLES));
      return INITIAL_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ARTICLES;
  } catch {
    return INITIAL_ARTICLES;
  }
}

export function saveStoredArticles(articles) {
  try {
    localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
    window.dispatchEvent(new Event('cms_data_updated'));
  } catch (e) {
    console.error('Error saving articles to localStorage:', e);
  }
}

export function getStoredContact() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTACT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(INITIAL_CONTACT));
      return INITIAL_CONTACT;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : INITIAL_CONTACT;
  } catch {
    return INITIAL_CONTACT;
  }
}

export function saveStoredContact(contact) {
  try {
    localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(contact));
    window.dispatchEvent(new Event('cms_data_updated'));
  } catch (e) {
    console.error('Error saving contact to localStorage:', e);
  }
}

export function resetCmsDefaults() {
  localStorage.setItem(STORAGE_KEY_LAWYERS, JSON.stringify(INITIAL_LAWYERS));
  localStorage.setItem(STORAGE_KEY_AREAS, JSON.stringify(INITIAL_AREAS));
  localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(INITIAL_ARTICLES));
  localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(INITIAL_CONTACT));
  window.dispatchEvent(new Event('cms_data_updated'));
}

export function getEmbedVideoUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // YouTube match: regular watch, short youtu.be, or embed
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(youtubeRegex);
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}`;
  }

  // Vimeo match
  const vimeoRegex = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const vimeoMatch = trimmed.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // If already an embed or standard https link
  return trimmed;
}
