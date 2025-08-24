# Website Highlight Saver (Chrome Extension)

Highlight text on any web page, save it locally, and view or delete your saved highlights from the toolbar popup. Optionally, generate a quick AI summary of your saved highlights (requires an OpenAI API key).

## Features
- Select any text on any page → small "Save highlight?" bubble appears near the selection.
- Click **Save** to store the snippet with the page title, URL, timestamp, and surrounding context.
- Click the extension icon to see a scrollable list of all saved highlights.
- Delete any highlight with one click.
- Optional: Click **Summarize** to get a quick bullet-point summary of recent highlights using OpenAI.

## How to Load Locally (Chrome)
1. Download and unzip this folder.
2. Open **chrome://extensions** in Chrome.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select the unzipped folder.
5. Pin **Website Highlight Saver** to your toolbar for quick access.

## Set OpenAI API Key (optional)
1. Click the extension icon → in the popup click the **gear** icon.
2. Paste your API key (starts with `sk-`) and click **Save**.
3. Back in the popup, press **Summarize** to generate a summary.
> Your key is stored locally with `chrome.storage.local` and is never hard-coded in the extension.

## Record the Demo Video (2–5 minutes)
- Use Loom (or any tool you like).
- Turn on your camera so your face is visible.
- Speak in English and walk through:
  1. Loading the extension via **Load unpacked**.
  2. Visiting a web page and selecting text → show the "Save highlight?" bubble → click **Save**.
  3. Open the toolbar popup and show the saved item(s): page title, timestamp, and **Open** link.
  4. Delete one highlight to show it works.
  5. (Optional) Open **Options** to add your OpenAI key. Then click **Summarize** in the popup to show the summary result.
- Keep it clear and within 3–4 minutes.

## Notes
- Highlights are stored locally in `chrome.storage.local` under the key `highlights`.
- The popup lists the most recent items first.
- The summarize feature sends your snippets to OpenAI's Chat Completions API with model `gpt-4o-mini`.
- If you prefer not to use AI, simply skip the Options page and the Summarize button.

## File Overview
```
manifest.json
background.js
contentScript.js
contentStyles.css
popup/
  popup.html
  popup.css
  popup.js
options/
  options.html
  options.js
```
