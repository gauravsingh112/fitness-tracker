import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BookOpen, TrendingUp, Dumbbell } from 'lucide-react';
import { clsx } from 'clsx';
import ThemeToggle from '../ui/ThemeToggle';

const Sidebar = ({ onItemClick }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CheckSquare, label: 'Daily Tracker', path: '/tracker' },
    { icon: BookOpen, label: 'My Plan', path: '/plan' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-surface md:bg-transparent transition-colors duration-300">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Dumbbell className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          FitTrack
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                isActive
                  ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(34,197,94,0.1)] font-medium"
                  : "text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-medium text-muted">Theme</span>
          <ThemeToggle />
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-black/5 to-black/10 dark:from-black/40 dark:to-black/20 border border-border backdrop-blur-sm">
          <p className="text-xs text-muted mb-1">Current Goal</p>
          <p className="text-sm font-bold text-text">75 kg by Feb 2026</p>
          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-[15%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
