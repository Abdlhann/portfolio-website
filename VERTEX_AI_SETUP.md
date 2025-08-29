# Setting Up Vertex AI in Your Portfolio Site

This guide walks you through setting up Google Vertex AI integration for your chatbot.

## Prerequisites

1. A Google Cloud Platform (GCP) account
2. Access to Vertex AI API
3. API key with Vertex AI permissions

## Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Vertex AI API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Vertex AI API" and enable it
4. Create an API key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create credentials" > "API key"
   - Copy the generated key for later use

## Project Configuration

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Fill in your Google Cloud Project ID and other configurations:
   ```
   VITE_VERTEX_AI_PROJECT_ID=your-google-cloud-project-id
   VITE_VERTEX_AI_LOCATION=us-central1
   VITE_VERTEX_AI_MODEL=gemini-1.5-pro
   ```

## Using the Chatbot

1. Open the chat interface on your portfolio site
2. Click the settings icon (gear)
3. Enable "Gunakan Vertex AI"
4. Enter your API key
5. Save the settings

The chatbot will now use Google's Vertex AI for generating responses. If there's an error with the API connection, it will automatically fall back to the built-in rule-based system.

## Troubleshooting

- **Invalid API Key Error**: Make sure your API key starts with "AIza" and is correctly copied from Google Cloud Console
- **API Connection Failed**: Ensure your API key has proper permissions and Vertex AI API is enabled
- **Billing Issues**: Verify your Google Cloud billing is set up correctly
- **CORS Errors**: You may need to set up proper CORS configuration in Google Cloud

Remember to keep your API key secure and never commit it to your public repository! 