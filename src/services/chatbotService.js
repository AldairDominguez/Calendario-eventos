import CHATBOT_CONFIG from '../config/chatbotConfig';

const base64urlEncode = (str) => {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

const generateAuthToken = async () => {
    const secret = CHATBOT_CONFIG.jwtSecret;

    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    const payload = {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };

    const encodedHeader = base64urlEncode(JSON.stringify(header));
    const encodedPayload = base64urlEncode(JSON.stringify(payload));

    const encoder = new TextEncoder();
    const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);
    const secretKey = encoder.encode(secret);

    try {
        const key = await crypto.subtle.importKey(
            'raw',
            secretKey,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign('HMAC', key, data);

        const signatureArray = new Uint8Array(signature);
        const signatureString = String.fromCharCode(...signatureArray);
        const encodedSignature = base64urlEncode(signatureString);

        return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
    } catch (error) {
        return secret;
    }
};

const getSessionId = () => {
    return 'user_admin';
};

export const sendMessageToAgent = async (message, conversationHistory = []) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CHATBOT_CONFIG.api.timeout);

        const authToken = await generateAuthToken();
        const sessionId = getSessionId();

        const requestBody = {
            sessionId: sessionId,
            message: message,
            timestamp: new Date().toISOString(),
            conversationHistory: conversationHistory.slice(-CHATBOT_CONFIG.conversation.maxHistoryLength)
        };

        const response = await fetch(CHATBOT_CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.status === 401 || response.status === 403) {
            throw new Error('UNAUTHORIZED');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();

        return {
            success: true,
            message: responseText || 'Respuesta recibida sin contenido'
        };
    } catch (error) {
        let fallbackMessage = CHATBOT_CONFIG.errorMessages.generic;

        if (error.name === 'AbortError') {
            fallbackMessage = CHATBOT_CONFIG.errorMessages.timeout;
        } else if (error.message === 'UNAUTHORIZED') {
            fallbackMessage = CHATBOT_CONFIG.errorMessages.unauthorized;
        } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            fallbackMessage = 'Error de conexión. Verifica que el webhook esté configurado correctamente y permita CORS.';
        } else if (error.message.includes('fetch') || error.message.includes('network')) {
            fallbackMessage = CHATBOT_CONFIG.errorMessages.network;
        }

        return {
            success: false,
            error: error.message,
            fallbackMessage: fallbackMessage
        };
    }
};

export const extractMessageFromResponse = (response) => {
    if (!response.success) {
        return response.fallbackMessage;
    }

    return response.message || 'He recibido tu mensaje. ¿En qué más puedo ayudarte?';
};

export const formatConversationHistory = (messages) => {
    return messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
        timestamp: msg.time
    }));
};
