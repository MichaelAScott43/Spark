import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@spark_api_key';
const STORAGE_BASE_URL_KEY = '@spark_base_url';

const DEFAULT_BASE_URL = 'https://api.openai.com/v1';

/**
 * Retrieve the stored API key.
 */
export async function getApiKey() {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Save the API key securely in AsyncStorage.
 */
export async function saveApiKey(key) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, key.trim());
  } catch (err) {
    throw new Error('Failed to save API key');
  }
}

/**
 * Retrieve the stored base URL (for custom OpenAI-compatible endpoints).
 */
export async function getBaseUrl() {
  try {
    const url = await AsyncStorage.getItem(STORAGE_BASE_URL_KEY);
    return url || DEFAULT_BASE_URL;
  } catch {
    return DEFAULT_BASE_URL;
  }
}

/**
 * Save a custom base URL.
 */
export async function saveBaseUrl(url) {
  try {
    await AsyncStorage.setItem(STORAGE_BASE_URL_KEY, url.trim());
  } catch (err) {
    throw new Error('Failed to save base URL');
  }
}

/**
 * Send a chat message to the AI and receive a streamed response.
 * @param {Array<{role: string, content: string}>} messages - Conversation history
 * @param {string} systemPrompt - System instruction for the AI
 * @param {function} onChunk - Callback called with each text chunk as it arrives
 * @param {function} onDone - Callback called when the response is complete
 * @param {function} onError - Callback called on error
 * @returns {function} abort - Call to cancel the request
 */
export async function streamChatResponse(messages, systemPrompt, onChunk, onDone, onError) {
  const apiKey = await getApiKey();
  const baseUrl = await getBaseUrl();

  if (!apiKey) {
    onError(new Error('NO_API_KEY'));
    return () => {};
  }

  const controller = new AbortController();

  const body = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    stream: true,
    max_tokens: 500,
    temperature: 0.8,
  });

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body,
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch {
        // ignore JSON parse errors
      }
      onError(new Error(errorMessage));
      return () => {};
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    const read = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            onDone(fullText);
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === 'data: [DONE]') continue;
            if (!trimmed.startsWith('data: ')) continue;

            try {
              const json = JSON.parse(trimmed.slice(6));
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                fullText += content;
                onChunk(content, fullText);
              }
            } catch {
              // skip malformed SSE lines
            }
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          onError(err);
        }
      }
    };

    read();
  } catch (err) {
    if (err.name !== 'AbortError') {
      onError(err);
    }
  }

  return () => controller.abort();
}

/**
 * Non-streaming version for simpler usage.
 */
export async function sendChatMessage(messages, systemPrompt) {
  const apiKey = await getApiKey();
  const baseUrl = await getBaseUrl();

  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}
