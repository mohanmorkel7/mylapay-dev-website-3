let startTime = Date.now();

export function initUserTracking() {
  // Track SPA navigation
  const trackPage = (page: string) => {
    const duration = Math.floor((Date.now() - startTime) / 1000); // seconds
    fetch("/api/log-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, duration }),
    }).catch((err) => console.error("User log failed", err));

    startTime = Date.now(); // reset timer for next page
  };

  trackPage(window.location.pathname);

  // Track React Router navigation
  window.addEventListener("popstate", () => trackPage(window.location.pathname));
}
