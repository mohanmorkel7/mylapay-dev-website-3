// src/tracking.ts
export function initTracking() {
  const baseApi = typeof window !== "undefined" ? window.location.origin : "";

  const logPage = (page: string) => {
    const payload = {
      page,
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      timestamp: new Date().toISOString(),
    };

    try {
      // Prefer sendBeacon for reliability during navigation
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.sendBeacon === "function"
      ) {
        try {
          const blob = new Blob([JSON.stringify(payload)], {
            type: "application/json",
          });
          navigator.sendBeacon(`${baseApi}/api/log-user`, blob);
          return;
        } catch (err) {
          // Fall through to fetch if sendBeacon fails
          // eslint-disable-next-line no-console
          console.warn(
            "[Page Log] sendBeacon failed, falling back to fetch",
            err,
          );
        }
      }

      // Fallback to fetch with same-origin credentials
      fetch(`${baseApi}/api/log-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error("[Page Log Error] fetch failed", err);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[Page Log Error] unexpected", err);
    }
  };

  // Log initial page (guarded)
  try {
    logPage(window.location.pathname || "/");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[Page Log] initial log failed", err);
  }

  // Override history.pushState to detect SPA navigation
  const originalPushState = history.pushState;
  history.pushState = function (
    state: any,
    title: string,
    url?: string | URL | null,
  ) {
    try {
      originalPushState.apply(this, [state, title, url]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[Page Log] pushState apply failed", err);
    }

    try {
      // normalize url to string path
      const path =
        typeof url === "string"
          ? url
          : url
            ? url.toString()
            : window.location.pathname;
      logPage(path as string);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[Page Log] logging after pushState failed", err);
    }
  };

  // Track back/forward buttons
  window.addEventListener("popstate", () => {
    try {
      logPage(window.location.pathname);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[Page Log] popstate log failed", err);
    }
  });
}
