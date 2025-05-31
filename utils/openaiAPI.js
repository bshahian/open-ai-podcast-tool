// utils/openaiAPI.js

export async function analyzeTranscript(transcript) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a podcast analysis assistant. Summarize, extract keywords, main takeaways, quotes, and chapter titles with timestamps from this transcript."
        },
        {
          role: "user",
          content: transcript
        }
      ]
    })
  });

  const data = await response.json();

  // You can customize the return format based on your UI expectations
  const content = data.choices[0].message.content;

  // Assuming the response is structured JSON. If not, parse it from text.
  return JSON.parse(content);
}
