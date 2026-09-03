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

const STORAGE_KEY_LAWYERS = 'ef_cms_lawyers_v1';
const STORAGE_KEY_AREAS = 'ef_cms_areas_v1';

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

export function resetCmsDefaults() {
  localStorage.setItem(STORAGE_KEY_LAWYERS, JSON.stringify(INITIAL_LAWYERS));
  localStorage.setItem(STORAGE_KEY_AREAS, JSON.stringify(INITIAL_AREAS));
  window.dispatchEvent(new Event('cms_data_updated'));
}
