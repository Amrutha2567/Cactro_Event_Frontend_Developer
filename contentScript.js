// contentScript.js
// Detect text selection and show a small "Save Highlight?" tooltip near it

let currentTooltip = null;

function removeTooltip() {
  if (currentTooltip && currentTooltip.remove) {
    currentTooltip.remove();
  }
  currentTooltip = null;
}

function getSelectionText() {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return "";
  return sel.toString().trim();
}

function getSelectionRect() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0).cloneRange();
  const rects = range.getClientRects();
  if (rects.length === 0) return null;
  return rects[rects.length - 1];
}

function buildTooltip(x, y, selectedText) {
  removeTooltip();
  const el = document.createElement("div");
  el.className = "whs-tooltip";
  el.innerHTML = `
    <div class="whs-row">
      <span>Save highlight?</span>
      <button class="whs-btn" id="whs-save">Save</button>
      <button class="whs-btn" id="whs-cancel" style="background:#e5e7eb;color:#111827;">Cancel</button>
    </div>
    <div class="whs-muted" style="margin-top:6px; max-width: 320px;">
      ${selectedText.length > 100 ? (selectedText.slice(0, 100) + '…') : selectedText}
    </div>
  `;
  Object.assign(el.style, {
    top: `${y + window.scrollY + 8}px`,
    left: `${x + window.scrollX}px`
  });
  document.body.appendChild(el);
  currentTooltip = el;

  el.querySelector("#whs-save").addEventListener("click", () => {
    const url = location.href;
    const title = document.title || url;
    const id = `h_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    const context = getContextAroundSelection();
    const payload = {
      id,
      text: selectedText,
      url,
      title,
      timestamp: new Date().toISOString(),
      context
    };
    chrome.runtime.sendMessage({ type: "saveHighlight", payload }, (res) => {
      // Optionally give user feedback
      el.innerHTML = `<div class="whs-muted">Saved ✓</div>`;
      setTimeout(removeTooltip, 700);
      window.getSelection()?.removeAllRanges();
    });
  });

  el.querySelector("#whs-cancel").addEventListener("click", () => {
    removeTooltip();
    window.getSelection()?.removeAllRanges();
  });
}

function getContextAroundSelection() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return "";
  const range = sel.getRangeAt(0);
  const container = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentNode;
  const text = container && container.innerText ? container.innerText : "";
  // Return up to 300 chars of surrounding text for context
  const selected = sel.toString();
  const idx = text.indexOf(selected);
  if (idx === -1) {
    return text.slice(0, 300);
  }
  const start = Math.max(0, idx - 150);
  const end = Math.min(text.length, idx + selected.length + 150);
  return text.slice(start, end);
}

document.addEventListener("mouseup", (e) => {
  setTimeout(() => {
    const text = getSelectionText();
    if (text && text.length > 0) {
      const r = getSelectionRect();
      if (r) {
        buildTooltip(r.left, r.bottom, text);
      }
    } else {
      removeTooltip();
    }
  }, 0);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") removeTooltip();
});

window.addEventListener("scroll", () => {
  // Hide tooltip on scroll to avoid odd positioning
  removeTooltip();
}, { passive: true });
