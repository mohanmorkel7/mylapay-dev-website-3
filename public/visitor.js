(function () {
  function logPage(pageName) {
    const payload = {
      page: pageName,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        navigator.sendBeacon(window.location.origin + "/api/log-user", blob);
        return;
      }
    } catch (err) {
      console.warn("sendBeacon failed, falling back to fetch", err);
    }

    fetch(window.location.origin + "/api/log-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(payload),
    }).catch((err) => console.error("[Page Log Error]", err));
  }

  // Log initial page
  logPage(window.location.pathname || "/");

  // Track SPA navigation
  const originalPushState = history.pushState;
  history.pushState = function (state, title, url) {
    try {
      originalPushState.apply(this, arguments);
    } catch (e) {}
    try {
      logPage(
        typeof url === "string"
          ? url
          : (url && url.toString()) || window.location.pathname,
      );
    } catch (e) {}
  };

  window.addEventListener("popstate", () =>
    logPage(window.location.pathname || "/"),
  );
})();
