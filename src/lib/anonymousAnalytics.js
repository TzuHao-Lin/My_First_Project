import { matchingModel } from "../data/matchingModel";

const STORAGE_KEY = "career-explorer-anonymous-analytics";
const USER_KEY = "career-explorer-anonymous-user-id";

const isBrowser = () => typeof window !== "undefined";

const createId = () => {
  if (isBrowser() && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `anon-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

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

export const readAnonymousAnalytics = () => {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      version: matchingModel.analytics.version,
      anonymousUserId: getAnonymousUserId(),
      events: []
    };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {
      version: matchingModel.analytics.version,
      anonymousUserId: getAnonymousUserId(),
      events: []
    };
  }
};

export const getAnonymousAnalyticsSummary = () => {
  const analytics = readAnonymousAnalytics();

  if (!analytics) {
    return {
      eventCount: 0,
      anonymousUserId: "",
      lastEventAt: null
    };
  }

  const lastEvent = analytics.events[analytics.events.length - 1] ?? null;

  return {
    eventCount: analytics.events.length,
    anonymousUserId: analytics.anonymousUserId,
    lastEventAt: lastEvent?.at ?? null
  };
};

export const trackAnonymousEvent = (eventName, payload) => {
  if (!isBrowser()) {
    return null;
  }

  const analytics = readAnonymousAnalytics();
  const nextAnalytics = {
    version: matchingModel.analytics.version,
    anonymousUserId: analytics.anonymousUserId,
    events: [
      ...analytics.events,
      {
        id: createId(),
        name: eventName,
        at: new Date().toISOString(),
        payload
      }
    ].slice(-matchingModel.analytics.maxEvents)
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAnalytics));
  return nextAnalytics;
};

export const exportAnonymousAnalytics = () => {
  if (!isBrowser()) {
    return;
  }

  const analytics = readAnonymousAnalytics();
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

export const clearAnonymousAnalytics = () => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};
