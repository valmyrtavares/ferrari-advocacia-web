import React, { useState, useEffect } from 'react';
import ClientArea from './ClientArea';
import {
  getStoredLawyers,
  getStoredAreas,
  getStoredArticles,
  getStoredContact,
  getEmbedVideoUrl
} from '../data/cmsData';

export default function Home({ onNavigateToAdmin }) {
  // Navigation & URL Routing States
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'escritorio' | 'noticias' | 'cliente' | 'contato'
  const [officeTab, setOfficeTab] = useState('areas'); // 'equipe' | 'areas'
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState('quem-somos');
  const [activeLawyerId, setActiveLawyerId] = useState('eduardo');
  const [selectedArticleId, setSelectedArticleId] = useState(null); // Article ID for full-reading mode
  const [lang, setLang] = useState('pt'); // 'pt' | 'en'

  // Articles Carousel State
  const [articleSlideIndex, setArticleSlideIndex] = useState(0);

  // Dynamic CMS Data from LocalStorage
  const [cmsLawyers, setCmsLawyers] = useState(getStoredLawyers);
  const [cmsAreas, setCmsAreas] = useState(getStoredAreas);
  const [cmsArticles, setCmsArticles] = useState(getStoredArticles);
  const [cmsContact, setCmsContact] = useState(getStoredContact);

  // Parse URL Hash for direct link sharing
  const applyRouteFromHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash || hash === 'home') {
      setCurrentPage('home');
      setSelectedArticleId(null);
      return;
    }

    const parts = hash.split('/');
    const mainSection = parts[0];

    if (mainSection === 'admin') {
      onNavigateToAdmin();
      return;
    }

    if (mainSection === 'escritorio') {
      setCurrentPage('escritorio');
      setSelectedArticleId(null);
      const sub = parts[1];
      const targetId = parts[2];

      if (sub === 'equipe') {
        setOfficeTab('equipe');
        if (targetId) setActiveLawyerId(targetId);
      } else {
        setOfficeTab('areas');
        if (targetId) setActiveServiceId(targetId);
      }
    } else if (mainSection === 'noticias' || mainSection === 'artigos') {
      setCurrentPage('noticias');
      const artId = parts[1];
      if (artId) {
        setSelectedArticleId(artId);
      } else {
        setSelectedArticleId(null);
      }
    } else if (mainSection === 'cliente' || mainSection === 'area-cliente') {
      setCurrentPage('cliente');
      setSelectedArticleId(null);
    } else if (mainSection === 'contato') {
      setCurrentPage('contato');
      setSelectedArticleId(null);
    }
  };

  // Synchronize on mount and URL change
  useEffect(() => {
    applyRouteFromHash();
    window.addEventListener('hashchange', applyRouteFromHash);
    window.addEventListener('popstate', applyRouteFromHash);
    return () => {
      window.removeEventListener('hashchange', applyRouteFromHash);
      window.removeEventListener('popstate', applyRouteFromHash);
    };
  }, []);

  // Update URL Hash helper
  const navigateToHash = (page, subTab = null, itemId = null) => {
    let newHash = `#/${page}`;
    if (page === 'escritorio') {
      const tab = subTab || officeTab;
      newHash += `/${tab}`;
      if (itemId) {
        newHash += `/${itemId}`;
      } else if (tab === 'equipe' && activeLawyerId) {
        newHash += `/${activeLawyerId}`;
      } else if (tab === 'areas' && activeServiceId) {
        newHash += `/${activeServiceId}`;
      }
    } else if (page === 'noticias' && itemId) {
      newHash += `/${itemId}`;
    }

    window.location.hash = newHash;
    setCurrentPage(page);
    if (subTab) setOfficeTab(subTab);
    if (page === 'noticias') {
      setSelectedArticleId(itemId);
    } else {
      setSelectedArticleId(null);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleCmsUpdate = () => {
      setCmsLawyers(getStoredLawyers());
      setCmsAreas(getStoredAreas());
      setCmsArticles(getStoredArticles());
      setCmsContact(getStoredContact());
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
        areaCliente: 'Área do Cliente',
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
        subtitle: 'Análises jurídicas estratégicas, decisões recentes e atualizações legislativas.',
        readMore: 'Ler Artigo Integral →',
        backToList: '← Voltar para Todos os Artigos',
        videoLabel: 'Vídeo Explicativo:',
        contactCta: 'Deseja esclarecer dúvidas sobre este tema? Entre em contato com nosso escritório.',
        contactBtn: 'Falar com um Advogado via WhatsApp',
        articles: cmsArticles
      },
      contato: {
        heading: cmsContact.title || 'Fale Conosco',
        companyName: cmsContact.companyName || 'EDUARDO FERRARI ADVOGADOS ASSOCIADOS',
        subtitle: cmsContact.subtitle || 'Agende uma consulta presencial ou remota com nossa equipe de especialistas jurídicos.',
        address: cmsContact.address || 'Al. Tangará, 80, Sala 1, The Point Office, Cotia-SP, CEP 06711-020',
        phone: cmsContact.phone || '+55 (11) 98899-4871',
        email: cmsContact.email || 'contato@zsaa.com.br',
        hours: cmsContact.hours || 'Segunda a Sexta - 09:00 às 18:00',
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
        areaCliente: 'Client Portal',
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
        subtitle: 'Strategic legal insights, recent court decisions, and regulatory updates.',
        readMore: 'Read Full Article →',
        backToList: '← Back to All Articles',
        videoLabel: 'Video Commentary:',
        contactCta: 'Have questions regarding this legal topic? Contact our legal team.',
        contactBtn: 'Talk to an Attorney on WhatsApp',
        articles: cmsArticles
      },
      contato: {
        heading: cmsContact.title || 'Contact Us',
        companyName: cmsContact.companyName || 'EDUARDO FERRARI ATTORNEYS AT LAW',
        subtitle: cmsContact.subtitle || 'Schedule an in-person or remote consultation with our team of legal experts.',
        address: cmsContact.address || 'Al. Tangará, 80, Suite 1, The Point Office, Cotia-SP, Brazil, CEP 06711-020',
        phone: cmsContact.phone || '+55 (11) 98899-4871',
        email: cmsContact.email || 'contato@zsaa.com.br',
        hours: cmsContact.hours || 'Monday to Friday - 09:00 AM to 06:00 PM',
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
    const phoneNumber = (cmsContact && cmsContact.whatsappNumber) ? cmsContact.whatsappNumber.replace(/\D/g, '') : "5511988994871";
    const text = `*${lang === 'pt' ? 'Novo Contato via Site Eduardo Ferrari Advogados' : 'New Contact via Eduardo Ferrari Law Website'}*\n\n` +
                 `👤 *${t.contato.labels.name}:* ${formData.name}\n` +
                 `✉️ *${t.contato.labels.email}:* ${formData.email}\n` +
                 `📞 *${t.contato.labels.phone}:* ${formData.phone}\n\n` +
                 `💬 *${t.contato.labels.message}:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  // Carousel calculation: 3 cards per view on desktop, 1 card step
  const articlesList = t.noticias.articles;
  const cardsPerView = 3;
  const maxSlideIndex = Math.max(0, articlesList.length - cardsPerView);

  const handlePrevArticleSlide = () => {
    setArticleSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextArticleSlide = () => {
    setArticleSlideIndex((prev) => Math.min(maxSlideIndex, prev + 1));
  };

  const handleSelectLawyer = (lawyerId) => {
    setActiveLawyerId(lawyerId);
    window.location.hash = `#/escritorio/equipe/${lawyerId}`;
  };

  const handleSelectArea = (areaId) => {
    setActiveServiceId(areaId);
    window.location.hash = `#/escritorio/areas/${areaId}`;
  };

  const handleOpenArticle = (articleId) => {
    setSelectedArticleId(articleId);
    window.location.hash = `#/noticias/${articleId}`;
  };

  const handleBackToArticlesList = () => {
    setSelectedArticleId(null);
    window.location.hash = `#/noticias`;
  };

  const currentSelectedLawyer = t.escritorio.lawyers.find(l => l.id === activeLawyerId) || t.escritorio.lawyers[0] || null;
  const currentSelectedArea = t.escritorio.areas.find(s => s.id === activeServiceId) || t.escritorio.areas[0] || null;
  const currentReadingArticle = selectedArticleId ? t.noticias.articles.find(a => a.id === selectedArticleId) : null;

  return (
    <div className="home-container">
      {/* Background Overlay */}
      <div className="background-overlay"></div>

      {/* Top Header Section (Floating transparent header) */}
      <header className="home-header">
        <div 
          className="logo-container" 
          onClick={() => navigateToHash('home')} 
          style={{ cursor: 'pointer' }}
          title="Eduardo Ferrari Advocacia - Página Inicial"
        >
          <img 
            src="/image/logo ferrari-escritorio-28-11-25.jpg" 
            alt="Eduardo Ferrari Advocacia" 
            className="site-header-logo-img" 
          />
        </div>

        {/* Desktop Inline Navigation */}
        <nav className="desktop-nav">
          <button 
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`} 
            onClick={() => navigateToHash('home')}
          >
            {t.nav.home}
          </button>
          
          {/* O Escritório with Dropdown Submenu */}
          <div className="nav-dropdown-item">
            <button 
              className={`nav-btn ${currentPage === 'escritorio' ? 'active' : ''}`} 
              onClick={() => navigateToHash('escritorio')}
            >
              {t.nav.escritorio}
              <span className="dropdown-caret">▾</span>
            </button>
            <div className="nav-dropdown-menu">
              <button 
                className={`dropdown-sublink ${currentPage === 'escritorio' && officeTab === 'equipe' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); navigateToHash('escritorio', 'equipe'); }}
              >
                {t.escritorio.equipeTab}
              </button>
              <button 
                className={`dropdown-sublink ${currentPage === 'escritorio' && officeTab === 'areas' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); navigateToHash('escritorio', 'areas'); }}
              >
                {t.escritorio.areasTab}
              </button>
            </div>
          </div>

          <button 
            className={`nav-btn ${currentPage === 'noticias' ? 'active' : ''}`} 
            onClick={() => navigateToHash('noticias')}
          >
            {t.nav.noticias}
          </button>

          {/* 5th Navigation Button: Área do Cliente */}
          <button 
            className={`nav-btn client-nav-btn ${currentPage === 'cliente' ? 'active' : ''}`} 
            onClick={() => navigateToHash('cliente')}
          >
            <span className="client-nav-icon">🔒</span>
            <span>{t.nav.areaCliente}</span>
          </button>

          <button 
            className={`nav-btn ${currentPage === 'contato' ? 'active' : ''}`} 
            onClick={() => navigateToHash('contato')}
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
            onClick={() => navigateToHash('home')}
          >
            {t.nav.home}
          </button>
          
          <div className="drawer-group">
            <button 
              className={`drawer-link ${currentPage === 'escritorio' ? 'active' : ''}`}
              onClick={() => navigateToHash('escritorio')}
            >
              {t.nav.escritorio}
            </button>
            <div className="drawer-sublinks-container">
              <button 
                className={`drawer-subitem ${currentPage === 'escritorio' && officeTab === 'equipe' ? 'active' : ''}`}
                onClick={() => navigateToHash('escritorio', 'equipe')}
              >
                ↳ {t.escritorio.equipeTab}
              </button>
              <button 
                className={`drawer-subitem ${currentPage === 'escritorio' && officeTab === 'areas' ? 'active' : ''}`}
                onClick={() => navigateToHash('escritorio', 'areas')}
              >
                ↳ {t.escritorio.areasTab}
              </button>
            </div>
          </div>

          <button 
            className={`drawer-link ${currentPage === 'noticias' ? 'active' : ''}`}
            onClick={() => navigateToHash('noticias')}
          >
            {t.nav.noticias}
          </button>

          <button 
            className={`drawer-link ${currentPage === 'cliente' ? 'active' : ''}`}
            onClick={() => navigateToHash('cliente')}
          >
            🔒 {t.nav.areaCliente}
          </button>

          <button 
            className={`drawer-link ${currentPage === 'contato' ? 'active' : ''}`}
            onClick={() => navigateToHash('contato')}
          >
            {t.nav.contato}
          </button>

          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(15, 43, 72, 0.15)', paddingTop: '15px' }}>
            <button 
              className="drawer-subitem" 
              style={{ color: '#0f2b48', opacity: 0.9, fontWeight: '700' }}
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
        
        {/* Screen 1: Home Hero (EDUARDO FERRARI) */}
        {currentPage === 'home' && (
          <section className="screen-section home-hero-view">
            <div className="brand-block">
              <div className="hero-logo-wrapper">
                <img 
                  src="/image/logo ferrari-escritorio-28-11-25.jpg" 
                  alt="Eduardo Ferrari Advocacia" 
                  className="hero-main-logo-img" 
                />
              </div>
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

        {/* Screen 2: O Escritório (Sub-tabs: A Equipe | Áreas de Atuação) */}
        {currentPage === 'escritorio' && (
          <section className="screen-section scrollable-view">
            <div className="section-inner-container">
              
              {/* Top Submenu Switcher Tabs */}
              <div className="office-tab-switch-header">
                <div className="office-tab-switch-group">
                  <button
                    className={`office-switcher-btn ${officeTab === 'equipe' ? 'active' : ''}`}
                    onClick={() => navigateToHash('escritorio', 'equipe')}
                  >
                    <span className="switch-bullet"></span>
                    <span>{t.escritorio.equipeTab}</span>
                  </button>
                  <button
                    className={`office-switcher-btn ${officeTab === 'areas' ? 'active' : ''}`}
                    onClick={() => navigateToHash('escritorio', 'areas')}
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
                        onClick={() => handleSelectLawyer(lawyer.id)}
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
                        onClick={() => handleSelectArea(service.id)}
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

        {/* Screen 3: Noticias & Artigos */}
        {currentPage === 'noticias' && (
          <section className="screen-section scrollable-view">
            <div className="section-inner-container">
              
              {/* MODE 1: FULL ARTICLE READER (Shareable URL: #/noticias/art-1) */}
              {currentReadingArticle ? (
                <div className="article-reader-container animate-fade">
                  {/* Back button */}
                  <div className="reader-top-actions">
                    <button 
                      className="reader-back-btn"
                      onClick={handleBackToArticlesList}
                    >
                      {t.noticias.backToList}
                    </button>
                  </div>

                  {/* Article Header */}
                  <div className="reader-header">
                    <span className="reader-category-badge">{currentReadingArticle.category}</span>
                    <h1 className="reader-title">{currentReadingArticle.title}</h1>
                    <div className="reader-meta-bar">
                      <span className="reader-date">📅 {currentReadingArticle.date}</span>
                      {currentReadingArticle.author && (
                        <span className="reader-author">✍️ Por: {currentReadingArticle.author}</span>
                      )}
                    </div>
                  </div>

                  <div className="reader-divider"></div>

                  {/* Optional Video Embed Player */}
                  {currentReadingArticle.videoUrl && (
                    <div className="reader-video-section">
                      <div className="reader-video-header">
                        <span className="video-icon-tag">🎥</span>
                        <span className="video-header-text">{t.noticias.videoLabel}</span>
                      </div>
                      <div className="reader-video-player-frame">
                        <iframe 
                          src={getEmbedVideoUrl(currentReadingArticle.videoUrl)} 
                          title={currentReadingArticle.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          className="reader-iframe"
                        ></iframe>
                      </div>
                    </div>
                  )}

                  {/* Article Body Content */}
                  <div className="reader-body">
                    {Array.isArray(currentReadingArticle.paragraphs) ? (
                      currentReadingArticle.paragraphs.map((paragraph, idx) => (
                        <p key={idx} className="reader-paragraph">{paragraph}</p>
                      ))
                    ) : (
                      <p className="reader-paragraph">{currentReadingArticle.paragraphs}</p>
                    )}
                  </div>

                  {/* Bottom Contact Callout */}
                  <div className="reader-cta-box">
                    <div className="reader-cta-info">
                      <span className="cta-icon">⚖️</span>
                      <p className="cta-text">{t.noticias.contactCta}</p>
                    </div>
                    <button 
                      className="reader-whatsapp-btn"
                      onClick={() => {
                        const phoneNumber = (cmsContact && cmsContact.whatsappNumber) ? cmsContact.whatsappNumber.replace(/\D/g, '') : "5511988994871";
                        const text = `Olá, gostaria de conversar sobre o artigo "${currentReadingArticle.title}" que li no site de Eduardo Ferrari Advogados.`;
                        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`, '_blank');
                      }}
                    >
                      {t.noticias.contactBtn}
                    </button>
                  </div>

                  <div className="reader-bottom-nav">
                    <button 
                      className="reader-back-btn"
                      onClick={handleBackToArticlesList}
                    >
                      {t.noticias.backToList}
                    </button>
                  </div>
                </div>
              ) : (
                /* MODE 2: ARTICLES CAROUSEL LIST */
                <div className="articles-list-view animate-fade">
                  <h2 className="section-heading">{t.noticias.heading}</h2>
                  <div className="section-divider"></div>

                  {/* Carousel Container with Left/Right Navigation Arrows */}
                  <div className="articles-carousel-wrapper">
                    
                    {/* Left Navigation Arrow */}
                    <button 
                      className="carousel-arrow-btn prev-arrow" 
                      onClick={handlePrevArticleSlide}
                      disabled={articleSlideIndex === 0}
                      title="Artigos Anteriores"
                      aria-label="Artigos Anteriores"
                    >
                      ‹
                    </button>

                    {/* Cards Slider Viewport */}
                    <div className="articles-carousel-viewport">
                      <div 
                        className="articles-carousel-track"
                        style={{
                          transform: `translateX(-${articleSlideIndex * (100 / Math.min(articlesList.length, 3))}%)`
                        }}
                      >
                        {articlesList.map((article, index) => (
                          <article key={article.id || index} className="article-card carousel-card animate-fade">
                            
                            {/* Card Top: Category & Video Pill */}
                            <div className="article-card-top">
                              <span className="article-category">{article.category}</span>
                              {article.videoUrl && (
                                <span className="article-video-pill" title="Este artigo inclui vídeo explicativo">
                                  🎥 Vídeo
                                </span>
                              )}
                            </div>

                            {/* Prominent Creation Date Badge */}
                            <div className="article-card-date-badge">
                              <span className="date-badge-icon">📅</span>
                              <span className="date-badge-text">{article.date}</span>
                            </div>

                            <h3 className="article-title">{article.title}</h3>
                            
                            {article.author && (
                              <div className="article-author-row">
                                <span className="author-icon">✍️</span>
                                <span className="article-author-name">{article.author}</span>
                              </div>
                            )}

                            <p className="article-desc">
                              {article.desc || (Array.isArray(article.paragraphs) ? article.paragraphs[0] : '')}
                            </p>
                            
                            <button 
                              className="article-link-btn"
                              onClick={() => handleOpenArticle(article.id)}
                            >
                              {t.noticias.readMore}
                            </button>
                          </article>
                        ))}
                      </div>
                    </div>

                    {/* Right Navigation Arrow */}
                    <button 
                      className="carousel-arrow-btn next-arrow" 
                      onClick={handleNextArticleSlide}
                      disabled={articleSlideIndex >= maxSlideIndex}
                      title="Próximos Artigos"
                      aria-label="Próximos Artigos"
                    >
                      ›
                    </button>
                  </div>

                  {/* Carousel Pagination Dots */}
                  {maxSlideIndex > 0 && (
                    <div className="carousel-dots-container">
                      {Array.from({ length: maxSlideIndex + 1 }).map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          className={`carousel-dot ${articleSlideIndex === dotIdx ? 'active' : ''}`}
                          onClick={() => setArticleSlideIndex(dotIdx)}
                          aria-label={`Slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  )}

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

        {/* Screen 4: Área do Cliente (Process Tracking & Digital Documents Portal) */}
        {currentPage === 'cliente' && (
          <section className="screen-section scrollable-view">
            <div className="section-inner-container">
              <ClientArea 
                onBackToHome={() => navigateToHash('home')} 
                whatsappContactNumber={cmsContact?.whatsappNumber || "5511988994871"}
                lang={lang}
              />
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

        {/* Screen 5: Contato */}
        {currentPage === 'contato' && (
          <section className="screen-section scrollable-view">
            <div className="section-inner-container">
              <h2 className="section-heading">{t.contato.heading}</h2>
              <div className="section-divider"></div>
              <div className="contact-grid">
                <div className="contact-info animate-fade">
                  <h3 className="contact-info-title">{t.contato.companyName}</h3>
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
