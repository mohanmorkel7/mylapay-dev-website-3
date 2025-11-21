
let startTime = Date.now();
let sessionId = `sess_${Math.random().toString(36).slice(2, 10)}`;

export function initUserTracking() {
  // Listen for user leaving page
  window.addEventListener("beforeunload", () => {
    const duration = Math.round((Date.now() - startTime) / 60000); // duration in minutes

    const payload = {
      sessionId,
      duration,
    };

    // Send log to server without blocking unload
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    navigator.sendBeacon("/api/log-user", blob);
  });
}
