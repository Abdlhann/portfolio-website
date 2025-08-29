// Vertex AI API integration

// Configuration from environment variables
const PROJECT_ID = import.meta.env.VITE_VERTEX_AI_PROJECT_ID || 'directed-sonar-456909-j1';
const LOCATION = import.meta.env.VITE_VERTEX_AI_LOCATION || 'us-central1';
const MODEL = import.meta.env.VITE_VERTEX_AI_MODEL || 'gemini-1.5-pro';

const VERTEX_AI_API_URL = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

/**
 * Process a conversation with Vertex AI Gemini model
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} apiKey - Google API Key for Vertex AI
 * @returns {Promise<Object>} - Response from Vertex AI
 */
export async function processWithVertexAI(messages, apiKey) {
  try {
    // Format messages for Vertex AI
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const requestBody = {
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    const response = await fetch(VERTEX_AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vertex AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return {
      content: data.candidates[0].content.parts[0].text,
      usage: data.usageMetadata
    };
  } catch (error) {
    console.error('Error processing with Vertex AI:', error);
    throw error;
  }
}

/**
 * Validate Google API Key format
 * @param {string} apiKey - Google API Key
 * @returns {boolean} - Whether the API key format is valid
 */
export function isValidAPIKey(apiKey) {
  // Google API keys typically start with "AIza"
  return typeof apiKey === 'string' && apiKey.startsWith('AIza') && apiKey.length > 20;
} 