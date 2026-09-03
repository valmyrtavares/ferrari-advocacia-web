import React, { useState } from 'react';

export default function AdminLogin({ onLoginSuccess, onNavigateToSite }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Accept 'admin' / 'admin123' or 'admin@eduardoferrari.adv.br' / 'ferrari2026' or any credentials if user types anything reasonable
      const validUser = username.trim().toLowerCase();
      const validPass = password.trim();

      if (
        (validUser === 'admin' && validPass === 'admin123') ||
        (validUser === 'admin@eduardoferrari.adv.br' && validPass === 'ferrari2026') ||
        (validUser.length >= 3 && validPass.length >= 3) // Permissive for easy demo presentation
      ) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Usuário ou senha incorretos. Dica: use admin / admin123');
      }
    }, 600);
  };

  const handleFillDemoCredentials = () => {
    setUsername('admin@eduardoferrari.adv.br');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="admin-login-screen">
      <div className="background-overlay"></div>

      <div className="admin-login-card animate-fade">
        {/* Brand Header */}
        <div className="login-brand-header">
          <img 
            src="/image/logo ferrari-escritorio-28-11-25.jpg" 
            alt="Eduardo Ferrari Advocacia" 
            className="admin-login-logo-img" 
          />
        </div>

        <div className="login-divider"></div>

        <h2 className="login-title">Acesso Restrito ao Painel CMS</h2>
        <p className="login-subtitle">
          Informe suas credenciais corporativas para gerenciar o conteúdo do site.
        </p>

        {error && (
          <div className="login-error-alert animate-fade">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="admin-form-label" htmlFor="login-username">E-mail ou Usuário</label>
            <input 
              id="login-username"
              type="text" 
              className="admin-input" 
              placeholder="admin@eduardoferrari.adv.br"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="admin-form-label" htmlFor="login-password">Senha de Acesso</label>
            <div className="password-input-wrapper">
              <input 
                id="login-password"
                type={showPassword ? "text" : "password"} 
                className="admin-input password-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Demo helper hint button */}
          <div className="demo-credentials-badge" onClick={handleFillDemoCredentials}>
            <span className="demo-icon">💡</span>
            <span><strong>Dica para demonstração:</strong> Clique aqui para preencher (admin / admin123)</span>
          </div>

          <button 
            type="submit" 
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="login-loading-text">
                <span className="spinner-dot"></span> Autenticando...
              </span>
            ) : (
              '🔒 Entrar no Painel Administrativo'
            )}
          </button>
        </form>

        <div className="login-footer-actions">
          <button 
            type="button" 
            className="login-back-to-site-btn"
            onClick={onNavigateToSite}
          >
            ← Voltar ao Site Público
          </button>
        </div>
      </div>
    </div>
  );
}
