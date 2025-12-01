// ============================================
// FIRST DYNAMICS DASHBOARD - COMPACT MOBILE VERSION
// ============================================

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllDashboardData } from './notionService';
import { CONFIG } from './config';

// ============================================
// DEMO DATA
// ============================================
const DEMO_DATA = {
  streaks: { deepWork: 5, cleanEating: 3, bedtime: 2, movement: 4 },
  systems: [
    { name: 'Сон', value: '7.9 ч', norm: '7-8', status: '🟢' },
    { name: 'Вода', value: '3 л', norm: '>2.5', status: '🟢' },
    { name: 'Физ.форма', value: '✓', norm: '✓', status: '🟢' },
    { name: 'Здоровье', value: '103.3 кг', norm: '89-91', status: '🟡' },
    { name: 'Deep Work', value: '2.5 ч', norm: '≥4 ч', status: '🟡' },
    { name: 'Питание', value: '8', norm: '7-10', status: '🟢' },
  ],
  achievements: [
    { name: 'First Flame: Deep Work', level: 'Bronze', isUnlocked: true, timesEarned: 1, emoji: '🔥' },
    { name: 'First Flame: Clean Eating', level: 'Bronze', isUnlocked: false, timesEarned: 0, emoji: '🔥' },
    { name: 'First Flame: Bedtime', level: 'Bronze', isUnlocked: false, timesEarned: 0, emoji: '🔥' },
    { name: 'First Flame: Movement', level: 'Bronze', isUnlocked: false, timesEarned: 0, emoji: '🔥' },
    { name: 'Week Warrior', level: 'Silver', isUnlocked: false, timesEarned: 0, emoji: '⚔️' },
    { name: 'All Stars: 3 Days', level: 'Bronze', isUnlocked: false, timesEarned: 0, emoji: '⭐' },
    { name: 'Two Week Titan', level: 'Gold', isUnlocked: false, timesEarned: 0, emoji: '💪' },
    { name: 'Month Master', level: 'Platinum', isUnlocked: false, timesEarned: 0, emoji: '🏆' },
    { name: 'Diamond Legend', level: 'Diamond', isUnlocked: false, timesEarned: 0, emoji: '💎' },
    { name: 'Unicorn', level: 'Diamond', isUnlocked: false, timesEarned: 0, emoji: '🦄' },
  ],
};

// ============================================
// ANIMATED FIRE (Compact)
// ============================================
const AnimatedFire = ({ size = 18, intensity = 1, showParticles = true }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (!showParticles || !CONFIG.ENABLE_PARTICLES) return;
    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => Date.now() - p.id < 800);
        if (filtered.length < 2) {
          filtered.push({ id: Date.now(), x: Math.random() * 10 - 5 });
        }
        return filtered;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [showParticles]);

  return (
    <motion.div 
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={{ 
        scale: [1, 1.1, 0.95, 1],
        rotate: [-2, 2, -1, 0],
      }}
      transition={{ duration: 0.4, repeat: Infinity }}
    >
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full"
          initial={{ opacity: 1, y: 0, x: p.x }}
          animate={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.8 }}
          style={{ bottom: '50%' }}
        />
      ))}
      
      <svg viewBox="0 0 24 24" width={size} height={size} 
        style={{ filter: `brightness(${0.9 + intensity * 0.3}) drop-shadow(0 0 ${2 + intensity * 3}px rgba(251,191,36,0.6))` }}>
        <defs>
          <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#dc2626"/>
            <stop offset="40%" stopColor="#f97316"/>
            <stop offset="70%" stopColor="#fbbf24"/>
            <stop offset="100%" stopColor="#fef3c7"/>
          </linearGradient>
        </defs>
        <path d="M12 2C12 2 7 7 7 11C7 13.5 8.5 15 10 15.5C9 14.5 8.5 13 9 11.5C9.5 10 11 8 12 6.5C13 8 14.5 10 15 11.5C15.5 13 15 14.5 14 15.5C15.5 15 17 13.5 17 11C17 7 12 2 12 2Z" fill="url(#fireGrad)"/>
        <path d="M12 7C12 7 10 9 10 11C10 12 10.5 13 12 13C13.5 13 14 12 14 11C14 9 12 7 12 7Z" fill="#fef3c7" opacity="0.9"/>
      </svg>
    </motion.div>
  );
};

// ============================================
// ANIMATED DIAMOND (Compact)
// ============================================
const AnimatedDiamond = ({ size = 16 }) => {
  return (
    <motion.div 
      className="relative inline-flex items-center justify-center" 
      style={{ width: size, height: size }}
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} style={{ filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.6))' }}>
        <defs>
          <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c4b5fd"/>
            <stop offset="50%" stopColor="#8b5cf6"/>
            <stop offset="100%" stopColor="#7c3aed"/>
          </linearGradient>
        </defs>
        <path d="M12 2L2 9L12 22L22 9L12 2Z" fill="url(#diamondGrad)"/>
        <path d="M12 2L7 9H17L12 2Z" fill="#e0e7ff" opacity="0.6"/>
      </svg>
      
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${20 + Math.sin(i * Math.PI / 2) * 30}%`,
            left: `${50 + Math.cos(i * Math.PI / 2) * 40}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
};

// ============================================
// ANIMATED TROPHY (Compact)
// ============================================
const AnimatedTrophy = ({ size = 16 }) => {
  return (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size}
      animate={{ 
        filter: [
          'drop-shadow(0 0 2px rgba(251,191,36,0.4))',
          'drop-shadow(0 0 8px rgba(251,191,36,0.8))',
          'drop-shadow(0 0 2px rgba(251,191,36,0.4))',
        ],
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <defs>
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d"/>
          <stop offset="100%" stopColor="#f59e0b"/>
        </linearGradient>
      </defs>
      <path d="M6 4H18V8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8V4Z" fill="url(#trophyGrad)"/>
      <path d="M4 4H6V8C6 8.5 6.1 9 6.2 9.5L4 9C3 8.5 3 7 3 6.5C3 5.5 3.5 4.5 4 4Z" fill="#fbbf24"/>
      <path d="M20 4H18V8C18 8.5 17.9 9 17.8 9.5L20 9C21 8.5 21 7 21 6.5C21 5.5 20.5 4.5 20 4Z" fill="#fbbf24"/>
      <rect x="10" y="14" width="4" height="3" fill="#f59e0b"/>
      <rect x="8" y="17" width="8" height="3" rx="1" fill="#d97706"/>
    </motion.svg>
  );
};

// ============================================
// COMPACT STREAK CARD
// ============================================
const StreakCard = ({ name, icon, days, target, category, isActive = true }) => {
  const progress = Math.min((days / target) * 100, 100);
  const isCompleted = days >= target;
  
  const colors = {
    'Deep Work': { bg: 'from-blue-500/20 to-blue-600/10', ring: 'ring-blue-500/50', bar: 'from-blue-400 to-blue-600' },
    'Clean Eating': { bg: 'from-green-500/20 to-green-600/10', ring: 'ring-green-500/50', bar: 'from-green-400 to-green-600' },
    'Bedtime': { bg: 'from-purple-500/20 to-purple-600/10', ring: 'ring-purple-500/50', bar: 'from-purple-400 to-purple-600' },
    'Movement': { bg: 'from-orange-500/20 to-orange-600/10', ring: 'ring-orange-500/50', bar: 'from-orange-400 to-orange-600' },
  };
  const c = colors[category] || colors['Deep Work'];

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${c.bg} backdrop-blur-sm p-3 ring-1 ${c.ring}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Floating particles */}
      {isActive && [0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
          animate={{ y: [0, -20], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          style={{ left: `${20 + i * 25}%`, bottom: '20%' }}
        />
      ))}
      
      <div className="relative flex items-center gap-2 mb-2">
        <motion.div 
          className="text-lg"
          animate={isActive ? { rotate: [-5, 5, -5] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {icon}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-xs truncate">{name}</h3>
          <p className="text-white/50 text-[10px]">{category}</p>
        </div>
        
        <div className="flex items-center gap-1">
          {days > 0 && <AnimatedFire size={16} intensity={Math.min(days / 7, 1)} showParticles={false} />}
          <motion.span 
            className="text-xl font-bold text-white"
            key={days}
            initial={{ scale: 1.3, color: '#fbbf24' }}
            animate={{ scale: 1, color: '#ffffff' }}
          >
            {days}
          </motion.span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-1.5 bg-black/30 rounded-full overflow-hidden">
        <motion.div 
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${c.bar} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {isCompleted && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      
      <div className="flex justify-between mt-1.5 text-[10px] text-white/50">
        <span>{days} дней</span>
        <span>Цель: {target}</span>
      </div>
      
      {isCompleted && (
        <motion.div 
          className="absolute top-1 right-1 text-sm"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ✨
        </motion.div>
      )}
    </motion.div>
  );
};

// ============================================
// COMPACT ACHIEVEMENT BADGE
// ============================================
const AchievementBadge = ({ name, level, isUnlocked, timesEarned, emoji, isInProgress }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const levelConfig = {
    Bronze: { gradient: 'from-orange-600 to-orange-800', glow: 'rgba(249, 115, 22, 0.5)' },
    Silver: { gradient: 'from-gray-300 to-gray-500', glow: 'rgba(156, 163, 175, 0.5)' },
    Gold: { gradient: 'from-yellow-400 to-amber-500', glow: 'rgba(251, 191, 36, 0.5)' },
    Platinum: { gradient: 'from-cyan-400 to-blue-500', glow: 'rgba(34, 211, 238, 0.5)' },
    Diamond: { gradient: 'from-purple-400 to-indigo-500', glow: 'rgba(139, 92, 246, 0.5)' },
  };
  const cfg = levelConfig[level] || levelConfig.Bronze;
  
  const getIcon = () => {
    if (emoji === '🦄') return <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>🦄</motion.span>;
    if (emoji === '💎') return <AnimatedDiamond size={16} />;
    if (emoji === '🏆') return <AnimatedTrophy size={16} />;
    return <span>{emoji}</span>;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.div 
        className={`w-11 h-11 rounded-lg bg-gradient-to-br ${cfg.gradient} flex items-center justify-center relative overflow-hidden cursor-pointer`}
        style={{
          boxShadow: isUnlocked ? `0 0 12px ${cfg.glow}` : 'none',
          opacity: isUnlocked ? 1 : 0.35,
          filter: isUnlocked ? 'none' : 'grayscale(100%)',
        }}
        whileHover={{ scale: 1.15 }}
        animate={isUnlocked ? {
          boxShadow: [`0 0 8px ${cfg.glow}`, `0 0 16px ${cfg.glow}`, `0 0 8px ${cfg.glow}`],
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {isUnlocked && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0"
            animate={{ x: ['-100%', '100%'], y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        <div className="relative z-10 text-base">{getIcon()}</div>
        
        {isInProgress && !isUnlocked && (
          <motion.div 
            className="absolute inset-0 border-2 border-yellow-400 rounded-lg"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        
        {timesEarned > 1 && (
          <motion.div 
            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[9px] font-bold text-gray-800 shadow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {timesEarned}
          </motion.div>
        )}
      </motion.div>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900/95 rounded text-center whitespace-nowrap z-50 pointer-events-none"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <p className="text-white text-[10px] font-medium">{name}</p>
            <p className="text-white/50 text-[9px]">{level}</p>
            {isUnlocked && timesEarned > 0 && (
              <p className="text-green-400 text-[9px]">×{timesEarned}</p>
            )}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// COMPACT SYSTEM STATUS
// ============================================
const SystemStatus = ({ name, value, norm, status }) => {
  const colors = {
    '🟢': { bg: 'bg-green-500', shadow: 'shadow-green-500/50' },
    '🟡': { bg: 'bg-yellow-500', shadow: 'shadow-yellow-500/50' },
    '🔴': { bg: 'bg-red-500', shadow: 'shadow-red-500/50' },
  };
  const c = colors[status] || colors['🟢'];

  return (
    <motion.div 
      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
      whileHover={{ x: 3 }}
    >
      <motion.div 
        className={`w-2 h-2 rounded-full ${c.bg} shadow-lg ${c.shadow}`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="text-white/70 text-xs flex-1 truncate">{name}</span>
      <div className="text-right">
        <motion.span 
          className="text-white text-xs font-medium"
          key={value}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
        >
          {value}
        </motion.span>
        <span className="text-white/30 text-[10px] ml-1">/{norm}</span>
      </div>
    </motion.div>
  );
};

// ============================================
// PARTICLE BACKGROUND
// ============================================
const ParticleBackground = ({ count = 15 }) => {
  if (!CONFIG.ENABLE_PARTICLES) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/20 rounded-full"
          initial={{ x: `${Math.random() * 100}%`, y: '100%' }}
          animate={{ y: '-10%', opacity: [0, 0.5, 0] }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useDemo, setUseDemo] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchAllDashboardData();
      
      if (result.error) throw new Error(result.error);
      
      setData(result);
      setLastUpdate(new Date());
      setUseDemo(false);
    } catch (err) {
      console.error('Failed to load data:', err);
      if (CONFIG.SHOW_DEMO_ON_ERROR) setUseDemo(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [loadData]);

  const d = useDemo ? DEMO_DATA : (data || DEMO_DATA);
  const streaks = d?.streaks || DEMO_DATA.streaks;
  const systems = d?.systems || DEMO_DATA.systems;
  const achievements = d?.achievements || DEMO_DATA.achievements;
  
  const totalStreak = Object.values(streaks).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 font-sans relative overflow-hidden">
      <ParticleBackground count={15} />
      
      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            First Dynamics
          </h1>
          <div className="text-white/40 text-[10px]">
            {new Date().toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}
          </div>
        </motion.div>
        
        {/* Quick Stats */}
        <motion.div 
          className="flex gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 ring-1 ring-orange-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <AnimatedFire size={14} showParticles={false} />
            <span className="text-white font-bold text-sm">{totalStreak}</span>
            <span className="text-white/50 text-[10px]">Total</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 ring-1 ring-purple-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm">🏅</span>
            <span className="text-white font-bold text-sm">{unlockedCount}/{achievements.length}</span>
          </motion.div>
          
          {useDemo && (
            <motion.div 
              className="ml-auto px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Demo
            </motion.div>
          )}
        </motion.div>
        
        {/* Streaks Section */}
        <section className="mb-4">
          <motion.h2 
            className="text-xs font-semibold text-white/70 mb-2 flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AnimatedFire size={12} showParticles={false} /> Daily Streaks
          </motion.h2>
          
          <div className="grid grid-cols-2 gap-2">
            <StreakCard name="Deep Work" icon="🧠" days={streaks.deepWork || 0} target={7} category="Deep Work" />
            <StreakCard name="Clean Eating" icon="🍽️" days={streaks.cleanEating || 0} target={7} category="Clean Eating" />
            <StreakCard name="Bedtime" icon="🌙" days={streaks.bedtime || 0} target={7} category="Bedtime" />
            <StreakCard name="Movement" icon="🏃" days={streaks.movement || 0} target={7} category="Movement" />
          </div>
        </section>
        
        {/* Achievements Section */}
        <section className="mb-4">
          <motion.h2 
            className="text-xs font-semibold text-white/70 mb-2 flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <AnimatedTrophy size={12} /> Achievements
          </motion.h2>
          
          <motion.div 
            className="p-3 rounded-xl bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <AchievementBadge {...achievement} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Systems Status Section */}
        <section>
          <motion.h2 
            className="text-xs font-semibold text-white/70 mb-2 flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            📊 System Status
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {systems.map((system, i) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.03 }}
              >
                <SystemStatus {...system} />
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Footer */}
        {lastUpdate && !useDemo && (
          <motion.p 
            className="text-center text-white/20 text-[9px] mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Обновлено: {lastUpdate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </motion.p>
        )}
      </div>
    </div>
  );
}
