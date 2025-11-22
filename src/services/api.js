import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const logService = {
    // Create or update a log
    saveLog: async (logData) => {
        const response = await api.post('/logs', logData);
        return response.data;
    },

    // Get all logs
    getAllLogs: async () => {
        const response = await api.get('/logs');
        return response.data;
    },

    // Get daily log
    getDailyLog: async (date) => {
        try {
            const response = await api.get(`/logs/report/daily/${date}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null;
            }
            throw error;
        }
    },

    // Get MTD report
    getMTDReport: async () => {
        const response = await api.get('/logs/report/mtd');
        return response.data;
    },

    // Get Range report
    getRangeReport: async (startDate, endDate) => {
        const response = await api.get(`/logs/report/range?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    }
};

export const settingsService = {
    getSettings: async () => {
        const response = await api.get('/settings');
        return response.data;
    },

    updateSettings: async (settingsData) => {
        const response = await api.put('/settings', settingsData);
        return response.data;
    }
};

export default api;
