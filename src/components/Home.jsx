import React, { useState, useEffect } from 'react';
import { getStoredLawyers, getStoredAreas } from '../data/cmsData';

export default function Home({ onNavigateToAdmin }) {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'escritorio' | 'noticias' | 'contato'
  const [officeTab, setOfficeTab] = useState('areas'); // 'equipe' | 'areas'
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState('quem-somos');
  const [activeLawyerId, setActiveLawyerId] = useState('eduardo');
  const [lang, setLang] = useState('pt'); // 'pt' | 'en'

  // Dynamic CMS Data from LocalStorage
  const [cmsLawyers, setCmsLawyers] = useState(getStoredLawyers);
  const [cmsAreas, setCmsAreas] = useState(getStoredAreas);

  useEffect(() => {
    const handleCmsUpdate = () => {
      const updatedLawyers = getStoredLawyers();
      const updatedAreas = getStoredAreas();
      setCmsLawyers(updatedLawyers);
      setCmsAreas(updatedAreas);
    };

    window.addEventListener('cms_data_updated', handleCmsUpdate);
    return () => window.removeEventListener('cms_data_updated', handleCmsUpdate);
  }, []);

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
        lawyers: cmsLawyers,
        areas: cmsAreas
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
      adminLink: 'Acesso CMS / Admin',
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
        lawyers: cmsLawyers,
        areas: cmsAreas
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
      adminLink: 'CMS / Admin Access',
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

  const currentSelectedLawyer = t.escritorio.lawyers.find(l => l.id === activeLawyerId) || t.escritorio.lawyers[0] || null;
  const currentSelectedArea = t.escritorio.areas.find(s => s.id === activeServiceId) || t.escritorio.areas[0] || null;

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

          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(240, 105, 73, 0.2)', paddingTop: '15px' }}>
            <button 
              className="drawer-subitem" 
              style={{ color: '#f06949', opacity: 0.9 }}
              onClick={onNavigateToAdmin}
            >
              ⚙️ {t.adminLink}
            </button>
          </div>
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
              <button 
                className="footer-admin-link"
                onClick={onNavigateToAdmin}
                title="Acessar o Gerenciador de Conteúdo CMS"
              >
                🔒 {t.adminLink}
              </button>
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
                        {lawyer.label || lawyer.name.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Right Content Panel: Lawyer Profile */}
                  <div className="services-content-card">
                    {currentSelectedLawyer ? (
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
                          {Array.isArray(currentSelectedLawyer.paragraphs) ? (
                            currentSelectedLawyer.paragraphs.map((p, idx) => (
                              <p key={idx} className="service-paragraph">{p}</p>
                            ))
                          ) : (
                            <p className="service-paragraph">{currentSelectedLawyer.paragraphs}</p>
                          )}
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
                    ) : (
                      <p className="service-paragraph">Nenhum advogado cadastrado no momento.</p>
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
                    {currentSelectedArea ? (
                      <div className="service-details animate-fade" key={currentSelectedArea.id}>
                        <h3 className="service-detail-title">
                          {currentSelectedArea.title}
                        </h3>
                        <div className="service-detail-divider"></div>
                        <div className="service-paragraphs">
                          {Array.isArray(currentSelectedArea.paragraphs) ? (
                            currentSelectedArea.paragraphs.map((p, idx) => (
                              <p key={idx} className="service-paragraph">{p}</p>
                            ))
                          ) : (
                            <p className="service-paragraph">{currentSelectedArea.paragraphs}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="service-paragraph">Nenhuma área de atuação cadastrada.</p>
                    )}
                  </div>
                </div>
              )}

            </div>
            <footer className="footer-bar inner-footer">
              <span>&copy; {new Date().getFullYear()} {t.footer}</span>
              <button 
                className="footer-admin-link"
                onClick={onNavigateToAdmin}
                title="Acessar o Gerenciador de Conteúdo CMS"
              >
                🔒 {t.adminLink}
              </button>
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
              <button 
                className="footer-admin-link"
                onClick={onNavigateToAdmin}
                title="Acessar o Gerenciador de Conteúdo CMS"
              >
                🔒 {t.adminLink}
              </button>
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
              <button 
                className="footer-admin-link"
                onClick={onNavigateToAdmin}
                title="Acessar o Gerenciador de Conteúdo CMS"
              >
                🔒 {t.adminLink}
              </button>
            </footer>
          </section>
        )}
      </div>

      {/* Discreet Floating Language Switcher & CMS Button */}
      <div className="floating-bottom-controls">
        <button 
          className="admin-floating-badge" 
          onClick={onNavigateToAdmin}
          title="Abrir Painel Administrativo / CMS"
        >
          <span>⚙️</span>
          <span>CMS</span>
        </button>

        <button 
          className="lang-switcher-btn" 
          onClick={toggleLanguage} 
          aria-label="Toggle Language"
        >
          <span className="lang-icon">🌐</span>
          <span>{t.langBtn}</span>
        </button>
      </div>
    </div>
  );
}
