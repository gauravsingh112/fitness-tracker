import React, { createContext, useContext, useState, useEffect } from 'react';
import { masterPlan } from '../data/masterPlan';
import { logService, settingsService } from '../services/api';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [data, setData] = useState({
        weightLog: [{ date: new Date().toISOString(), weight: masterPlan.user.startWeight }],
        dailyLogs: {},
        streak: 0,
        lastLogin: new Date().toISOString()
    });

    const [theme, setTheme] = useState('dark');
    const [loading, setLoading] = useState(true);

    // Initial Data Fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Settings
                const settings = await settingsService.getSettings();
                if (settings) {
                    setTheme(settings.theme);
                }

                // Fetch Logs (All time for now to populate local state structure)
                // Ideally we'd paginate or only fetch what's needed, but for now we sync all
                const logs = await logService.getAllLogs();

                const newDailyLogs = {};
                const newWeightLog = [{ date: new Date().toISOString(), weight: masterPlan.user.startWeight }];

                logs.forEach(log => {
                    const dateKey = new Date(log.date).toISOString().split('T')[0];
                    newDailyLogs[dateKey] = {
                        habits: log.habits || [],
                        meals: log.meals || [],
                        exercises: log.exercises || [],
                        weight: log.weight,
                        notes: log.notes
                    };

                    if (log.weight) {
                        newWeightLog.push({ date: log.date, weight: log.weight });
                    }
                });

                // Sort weight log by date
                newWeightLog.sort((a, b) => new Date(a.date) - new Date(b.date));

                setData(prev => ({
                    ...prev,
                    dailyLogs: newDailyLogs,
                    weightLog: newWeightLog.length > 1 ? newWeightLog : prev.weightLog
                }));

            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Theme Effect
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        // Also update backend when theme changes (debouncing recommended for real apps)
        settingsService.updateSettings({ theme }).catch(err => console.error("Failed to save theme:", err));
    }, [theme]);

    const today = new Date().toISOString().split('T')[0];

    const getDailyLog = (date = today) => {
        return data.dailyLogs[date] || { meals: [], exercises: [], habits: [] };
    };

    const saveLogToBackend = async (date, logData) => {
        try {
            await logService.saveLog({
                date: date,
                ...logData
            });
        } catch (error) {
            console.error("Failed to save log to backend:", error);
        }
    };

    const toggleItem = (type, id, date = today) => {
        setData(prev => {
            const currentLog = prev.dailyLogs[date] || { meals: [], exercises: [], habits: [] };
            const list = currentLog[type] || [];
            const newList = list.includes(id)
                ? list.filter(item => item !== id)
                : [...list, id];

            const updatedLog = { ...currentLog, [type]: newList };

            // Optimistic update
            const newData = {
                ...prev,
                dailyLogs: {
                    ...prev.dailyLogs,
                    [date]: updatedLog
                }
            };

            // Sync to backend
            saveLogToBackend(date, updatedLog);

            return newData;
        });
    };

    const logWeight = (weight) => {
        const date = new Date().toISOString();
        const dateKey = date.split('T')[0];

        setData(prev => {
            const currentLog = prev.dailyLogs[dateKey] || { meals: [], exercises: [], habits: [] };
            const updatedLog = { ...currentLog, weight: parseFloat(weight) };

            // Sync to backend
            saveLogToBackend(dateKey, updatedLog);

            return {
                ...prev,
                weightLog: [...prev.weightLog, { date, weight: parseFloat(weight) }],
                dailyLogs: {
                    ...prev.dailyLogs,
                    [dateKey]: updatedLog
                }
            };
        });
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Calculate stats
    const currentWeight = data.weightLog[data.weightLog.length - 1]?.weight || masterPlan.user.startWeight;
    const weightLost = masterPlan.user.startWeight - currentWeight;
    const progress = (weightLost / (masterPlan.user.startWeight - masterPlan.user.goalWeight)) * 100;

    return (
        <StoreContext.Provider value={{
            masterPlan,
            data,
            today,
            theme,
            loading,
            toggleTheme,
            getDailyLog,
            toggleItem,
            logWeight,
            stats: { currentWeight, weightLost, progress }
        }}>
            {children}
        </StoreContext.Provider>
    );
};
