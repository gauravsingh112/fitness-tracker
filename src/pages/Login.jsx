import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Call the mock login endpoint
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);

            const { token, user } = res.data;
            login(token, user);
            navigate('/onboarding');
        } catch (error) {
            console.error('Login Failed:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 15, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-surface/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl z-10 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-muted">Sign in to continue your fitness journey</p>
                    </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="email"
                                required
                                placeholder="hello@example.com"
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-6 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </form>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center text-xs text-muted/50"
                >
                    Don't have an account? No problem, we'll create one for you instantly.
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
