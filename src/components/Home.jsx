import React, { useState } from 'react';
import lawyer1 from '../assets/images/lawyer1.png';
import lawyer2 from '../assets/images/lawyer2.png';
import lawyer3 from '../assets/images/lawyer3.png';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'escritorio' | 'noticias' | 'contato'
  const [officeTab, setOfficeTab] = useState('areas'); // 'equipe' | 'areas'
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState('quem-somos');
  const [activeLawyerId, setActiveLawyerId] = useState('eduardo');
  const [lang, setLang] = useState('pt'); // 'pt' | 'en'

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const content = {
    pt: {
      nav: {
        home: 'Home',
        escritorio: 'O Escritório',
        noticias: 'Notícias & Artigos',
        contato: 'Contato'
      },
      hero: {
        tagline: 'ADVOGADOS ASSOCIADOS'
      },
      escritorio: {
        equipeTab: 'A Equipe',
        areasTab: 'Áreas de Atuação',
        lawyers: [
          {
            id: 'eduardo',
            label: 'DR. EDUARDO FERRARI',
            name: 'Dr. Eduardo Ferrari',
            role: 'Sócio Fundador | OAB/SP 245.890',
            specialty: 'Direito Empresarial, Fusões e Aquisições (M&A) e Contratos',
            image: lawyer1,
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
        ],
        areas: [
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
        ]
      },
      noticias: {
        heading: 'Notícias & Artigos',
        readMore: 'Ler Artigo Integral →',
        articles: [
          {
            title: 'Planejamento Sucessório Familiar em 2026',
            category: 'Direito de Família e Sucessões',
            date: '15 de Junho, 2026',
            desc: 'Entenda os impactos das novas regras jurídicas e como proteger o patrimônio da sua família de forma estratégica e legal.'
          },
          {
            title: 'Reestruturação Tributária pós-Reforma',
            category: 'Direito Tributário',
            date: '08 de Junho, 2026',
            desc: 'Uma análise detalhada sobre a transição de tributos e as oportunidades legais de elisão fiscal para o setor industrial brasileiro.'
          },
          {
            title: 'LGPD e a Responsabilidade dos Sócios',
            category: 'Compliance Digital',
            date: '28 de Maio, 2026',
            desc: 'Como as recentes decisões judiciais responsabilizam administradores pela segurança da informação e proteção de dados nas empresas.'
          }
        ]
      },
      contato: {
        heading: 'Fale Conosco',
        subtitle: 'Agende uma consulta presencial ou remota com nossa equipe de especialistas jurídicos.',
        address: 'Al. Tangará, 80, Sala 1, The Point Office, Cotia-SP, CEP 06711-020',
        phone: '+55 (11) 98899-4871',
        email: 'contato@zsaa.com.br',
        hours: 'Segunda a Sexta - 09:00 às 18:00',
        labels: {
          name: 'Nome Completo',
          email: 'E-mail Corporativo',
          phone: 'Telefone',
          message: 'Mensagem / Assunto',
          submit: 'Enviar via WhatsApp'
        }
      },
      footer: 'Eduardo Ferrari Advogados Associados.',
      langBtn: 'English'
    },
    en: {
      nav: {
        home: 'Home',
        escritorio: 'The Firm',
        noticias: 'News & Articles',
        contato: 'Contact'
      },
      hero: {
        tagline: 'ATTORNEYS AT LAW'
      },
      escritorio: {
        equipeTab: 'The Team',
        areasTab: 'Practice Areas',
        lawyers: [
          {
            id: 'eduardo',
            label: 'DR. EDUARDO FERRARI',
            name: 'Dr. Eduardo Ferrari',
            role: 'Founding Partner | Bar No. 245.890',
            specialty: 'Corporate Law, Mergers & Acquisitions (M&A) and Contracts',
            image: lawyer1,
            paragraphs: [
              'Graduated in Law from the University of São Paulo (USP) and Master in Commercial Law from the Pontifical Catholic University of São Paulo (PUC-SP).',
              'With over 20 years of experience in high-performance corporate legal practice, he leads corporate restructuring, corporate governance, strategic planning, and complex negotiations for domestic and international corporations.',
              'Active member of specialized Corporate Law commissions and author of articles on legal security and business governance.'
            ],
            credentials: [
              'Master in Commercial Law - PUC-SP',
              'Specialist in Corporate Law and M&A - FGV Law SP',
              'Bachelor of Laws - University of São Paulo (USP)'
            ]
          },
          {
            id: 'mariana',
            label: 'DRA. MARIANA ZATS',
            name: 'Dra. Mariana Zats',
            role: 'Senior Partner | Bar No. 289.412',
            specialty: 'Family Law, Estate Planning & Wealth Protection',
            image: lawyer2,
            paragraphs: [
              'Specialist in Family and Probate Law from Getulio Vargas Foundation Law School (FGV-SP).',
              'Solid expertise in high-net-worth probate proceedings, complex asset division divorces, family governance, and structured estate planning focused on asset protection and family harmony.',
              'Known for personalized, discreet, and technically rigorous counsel in sensitive personal and wealth matters.'
            ],
            credentials: [
              'Specialist in Family & Probate Law - FGV Law SP',
              'Member of the Brazilian Family Law Institute (IBDFAM)',
              'Bachelor of Laws - Mackenzie Presbyterian University'
            ]
          },
          {
            id: 'carlos',
            label: 'DR. CARLOS SIMONACCI',
            name: 'Dr. Carlos Simonacci',
            role: 'Senior Associate Attorney | Bar No. 312.754',
            specialty: 'Real Estate Law, Land Regularization & Urban Planning',
            image: lawyer3,
            paragraphs: [
              'Postgraduate in Real Estate and Notarial Law from Escola Paulista de Direito (EPD).',
              'Specialized consultant in due diligence for real estate acquisitions, structuring commercial and residential developments, land regularization, and atypical lease contracts (Built to Suit).',
              'Strong track record in mitigating contractual risks and enabling high-yield real estate investments.'
            ],
            credentials: [
              'Postgraduate in Real Estate Law - EPD',
              'Specialist in Real Estate Contracts - Secovi-SP',
              'Bachelor of Laws - Pontifical Catholic University (PUC-SP)'
            ]
          },
          {
            id: 'beatriz',
            label: 'DRA. BEATRIZ ALBUQUERQUE',
            name: 'Dra. Beatriz Albuquerque',
            role: 'Associate Attorney | Bar No. 365.189',
            specialty: 'Corporate Labor Law & Compliance',
            image: null,
            initials: 'BA',
            paragraphs: [
              'Specialist in Labor and Employment Law from the University of São Paulo (USP).',
              'Extensive experience in preventive advisory for corporate legal and HR departments, conducting labor compliance audits, collective bargaining, and strategic employer defense.',
              'Focused on sustainable reduction of labor liabilities and modernization of corporate internal policies.'
            ],
            credentials: [
              'Specialist in Labor Law - USP',
              'Certified Labor Compliance Specialist - LEC',
              'Bachelor of Laws - Pontifical Catholic University (PUC-SP)'
            ]
          },
          {
            id: 'rodrigo',
            label: 'DR. RODRIGO MEIRELLES',
            name: 'Dr. Rodrigo Meirelles',
            role: 'Associate Attorney | Bar No. 398.621',
            specialty: 'Consumer Law & Civil Liability',
            image: null,
            initials: 'RM',
            paragraphs: [
              'Postgraduate in Civil Law and Civil Procedure from Pontifical Catholic University of São Paulo (PUC-SP).',
              'Dedicated to strategic civil litigation and resolution of complex consumer disputes, delivering legal risk assessments and defending corporate clients before consumer protection bodies and superior courts.',
              'Solid experience in civil liability defense and corporate regulatory alignment.'
            ],
            credentials: [
              'Postgraduate in Civil Procedure - PUC-SP',
              'Specialist in Civil Liability - Paulista Judiciary School (EPM)',
              'Bachelor of Laws - Mackenzie Presbyterian University'
            ]
          }
        ],
        areas: [
          {
            id: 'quem-somos',
            label: 'ABOUT US',
            title: 'About Us',
            paragraphs: [
              'Eduardo Ferrari Attorneys at Law is a boutique law firm, specializing in delivering personalized, high-excellence legal services.',
              'We operate in civil, family, probate, real estate, corporate, and labor law, focusing on conflict prevention and resolution through tailored strategies for each client.',
              'Our primary goal is the integral success of our clients. To achieve this, we spare no effort to deliver exceptional results in every demand, combining proximity, deep understanding of needs, agility, and technical expertise to ensure high-impact legal solutions, always with dedicated follow-up at every stage.'
            ]
          },
          {
            id: 'familia',
            label: 'FAMILY & PROBATE',
            title: 'Family & Probate Law',
            paragraphs: [
              'We offer comprehensive and compassionate legal counsel for family and estate matters, such as divorces, probate, asset division, estate planning, and prenuptial agreements.',
              'Our practice prioritizes conflict prevention, safeguarding family wealth and peace of mind at every stage of life.'
            ]
          },
          {
            id: 'imobiliario',
            label: 'REAL ESTATE',
            title: 'Real Estate Law',
            paragraphs: [
              'Specialized legal services in property regularization, drafting and reviewing purchase/sale and lease agreements, adverse possession (usucapion), and real estate development structuring.',
              'We provide full legal security for investors, property owners, and real estate companies.'
            ]
          },
          {
            id: 'consumidor',
            label: 'CONSUMER LAW',
            title: 'Consumer Defense Law',
            paragraphs: [
              'Strategic defense of consumer rights, mitigating litigation and pursuing compensation for moral and material damages, improper charges, and product or service defects.',
              'We provide preventive consulting for companies seeking full compliance with consumer defense regulations.'
            ]
          },
          {
            id: 'empresarial',
            label: 'CORPORATE LAW',
            title: 'Corporate & Business Law',
            paragraphs: [
              'Strategic corporate legal advisory for companies of all sizes: business entity formation, corporate governance, tax planning, mergers and acquisitions (M&A).',
              'We protect your company growth and stability by mitigating legal risks and drafting high-complexity commercial contracts.'
            ]
          },
          {
            id: 'trabalhista',
            label: 'LABOR & EMPLOYMENT',
            title: 'Labor & Employment Law',
            paragraphs: [
              'Preventive and contentious labor advisory, focused on reducing labor liabilities, collective bargaining, and representation in labor lawsuits.',
              'We ensure full compliance with current labor legislation and corporate HR best practices.'
            ]
          },
          {
            id: 'contratos',
            label: 'CIVIL LIABILITY & CONTRACTS',
            title: 'Civil Liability & Contracts',
            paragraphs: [
              'Drafting, analysis, and negotiation of national and international contracts, as well as representation in claims for moral, material, and aesthetic damages.',
              'We aim to protect our clients interests with technical rigor and swift protective strategies.'
            ]
          }
        ]
      },
      noticias: {
        heading: 'News & Articles',
        readMore: 'Read Full Article →',
        articles: [
          {
            title: 'Family Estate Planning in 2026',
            category: 'Family & Probate Law',
            date: 'June 15, 2026',
            desc: 'Understand the impacts of new legal regulations and how to protect your family wealth strategically and legally.'
          },
          {
            title: 'Post-Reform Tax Restructuring',
            category: 'Tax Law',
            date: 'June 08, 2026',
            desc: 'A detailed analysis of the tax transition and legal opportunities for tax efficiency for the Brazilian industrial sector.'
          },
          {
            title: 'LGPD & Partners Liability',
            category: 'Digital Compliance',
            date: 'May 28, 2026',
            desc: 'How recent judicial decisions hold administrators responsible for information security and data protection in companies.'
          }
        ]
      },
      contato: {
        heading: 'Contact Us',
        subtitle: 'Schedule an in-person or remote consultation with our team of legal experts.',
        address: 'Al. Tangará, 80, Suite 1, The Point Office, Cotia-SP, Brazil, CEP 06711-020',
        phone: '+55 (11) 98899-4871',
        email: 'contato@zsaa.com.br',
        hours: 'Monday to Friday - 09:00 AM to 06:00 PM',
        labels: {
          name: 'Full Name',
          email: 'Corporate E-mail',
          phone: 'Phone Number',
          message: 'Message / Subject',
          submit: 'Send via WhatsApp'
        }
      },
      footer: 'Eduardo Ferrari Attorneys at Law.',
      langBtn: 'Português'
    }
  };

  const t = content[lang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "5511988994871";
    const text = `*${lang === 'pt' ? 'Novo Contato via Site Eduardo Ferrari Advogados' : 'New Contact via Eduardo Ferrari Law Website'}*\n\n` +
                 `👤 *${t.contato.labels.name}:* ${formData.name}\n` +
                 `✉️ *${t.contato.labels.email}:* ${formData.email}\n` +
                 `📞 *${t.contato.labels.phone}:* ${formData.phone}\n\n` +
                 `💬 *${t.contato.labels.message}:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const navigateTo = (page, subTab = null) => {
    setCurrentPage(page);
    if (subTab) {
      setOfficeTab(subTab);
    }
    setMenuOpen(false);
  };

  const currentSelectedLawyer = t.escritorio.lawyers.find(l => l.id === activeLawyerId) || t.escritorio.lawyers[0];
  const currentSelectedArea = t.escritorio.areas.find(s => s.id === activeServiceId) || t.escritorio.areas[0];

  return (
    <div className="home-container">
      {/* Background Overlay for readability */}
      <div className="background-overlay"></div>

      {/* Top Header Section */}
      <header className="home-header">
        <div className="logo-container" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo-header">
            <div className="brand-logo-monogram">EF</div>
            <div className="brand-logo-text">
              <span className="brand-logo-name">EDUARDO FERRARI</span>
              <span className="brand-logo-sub">ADVOGADOS ASSOCIADOS</span>
            </div>
          </div>
        </div>

        {/* Desktop Inline Navigation */}
        <nav className="desktop-nav">
          <button 
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`} 
            onClick={() => navigateTo('home')}
          >
            {t.nav.home}
          </button>
          
          {/* O Escritório with Dropdown Submenu */}
          <div className="nav-dropdown-item">
            <button 
              className={`nav-btn ${currentPage === 'escritorio' ? 'active' : ''}`} 
              onClick={() => navigateTo('escritorio')}
            >
              {t.nav.escritorio}
              <span className="dropdown-caret">▾</span>
            </button>
            <div className="nav-dropdown-menu">
              <button 
                className={`dropdown-sublink ${currentPage === 'escritorio' && officeTab === 'equipe' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); navigateTo('escritorio', 'equipe'); }}
              >
                {t.escritorio.equipeTab}
              </button>
              <button 
                className={`dropdown-sublink ${currentPage === 'escritorio' && officeTab === 'areas' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); navigateTo('escritorio', 'areas'); }}
              >
                {t.escritorio.areasTab}
              </button>
            </div>
          </div>

          <button 
            className={`nav-btn ${currentPage === 'noticias' ? 'active' : ''}`} 
            onClick={() => navigateTo('noticias')}
          >
            {t.nav.noticias}
          </button>
          <button 
            className={`nav-btn ${currentPage === 'contato' ? 'active' : ''}`} 
            onClick={() => navigateTo('contato')}
          >
            {t.nav.contato}
          </button>
        </nav>

        {/* Hamburger Menu Toggle Button */}
        <button 
          className="hamburger-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className={`hamburger-bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-bar ${menuOpen ? 'open' : ''}`}></div>
        </button>
      </header>

      {/* Slide-out Menu Drawer */}
      <div className={`menu-drawer glass ${menuOpen ? 'open' : ''}`}>
        <nav className="drawer-nav">
          <button 
            className={`drawer-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            {t.nav.home}
          </button>
          
          <div className="drawer-group">
            <button 
              className={`drawer-link ${currentPage === 'escritorio' ? 'active' : ''}`}
              onClick={() => navigateTo('escritorio')}
            >
              {t.nav.escritorio}
            </button>
            <div className="drawer-sublinks-container">
              <button 
                className={`drawer-subitem ${currentPage === 'escritorio' && officeTab === 'equipe' ? 'active' : ''}`}
                onClick={() => navigateTo('escritorio', 'equipe')}
              >
                ↳ {t.escritorio.equipeTab}
              </button>
              <button 
                className={`drawer-subitem ${currentPage === 'escritorio' && officeTab === 'areas' ? 'active' : ''}`}
                onClick={() => navigateTo('escritorio', 'areas')}
              >
                ↳ {t.escritorio.areasTab}
              </button>
            </div>
          </div>

          <button 
            className={`drawer-link ${currentPage === 'noticias' ? 'active' : ''}`}
            onClick={() => navigateTo('noticias')}
          >
            {t.nav.noticias}
          </button>
          <button 
            className={`drawer-link ${currentPage === 'contato' ? 'active' : ''}`}
            onClick={() => navigateTo('contato')}
          >
            {t.nav.contato}
          </button>
        </nav>
      </div>

      {/* Overlay backdrop when menu is open */}
      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)}></div>}

      {/* Dynamic Screen Content Wrapper */}
      <div className="app-screen-content">
        {/* Screen: Home Hero (EDUARDO FERRARI) */}
        {currentPage === 'home' && (
          <section className="screen-section home-hero-view">
            <div className="brand-block">
              <h1 className="brand-subtitle">
                <span className="brand-row">EDUARDO</span>
                <span className="brand-row">FERRARI</span>
              </h1>
              <div className="brand-tagline">{t.hero.tagline}</div>
            </div>
            <footer className="footer-bar">
              <span>&copy; {new Date().getFullYear()} {t.footer}</span>
            </footer>
          </section>
        )}

        {/* Screen: O Escritório (Sub-tabs: A Equipe | Áreas de Atuação) */}
        {currentPage === 'escritorio' && (
          <section className="screen-section scrollable-view">
            <div className="section-inner-container">
              
              {/* Top Submenu Switcher Tabs (In place of "Nossos Serviços" title) */}
              <div className="office-tab-switch-header">
                <div className="office-tab-switch-group">
                  <button
                    className={`office-switcher-btn ${officeTab === 'equipe' ? 'active' : ''}`}
                    onClick={() => setOfficeTab('equipe')}
                  >
                    <span className="switch-bullet"></span>
                    <span>{t.escritorio.equipeTab}</span>
                  </button>
                  <button
                    className={`office-switcher-btn ${officeTab === 'areas' ? 'active' : ''}`}
                    onClick={() => setOfficeTab('areas')}
                  >
                    <span className="switch-bullet"></span>
                    <span>{t.escritorio.areasTab}</span>
                  </button>
                </div>
              </div>

              {/* View 1: A Equipe */}
              {officeTab === 'equipe' && (
                <div className="services-layout animate-fade" key="equipe-view">
                  {/* Left Sidebar: Lawyers Buttons */}
                  <div className="services-sidebar">
                    {t.escritorio.lawyers.map((lawyer) => (
                      <button
                        key={lawyer.id}
                        className={`service-tab-btn ${activeLawyerId === lawyer.id ? 'active' : ''}`}
                        onClick={() => setActiveLawyerId(lawyer.id)}
                      >
                        <span className="tab-indicator"></span>
                        {lawyer.label}
                      </button>
                    ))}
                  </div>

                  {/* Right Content Panel: Lawyer Profile */}
                  <div className="services-content-card">
                    {currentSelectedLawyer && (
                      <div className="lawyer-profile-detail animate-fade" key={currentSelectedLawyer.id}>
                        <div className="lawyer-detail-header">
                          <div className="lawyer-detail-avatar-wrapper">
                            {currentSelectedLawyer.image ? (
                              <img 
                                src={currentSelectedLawyer.image} 
                                alt={currentSelectedLawyer.name} 
                                className="lawyer-detail-avatar-img"
                              />
                            ) : (
                              <div className="lawyer-detail-avatar-placeholder">
                                {currentSelectedLawyer.initials || 'EF'}
                              </div>
                            )}
                          </div>
                          <div className="lawyer-detail-header-info">
                            <h3 className="service-detail-title lawyer-detail-name">
                              {currentSelectedLawyer.name}
                            </h3>
                            <div className="lawyer-detail-role-badge">
                              {currentSelectedLawyer.role}
                            </div>
                            <div className="lawyer-detail-specialty">
                              {currentSelectedLawyer.specialty}
                            </div>
                          </div>
                        </div>

                        <div className="service-detail-divider"></div>

                        <div className="service-paragraphs">
                          {currentSelectedLawyer.paragraphs.map((p, idx) => (
                            <p key={idx} className="service-paragraph">{p}</p>
                          ))}
                        </div>

                        {currentSelectedLawyer.credentials && currentSelectedLawyer.credentials.length > 0 && (
                          <div className="lawyer-credentials-box">
                            <h4 className="lawyer-credentials-title">
                              {lang === 'pt' ? 'Formação & Qualificações' : 'Education & Credentials'}
                            </h4>
                            <ul className="lawyer-credentials-list">
                              {currentSelectedLawyer.credentials.map((cred, idx) => (
                                <li key={idx} className="lawyer-credential-item">
                                  <span className="credential-bullet">◆</span>
                                  <span>{cred}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* View 2: Áreas de Atuação */}
              {officeTab === 'areas' && (
                <div className="services-layout animate-fade" key="areas-view">
                  {/* Left Sidebar Menu */}
                  <div className="services-sidebar">
                    {t.escritorio.areas.map((service) => (
                      <button
                        key={service.id}
                        className={`service-tab-btn ${activeServiceId === service.id ? 'active' : ''}`}
                        onClick={() => setActiveServiceId(service.id)}
                      >
                        <span className="tab-indicator"></span>
                        {service.label}
                      </button>
                    ))}
                  </div>

                  {/* Right Content Panel */}
                  <div className="services-content-card">
                    {currentSelectedArea && (
                      <div className="service-details animate-fade" key={currentSelectedArea.id}>
                        <h3 className="service-detail-title">
                          {currentSelectedArea.title}
                        </h3>
                        <div className="service-detail-divider"></div>
                        <div className="service-paragraphs">
                          {currentSelectedArea.paragraphs.map((p, idx) => (
                            <p key={idx} className="service-paragraph">{p}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
            <footer className="footer-bar inner-footer">
              <span>&copy; {new Date().getFullYear()} {t.footer}</span>
            </footer>
          </section>
        )}

        {/* Screen: Noticias & Artigos */}
        {currentPage === 'noticias' && (
          <section className="screen-section scrollable-view">
            <div className="section-inner-container">
              <h2 className="section-heading">{t.noticias.heading}</h2>
              <div className="section-divider"></div>
              <div className="articles-grid">
                {t.noticias.articles.map((article, index) => (
                  <article key={index} className="article-card animate-fade">
                    <span className="article-category">{article.category}</span>
                    <h3 className="article-title">{article.title}</h3>
                    <span className="article-date">{article.date}</span>
                    <p className="article-desc">{article.desc}</p>
                    <a href={`#article-${index}`} className="article-link" onClick={(e) => e.preventDefault()}>
                      {t.noticias.readMore}
                    </a>
                  </article>
                ))}
              </div>
            </div>
            <footer className="footer-bar inner-footer">
              <span>&copy; {new Date().getFullYear()} {t.footer}</span>
            </footer>
          </section>
        )}

        {/* Screen: Contato */}
        {currentPage === 'contato' && (
          <section className="screen-section scrollable-view">
            <div className="section-inner-container">
              <h2 className="section-heading">{t.contato.heading}</h2>
              <div className="section-divider"></div>
              <div className="contact-grid">
                <div className="contact-info animate-fade">
                  <h3 className="contact-info-title">EDUARDO FERRARI ADVOGADOS ASSOCIADOS</h3>
                  <p className="contact-info-text">{t.contato.subtitle}</p>
                  <div className="contact-details">
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{t.contato.address}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📞</span>
                      <span>{t.contato.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">✉️</span>
                      <span>{t.contato.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🕒</span>
                      <span>{t.contato.hours}</span>
                    </div>
                  </div>
                </div>
                
                <form className="contact-form animate-fade" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">{t.contato.labels.name}</label>
                    <input className="form-input" type="text" id="name" value={formData.name} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">{t.contato.labels.email}</label>
                    <input className="form-input" type="email" id="email" value={formData.email} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">{t.contato.labels.phone}</label>
                    <input className="form-input" type="tel" id="phone" value={formData.phone} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">{t.contato.labels.message}</label>
                    <textarea className="form-textarea" id="message" rows="4" value={formData.message} onChange={handleFormChange} required></textarea>
                  </div>
                  <button className="form-submit-btn" type="submit">{t.contato.labels.submit}</button>
                </form>
              </div>
            </div>
            <footer className="footer-bar inner-footer">
              <span>&copy; {new Date().getFullYear()} {t.footer}</span>
            </footer>
          </section>
        )}
      </div>

      {/* Discreet Floating Language Switcher */}
      <button 
        className="lang-switcher-btn" 
        onClick={toggleLanguage} 
        aria-label="Toggle Language"
      >
        <span className="lang-icon">🌐</span>
        <span>{t.langBtn}</span>
      </button>
    </div>
  );
}

