import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import {
  getStoredLawyers,
  saveStoredLawyers,
  getStoredAreas,
  saveStoredAreas,
  getStoredArticles,
  saveStoredArticles,
  getStoredContact,
  saveStoredContact,
  resetCmsDefaults,
  getEmbedVideoUrl
} from '../data/cmsData';

export default function Admin({ onNavigateToSite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('ef_admin_logged_in') === 'true';
  });

  const [activeTab, setActiveTab] = useState('escritorio'); // 'escritorio' | 'artigos' | 'contato' | 'dashboard'
  const [subTab, setSubTab] = useState('equipe'); // 'equipe' | 'areas'
  
  const [lawyers, setLawyers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [articles, setArticles] = useState([]);
  const [contact, setContact] = useState({
    title: '',
    companyName: '',
    subtitle: '',
    address: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    hours: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Modals / Editor State for Lawyer
  const [lawyerModalOpen, setLawyerModalOpen] = useState(false);
  const [lawyerModalMode, setLawyerModalMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [editingLawyer, setEditingLawyer] = useState({
    id: '',
    name: '',
    role: '',
    specialty: '',
    image: '',
    paragraphs: '',
    credentials: []
  });
  const [newCredentialInput, setNewCredentialInput] = useState('');

  // Modals / Editor State for Area
  const [areaModalOpen, setAreaModalOpen] = useState(false);
  const [areaModalMode, setAreaModalMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [editingArea, setEditingArea] = useState({
    id: '',
    label: '',
    title: '',
    paragraphs: ''
  });

  // Modals / Editor State for Article
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [articleModalMode, setArticleModalMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [editingArticle, setEditingArticle] = useState({
    id: '',
    title: '',
    category: '',
    date: '',
    author: '',
    desc: '',
    videoUrl: '',
    paragraphs: ''
  });

  // Delete Confirmation Modal
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: '', // 'lawyer' | 'area' | 'article'
    id: '',
    name: ''
  });

  // Toast Notification
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // Load data
  const loadData = () => {
    setLawyers(getStoredLawyers());
    setAreas(getStoredAreas());
    setArticles(getStoredArticles());
    setContact(getStoredContact());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('cms_data_updated', handleUpdate);
    return () => window.removeEventListener('cms_data_updated', handleUpdate);
  }, []);

  // --- LAWYER CRUD ---
  const handleOpenAddLawyer = () => {
    setEditingLawyer({
      id: '',
      name: '',
      role: '',
      specialty: '',
      image: '',
      paragraphs: '',
      credentials: []
    });
    setNewCredentialInput('');
    setLawyerModalMode('add');
    setLawyerModalOpen(true);
  };

  const handleOpenEditLawyer = (lawyer) => {
    setEditingLawyer({
      id: lawyer.id,
      name: lawyer.name,
      role: lawyer.role || '',
      specialty: lawyer.specialty || '',
      image: lawyer.image || '',
      paragraphs: Array.isArray(lawyer.paragraphs) ? lawyer.paragraphs.join('\n\n') : (lawyer.paragraphs || ''),
      credentials: Array.isArray(lawyer.credentials) ? [...lawyer.credentials] : []
    });
    setNewCredentialInput('');
    setLawyerModalMode('edit');
    setLawyerModalOpen(true);
  };

  const handleOpenViewLawyer = (lawyer) => {
    setEditingLawyer({
      id: lawyer.id,
      name: lawyer.name,
      role: lawyer.role || '',
      specialty: lawyer.specialty || '',
      image: lawyer.image || '',
      paragraphs: Array.isArray(lawyer.paragraphs) ? lawyer.paragraphs.join('\n\n') : (lawyer.paragraphs || ''),
      credentials: Array.isArray(lawyer.credentials) ? [...lawyer.credentials] : []
    });
    setLawyerModalMode('view');
    setLawyerModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Aviso: Imagem maior que 2MB. Recomendamos imagens menores para otimizar o carregamento.', 'warning');
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingLawyer(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCredential = () => {
    if (newCredentialInput.trim()) {
      setEditingLawyer(prev => ({
        ...prev,
        credentials: [...prev.credentials, newCredentialInput.trim()]
      }));
      setNewCredentialInput('');
    }
  };

  const handleRemoveCredential = (index) => {
    setEditingLawyer(prev => ({
      ...prev,
      credentials: prev.credentials.filter((_, i) => i !== index)
    }));
  };

  const handleSaveLawyer = (e) => {
    e.preventDefault();
    if (!editingLawyer.name.trim()) {
      showToast('O nome do advogado é obrigatório.', 'error');
      return;
    }

    const initials = editingLawyer.name
      .split(' ')
      .filter(p => !p.toLowerCase().startsWith('dr') && p.length > 0)
      .slice(0, 2)
      .map(p => p[0].toUpperCase())
      .join('') || 'EF';

    const paragraphsArray = editingLawyer.paragraphs
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const lawyerData = {
      id: editingLawyer.id || `lawyer-${Date.now()}`,
      label: editingLawyer.name.toUpperCase(),
      name: editingLawyer.name.trim(),
      role: editingLawyer.role.trim() || 'Advogado(a) Associado(a)',
      specialty: editingLawyer.specialty.trim() || 'Direito Geral',
      image: editingLawyer.image || null,
      initials: initials,
      paragraphs: paragraphsArray.length > 0 ? paragraphsArray : ['Advogado integrante do corpo jurídico de Eduardo Ferrari Advogados.'],
      credentials: editingLawyer.credentials
    };

    let updatedList;
    if (lawyerModalMode === 'add') {
      updatedList = [...lawyers, lawyerData];
      showToast(`Advogado "${lawyerData.name}" adicionado com sucesso!`);
    } else {
      updatedList = lawyers.map(l => (l.id === lawyerData.id ? lawyerData : l));
      showToast(`Advogado "${lawyerData.name}" atualizado com sucesso!`);
    }

    saveStoredLawyers(updatedList);
    setLawyers(updatedList);
    setLawyerModalOpen(false);
  };

  const handleDeleteLawyerConfirm = (id, name) => {
    setDeleteConfirm({
      open: true,
      type: 'lawyer',
      id,
      name
    });
  };

  // --- AREA CRUD ---
  const handleOpenAddArea = () => {
    setEditingArea({
      id: '',
      label: '',
      title: '',
      paragraphs: ''
    });
    setAreaModalMode('add');
    setAreaModalOpen(true);
  };

  const handleOpenEditArea = (area) => {
    setEditingArea({
      id: area.id,
      label: area.label,
      title: area.title,
      paragraphs: Array.isArray(area.paragraphs) ? area.paragraphs.join('\n\n') : (area.paragraphs || '')
    });
    setAreaModalMode('edit');
    setAreaModalOpen(true);
  };

  const handleOpenViewArea = (area) => {
    setEditingArea({
      id: area.id,
      label: area.label,
      title: area.title,
      paragraphs: Array.isArray(area.paragraphs) ? area.paragraphs.join('\n\n') : (area.paragraphs || '')
    });
    setAreaModalMode('view');
    setAreaModalOpen(true);
  };

  const handleSaveArea = (e) => {
    e.preventDefault();
    if (!editingArea.label.trim() || !editingArea.title.trim()) {
      showToast('Nome e título da área são obrigatórios.', 'error');
      return;
    }

    const paragraphsArray = editingArea.paragraphs
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const areaData = {
      id: editingArea.id || `area-${Date.now()}`,
      label: editingArea.label.toUpperCase().trim(),
      title: editingArea.title.trim(),
      paragraphs: paragraphsArray.length > 0 ? paragraphsArray : ['Informações jurídicas especializadas.']
    };

    let updatedList;
    if (areaModalMode === 'add') {
      updatedList = [...areas, areaData];
      showToast(`Área "${areaData.title}" adicionada com sucesso!`);
    } else {
      updatedList = areas.map(a => (a.id === areaData.id ? areaData : a));
      showToast(`Área "${areaData.title}" atualizada com sucesso!`);
    }

    saveStoredAreas(updatedList);
    setAreas(updatedList);
    setAreaModalOpen(false);
  };

  const handleDeleteAreaConfirm = (id, name) => {
    setDeleteConfirm({
      open: true,
      type: 'area',
      id,
      name
    });
  };

  // --- ARTICLE CRUD ---
  const handleOpenAddArticle = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    setEditingArticle({
      id: '',
      title: '',
      category: 'Direito Geral',
      date: formattedDate,
      author: 'Dr. Eduardo Ferrari',
      desc: '',
      videoUrl: '',
      paragraphs: ''
    });
    setArticleModalMode('add');
    setArticleModalOpen(true);
  };

  const handleOpenEditArticle = (article) => {
    setEditingArticle({
      id: article.id,
      title: article.title || '',
      category: article.category || '',
      date: article.date || '',
      author: article.author || '',
      desc: article.desc || '',
      videoUrl: article.videoUrl || '',
      paragraphs: Array.isArray(article.paragraphs) ? article.paragraphs.join('\n\n') : (article.paragraphs || '')
    });
    setArticleModalMode('edit');
    setArticleModalOpen(true);
  };

  const handleOpenViewArticle = (article) => {
    setEditingArticle({
      id: article.id,
      title: article.title || '',
      category: article.category || '',
      date: article.date || '',
      author: article.author || '',
      desc: article.desc || '',
      videoUrl: article.videoUrl || '',
      paragraphs: Array.isArray(article.paragraphs) ? article.paragraphs.join('\n\n') : (article.paragraphs || '')
    });
    setArticleModalMode('view');
    setArticleModalOpen(true);
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!editingArticle.title.trim()) {
      showToast('O título do artigo é obrigatório.', 'error');
      return;
    }

    const paragraphsArray = editingArticle.paragraphs
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const articleData = {
      id: editingArticle.id || `art-${Date.now()}`,
      title: editingArticle.title.trim(),
      category: editingArticle.category.trim() || 'Direito Geral',
      date: editingArticle.date.trim() || '2026',
      author: editingArticle.author.trim() || 'Eduardo Ferrari Advogados',
      desc: editingArticle.desc.trim() || (paragraphsArray[0] ? paragraphsArray[0].slice(0, 160) + '...' : 'Confira a análise jurídica completa.'),
      videoUrl: editingArticle.videoUrl.trim() || '',
      paragraphs: paragraphsArray.length > 0 ? paragraphsArray : [editingArticle.desc || 'Artigo jurídico em elaboração.']
    };

    let updatedList;
    if (articleModalMode === 'add') {
      updatedList = [articleData, ...articles];
      showToast(`Artigo "${articleData.title}" publicado com sucesso!`);
    } else {
      updatedList = articles.map(a => (a.id === articleData.id ? articleData : a));
      showToast(`Artigo "${articleData.title}" atualizado com sucesso!`);
    }

    saveStoredArticles(updatedList);
    setArticles(updatedList);
    setArticleModalOpen(false);
  };

  const handleDeleteArticleConfirm = (id, name) => {
    setDeleteConfirm({
      open: true,
      type: 'article',
      id,
      name
    });
  };

  // --- CONTACT SAVE ---
  const handleSaveContact = (e) => {
    e.preventDefault();
    saveStoredContact(contact);
    showToast('Informações de contato e atendimento atualizadas com sucesso!');
  };

  const handleContactChange = (field, value) => {
    setContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Execute Delete
  const handleExecuteDelete = () => {
    if (deleteConfirm.type === 'lawyer') {
      const updated = lawyers.filter(l => l.id !== deleteConfirm.id);
      saveStoredLawyers(updated);
      setLawyers(updated);
      showToast(`Advogado "${deleteConfirm.name}" excluído.`);
    } else if (deleteConfirm.type === 'area') {
      const updated = areas.filter(a => a.id !== deleteConfirm.id);
      saveStoredAreas(updated);
      setAreas(updated);
      showToast(`Área "${deleteConfirm.name}" excluída.`);
    } else if (deleteConfirm.type === 'article') {
      const updated = articles.filter(a => a.id !== deleteConfirm.id);
      saveStoredArticles(updated);
      setArticles(updated);
      showToast(`Artigo "${deleteConfirm.name}" excluído.`);
    }
    setDeleteConfirm({ open: false, type: '', id: '', name: '' });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Tem certeza que deseja restaurar o conteúdo original padrão do site (Equipe, Áreas, Artigos e Contato)? Todas as alterações manuais serão resetadas.')) {
      resetCmsDefaults();
      loadData();
      showToast('Conteúdo do site restaurado para o padrão com sucesso!');
    }
  };

  // Filtered lists
  const filteredLawyers = lawyers.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.role && l.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (l.specialty && l.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredAreas = areas.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.author && a.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const previewVideoEmbed = getEmbedVideoUrl(editingArticle.videoUrl);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('ef_admin_logged_in', 'true');
    setIsAuthenticated(true);
    showToast('Login realizado com sucesso! Bem-vindo ao Painel CMS.');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ef_admin_logged_in');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess}
        onNavigateToSite={onNavigateToSite}
      />
    );
  }

  return (
    <div className="admin-root">
      {/* Toast */}
      {toast.show && (
        <div className={`admin-toast ${toast.type} animate-fade`}>
          <span>{toast.type === 'success' ? '✅' : toast.type === 'warning' ? '⚠️' : '❌'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="admin-header">
        <div className="admin-brand">
          <img 
            src="/image/logo ferrari-escritorio-28-11-25.jpg" 
            alt="Eduardo Ferrari Advocacia" 
            className="admin-header-logo-img" 
          />
          <div className="admin-brand-info">
            <span className="admin-brand-badge">PAINEL CMS ADMINISTRATIVO</span>
          </div>
        </div>

        <div className="admin-header-actions">
          <button 
            className="admin-btn-secondary" 
            onClick={handleResetDefaults}
            title="Restaura os dados originais padrão do site"
          >
            ↺ Restaurar Padrões
          </button>
          
          <button 
            className="admin-btn-primary"
            onClick={onNavigateToSite}
          >
            🌐 Ver Site Online
          </button>

          <button 
            className="admin-btn-logout"
            onClick={handleLogout}
            title="Encerrar Sessão do Painel"
          >
            🚪 Sair
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="admin-body">
        {/* Sidebar Navigation */}
        <aside className="admin-sidebar">
          <div className="admin-nav-section-title">GERENCIADOR DE CONTEÚDO</div>
          
          <button 
            className={`admin-nav-btn ${activeTab === 'escritorio' ? 'active' : ''}`}
            onClick={() => { setActiveTab('escritorio'); setSearchTerm(''); }}
          >
            <span className="nav-icon">📁</span>
            <span>O Escritório</span>
          </button>

          <button 
            className={`admin-nav-btn ${activeTab === 'artigos' ? 'active' : ''}`}
            onClick={() => { setActiveTab('artigos'); setSearchTerm(''); }}
          >
            <span className="nav-icon">📰</span>
            <span>Notícias & Artigos</span>
          </button>

          <button 
            className={`admin-nav-btn ${activeTab === 'contato' ? 'active' : ''}`}
            onClick={() => { setActiveTab('contato'); setSearchTerm(''); }}
          >
            <span className="nav-icon">📞</span>
            <span>Contato & Atendimento</span>
          </button>

          <button 
            className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setSearchTerm(''); }}
          >
            <span className="nav-icon">📊</span>
            <span>Visão Geral</span>
          </button>

          <div className="admin-sidebar-footer">
            <div className="storage-status">
              <span className="status-dot"></span>
              <span>Armazenamento: LocalStorage Ativo</span>
            </div>
            <div className="admin-version">CMS v1.4 • Eduardo Ferrari</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="admin-main">
          
          {/* TAB 1: O ESCRITÓRIO */}
          {activeTab === 'escritorio' && (
            <div className="admin-section-container animate-fade">
              {/* Top Sub-tabs Switcher */}
              <div className="admin-subtabs-bar">
                <div className="admin-subtabs-group">
                  <button 
                    className={`admin-subtab-btn ${subTab === 'equipe' ? 'active' : ''}`}
                    onClick={() => { setSubTab('equipe'); setSearchTerm(''); }}
                  >
                    👥 A Equipe ({lawyers.length})
                  </button>
                  <button 
                    className={`admin-subtab-btn ${subTab === 'areas' ? 'active' : ''}`}
                    onClick={() => { setSubTab('areas'); setSearchTerm(''); }}
                  >
                    ⚖️ Áreas de Atuação ({areas.length})
                  </button>
                </div>

                {/* Subtab Action Button */}
                <div className="admin-subtab-actions">
                  {subTab === 'equipe' ? (
                    <button className="admin-btn-accent" onClick={handleOpenAddLawyer}>
                      + Adicionar Advogado
                    </button>
                  ) : (
                    <button className="admin-btn-accent" onClick={handleOpenAddArea}>
                      + Adicionar Área
                    </button>
                  )}
                </div>
              </div>

              {/* Search Bar */}
              <div className="admin-search-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  className="admin-search-input"
                  placeholder={subTab === 'equipe' ? "Pesquisar por nome, cargo ou especialidade..." : "Pesquisar por área de atuação..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="search-clear-btn" onClick={() => setSearchTerm('')}>✕</button>
                )}
              </div>

              {/* Subtab 1: A Equipe */}
              {subTab === 'equipe' && (
                <div className="admin-items-list">
                  {filteredLawyers.length === 0 ? (
                    <div className="admin-empty-state">
                      <p>Nenhum advogado encontrado com o termo "{searchTerm}".</p>
                      <button className="admin-btn-secondary" onClick={handleOpenAddLawyer}>
                        + Cadastrar Novo Advogado
                      </button>
                    </div>
                  ) : (
                    <div className="admin-cards-grid">
                      {filteredLawyers.map((lawyer) => (
                        <div key={lawyer.id} className="admin-card">
                          <div className="admin-card-header">
                            <div className="admin-lawyer-avatar-thumb">
                              {lawyer.image ? (
                                <img src={lawyer.image} alt={lawyer.name} className="thumb-img" />
                              ) : (
                                <div className="thumb-placeholder">{lawyer.initials || 'EF'}</div>
                              )}
                            </div>
                            <div className="admin-card-info">
                              <h3 className="admin-card-title">{lawyer.name}</h3>
                              <span className="admin-card-role">{lawyer.role}</span>
                              <span className="admin-card-specialty">{lawyer.specialty}</span>
                            </div>
                          </div>

                          <div className="admin-card-preview-text">
                            {Array.isArray(lawyer.paragraphs) && lawyer.paragraphs.length > 0 
                              ? lawyer.paragraphs[0].slice(0, 140) + '...'
                              : 'Sem biografia cadastrada.'}
                          </div>

                          <div className="admin-card-badges">
                            <span className="admin-badge">
                              📄 {Array.isArray(lawyer.paragraphs) ? lawyer.paragraphs.length : 0} parágrafos
                            </span>
                            <span className="admin-badge">
                              🎓 {Array.isArray(lawyer.credentials) ? lawyer.credentials.length : 0} qualificações
                            </span>
                          </div>

                          <div className="admin-card-actions">
                            <button 
                              className="card-action-btn view-btn"
                              onClick={() => handleOpenViewLawyer(lawyer)}
                              title="Consultar / Visualizar"
                            >
                              👁️ Consultar
                            </button>
                            <button 
                              className="card-action-btn edit-btn"
                              onClick={() => handleOpenEditLawyer(lawyer)}
                              title="Editar Informações"
                            >
                              ✏️ Editar
                            </button>
                            <button 
                              className="card-action-btn delete-btn"
                              onClick={() => handleDeleteLawyerConfirm(lawyer.id, lawyer.name)}
                              title="Excluir Advogado"
                            >
                              🗑️ Excluir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Subtab 2: Áreas de Atuação */}
              {subTab === 'areas' && (
                <div className="admin-items-list">
                  {filteredAreas.length === 0 ? (
                    <div className="admin-empty-state">
                      <p>Nenhuma área de atuação encontrada.</p>
                      <button className="admin-btn-secondary" onClick={handleOpenAddArea}>
                        + Cadastrar Nova Área
                      </button>
                    </div>
                  ) : (
                    <div className="admin-cards-grid">
                      {filteredAreas.map((area) => (
                        <div key={area.id} className="admin-card">
                          <div className="admin-card-header">
                            <div className="area-icon-thumb">⚖️</div>
                            <div className="admin-card-info">
                              <span className="admin-card-tag">{area.label}</span>
                              <h3 className="admin-card-title">{area.title}</h3>
                            </div>
                          </div>

                          <div className="admin-card-preview-text">
                            {Array.isArray(area.paragraphs) && area.paragraphs.length > 0 
                              ? area.paragraphs[0].slice(0, 150) + '...'
                              : 'Sem conteúdo cadastrado.'}
                          </div>

                          <div className="admin-card-badges">
                            <span className="admin-badge">
                              📄 {Array.isArray(area.paragraphs) ? area.paragraphs.length : 0} parágrafos
                            </span>
                          </div>

                          <div className="admin-card-actions">
                            <button 
                              className="card-action-btn view-btn"
                              onClick={() => handleOpenViewArea(area)}
                              title="Consultar"
                            >
                              👁️ Consultar
                            </button>
                            <button 
                              className="card-action-btn edit-btn"
                              onClick={() => handleOpenEditArea(area)}
                              title="Editar"
                            >
                              ✏️ Editar
                            </button>
                            <button 
                              className="card-action-btn delete-btn"
                              onClick={() => handleDeleteAreaConfirm(area.id, area.title)}
                              title="Excluir"
                            >
                              🗑️ Excluir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: NOTÍCIAS & ARTIGOS */}
          {activeTab === 'artigos' && (
            <div className="admin-section-container animate-fade">
              <div className="admin-subtabs-bar">
                <div className="admin-section-header-title">
                  <h2 className="admin-sub-heading">Artigos, Notícias & Pareceres Jurídicos</h2>
                  <span className="admin-sub-count">{articles.length} artigos cadastrados</span>
                </div>

                <div className="admin-subtab-actions">
                  <button className="admin-btn-accent" onClick={handleOpenAddArticle}>
                    + Publicar Novo Artigo
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="admin-search-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  className="admin-search-input"
                  placeholder="Pesquisar artigos por título, categoria ou autor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="search-clear-btn" onClick={() => setSearchTerm('')}>✕</button>
                )}
              </div>

              {/* Articles Grid */}
              <div className="admin-items-list">
                {filteredArticles.length === 0 ? (
                  <div className="admin-empty-state">
                    <p>Nenhum artigo encontrado com o termo "{searchTerm}".</p>
                    <button className="admin-btn-secondary" onClick={handleOpenAddArticle}>
                      + Publicar Novo Artigo
                    </button>
                  </div>
                ) : (
                  <div className="admin-cards-grid">
                    {filteredArticles.map((article) => (
                      <div key={article.id} className="admin-card">
                        <div className="admin-card-header">
                          <div className="article-icon-thumb">
                            {article.videoUrl ? '🎥' : '📄'}
                          </div>
                          <div className="admin-card-info">
                            <span className="admin-card-tag">{article.category}</span>
                            <h3 className="admin-card-title">{article.title}</h3>
                          </div>
                        </div>

                        <div className="admin-article-meta-row">
                          <span className="meta-date">📅 {article.date}</span>
                          {article.author && <span className="meta-author">✍️ {article.author}</span>}
                        </div>

                        <div className="admin-card-preview-text">
                          {article.desc || (Array.isArray(article.paragraphs) ? article.paragraphs[0] : '')}
                        </div>

                        <div className="admin-card-badges">
                          {article.videoUrl ? (
                            <span className="admin-badge video-badge">
                              🎥 Vídeo Anexado
                            </span>
                          ) : (
                            <span className="admin-badge text-badge">
                              📝 Leitura em Texto
                            </span>
                          )}
                          <span className="admin-badge">
                            📄 {Array.isArray(article.paragraphs) ? article.paragraphs.length : 1} parágrafos
                          </span>
                        </div>

                        <div className="admin-card-actions">
                          <button 
                            className="card-action-btn view-btn"
                            onClick={() => handleOpenViewArticle(article)}
                            title="Consultar / Visualizar Íntegra"
                          >
                            👁️ Consultar
                          </button>
                          <button 
                            className="card-action-btn edit-btn"
                            onClick={() => handleOpenEditArticle(article)}
                            title="Editar Artigo"
                          >
                            ✏️ Editar
                          </button>
                          <button 
                            className="card-action-btn delete-btn"
                            onClick={() => handleDeleteArticleConfirm(article.id, article.title)}
                            title="Excluir Artigo"
                          >
                            🗑️ Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CONTATO & ATENDIMENTO (NEW TAB!) */}
          {activeTab === 'contato' && (
            <div className="admin-section-container animate-fade">
              <div className="admin-subtabs-bar">
                <div className="admin-section-header-title">
                  <h2 className="admin-sub-heading">Configurações de Contato & Atendimento</h2>
                  <span className="admin-sub-count">Informações de contato e WhatsApp do escritório</span>
                </div>
              </div>

              <div className="admin-contact-editor-layout">
                {/* Contact Form Form */}
                <form onSubmit={handleSaveContact} className="admin-contact-form-box">
                  <h3 className="editor-card-title">📝 Dados da Empresa & Canais de Atendimento</h3>
                  
                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label className="admin-form-label" htmlFor="contact-title">Título da Seção *</label>
                      <input 
                        id="contact-title"
                        type="text" 
                        className="admin-input" 
                        value={contact.title}
                        onChange={(e) => handleContactChange('title', e.target.value)}
                        placeholder="Ex: Fale Conosco"
                        required
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="admin-form-label" htmlFor="contact-company">Nome / Razão Social *</label>
                      <input 
                        id="contact-company"
                        type="text" 
                        className="admin-input" 
                        value={contact.companyName}
                        onChange={(e) => handleContactChange('companyName', e.target.value)}
                        placeholder="Ex: EDUARDO FERRARI ADVOGADOS ASSOCIADOS"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="admin-form-label" htmlFor="contact-subtitle">Subtítulo / Mensagem de Acolhimento</label>
                    <input 
                      id="contact-subtitle"
                      type="text" 
                      className="admin-input" 
                      value={contact.subtitle}
                      onChange={(e) => handleContactChange('subtitle', e.target.value)}
                      placeholder="Ex: Agende uma consulta presencial ou remota com nossa equipe de especialistas jurídicos."
                    />
                  </div>

                  <div className="form-group">
                    <label className="admin-form-label" htmlFor="contact-address">📍 Endereço Completo</label>
                    <input 
                      id="contact-address"
                      type="text" 
                      className="admin-input" 
                      value={contact.address}
                      onChange={(e) => handleContactChange('address', e.target.value)}
                      placeholder="Ex: Al. Tangará, 80, Sala 1, The Point Office, Cotia-SP, CEP 06711-020"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label className="admin-form-label" htmlFor="contact-phone">📞 Telefone Comercial (Exibição)</label>
                      <input 
                        id="contact-phone"
                        type="text" 
                        className="admin-input" 
                        value={contact.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                        placeholder="Ex: +55 (11) 98899-4871"
                        required
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="admin-form-label" htmlFor="contact-whatsapp">
                        🟢 WhatsApp (Apenas Números com DDD)
                      </label>
                      <input 
                        id="contact-whatsapp"
                        type="text" 
                        className="admin-input" 
                        value={contact.whatsappNumber}
                        onChange={(e) => handleContactChange('whatsappNumber', e.target.value.replace(/\D/g, ''))}
                        placeholder="Ex: 5511988994871"
                        required
                      />
                      <span className="input-helper-text">Número que receberá as mensagens do formulário do site.</span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label className="admin-form-label" htmlFor="contact-email">✉️ E-mail de Contato</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        className="admin-input" 
                        value={contact.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        placeholder="Ex: contato@zsaa.com.br"
                        required
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="admin-form-label" htmlFor="contact-hours">🕒 Horário de Atendimento</label>
                      <input 
                        id="contact-hours"
                        type="text" 
                        className="admin-input" 
                        value={contact.hours}
                        onChange={(e) => handleContactChange('hours', e.target.value)}
                        placeholder="Ex: Segunda a Sexta - 09:00 às 18:00"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-actions">
                    <button type="submit" className="admin-btn-accent">
                      💾 Salvar Informações de Contato
                    </button>
                  </div>
                </form>

                {/* Real-time Preview Box */}
                <div className="admin-contact-preview-box">
                  <h3 className="preview-box-title">👁️ Visualização em Tempo Real no Site</h3>
                  <div className="site-preview-card">
                    <h4 className="preview-heading">{contact.title || 'Fale Conosco'}</h4>
                    <div className="preview-divider"></div>
                    <h5 className="preview-company">{contact.companyName || 'EDUARDO FERRARI ADVOGADOS'}</h5>
                    <p className="preview-subtitle">{contact.subtitle}</p>

                    <div className="preview-details-list">
                      <div className="preview-detail-item">
                        <span className="p-icon">📍</span>
                        <span>{contact.address || 'Endereço não informado'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="p-icon">📞</span>
                        <span>{contact.phone || 'Telefone não informado'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="p-icon">✉️</span>
                        <span>{contact.email || 'E-mail não informado'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="p-icon">🕒</span>
                        <span>{contact.hours || 'Horário não informado'}</span>
                      </div>
                      <div className="preview-detail-item whatsapp-preview">
                        <span className="p-icon">🟢</span>
                        <span>Envio WhatsApp: <strong>{contact.whatsappNumber || 'Não configurado'}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="admin-dashboard-view animate-fade">
              <h2 className="admin-view-title">Resumo do Sistema CMS</h2>
              <div className="dashboard-stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-number">{lawyers.length}</div>
                  <div className="stat-label">Advogados na Equipe</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⚖️</div>
                  <div className="stat-number">{areas.length}</div>
                  <div className="stat-label">Áreas de Atuação</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📰</div>
                  <div className="stat-number">{articles.length}</div>
                  <div className="stat-label">Notícias & Artigos</div>
                </div>
              </div>

              <div className="dashboard-instructions-card">
                <h3>💡 Como gerenciar o conteúdo do site</h3>
                <ul>
                  <li><strong>O Escritório:</strong> Gerencie os membros da equipe jurídica (com fotos, qualificações e biografias) e as áreas de atuação prática.</li>
                  <li><strong>Notícias & Artigos:</strong> Publique novos artigos com data, categoria, autor e URL de vídeo (YouTube, Vimeo) para que os clientes assistam e leiam o conteúdo integral.</li>
                  <li><strong>Contato & Atendimento:</strong> Atualize endereço, e-mail, telefone e o número de WhatsApp que recebe os formulários de contato do site.</li>
                  <li><strong>Restaurar Padrões:</strong> Use o botão no topo para restaurar as demonstrações originais sempre que necessário.</li>
                </ul>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- LAWYER FORM MODAL (Add / Edit / View) --- */}
      {lawyerModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setLawyerModalOpen(false)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>
                {lawyerModalMode === 'add' && '➕ Adicionar Novo Advogado à Equipe'}
                {lawyerModalMode === 'edit' && `✏️ Editar Advogado: ${editingLawyer.name}`}
                {lawyerModalMode === 'view' && `👁️ Ficha do Advogado: ${editingLawyer.name}`}
              </h3>
              <button className="modal-close-btn" onClick={() => setLawyerModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveLawyer} className="admin-modal-form">
              <div className="admin-modal-body">
                
                {/* 1. Photo / Avatar Section */}
                <div className="form-section photo-section">
                  <label className="admin-form-label">1. Foto do Advogado</label>
                  <div className="avatar-uploader-container">
                    <div className="avatar-preview-box">
                      {editingLawyer.image ? (
                        <img src={editingLawyer.image} alt="Preview" className="avatar-preview-img" />
                      ) : (
                        <div className="avatar-preview-placeholder">
                          {editingLawyer.name 
                            ? editingLawyer.name.split(' ').slice(0, 2).map(p => p[0]).join('')
                            : 'FOTO'}
                        </div>
                      )}
                    </div>
                    {lawyerModalMode !== 'view' && (
                      <div className="avatar-uploader-controls">
                        <label className="upload-file-btn">
                          📁 Carregar Foto do Computador
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            style={{ display: 'none' }}
                          />
                        </label>
                        {editingLawyer.image && (
                          <button 
                            type="button" 
                            className="remove-photo-btn"
                            onClick={() => setEditingLawyer(prev => ({ ...prev, image: '' }))}
                          >
                            Remover Foto
                          </button>
                        )}
                        <span className="avatar-uploader-tip">Formatos aceitos: PNG, JPG, WEBP.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Nome, Cargo & Especialidade */}
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="admin-form-label" htmlFor="lawyer-name">2. Nome Completo *</label>
                    <input 
                      id="lawyer-name"
                      type="text" 
                      className="admin-input" 
                      placeholder="Ex: Dr. Carlos Simonacci"
                      value={editingLawyer.name}
                      onChange={(e) => setEditingLawyer(prev => ({ ...prev, name: e.target.value }))}
                      disabled={lawyerModalMode === 'view'}
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label className="admin-form-label" htmlFor="lawyer-role">Cargo / Registro OAB</label>
                    <input 
                      id="lawyer-role"
                      type="text" 
                      className="admin-input" 
                      placeholder="Ex: Sócio Coordenador | OAB/SP 123.456"
                      value={editingLawyer.role}
                      onChange={(e) => setEditingLawyer(prev => ({ ...prev, role: e.target.value }))}
                      disabled={lawyerModalMode === 'view'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="admin-form-label" htmlFor="lawyer-specialty">Áreas de Especialização Principal</label>
                  <input 
                    id="lawyer-specialty"
                    type="text" 
                    className="admin-input" 
                    placeholder="Ex: Direito Imobiliário, Regularização Fundiária e Contratos"
                    value={editingLawyer.specialty}
                    onChange={(e) => setEditingLawyer(prev => ({ ...prev, specialty: e.target.value }))}
                    disabled={lawyerModalMode === 'view'}
                  />
                </div>

                {/* 3. Texto / Biografia */}
                <div className="form-group">
                  <label className="admin-form-label" htmlFor="lawyer-paragraphs">
                    3. Texto / Biografia & Resumo Curricular (Dê 2 "Enter" para separar parágrafos) *
                  </label>
                  <textarea 
                    id="lawyer-paragraphs"
                    className="admin-textarea" 
                    rows="6"
                    placeholder="Digite a biografia do advogado. Separe múltiplos parágrafos com uma linha em branco."
                    value={editingLawyer.paragraphs}
                    onChange={(e) => setEditingLawyer(prev => ({ ...prev, paragraphs: e.target.value }))}
                    disabled={lawyerModalMode === 'view'}
                    required
                  ></textarea>
                </div>

                {/* 4. Formação e Qualificações */}
                <div className="form-group">
                  <label className="admin-form-label">4. Formação Acadêmica e Qualificações</label>
                  
                  {lawyerModalMode !== 'view' && (
                    <div className="credentials-add-row">
                      <input 
                        type="text" 
                        className="admin-input"
                        placeholder="Ex: Especialista em Direito Empresarial - FGV Direito SP"
                        value={newCredentialInput}
                        onChange={(e) => setNewCredentialInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCredential();
                          }
                        }}
                      />
                      <button 
                        type="button" 
                        className="admin-btn-secondary"
                        onClick={handleAddCredential}
                      >
                        + Adicionar Item
                      </button>
                    </div>
                  )}

                  <ul className="admin-credentials-list">
                    {editingLawyer.credentials.map((cred, idx) => (
                      <li key={idx} className="admin-credential-item">
                        <span className="cred-bullet">◆</span>
                        <span className="cred-text">{cred}</span>
                        {lawyerModalMode !== 'view' && (
                          <button 
                            type="button" 
                            className="cred-remove-btn" 
                            onClick={() => handleRemoveCredential(idx)}
                            title="Remover qualificação"
                          >
                            ✕
                          </button>
                        )}
                      </li>
                    ))}
                    {editingLawyer.credentials.length === 0 && (
                      <li className="no-credentials-notice">Nenhuma formação cadastrada ainda.</li>
                    )}
                  </ul>
                </div>

              </div>

              <div className="admin-modal-footer">
                {lawyerModalMode === 'view' ? (
                  <button 
                    type="button" 
                    className="admin-btn-primary" 
                    onClick={() => setLawyerModalMode('edit')}
                  >
                    ✏️ Ir para Edição
                  </button>
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="admin-btn-secondary" 
                      onClick={() => setLawyerModalOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="admin-btn-accent">
                      💾 Salvar Advogado
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- AREA FORM MODAL (Add / Edit / View) --- */}
      {areaModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setAreaModalOpen(false)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>
                {areaModalMode === 'add' && '➕ Adicionar Nova Área de Atuação'}
                {areaModalMode === 'edit' && `✏️ Editar Área: ${editingArea.title}`}
                {areaModalMode === 'view' && `👁️ Detalhes da Área: ${editingArea.title}`}
              </h3>
              <button className="modal-close-btn" onClick={() => setAreaModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveArea} className="admin-modal-form">
              <div className="admin-modal-body">
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="admin-form-label" htmlFor="area-label">Nome no Botão Lateral (Letras Maiúsculas) *</label>
                    <input 
                      id="area-label"
                      type="text" 
                      className="admin-input" 
                      placeholder="Ex: DIREITO TRIBUTÁRIO"
                      value={editingArea.label}
                      onChange={(e) => setEditingArea(prev => ({ ...prev, label: e.target.value }))}
                      disabled={areaModalMode === 'view'}
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label className="admin-form-label" htmlFor="area-title">Título Principal da Área *</label>
                    <input 
                      id="area-title"
                      type="text" 
                      className="admin-input" 
                      placeholder="Ex: Direito Tributário e Planejamento Fiscal"
                      value={editingArea.title}
                      onChange={(e) => setEditingArea(prev => ({ ...prev, title: e.target.value }))}
                      disabled={areaModalMode === 'view'}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="admin-form-label" htmlFor="area-paragraphs">
                    Texto Descritivo / Parágrafos (Separe parágrafos com uma linha em branco) *
                  </label>
                  <textarea 
                    id="area-paragraphs"
                    className="admin-textarea" 
                    rows="8"
                    placeholder="Descreva a atuação do escritório nesta área de forma detalhada..."
                    value={editingArea.paragraphs}
                    onChange={(e) => setEditingArea(prev => ({ ...prev, paragraphs: e.target.value }))}
                    disabled={areaModalMode === 'view'}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="admin-modal-footer">
                {areaModalMode === 'view' ? (
                  <button 
                    type="button" 
                    className="admin-btn-primary" 
                    onClick={() => setAreaModalMode('edit')}
                  >
                    ✏️ Ir para Edição
                  </button>
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="admin-btn-secondary" 
                      onClick={() => setAreaModalOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="admin-btn-accent">
                      💾 Salvar Área
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ARTICLE FORM MODAL (Add / Edit / View with Live Video Preview) --- */}
      {articleModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setArticleModalOpen(false)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>
                {articleModalMode === 'add' && '➕ Publicar Novo Artigo / Notícia'}
                {articleModalMode === 'edit' && `✏️ Editar Artigo: ${editingArticle.title}`}
                {articleModalMode === 'view' && `👁️ Visualizar Artigo: ${editingArticle.title}`}
              </h3>
              <button className="modal-close-btn" onClick={() => setArticleModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveArticle} className="admin-modal-form">
              <div className="admin-modal-body">
                
                {/* Title */}
                <div className="form-group">
                  <label className="admin-form-label" htmlFor="art-title">Título do Artigo / Notícia *</label>
                  <input 
                    id="art-title"
                    type="text" 
                    className="admin-input" 
                    placeholder="Ex: Planejamento Sucessório Familiar em 2026: Estratégias e Blindagem"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev, title: e.target.value }))}
                    disabled={articleModalMode === 'view'}
                    required
                  />
                </div>

                {/* Category, Date & Author */}
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="admin-form-label" htmlFor="art-category">Categoria / Área *</label>
                    <input 
                      id="art-category"
                      type="text" 
                      className="admin-input" 
                      placeholder="Ex: Direito de Família e Sucessões"
                      value={editingArticle.category}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev, category: e.target.value }))}
                      disabled={articleModalMode === 'view'}
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label className="admin-form-label" htmlFor="art-date">Data de Publicação</label>
                    <input 
                      id="art-date"
                      type="text" 
                      className="admin-input" 
                      placeholder="Ex: 15 de Junho, 2026"
                      value={editingArticle.date}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev, date: e.target.value }))}
                      disabled={articleModalMode === 'view'}
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label className="admin-form-label" htmlFor="art-author">Autor / Advogado(a)</label>
                    <input 
                      id="art-author"
                      type="text" 
                      className="admin-input" 
                      placeholder="Ex: Dr. Eduardo Ferrari"
                      value={editingArticle.author}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev, author: e.target.value }))}
                      disabled={articleModalMode === 'view'}
                    />
                  </div>
                </div>

                {/* Video URL & Live Player Preview */}
                <div className="form-group video-input-group">
                  <label className="admin-form-label" htmlFor="art-video">
                    🎥 URL do Vídeo (Opcional - YouTube, Vimeo ou link de vídeo)
                  </label>
                  <input 
                    id="art-video"
                    type="url" 
                    className="admin-input" 
                    placeholder="Ex: https://www.youtube.com/watch?v=... ou deixe vazio para artigo sem vídeo"
                    value={editingArticle.videoUrl}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev, videoUrl: e.target.value }))}
                    disabled={articleModalMode === 'view'}
                  />
                  
                  {previewVideoEmbed && (
                    <div className="video-preview-container animate-fade">
                      <div className="video-preview-label">📺 Pré-visualização do Reprodutor de Vídeo:</div>
                      <div className="video-iframe-wrapper">
                        <iframe 
                          src={previewVideoEmbed} 
                          title="Video Preview"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>

                {/* Short Excerpt */}
                <div className="form-group">
                  <label className="admin-form-label" htmlFor="art-desc">
                    Resumo Curto (Exibido nos cards do site)
                  </label>
                  <input 
                    id="art-desc"
                    type="text" 
                    className="admin-input" 
                    placeholder="Uma breve introdução sobre o artigo para atrair o leitor..."
                    value={editingArticle.desc}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev, desc: e.target.value }))}
                    disabled={articleModalMode === 'view'}
                  />
                </div>

                {/* Full Article Text */}
                <div className="form-group">
                  <label className="admin-form-label" htmlFor="art-paragraphs">
                    Texto Integral do Artigo (Separe múltiplos parágrafos com uma linha em branco) *
                  </label>
                  <textarea 
                    id="art-paragraphs"
                    className="admin-textarea" 
                    rows="8"
                    placeholder="Escreva ou cole o artigo completo aqui. Separe cada parágrafo com 2 Enters..."
                    value={editingArticle.paragraphs}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev, paragraphs: e.target.value }))}
                    disabled={articleModalMode === 'view'}
                    required
                  ></textarea>
                </div>

              </div>

              <div className="admin-modal-footer">
                {articleModalMode === 'view' ? (
                  <button 
                    type="button" 
                    className="admin-btn-primary" 
                    onClick={() => setArticleModalMode('edit')}
                  >
                    ✏️ Ir para Edição
                  </button>
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="admin-btn-secondary" 
                      onClick={() => setArticleModalOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="admin-btn-accent">
                      💾 Salvar Artigo
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteConfirm.open && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirm({ open: false, type: '', id: '', name: '' })}>
          <div className="admin-modal-window modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header delete-header">
              <h3>⚠️ Confirmar Exclusão</h3>
              <button className="modal-close-btn" onClick={() => setDeleteConfirm({ open: false, type: '', id: '', name: '' })}>✕</button>
            </div>
            <div className="admin-modal-body">
              <p className="delete-confirm-text">
                Tem certeza que deseja excluir <strong>"{deleteConfirm.name}"</strong>?
              </p>
              <p className="delete-confirm-sub">Esta ação removerá este item imediatamente do site.</p>
            </div>
            <div className="admin-modal-footer">
              <button 
                type="button" 
                className="admin-btn-secondary"
                onClick={() => setDeleteConfirm({ open: false, type: '', id: '', name: '' })}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="admin-btn-danger"
                onClick={handleExecuteDelete}
              >
                🗑️ Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
