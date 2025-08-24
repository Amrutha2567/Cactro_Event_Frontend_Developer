const input = document.getElementById("apiKey");
const statusEl = document.getElementById("status");

document.getElementById("save").addEventListener("click", async () => {
  const key = input.value.trim();
  await chrome.storage.local.set({ openaiApiKey: key });
  statusEl.textContent = "Saved.";
  setTimeout(() => statusEl.textContent = "", 1200);
});

(async function init() {
  const { openaiApiKey } = await chrome.storage.local.get(["openaiApiKey"]);
  if (openaiApiKey) input.value = openaiApiKey;
})();
