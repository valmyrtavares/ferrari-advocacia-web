import React, { useState, useEffect } from 'react';
import {
  getStoredLawyers,
  saveStoredLawyers,
  getStoredAreas,
  saveStoredAreas,
  resetCmsDefaults
} from '../data/cmsData';

export default function Admin({ onNavigateToSite }) {
  const [activeTab, setActiveTab] = useState('escritorio'); // 'escritorio' | 'dashboard'
  const [subTab, setSubTab] = useState('equipe'); // 'equipe' | 'areas'
  
  const [lawyers, setLawyers] = useState([]);
  const [areas, setAreas] = useState([]);
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

  // Delete Confirmation Modal
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: '', // 'lawyer' | 'area'
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
    }
    setDeleteConfirm({ open: false, type: '', id: '', name: '' });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Tem certeza que deseja restaurar o conteúdo original padrão do site? Todas as alterações manuais serão resetadas.')) {
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
          <div className="brand-logo-monogram admin-monogram">EF</div>
          <div className="admin-brand-info">
            <span className="admin-brand-title">EDUARDO FERRARI ADVOCACIA</span>
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
        </div>
      </header>

      {/* Main Layout */}
      <div className="admin-body">
        {/* Sidebar Navigation */}
        <aside className="admin-sidebar">
          <div className="admin-nav-section-title">GERENCIADOR DE CONTEÚDO</div>
          
          <button 
            className={`admin-nav-btn ${activeTab === 'escritorio' ? 'active' : ''}`}
            onClick={() => setActiveTab('escritorio')}
          >
            <span className="nav-icon">📁</span>
            <span>O Escritório</span>
          </button>

          <button 
            className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span>Visão Geral</span>
          </button>

          <div className="admin-sidebar-footer">
            <div className="storage-status">
              <span className="status-dot"></span>
              <span>Armazenamento: LocalStorage Ativo</span>
            </div>
            <div className="admin-version">CMS v1.2 • Eduardo Ferrari</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="admin-main">
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

          {/* Tab: Dashboard / Visão Geral */}
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
                  <div className="stat-icon">⚡</div>
                  <div className="stat-number">Tempo Real</div>
                  <div className="stat-label">Sincronização com o Site</div>
                </div>
              </div>

              <div className="dashboard-instructions-card">
                <h3>💡 Como usar este Painel Administrativo</h3>
                <ul>
                  <li><strong>A Equipe:</strong> Adicione, edite ou exclua advogados. Ao salvar, a alteração aparece imediatamente no site na aba <em>O Escritório → A Equipe</em>.</li>
                  <li><strong>Áreas de Atuação:</strong> Personalize os textos e títulos das áreas de prática jurídica do escritório.</li>
                  <li><strong>Fotos dos Advogados:</strong> Você pode fazer upload de fotos diretamente do seu computador (armazenadas em Base64 local) ou usar o avatar padrão com iniciais.</li>
                  <li><strong>Restaurar Padrões:</strong> Se quiser voltar ao conteúdo original fornecido de demonstração, clique no botão <em>Restaurar Padrões</em> no topo.</li>
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
