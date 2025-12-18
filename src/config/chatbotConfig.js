const CHATBOT_CONFIG = {
    webhookUrl: import.meta.env.VITE_CHATBOT_WEBHOOK_URL,
    jwtSecret: import.meta.env.VITE_CHATBOT_JWT_SECRET,

    api: {
        timeout: 30000,
        retries: 2,
        retryDelay: 1000
    },

    conversation: {
        maxHistoryLength: 5,
        typingDelay: 500
    },

    errorMessages: {
        network: 'Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta de nuevo en un momento.',
        timeout: 'La solicitud está tomando demasiado tiempo. Por favor, intenta de nuevo.',
        generic: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
        unauthorized: 'Error de autenticación. Por favor, contacta al administrador.'
    }
};

if (!CHATBOT_CONFIG.webhookUrl) {
    throw new Error('VITE_CHATBOT_WEBHOOK_URL is not defined in environment variables');
}

if (!CHATBOT_CONFIG.jwtSecret) {
    throw new Error('VITE_CHATBOT_JWT_SECRET is not defined in environment variables');
}

export default CHATBOT_CONFIG;
