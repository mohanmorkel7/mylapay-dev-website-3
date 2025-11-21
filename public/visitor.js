(function() {
  function logPage(pageName) {
    fetch('/api/log-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pageName,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    }).catch(err => console.error('[Page Log Error]', err));
  }

  // Log initial page
  logPage(window.location.pathname);

  // Track SPA navigation
  const originalPushState = history.pushState;
  history.pushState = function(state, title, url) {
    originalPushState.apply(this, arguments);
    logPage(url);
  };

  window.addEventListener('popstate', () => logPage(window.location.pathname));
})();
