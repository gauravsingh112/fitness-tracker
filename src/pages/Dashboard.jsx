import React from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { Flame, Scale, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-surface border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors"
    >
        <div className={`absolute -top-2 -right-2 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}`}>
            <Icon className="w-32 h-32" />
        </div>
        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center mb-4 text-${color} border border-${color}/20`}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
            <h3 className="text-3xl font-bold text-text mb-1 tracking-tight">{value}</h3>
            <p className="text-xs text-gray-500 font-medium">{subtext}</p>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { masterPlan, stats, today, getDailyLog } = useStore();
    const log = getDailyLog(today);

    const completedTasks = log.meals.length + log.exercises.length + log.habits.length;
    const totalTasks = masterPlan.diet.meals.length + 1 + masterPlan.habits.length; // +1 for workout
    const progress = Math.round((completedTasks / totalTasks) * 100) || 0;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {masterPlan.user.name.split(' ')[0]} 👋</h1>
                <p className="text-muted">Let's crush your goals for today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    icon={Scale}
                    label="Current Weight"
                    value={`${stats.currentWeight} kg`}
                    subtext={`Goal: ${masterPlan.user.goalWeight} kg`}
                    color="blue-500"
                />
                <StatCard
                    icon={Flame}
                    label="Daily Streak"
                    value="5 Days"
                    subtext="Keep it up!"
                    color="orange-500"
                />
                <StatCard
                    icon={Calendar}
                    label="Days Left"
                    value="85"
                    subtext="Until target date"
                    color="primary"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Daily Progress */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-surface to-black border border-white/5"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Today's Progress</h3>
                        <span className="text-2xl font-bold text-primary">{progress}%</span>
                    </div>
                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden mb-6">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Meals Logged</span>
                            <span>{log.meals.length} / {masterPlan.diet.meals.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Workout</span>
                            <span className={log.exercises.length > 0 ? "text-primary" : "text-muted"}>
                                {log.exercises.length > 0 ? "Completed" : "Pending"}
                            </span>
                        </div>
                    </div>
                    <Link to="/tracker" className="mt-6 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 transition-colors">
                        Go to Tracker <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Today's Workout Preview */}
                <div className="p-6 rounded-2xl bg-surface border border-white/5">
                    <h3 className="text-lg font-bold mb-4">Today's Workout</h3>
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                        <h4 className="font-bold text-primary text-lg">PUSH DAY</h4>
                        <p className="text-sm text-primary/80">Chest, Shoulders, Triceps</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Flat Dumbbell Press</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Incline Dumbbell Press</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Overhead Press</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> + 4 more exercises</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
