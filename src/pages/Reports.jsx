import React, { useState } from 'react';
import { logService } from '../services/api';
import { Download, Calendar, FileText, Clock, History, Sun } from 'lucide-react';
import { clsx } from 'clsx';
import { masterPlan } from '../data/masterPlan';

const Reports = () => {
    const [reportType, setReportType] = useState('mtd'); // 'mtd', 'daily', 'range', 'yesterday', 'last7', 'today'
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateReport = async () => {
        setLoading(true);
        try {
            let data;
            const today = new Date();

            if (reportType === 'mtd') {
                data = await logService.getMTDReport();
            } else if (reportType === 'today') {
                const dateStr = today.toISOString().split('T')[0];
                data = await logService.getRangeReport(dateStr, dateStr);
            } else if (reportType === 'yesterday') {
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                const dateStr = yesterday.toISOString().split('T')[0];
                data = await logService.getRangeReport(dateStr, dateStr);
            } else if (reportType === 'last7') {
                const last7 = new Date(today);
                last7.setDate(last7.getDate() - 7);
                const startStr = last7.toISOString().split('T')[0];
                const endStr = today.toISOString().split('T')[0];
                data = await logService.getRangeReport(startStr, endStr);
            } else if (reportType === 'range') {
                if (!dateRange.start || !dateRange.end) {
                    alert('Please select both start and end dates');
                    setLoading(false);
                    return;
                }
                data = await logService.getRangeReport(dateRange.start, dateRange.end);
            }

            setReportData(Array.isArray(data) ? data : (data ? [data] : []));
        } catch (error) {
            console.error("Failed to generate report:", error);
            setReportData([]);
        } finally {
            setLoading(false);
        }
    };

    const getDailyStats = (log) => {
        const date = new Date(log.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        // 1. Habits
        const allHabits = masterPlan.habits;
        const completedHabits = allHabits.filter(h => (log.habits || []).includes(h.id)).map(h => h.name);
        const missedHabits = allHabits.filter(h => !(log.habits || []).includes(h.id)).map(h => h.name);

        // 2. Meals
        const allMeals = masterPlan.diet.meals;
        const completedMeals = allMeals.filter(m => (log.meals || []).includes(m.id)).map(m => m.name);
        const missedMeals = allMeals.filter(m => !(log.meals || []).includes(m.id)).map(m => m.name);

        // 3. Exercises
        // Find scheduled workout for this day
        const scheduledWorkout = masterPlan.workout.schedule.find(d => d.day === dayName) || masterPlan.workout.schedule[0];
        const allExercises = scheduledWorkout.exercises; // Array of strings
        // log.exercises stores indices
        const completedExercises = (log.exercises || []).map(idx => allExercises[idx]).filter(Boolean);
        const missedExercises = allExercises.filter((_, idx) => !(log.exercises || []).includes(idx));

        // 4. Score Calculation
        const totalItems = allHabits.length + allMeals.length + allExercises.length;
        const completedCount = completedHabits.length + completedMeals.length + completedExercises.length;
        const score = totalItems > 0 ? ((completedCount / totalItems) * 10).toFixed(1) : 0;

        return {
            id: log._id,
            date: date.toLocaleDateString(),
            weight: log.weight,
            goalWeight: masterPlan.user.goalWeight,
            score,
            completedHabits,
            missedHabits,
            completedMeals,
            missedMeals,
            completedExercises,
            missedExercises,
            notes: log.notes
        };
    };

    const downloadCSV = () => {
        if (!reportData || reportData.length === 0) return;

        // Define headers
        const headers = [
            'Log ID',
            'Date',
            'Score (/10)',
            'Current Weight (kg)',
            'Goal Weight (kg)',
            'Completed Habits',
            'Missed Habits',
            'Completed Meals',
            'Missed Meals',
            'Completed Exercises',
            'Missed Exercises',
            'Notes'
        ];

        // Convert data to CSV rows
        const rows = reportData.map(log => {
            const stats = getDailyStats(log);

            return [
                stats.id,
                stats.date,
                stats.score,
                stats.weight || '-',
                stats.goalWeight,
                stats.completedHabits.join('; '),
                stats.missedHabits.join('; '),
                stats.completedMeals.join('; '),
                stats.missedMeals.join('; '),
                stats.completedExercises.join('; '),
                stats.missedExercises.join('; '),
                (stats.notes || '').replace(/,/g, ' ')
            ].map(field => `"${field}"`).join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `fitness_report_detailed_${reportType}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <header>
                <h2 className="text-2xl font-bold text-text">Reports & Analytics</h2>
                <p className="text-muted">Generate and download your fitness data</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Control Panel */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-surface border border-white/5 p-6 rounded-2xl space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-3">Report Type</label>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setReportType('today')}
                                    className={clsx(
                                        "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3",
                                        reportType === 'today'
                                            ? "bg-primary/10 text-primary border border-primary/50"
                                            : "bg-black/20 text-muted border border-transparent hover:bg-white/5"
                                    )}
                                >
                                    <Sun className="w-4 h-4" />
                                    Today
                                </button>
                                <button
                                    onClick={() => setReportType('mtd')}
                                    className={clsx(
                                        "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3",
                                        reportType === 'mtd'
                                            ? "bg-primary/10 text-primary border border-primary/50"
                                            : "bg-black/20 text-muted border border-transparent hover:bg-white/5"
                                    )}
                                >
                                    <Calendar className="w-4 h-4" />
                                    Month to Date
                                </button>
                                <button
                                    onClick={() => setReportType('yesterday')}
                                    className={clsx(
                                        "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3",
                                        reportType === 'yesterday'
                                            ? "bg-primary/10 text-primary border border-primary/50"
                                            : "bg-black/20 text-muted border border-transparent hover:bg-white/5"
                                    )}
                                >
                                    <Clock className="w-4 h-4" />
                                    Yesterday
                                </button>
                                <button
                                    onClick={() => setReportType('last7')}
                                    className={clsx(
                                        "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3",
                                        reportType === 'last7'
                                            ? "bg-primary/10 text-primary border border-primary/50"
                                            : "bg-black/20 text-muted border border-transparent hover:bg-white/5"
                                    )}
                                >
                                    <History className="w-4 h-4" />
                                    Last 7 Days
                                </button>
                                <button
                                    onClick={() => setReportType('range')}
                                    className={clsx(
                                        "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3",
                                        reportType === 'range'
                                            ? "bg-primary/10 text-primary border border-primary/50"
                                            : "bg-black/20 text-muted border border-transparent hover:bg-white/5"
                                    )}
                                >
                                    <FileText className="w-4 h-4" />
                                    Custom Range
                                </button>
                            </div>
                        </div>

                        {reportType === 'range' && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                <div>
                                    <label className="text-xs text-muted block mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={dateRange.start}
                                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted block mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={dateRange.end}
                                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={generateReport}
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Generating...' : 'Generate Report'}
                        </button>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="md:col-span-2">
                    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full min-h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Report Preview</h3>
                            {reportData && reportData.length > 0 && (
                                <button
                                    onClick={downloadCSV}
                                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Detailed CSV
                                </button>
                            )}
                        </div>

                        <div className="flex-1 bg-black/30 rounded-xl p-4 overflow-auto font-mono text-xs text-muted border border-white/5">
                            {reportData && reportData.length > 0 ? (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-primary">
                                            <th className="p-2">Date</th>
                                            <th className="p-2">Score</th>
                                            <th className="p-2">Weight</th>
                                            <th className="p-2">Missed Items</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.map((log, i) => {
                                            const stats = getDailyStats(log);
                                            const missedCount = stats.missedHabits.length + stats.missedMeals.length + stats.missedExercises.length;
                                            return (
                                                <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="p-2">{stats.date}</td>
                                                    <td className="p-2 font-bold text-text">{stats.score}/10</td>
                                                    <td className="p-2">{stats.weight || '-'}</td>
                                                    <td className="p-2 text-red-400">{missedCount} items</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="h-full flex items-center justify-center text-muted/50">
                                    {reportData ? 'No data found for this period' : 'Select a report type and click generate to view data'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
