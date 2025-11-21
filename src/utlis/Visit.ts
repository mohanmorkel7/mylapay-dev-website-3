// src/tracking.ts
export function initTracking() {
  const logPage = (page: string) => {
    fetch('/api/log-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    }).catch(err => console.error('[Page Log Error]', err));
  };

  // Log initial page
  logPage(window.location.pathname);

  // Override history.pushState to detect SPA navigation
  const originalPushState = history.pushState;
  history.pushState = function (state: any, title: string, url?: string | URL | null) {
    originalPushState.apply(this, [state, title, url]);
    logPage(url as string);
  };

  // Track back/forward buttons
  window.addEventListener('popstate', () => {
    logPage(window.location.pathname);
  });
}
