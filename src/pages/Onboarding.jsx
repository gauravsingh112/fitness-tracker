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

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(curr => curr - 1);
        }
    };

    const handleDragEnd = (event, info) => {
        if (info.offset.x < -50) {
            nextSlide();
        } else if (info.offset.x > 50) {
            prevSlide();
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative touch-none">
            {/* Optimized Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-3xl will-change-transform"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-1/4 -right-1/4 w-[80vw] h-[80vw] bg-blue-500/10 rounded-full blur-3xl will-change-transform"
                />
            </div>

            <div className="w-full max-w-md px-6 relative z-10 flex flex-col h-full justify-center">
                <div className="mb-8 flex justify-center">
                    <div className="flex gap-2">
                        {slides.map((_, idx) => (
                            <motion.div
                                key={idx}
                                animate={{
                                    width: idx === currentSlide ? 32 : 8,
                                    backgroundColor: idx === currentSlide ? '#22c55e' : '#333'
                                }}
                                className="h-2 rounded-full transition-colors duration-300"
                            />
                        ))}
                    </div>
                </div>

                <div className="relative h-[450px] w-full">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            className="absolute inset-0 flex flex-col items-center text-center cursor-grab active:cursor-grabbing"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center mb-10 shadow-2xl shadow-primary/20`}
                            >
                                {React.createElement(slides[currentSlide].icon, { className: "w-20 h-20 text-white" })}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-bold text-white mb-4 px-4"
                            >
                                {slides[currentSlide].title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-muted text-lg leading-relaxed px-4"
                            >
                                {slides[currentSlide].description}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                    className="w-full py-4 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mt-4 active:bg-primary/90"
                >
                    {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                    <ChevronRight className="w-5 h-5" />
                </motion.button>

                <p className="text-center text-xs text-muted/50 mt-6">
                    Swipe left or right to navigate
                </p>
            </div>
        </div>
    );
};

export default Onboarding;
