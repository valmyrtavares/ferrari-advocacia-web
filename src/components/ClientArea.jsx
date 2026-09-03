import React, { useState } from 'react';

const MOCK_PROCESS_DATA = {
  clientName: 'Roberto Silveira Guimarães',
  clientCpf: '123.456.789-00',
  processNumber: '1045892-34.2026.8.26.0100',
  court: '2ª Vara Cível e Empresarial - Foro Central da Comarca de São Paulo / SP',
  actionType: 'Ação de Reestruturação Societária, Governança e Blindagem Patrimonial',
  responsibleLawyer: 'Dr. Eduardo Ferrari (OAB/SP 245.890) & Dra. Mariana Zats (OAB/SP 289.412)',
  processValue: 'R$ 2.450.000,00',
  distributionDate: '14/02/2025',
  lastUpdateDate: '28/05/2026',
  currentStatus: 'Sentença Procedente Publicada - Aguardando Prazo Recursal',
  statusBadge: 'Favorável / Em Andamento',
  summary: 'Ação estratégica visando a regularização societária e proteção dos ativos patrimoniais da holding familiar. Tutela de urgência confirmada e sentença de mérito 100% favorável proferida pelo magistrado.',
  
  timeline: [
    {
      date: '14/02/2025',
      title: 'Distribuição da Petição Inicial',
      desc: 'Protocolo eletrônico com pedido de tutela provisória de urgência.',
      completed: true
    },
    {
      date: '22/02/2025',
      title: 'Concessão de Tutela Liminar',
      desc: 'Juiz deferiu integralmente a medida cautelar resguardando o patrimônio.',
      completed: true
    },
    {
      date: '10/08/2025',
      title: 'Apresentação de Laudo Pericial',
      desc: 'Juntada de parecer técnico e auditoria contábil comprobatória.',
      completed: true
    },
    {
      date: '18/03/2026',
      title: 'Audiência de Instrução e Julgamento',
      desc: 'Sustentação oral realizada pela equipe de Eduardo Ferrari Advogados.',
      completed: true
    },
    {
      date: '28/05/2026',
      title: 'Sentença de Mérito Favorável',
      desc: 'Magistrado julgou a ação TOTALMENTE PROCEDENTE em favor do cliente.',
      completed: true,
      current: true
    },
    {
      date: 'Previsão: Julho/2026',
      title: 'Trânsito em Julgado & Cumprimento',
      desc: 'Expedição dos formais de partilha e levantamento de garantias.',
      completed: false
    }
  ],

  documents: [
    {
      id: 'doc-1',
      title: 'Petição Inicial com Assinatura Digital',
      type: 'Peça Processual',
      date: '14/02/2025',
      size: '2.4 MB',
      icon: '📄',
      summary: 'Peça jurídica inaugural fundamentando o direito de proteção societária e pedido liminar.',
      status: 'Protocolado'
    },
    {
      id: 'doc-2',
      title: 'Decisão Liminar Concessiva de Tutela',
      type: 'Decisão Judicial',
      date: '22/02/2025',
      size: '1.2 MB',
      icon: '⚖️',
      summary: 'Decisão do juiz determinando o bloqueio de restrições e blindagem cautelar dos bens.',
      status: 'Publicado'
    },
    {
      id: 'doc-3',
      title: 'Laudo Pericial Contábil e Auditoria de Ativos',
      type: 'Laudo Técnico',
      date: '10/08/2025',
      size: '4.8 MB',
      icon: '📊',
      summary: 'Relatório pericial comprovando a higidez financeira e separação patrimonial das holdings.',
      status: 'Homologado'
    },
    {
      id: 'doc-4',
      title: 'Sentença Judicial de Mérito Procedente',
      type: 'Sentença',
      date: '28/05/2026',
      size: '1.9 MB',
      icon: '📜',
      summary: 'Sentença definitiva que acolheu todos os pedidos formulados pela defesa do escritório.',
      status: 'Sentenciado'
    },
    {
      id: 'doc-5',
      title: 'Certidão de Objeto e Pé Atualizada',
      type: 'Certidão Cartorária',
      date: '01/06/2026',
      size: '480 KB',
      icon: '📑',
      summary: 'Documento oficial do Tribunal de Justiça certificando o andamento e a fase atual.',
      status: 'Vigente'
    }
  ]
};

export default function ClientArea({ onBackToHome, whatsappContactNumber = "5511988994871", lang = 'pt' }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('ef_client_logged_in') === 'true';
  });

  const [cpfInput, setCpfInput] = useState('');
  const [processInput, setProcessInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('processo'); // 'processo' | 'documentos' | 'timeline'
  
  // Document Viewer Modal State
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Format CPF mask: 000.000.000-00
  const formatCpf = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const handleCpfChange = (e) => {
    setCpfInput(formatCpf(e.target.value));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Accept demo or any reasonably filled inputs
      if (cpfInput.length >= 11 || processInput.trim().length >= 5) {
        sessionStorage.setItem('ef_client_logged_in', 'true');
        setIsAuthenticated(true);
      } else {
        setErrorMsg('Por favor, informe um CPF e Número do Processo válidos para consulta.');
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setCpfInput('123.456.789-00');
    setProcessInput('1045892-34.2026.8.26.0100');
    setErrorMsg('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ef_client_logged_in');
    setIsAuthenticated(false);
  };

  const handleDownloadDoc = (doc) => {
    alert(`Iniciando download do documento oficial: "${doc.title}.pdf"\n\nDocumento autenticado digitalmente pelo Tribunal de Justiça e Eduardo Ferrari Advogados.`);
  };

  // IF NOT AUTHENTICATED -> SHOW CLIENT LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="client-login-container animate-fade">
        <div className="client-login-card">
          <div className="client-login-header">
            <div className="client-portal-badge">PORTAL DO CLIENTE</div>
            <h2 className="client-login-title">Consulta de Processos & Documentos</h2>
            <p className="client-login-subtitle">
              Área exclusiva para clientes do escritório acompanharem em tempo real o andamento e os documentos de suas causas.
            </p>
          </div>

          <div className="client-login-divider"></div>

          {errorMsg && (
            <div className="client-login-error animate-fade">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="client-login-form">
            <div className="form-group">
              <label className="admin-form-label" htmlFor="client-cpf">
                1. CPF do Titular / Representante *
              </label>
              <input 
                id="client-cpf"
                type="text" 
                className="admin-input client-input" 
                placeholder="000.000.000-00"
                value={cpfInput}
                onChange={handleCpfChange}
                required
                maxLength={14}
              />
            </div>

            <div className="form-group">
              <label className="admin-form-label" htmlFor="client-process">
                2. Número do Processo ou Pasta *
              </label>
              <input 
                id="client-process"
                type="text" 
                className="admin-input client-input" 
                placeholder="Ex: 1045892-34.2026.8.26.0100"
                value={processInput}
                onChange={(e) => setProcessInput(e.target.value)}
                required
              />
            </div>

            {/* Demo Hint Badge */}
            <div className="demo-credentials-badge client-demo-badge" onClick={handleFillDemo}>
              <span className="demo-icon">💡</span>
              <span><strong>Demonstração:</strong> Clique aqui para preencher dados de exemplo</span>
            </div>

            <button type="submit" className="client-login-btn" disabled={isLoading}>
              {isLoading ? 'Consultando Tribunal & Autos...' : '🔍 Acessar Meus Documentos & Processo'}
            </button>
          </form>

          <div className="client-login-footer">
            <p className="client-security-note">
              🔒 Ambiente seguro com criptografia de ponta a ponta e sigilo profissional garantido.
            </p>
            <button 
              type="button" 
              className="login-back-to-site-btn"
              onClick={onBackToHome}
            >
              ← Voltar ao Site Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED -> SHOW THE EXECUTIVE CLIENT DASHBOARD
  const p = MOCK_PROCESS_DATA;

  return (
    <div className="client-portal-dashboard animate-fade">
      {/* Top Portal Banner */}
      <div className="portal-top-bar">
        <div className="portal-client-info">
          <span className="portal-greeting">Bem-vindo(a) ao seu Portal Jurídico,</span>
          <h2 className="portal-client-name">{p.clientName}</h2>
          <span className="portal-cpf-badge">CPF: {p.clientCpf}</span>
        </div>

        <div className="portal-actions-group">
          <button 
            className="portal-whatsapp-btn"
            onClick={() => {
              const text = `Olá, Dr. Eduardo Ferrari. Estou na Área do Cliente e gostaria de tirar uma dúvida sobre o processo ${p.processNumber}.`;
              window.open(`https://api.whatsapp.com/send?phone=${whatsappContactNumber}&text=${encodeURIComponent(text)}`, '_blank');
            }}
            title="Conversar com o advogado responsável"
          >
            <span>💬</span>
            <span>Falar com o Advogado</span>
          </button>

          <button 
            className="portal-logout-btn"
            onClick={handleLogout}
            title="Encerrar sessão"
          >
            🚪 Sair da Conta
          </button>
        </div>
      </div>

      {/* Process Main Overview Card */}
      <div className="process-highlight-card">
        <div className="process-card-header">
          <div className="process-badge-tag">AUTOS PRINCIPAIS</div>
          <span className="process-status-pill">{p.statusBadge}</span>
        </div>

        <h3 className="process-cnj-number">Processo nº {p.processNumber}</h3>
        <h4 className="process-action-title">{p.actionType}</h4>

        <div className="process-meta-grid">
          <div className="process-meta-item">
            <span className="meta-label">🏛️ Vara / Comarca:</span>
            <span className="meta-val">{p.court}</span>
          </div>
          <div className="process-meta-item">
            <span className="meta-label">⚖️ Corpo Jurídico:</span>
            <span className="meta-val">{p.responsibleLawyer}</span>
          </div>
          <div className="process-meta-item">
            <span className="meta-label">💰 Valor da Causa:</span>
            <span className="meta-val">{p.processValue}</span>
          </div>
          <div className="process-meta-item">
            <span className="meta-label">📅 Última Atualização:</span>
            <span className="meta-val">{p.lastUpdateDate}</span>
          </div>
        </div>

        <div className="process-summary-box">
          <span className="summary-title">📋 Resumo do Andamento:</span>
          <p className="summary-text">{p.summary}</p>
        </div>
      </div>

      {/* Navigation Tabs for Client Area */}
      <div className="client-portal-tabs">
        <button 
          className={`client-tab-btn ${activeTab === 'processo' ? 'active' : ''}`}
          onClick={() => setActiveTab('processo')}
        >
          📂 Linha do Tempo & Andamentos ({p.timeline.length})
        </button>
        <button 
          className={`client-tab-btn ${activeTab === 'documentos' ? 'active' : ''}`}
          onClick={() => setActiveTab('documentos')}
        >
          📑 Documentos & Peças do Processo ({p.documents.length})
        </button>
      </div>

      {/* TAB 1: TIMELINE DE ANDAMENTOS */}
      {activeTab === 'processo' && (
        <div className="portal-tab-content animate-fade">
          <div className="timeline-container">
            <h4 className="timeline-section-heading">Etapas e Histórico do Processo</h4>
            <div className="timeline-track">
              {p.timeline.map((step, idx) => (
                <div key={idx} className={`timeline-step-item ${step.completed ? 'completed' : 'pending'} ${step.current ? 'current-step' : ''}`}>
                  <div className="timeline-marker">
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div className="timeline-content-card">
                    <div className="timeline-step-header">
                      <span className="timeline-step-date">📅 {step.date}</span>
                      {step.current && <span className="step-current-tag">Fase Atual</span>}
                    </div>
                    <h5 className="timeline-step-title">{step.title}</h5>
                    <p className="timeline-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REPOSITÓRIO DE DOCUMENTOS */}
      {activeTab === 'documentos' && (
        <div className="portal-tab-content animate-fade">
          <div className="docs-header-row">
            <div>
              <h4 className="timeline-section-heading">Peças Judiciais, Laudos & Decisões</h4>
              <p className="docs-section-sub">Todos os documentos possuem autenticação digital e validade jurídica plena.</p>
            </div>
          </div>

          <div className="client-docs-grid">
            {p.documents.map((doc) => (
              <div key={doc.id} className="client-doc-card">
                <div className="doc-card-top">
                  <div className="doc-icon-box">{doc.icon}</div>
                  <span className="doc-status-tag">{doc.status}</span>
                </div>

                <h5 className="doc-title">{doc.title}</h5>
                <p className="doc-summary">{doc.summary}</p>

                <div className="doc-meta-row">
                  <span>📅 {doc.date}</span>
                  <span>💾 {doc.size}</span>
                </div>

                <div className="doc-actions-row">
                  <button 
                    className="doc-view-btn"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    👁️ Visualizar Resumo
                  </button>
                  <button 
                    className="doc-download-btn"
                    onClick={() => handleDownloadDoc(doc)}
                  >
                    ⬇️ Baixar PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedDoc && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedDoc(null)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedDoc.icon} {selectedDoc.title}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedDoc(null)}>✕</button>
            </div>

            <div className="admin-modal-body">
              <div className="doc-preview-modal-info">
                <div className="preview-field">
                  <strong>Tipo de Documento:</strong> <span>{selectedDoc.type}</span>
                </div>
                <div className="preview-field">
                  <strong>Data de Protocolo / Publicação:</strong> <span>{selectedDoc.date}</span>
                </div>
                <div className="preview-field">
                  <strong>Tamanho do Arquivo:</strong> <span>{selectedDoc.size}</span>
                </div>
                <div className="preview-field">
                  <strong>Autenticação:</strong> <span>Certificado Digital ICP-Brasil / OAB/SP</span>
                </div>
              </div>

              <div className="doc-modal-explanation-box">
                <h5>📖 O que significa este documento no seu processo:</h5>
                <p>{selectedDoc.summary}</p>
                <p style={{ marginTop: '10px', fontSize: '0.85rem', color: '#64748b' }}>
                  Este documento integra os autos eletrônicos e pode ser baixado em formato PDF para seu arquivo pessoal ou contábil.
                </p>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button 
                type="button" 
                className="admin-btn-secondary"
                onClick={() => setSelectedDoc(null)}
              >
                Fechar
              </button>
              <button 
                type="button" 
                className="admin-btn-accent"
                onClick={() => {
                  handleDownloadDoc(selectedDoc);
                  setSelectedDoc(null);
                }}
              >
                ⬇️ Baixar Cópia Integral (.PDF)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
