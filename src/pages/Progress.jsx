import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';

const Progress = () => {
    const { data, logWeight, masterPlan } = useStore();
    const [newWeight, setNewWeight] = useState('');

    const handleAddWeight = (e) => {
        e.preventDefault();
        if (newWeight) {
            logWeight(newWeight);
            setNewWeight('');
        }
    };

    const chartData = data.weightLog.map(entry => ({
        date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: entry.weight
    }));

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-2xl font-bold">Progress Analytics</h2>
                <p className="text-muted">Track your journey to {masterPlan.user.goalWeight} kg</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-surface border border-white/5 h-[400px]">
                    <h3 className="text-lg font-bold mb-6">Weight Trend</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666' }} />
                            <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#666" tick={{ fill: '#666' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', color: '#fff' }}
                                itemStyle={{ color: '#22c55e' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="weight"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{ fill: '#22c55e', strokeWidth: 2 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-white/5 h-fit">
                    <h3 className="text-lg font-bold mb-4">Log Weight</h3>
                    <form onSubmit={handleAddWeight} className="space-y-4">
                        <div>
                            <label className="block text-xs text-muted mb-1">Current Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors"
                                placeholder="e.g. 89.5"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Entry
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-muted">Starting</span>
                            <span className="font-bold">{masterPlan.user.startWeight} kg</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-muted">Current</span>
                            <span className="font-bold text-text">{data.weightLog[data.weightLog.length - 1]?.weight} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted">Goal</span>
                            <span className="font-bold text-primary">{masterPlan.user.goalWeight} kg</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;
