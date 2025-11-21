import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const PlanCard = ({ title, items, color }) => (
    <div className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-colors">
        <h3 className={`text-lg font-bold mb-4 text-${color}`}>{title}</h3>
        <ul className="space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-300 flex gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full bg-${color} mt-2 shrink-0`} />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const MyPlan = () => {
    const { masterPlan } = useStore();
    const [activeTab, setActiveTab] = useState('diet');

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">My Master Plan</h2>
                    <p className="text-muted">Your blueprint for success</p>
                </div>
                <div className="flex p-1 bg-surface rounded-xl border border-white/5">
                    {['diet', 'workout'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "px-6 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                                activeTab === tab
                                    ? "bg-primary text-black shadow-lg"
                                    : "text-muted hover:text-text"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {activeTab === 'diet' ? (
                    masterPlan.diet.meals.map(meal => (
                        <PlanCard
                            key={meal.id}
                            title={`${meal.time} - ${meal.name}`}
                            items={meal.options}
                            color="blue-400"
                        />
                    ))
                ) : (
                    masterPlan.workout.schedule.map((day, idx) => (
                        <PlanCard
                            key={idx}
                            title={`${day.day} - ${day.focus}`}
                            items={day.exercises}
                            color="orange-400"
                        />
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default MyPlan;
