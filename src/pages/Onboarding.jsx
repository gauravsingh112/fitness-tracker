import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Activity, BarChart2, Target } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Welcome to FitTrack",
        description: "Your ultimate companion for tracking workouts, meals, and habits.",
        icon: Activity,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        title: "Track Everything",
        description: "Log your daily progress with ease. Don't just guess, measure your success.",
        icon: BarChart2,
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "Achieve Your Goals",
        description: "Visualize your journey and hit your targets one day at a time.",
        icon: Target,
        color: "from-green-500 to-emerald-500"
    }
];

const Onboarding = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(curr => curr + 1);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/2 w-[100vw] h-[100vw] bg-primary/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/2 -right-1/2 w-[100vw] h-[100vw] bg-blue-500/5 rounded-full blur-3xl"
                />
            </div>

            <div className="w-full max-w-md px-6 relative z-10">
                <div className="mb-12 flex justify-center">
                    <div className="flex gap-2">
                        {slides.map((_, idx) => (
                            <motion.div
                                key={idx}
                                animate={{
                                    width: idx === currentSlide ? 32 : 8,
                                    backgroundColor: idx === currentSlide ? '#22c55e' : '#333'
                                }}
                                className="h-2 rounded-full"
                            />
                        ))}
                    </div>
                </div>

                <div className="relative h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute inset-0 flex flex-col items-center text-center"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                                className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center mb-8 shadow-2xl shadow-primary/20`}
                            >
                                {React.createElement(slides[currentSlide].icon, { className: "w-16 h-16 text-white" })}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-bold text-white mb-4"
                            >
                                {slides[currentSlide].title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-muted text-lg leading-relaxed"
                            >
                                {slides[currentSlide].description}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                    className="w-full py-4 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow mt-8"
                >
                    {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
};

export default Onboarding;
