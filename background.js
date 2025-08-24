// background.js - service worker
// Stores and manages highlights in chrome.storage.local

const HIGHLIGHTS_KEY = "highlights";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get([HIGHLIGHTS_KEY], (res) => {
    if (!Array.isArray(res[HIGHLIGHTS_KEY])) {
      chrome.storage.local.set({ [HIGHLIGHTS_KEY]: [] });
    }
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  if (msg.type === "saveHighlight") {
    const item = msg.payload;
    chrome.storage.local.get([HIGHLIGHTS_KEY], (res) => {
      const arr = Array.isArray(res[HIGHLIGHTS_KEY]) ? res[HIGHLIGHTS_KEY] : [];
      arr.unshift(item); // newest first
      chrome.storage.local.set({ [HIGHLIGHTS_KEY]: arr }, () => {
        sendResponse({ ok: true });
      });
    });
    return true; // async
  }

  if (msg.type === "deleteHighlight") {
    const id = msg.payload?.id;
    chrome.storage.local.get([HIGHLIGHTS_KEY], (res) => {
      const arr = Array.isArray(res[HIGHLIGHTS_KEY]) ? res[HIGHLIGHTS_KEY] : [];
      const filtered = arr.filter(h => h.id !== id);
      chrome.storage.local.set({ [HIGHLIGHTS_KEY]: filtered }, () => {
        sendResponse({ ok: true });
      });
    });
    return true; // async
  }
});
