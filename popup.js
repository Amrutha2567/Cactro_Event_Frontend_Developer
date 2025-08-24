// popup.js

// Get stored API key from chrome.storage.local
function getApiKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["openai_api_key"], (result) => {
      if (result.openai_api_key) {
        resolve(result.openai_api_key);
      } else {
        reject("API key not found. Please set it in Options.");
      }
    });
  });
}

// Example function: Summarize highlighted text
async function summarizeText(text) {
  try {
    const apiKey = await getApiKey();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or another available model
        messages: [{ role: "user", content: `Summarize this: ${text}` }]
      })
    });

    const data = await response.json();
    console.log("Summary:", data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: When "Summarize" button is clicked
document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const text = "Your highlighted text here"; // Replace with actual highlight
  const summary = await summarizeText(text);
  document.getElementById("output").innerText = summary;
});
