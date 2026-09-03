import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Admin from './components/Admin';
import './App.css';
import './Admin.css';

function App() {
  const [route, setRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/admin' || path === '/admin/' || hash === '#/admin' || hash === '#admin') {
      return 'admin';
    }
    return 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path === '/admin/' || hash === '#/admin' || hash === '#admin') {
        setRoute('admin');
      } else {
        setRoute('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setRoute('admin');
  };

  const navigateToSite = () => {
    window.history.pushState({}, '', '/');
    setRoute('home');
  };

  return (
    <>
      {route === 'admin' ? (
        <Admin onNavigateToSite={navigateToSite} />
      ) : (
        <Home onNavigateToAdmin={navigateToAdmin} />
      )}
    </>
  );
}

export default App;
