/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crosshair, 
  Target, 
  Zap, 
  Eye, 
  Settings, 
  Shield, 
  Terminal, 
  Activity,
  ChevronRight,
  Power,
  Cpu,
  Wifi,
  Lock
} from 'lucide-react';

// --- Types ---
interface ToggleState {
  id: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
}

// --- Components ---

const StatusBadge = ({ label, value, color = "emerald" }: { label: string, value: string, color?: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{label}</span>
    <span className={`text-xs font-mono font-bold text-${color}-400`}>{value}</span>
  </div>
);

function ModToggle({ toggle, onToggle }: { toggle: ToggleState, onToggle: (id: string) => void }) {
  return (
    <div 
      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
      onClick={() => onToggle(toggle.id)}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${toggle.active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/40'} transition-colors`}>
          {toggle.icon}
        </div>
        <span className={`text-sm font-medium ${toggle.active ? 'text-white' : 'text-white/60'}`}>{toggle.label}</span>
      </div>
      <div className={`w-10 h-5 rounded-full relative transition-colors ${toggle.active ? 'bg-cyan-500' : 'bg-white/10'}`}>
        <motion.div 
          animate={{ x: toggle.active ? 22 : 2 }}
          className="absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm"
        />
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(true);
  const [fov, setFov] = useState(150);
  const [toggles, setToggles] = useState<ToggleState[]>([
    { id: 'aim-assist', label: 'Aim Assist', active: false, icon: <Target size={16} /> },
    { id: 'aim-tiro', label: 'Aim Tiro (Auto-Fire)', active: true, icon: <Zap size={16} /> },
    { id: 'aim-mira', label: 'Aim Mira (Scope Lock)', active: true, icon: <Crosshair size={16} /> },
    { id: 'esp', label: 'ESP Visuals', active: false, icon: <Eye size={16} /> },
    { id: 'auto-kill', label: 'Auto Kill (Simulated)', active: false, icon: <Activity size={16} /> },
  ]);

  const [isInitializing, setIsInitializing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isInitializing) return;
      const messages = [
        "Bypassing security protocols...",
        "Injecting scripts into runtime...",
        "Optimizing network latency...",
        "Calibrating aim vectors...",
        "Status: UNDETECTED",
        "Memory address 0x7FF8 verified.",
        "Anti-cheat heartbeat spoofed."
      ];
      setLogs(prev => [messages[Math.floor(Math.random() * messages.length)], ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, [isInitializing]);

  const handleToggle = (id: string) => {
    setToggles(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const handleInitialize = () => {
    if (isInitializing || !active) return;
    
    setIsInitializing(true);
    setLogs(prev => [">>> STARTING INJECTION SEQUENCE", ...prev]);
    
    setTimeout(() => {
      setLogs(prev => [">>> BYPASSING GARENA ANTI-CHEAT...", ...prev]);
      setTimeout(() => {
        setLogs(prev => [">>> MODS INITIALIZED. LAUNCHING GAME...", ...prev]);
        
        // Attempt to open Free Fire via deep link
        window.location.href = "freefire://";
        
        // Reset state after a delay
        setTimeout(() => {
          setIsInitializing(false);
          setLogs(prev => [">>> SYSTEM READY", ...prev]);
        }, 3000);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,#050505_100%)" />
      
      {/* Animated Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse delay-700" />

      {/* Main UI Container */}
      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Stats & System Info */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Shield className="text-black" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">ELITE DASHBOARD</h1>
                <p className="text-xs text-white/40 font-mono uppercase tracking-widest">Version v2.1.0 Stable</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <StatusBadge label="System Status" value="SECURE" color="emerald" />
              <StatusBadge label="Latency" value="24ms" color="cyan" />
              <StatusBadge label="CPU Usage" value="12%" color="purple" />
              <StatusBadge label="Encryption" value="AES-256" color="amber" />
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Live Console</span>
                <Terminal size={14} className="text-cyan-400" />
              </div>
              <div className="space-y-2 font-mono text-[11px]">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, i) => (
                    <motion.div
                      key={log + i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2 text-white/60"
                    >
                      <span className="text-cyan-500/50">{">"}</span>
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Network Node</h3>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
              <div className="p-2 rounded-md bg-cyan-500/20 text-cyan-400">
                <Wifi size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Global Proxy</span>
                  <span className="text-[10px] text-cyan-400 font-mono">ACTIVE</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["20%", "80%", "40%", "90%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="h-full bg-cyan-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Mod Menu Controls */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">THE KING CHEAT <span className="text-cyan-400">OFC</span></h2>
                <p className="text-sm text-white/40">Advanced Game Modification Interface</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActive(!active)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${active ? 'bg-cyan-500 border-cyan-400 text-black font-bold' : 'bg-white/5 border-white/10 text-white/60'}`}
                >
                  <Power size={16} />
                  {active ? 'SYSTEM ON' : 'SYSTEM OFF'}
                </button>
                <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white cursor-pointer">
                  <Settings size={20} />
                </div>
              </div>
            </div>

            {/* Grid of Toggles */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              {toggles.map((toggle) => (
                <React.Fragment key={toggle.id}>
                  <ModToggle toggle={toggle} onToggle={handleToggle} />
                </React.Fragment>
              ))}
            </div>

            {/* Slider Section */}
            <div className={`mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-purple-500/20 text-purple-400">
                    <Activity size={18} />
                  </div>
                  <span className="font-medium">Field of View (FOV)</span>
                </div>
                <span className="font-mono text-cyan-400 font-bold">{fov}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={fov} 
                onChange={(e) => setFov(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between mt-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                <span>Narrow</span>
                <span>Standard</span>
                <span>Wide</span>
                <span>Ultra</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleInitialize}
                disabled={isInitializing || !active}
                className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group ${
                  isInitializing 
                    ? 'bg-white/10 text-white/40 cursor-wait' 
                    : 'bg-cyan-500 text-black hover:bg-cyan-400'
                }`}
              >
                {isInitializing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity size={18} />
                  </motion.div>
                ) : (
                  <Zap size={18} className="group-hover:scale-110 transition-transform" />
                )}
                {isInitializing ? 'INITIALIZING...' : 'INITIALIZE MODS'}
              </button>
              <button className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Lock size={18} />
                BYPASS ANTI-CHEAT
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Cpu size={120} />
            </div>
          </motion.div>

          {/* Bottom Info Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Server: HK-01</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Users: 14,209</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
              <span>Security Patch: 2024.03.08</span>
              <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay when inactive */}
      <AnimatePresence>
        {!active && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          >
            <div className="text-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full border-4 border-white/10 border-t-cyan-500 mx-auto mb-6"
              />
              <h2 className="text-xl font-bold tracking-widest text-white/60">SYSTEM STANDBY</h2>
              <p className="text-xs font-mono text-white/20 mt-2">AWAITING INITIALIZATION SIGNAL</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
