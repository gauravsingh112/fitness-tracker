import React, { createContext, useContext, useState, useEffect } from 'react';
import { masterPlan } from '../data/masterPlan';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    // Load from local storage or use default
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('fitnessTrackerData');
        return saved ? JSON.parse(saved) : {
            weightLog: [{ date: new Date().toISOString(), weight: masterPlan.user.startWeight }],
            dailyLogs: {}, // Format: "YYYY-MM-DD": { meals: [], exercises: [], habits: [] }
            streak: 0,
            lastLogin: new Date().toISOString()
        };
    });

    // Theme Management
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('fitnessTrackerData', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const today = new Date().toISOString().split('T')[0];

    const getDailyLog = (date = today) => {
        return data.dailyLogs[date] || { meals: [], exercises: [], habits: [] };
    };

    const toggleItem = (type, id, date = today) => {
        setData(prev => {
            const currentLog = prev.dailyLogs[date] || { meals: [], exercises: [], habits: [] };
            const list = currentLog[type];
            const newList = list.includes(id)
                ? list.filter(item => item !== id)
                : [...list, id];

            return {
                ...prev,
                dailyLogs: {
                    ...prev.dailyLogs,
                    [date]: { ...currentLog, [type]: newList }
                }
            };
        });
    };

    const logWeight = (weight) => {
        setData(prev => ({
            ...prev,
            weightLog: [...prev.weightLog, { date: new Date().toISOString(), weight: parseFloat(weight) }]
        }));
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
