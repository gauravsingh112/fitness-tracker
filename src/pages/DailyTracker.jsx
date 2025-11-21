import React from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

const CheckItem = ({ checked, onClick, label, subtext }) => (
    <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={clsx(
            "flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-200",
            checked
                ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(74,222,128,0.1)]"
                : "bg-surface border-border hover:border-muted/50 hover:bg-black/5 dark:hover:bg-white/5"
        )}
    >
        <div className={clsx(
            "w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors shrink-0",
            checked ? "bg-primary border-primary" : "border-muted/30"
        )}>
            {checked && <Check className="w-4 h-4 text-black stroke-[3px]" />}
        </div>
        <div>
            <p className={clsx("font-semibold text-base", checked ? "text-text" : "text-muted")}>{label}</p>
            {subtext && <p className="text-sm text-muted mt-0.5">{subtext}</p>}
        </div>
    </motion.div>
);

const DailyTracker = () => {
    const { masterPlan, today, getDailyLog, toggleItem } = useStore();
    const log = getDailyLog(today);

    // Determine workout for today (simple logic based on day of week)
    const dayName = new Date(today).toLocaleDateString('en-US', { weekday: 'long' });
    const todaysWorkout = masterPlan.workout.schedule.find(d => d.day === dayName) || masterPlan.workout.schedule[0];

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-20">
            <header className="text-center">
                <h2 className="text-2xl font-bold text-text">{new Date(today).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
                <p className="text-muted">Track your daily wins</p>
            </header>

            {/* Habits Section */}
            <section>
                <h3 className="text-lg font-semibold mb-4 text-primary">Daily Habits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {masterPlan.habits.map(habit => (
                        <CheckItem
                            key={habit.id}
                            label={habit.name}
                            checked={log.habits.includes(habit.id)}
                            onClick={() => toggleItem('habits', habit.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Diet Section */}
            <section>
                <h3 className="text-lg font-semibold mb-4 text-secondary">Diet Plan</h3>
                <div className="space-y-3">
                    {masterPlan.diet.meals.map(meal => (
                        <CheckItem
                            key={meal.id}
                            label={meal.name}
                            subtext={meal.options[0]}
                            checked={log.meals.includes(meal.id)}
                            onClick={() => toggleItem('meals', meal.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Workout Section */}
            <section>
                <h3 className="text-lg font-semibold mb-4 text-orange-400">Workout: {todaysWorkout.focus}</h3>
                <div className="space-y-3">
                    {todaysWorkout.exercises.map((ex, idx) => (
                        <CheckItem
                            key={idx}
                            label={ex}
                            checked={log.exercises.includes(idx)}
                            onClick={() => toggleItem('exercises', idx)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DailyTracker;
