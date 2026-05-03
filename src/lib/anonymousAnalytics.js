const USER_KEY = "career-explorer-anonymous-user-id";
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

const isBrowser = () => typeof window !== "undefined";

const createId = () => {
  if (isBrowser() && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `anon-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const createEmptyAnalyticsSummary = () => ({
  eventCount: 0,
  anonymousUserId: "",
  lastEventAt: null
});

export const getAnonymousUserId = () => {
  if (!isBrowser()) {
    return "server-render";
  }

  const existing = window.localStorage.getItem(USER_KEY);

  if (existing) {
    return existing;
  }

  const nextId = createId();
  window.localStorage.setItem(USER_KEY, nextId);
  return nextId;
};

const normalizeSummary = (summary) => ({
  eventCount: summary?.eventCount ?? 0,
  anonymousUserId: getAnonymousUserId(),
  lastEventAt: summary?.lastEventAt ?? null
});

export const getAnonymousAnalyticsSummary = async () => {
  if (!isBrowser()) {
    return createEmptyAnalyticsSummary();
  }

  try {
    const response = await fetch(`${API_BASE}/analytics/summary`);

    if (!response.ok) {
      return createEmptyAnalyticsSummary();
    }

    const payload = await response.json();
    return normalizeSummary(payload);
  } catch {
    return createEmptyAnalyticsSummary();
  }
};

export const trackAnonymousEvent = async (eventName, payload) => {
  if (!isBrowser()) {
    return createEmptyAnalyticsSummary();
  }

  try {
    const response = await fetch(`${API_BASE}/analytics/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: createId(),
        name: eventName,
        at: new Date().toISOString(),
        anonymousUserId: getAnonymousUserId(),
        payload
      })
    });

    if (!response.ok) {
      return createEmptyAnalyticsSummary();
    }

    const result = await response.json();
    return normalizeSummary(result.summary);
  } catch {
    return createEmptyAnalyticsSummary();
  }
};

export const exportAnonymousAnalytics = async () => {
  if (!isBrowser()) {
    return;
  }

  const response = await fetch(`${API_BASE}/analytics/export`);

  if (!response.ok) {
    return;
  }

  const analytics = await response.json();
  const blob = new Blob([JSON.stringify(analytics, null, 2)], {
    type: "application/json"
  });
  const url = window.URL.createObjectURL(blob);
  const link = window.document.createElement("a");

  link.href = url;
  link.download = `career-explorer-anonymous-data-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const clearAnonymousAnalytics = async () => {
  if (!isBrowser()) {
    return createEmptyAnalyticsSummary();
  }

  try {
    const response = await fetch(`${API_BASE}/analytics/events`, {
      method: "DELETE"
    });

    if (!response.ok) {
      return createEmptyAnalyticsSummary();
    }

    const result = await response.json();
    return normalizeSummary(result.summary);
  } catch {
    return createEmptyAnalyticsSummary();
  }
};
