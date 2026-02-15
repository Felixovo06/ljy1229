import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Calendar, Star, Clock, UtensilsCrossed, Sparkles, Map as MapIcon,
  ChevronRight, Navigation, Cake, Target, Shield, ExternalLink,
  Activity, AlertCircle, Crosshair, Music, X, RefreshCw, Disc,
  LogIn, UserCheck, Film, Book, Keyboard, FileType, Image as ImageIcon,
  GitBranch, FileText, LayoutGrid, Search, Heart, ArrowRight,
  Maximize, GraduationCap, Layout, Cpu, Zap, Radio, Box, ShieldCheck,
  Server, Smartphone, Coffee, Palette, Compass, MousePointer2, Grid3X3,
  Github, Globe, SearchCode, Command, Send, Ghost, ZapOff
} from 'lucide-react';

/**
 * 核心配置数据
 */
const INITIAL_DATA = {
  loveStartDate: "2022-01-12", 
  musicConfig: { playlistId: "8285130451" },
  fixedDates: [
    { name: "你的生日", date: "12-29", icon: <Cake size={16} /> },
  ],
  period: { nextStartDate: "2026-03-07", cycleLength: 30 },
  foodOptions: ["火锅", "螺蛳粉", "麻辣烫", "日料", "烤肉", "汉堡", "轻食", "湖南菜", "意面", "喝粥吧"],
  
  // 搜索引擎配置：已删除 Google，统一使用汉字首字（百、必、哔、抖）
  searchEngines: [
    { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=', color: '#2b32e2', icon: '百', theme: 'shadow-blue-600/50' },
    { id: 'bing', name: '必应', url: 'https://www.bing.com/search?q=', color: '#00809d', icon: '必', theme: 'shadow-teal-500/50' },
    { id: 'bilibili', name: 'B站', url: 'https://search.bilibili.com/all?keyword=', color: '#fb7299', icon: '哔', theme: 'shadow-rose-400/50' },
    { id: 'douyin', name: '抖音', url: 'https://www.douyin.com/search/', color: '#fe2c55', icon: '抖', theme: 'shadow-pink-500/50' }
  ],

  treasureChest: [
    { name: "猫TV影视", url: "https://tv.cattvv.com", icon: <Film size={20} />, color: "bg-rose-100 text-rose-600 shadow-rose-100" },
    { name: "生活百科", url: "https://zh.wikihow.com/", icon: <Book size={20} />, color: "bg-emerald-100 text-emerald-600 shadow-emerald-100" },
    { name: "快捷键", url: "https://hotkeycheatsheet.com/zh", icon: <Keyboard size={20} />, color: "bg-blue-100 text-blue-600 shadow-blue-100" },
    { name: "格式转换", url: "https://www.aconvert.com/cn/", icon: <FileType size={20} />, color: "bg-orange-100 text-orange-600 shadow-orange-100" },
    { name: "思维导图", url: "https://wanglin2.github.io/mind-map/#/", icon: <GitBranch size={20} />, color: "bg-purple-100 text-purple-600 shadow-purple-100" },
    { name: "PDF工具", url: "https://tools.pdf24.org/zh/", icon: <FileText size={20} />, color: "bg-red-100 text-red-600 shadow-red-100" },
  ],

  appPortal: [
    { name: "微信", cat: "社交", url: "https://weixin.qq.com/", color: "bg-emerald-500" },
    { name: "微博", cat: "社交", url: "https://weibo.com/", color: "bg-red-500" },
    { name: "小红书", cat: "社交", url: "https://www.xiaohongshu.com/", color: "bg-rose-500" },
    { name: "知乎", cat: "社区", url: "https://www.zhihu.com/", color: "bg-blue-600" },
    { name: "B站", cat: "娱乐", url: "https://www.bilibili.com/", color: "bg-pink-400" },
    { name: "网易云", cat: "音乐", url: "https://music.163.com/", color: "bg-red-600" },
    { name: "ChatGPT", cat: "智能", url: "https://chatgpt.com/", color: "bg-teal-600" },
    { name: "飞书", cat: "协作", url: "https://www.feishu.cn/", color: "bg-blue-500" },
    { name: "美团", cat: "生活", url: "https://www.meituan.com", color: "bg-yellow-500" },
  ]
};

/**
 * 全局可爱粒子背景 (樱花 + 星星)
 */
function KawaiiParticles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.1) return;
      const id = Date.now() + Math.random();
      const type = Math.random() > 0.5 ? '🌸' : '✨';
      const newParticle = { id, x: e.clientX, y: e.clientY, char: type, size: Math.random() * 15 + 10 };
      setParticles(prev => [...prev.slice(-20), newParticle]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div 
            key={p.id} 
            initial={{ opacity: 0, scale: 0, x: p.x, y: p.y }} 
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0.5], y: p.y - 100, x: p.x + (Math.random() - 0.5) * 50, rotate: 180 }} 
            transition={{ duration: 2, ease: "easeOut" }} 
            className="absolute select-none pointer-events-none"
            style={{ fontSize: p.size }}
          >
            {p.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function AppleTiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  return (
    <motion.div onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - rect.left) / rect.width - 0.5); y.set((e.clientY - rect.top) / rect.height - 0.5); }} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={`relative ${className}`}>
      <div style={{ transform: "translateZ(30px)" }} className="h-full">{children}</div>
    </motion.div>
  );
}

export default function App() {
  const [data] = useState(INITIAL_DATA);
  const [time, setTime] = useState(new Date());
  const [randomFood, setRandomFood] = useState("今天翻牌哪个？");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('skill'); 
  const [appSearch, setAppSearch] = useState("");

  const [isIslandExpanded, setIsIslandExpanded] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState(data.searchEngines[0]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const spinFood = () => {
    if(isSpinning) return;
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setRandomFood(data.foodOptions[Math.floor(Math.random() * data.foodOptions.length)]);
      if (++count > 30) { clearInterval(interval); setIsSpinning(false); }
    }, 50);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`${selectedEngine.url}${encodeURIComponent(searchQuery)}`, '_blank');
      setSearchQuery("");
      setIsIslandExpanded(false);
    }
  };

  const loveDays = useMemo(() => Math.floor((new Date() - new Date(data.loveStartDate)) / 86400000), []);

  const dynamicDates = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let anniv = new Date(`${currentYear}-01-12`);
    if (now > anniv) anniv = new Date(`${currentYear + 1}-01-12`);
    const years = anniv.getFullYear() - 2022;
    return [
      { name: `${years}周年纪念`, days: Math.ceil((anniv - now) / 86400000), icon: <Star className="text-amber-400" size={16} /> },
      ...data.fixedDates.map(fd => {
        let t = new Date(`${currentYear}-${fd.date}`);
        if (now > t) t = new Date(`${currentYear + 1}-${fd.date}`);
        return { name: fd.name, days: Math.ceil((t - now) / 86400000), icon: fd.icon };
      })
    ].sort((a, b) => a.days - b.days);
  }, [time]);

  const periodInfo = useMemo(() => {
    const target = new Date(data.period.nextStartDate);
    const diff = Math.ceil((target - new Date().setHours(0,0,0,0)) / 86400000);
    const progress = Math.max(5, Math.min(100, ((data.period.cycleLength - diff) / data.period.cycleLength) * 100));
    return { date: target.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' }), diff, progress };
  }, [time]);

  const filteredApps = useMemo(() => data.appPortal.filter(app => app.name.toLowerCase().includes(appSearch.toLowerCase())), [appSearch]);

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-[#4A4A4A] font-sans selection:bg-rose-200 overflow-x-hidden relative pb-20">
      <KawaiiParticles />
      
      <AnimatePresence>
        {isIslandExpanded && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-rose-900/10 backdrop-blur-[6px] z-[90]" 
            onClick={() => setIsIslandExpanded(false)} 
          />
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-[100] bg-white/40 backdrop-blur-3xl px-12 h-24 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative">
          
          <div className="flex items-center gap-6">
             <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-rose-400 border border-rose-50">
                <Clock size={24} className="animate-pulse" />
             </div>
             <div className="flex flex-col">
               <span className="text-2xl font-black tracking-tighter text-rose-600">{time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
               <span className="text-[10px] text-rose-400 font-black uppercase tracking-[0.3em]">{time.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
             </div>
          </div>

          {/* 灵动岛：已更新为统一汉字首字（百、必、哔、抖） */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 400, damping: 22, mass: 1.2 }}
              className={`relative bg-[#2D1619] shadow-[0_25px_80px_rgba(74,22,29,0.4)] flex flex-col items-center justify-center overflow-hidden border border-rose-900/20
                ${isIslandExpanded ? 'w-[680px] h-[120px] rounded-[40px] p-8' : 'w-[200px] h-[48px] rounded-full px-6 cursor-pointer hover:scale-105 active:scale-95 group'}
              `}
              onClick={(e) => { e.stopPropagation(); !isIslandExpanded && setIsIslandExpanded(true); }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/20 via-transparent to-rose-400/10 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {!isIslandExpanded ? (
                  <motion.div 
                    key="closed"
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                    className="flex items-center justify-between w-full z-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span className="text-[13px] font-black tracking-[0.2em] text-rose-100/90 uppercase">Search Hub</span>
                    </div>
                    <Search size={18} className="text-rose-400 group-hover:rotate-12 transition-transform" />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="opened"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full flex items-center gap-6 z-10"
                  >
                    {/* 统一汉字首字图标组 */}
                    <div className="flex items-center bg-black/40 backdrop-blur-md p-1.5 rounded-3xl border border-white/5 gap-2">
                      {data.searchEngines.map(eng => (
                        <motion.button 
                          key={eng.id}
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); setSelectedEngine(eng); }}
                          className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all relative ${selectedEngine.id === eng.id ? 'bg-white text-rose-950 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'text-zinc-500 hover:text-white hover:bg-white/10'}`}
                        >
                          <span className="text-lg font-black">{eng.icon}</span>
                          {selectedEngine.id === eng.id && (
                             <motion.div layoutId="dock-indicator" className="absolute -bottom-1 w-1 h-1 bg-rose-400 rounded-full" />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    <form onSubmit={handleSearch} className="flex-1 flex items-center gap-4 relative">
                      <div className="absolute left-5 text-rose-400/50 flex gap-1">
                        <Sparkles size={16} className="animate-pulse" />
                      </div>
                      <input 
                        autoFocus
                        type="text" 
                        placeholder={`在 ${selectedEngine.name} 中开启奇遇...`}
                        className="w-full h-14 bg-white/10 rounded-[24px] pl-14 pr-16 text-lg font-bold text-white outline-none border border-white/5 focus:border-rose-400/40 transition-all placeholder:text-zinc-600 shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button type="submit" className="absolute right-2 w-10 h-10 bg-rose-500 text-white rounded-[18px] shadow-lg shadow-rose-900/40 flex items-center justify-center hover:bg-rose-400 hover:scale-110 active:scale-95 transition-all">
                        <ArrowRight size={22} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-[3px] transition-colors duration-500 opacity-60
                  ${isIslandExpanded ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ backgroundColor: selectedEngine.color, boxShadow: `0 -5px 15px ${selectedEngine.color}` }}
              />
            </motion.div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsPlayerOpen(!isPlayerOpen)} 
              className={`p-4 rounded-[20px] transition-all relative ${isPlayerOpen ? 'bg-rose-500 text-white shadow-xl shadow-rose-200' : 'bg-white border border-rose-100 text-rose-400 hover:bg-rose-50'}`}
            >
               <Music size={22} className={isPlayerOpen ? 'animate-bounce' : ''} />
               {!isPlayerOpen && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>}
            </button>
          </div>
        </div>
      </header>

      {/* 音乐面板 */}
      <AnimatePresence>
        {isPlayerOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed bottom-12 right-12 z-[110] w-[420px] bg-white/80 backdrop-blur-3xl border-4 border-white rounded-[40px] shadow-2xl overflow-hidden ring-1 ring-rose-100">
            <div className="p-8 flex items-center justify-between bg-rose-50/40">
               <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-200 animate-spin-slow">
                   <Disc size={28} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-rose-300 uppercase tracking-widest">Now Streaming</span>
                    <span className="text-lg font-black text-rose-700 tracking-tight">专属心动频道</span>
                 </div>
               </div>
               <button onClick={() => setIsPlayerOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-rose-300 hover:text-rose-500 hover:rotate-90 transition-all"><X size={20} /></button>
            </div>
            <div className="h-[180px] bg-white shadow-inner"><iframe frameBorder="no" border="0" width="100%" height="450" src={`https://music.163.com/outchain/player?type=0&id=${data.musicConfig.playlistId}&auto=0&height=430`}></iframe></div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-12 pt-16 space-y-16 relative z-10">
        
        {/* 数据面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <AppleTiltCard className="lg:col-span-8 bg-white/60 rounded-[50px] p-16 flex flex-col justify-between shadow-2xl shadow-rose-200/20 border border-white group overflow-hidden min-h-[460px]">
            <div className="relative z-10">
               <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-rose-50 text-rose-500 text-[11px] font-black rounded-full border border-rose-100 uppercase tracking-[0.2em] shadow-sm italic">❤ Synchronized Timeline</div>
               <div className="flex items-baseline gap-10 mt-16">
                  <h2 className="text-[11rem] font-black tracking-tighter italic leading-none text-rose-600 drop-shadow-2xl">{loveDays}</h2>
                  <span className="text-5xl font-black text-rose-300 italic opacity-60">DAYS</span>
               </div>
            </div>
            <div className="mt-16 flex gap-8 overflow-x-auto pb-8 no-scrollbar relative z-10">
              {dynamicDates.map((d, i) => (
                <motion.div key={i} whileHover={{ y: -10, scale: 1.05 }} className="flex-shrink-0 bg-white/90 backdrop-blur-md px-12 py-8 rounded-[35px] border border-rose-50 shadow-xl shadow-rose-100/30 flex items-center gap-6 transition-all">
                  <div className="text-rose-500 bg-rose-50 p-5 rounded-2xl shadow-inner">{d.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-rose-300 font-black uppercase tracking-widest">{d.name}</span>
                    <span className="text-2xl font-black mt-1 text-rose-900 tracking-tighter">T-{d.days} <span className="text-sm">天</span></span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-rose-200/20 blur-[130px] rounded-full group-hover:bg-rose-300/30 transition-colors duration-1000"></div>
          </AppleTiltCard>

          <div className="lg:col-span-4 flex flex-col gap-12">
            <AppleTiltCard className={`rounded-[45px] p-12 flex flex-col justify-between shadow-2xl border-4 border-white transition-all duration-700 min-h-[240px] ${periodInfo.diff < 0 ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-500 shadow-rose-200/50'}`}>
               <div className="flex justify-between items-start">
                  <div className={`p-5 rounded-3xl shadow-lg ${periodInfo.diff < 0 ? 'bg-white/20' : 'bg-white text-rose-500'}`}><Activity size={30} /></div>
                  <div className="text-right">
                    <span className="text-[10px] font-black opacity-60 uppercase tracking-widest italic">Forecast</span>
                    <div className="text-2xl font-black mt-2 italic">{periodInfo.date}</div>
                  </div>
               </div>
               <div>
                  <div className="text-5xl font-black tracking-tighter mb-8 italic leading-none">{periodInfo.diff > 0 ? `${periodInfo.diff} Days` : "Attention"}</div>
                  <div className="w-full h-4 bg-black/5 rounded-full overflow-hidden p-1 shadow-inner ring-1 ring-white/20">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${periodInfo.progress}%` }} className={`h-full rounded-full ${periodInfo.diff < 0 ? 'bg-white shadow-[0_0_15px_white]' : 'bg-rose-400 shadow-[0_0_15px_#fb7185]'}`}></motion.div>
                  </div>
               </div>
            </AppleTiltCard>
            
            <AppleTiltCard className="bg-amber-50 rounded-[45px] p-12 border-4 border-white flex items-center justify-between shadow-2xl shadow-amber-200/30 overflow-hidden relative min-h-[190px]">
               <div className="relative z-10">
                  <span className="text-[11px] font-black text-amber-600/50 mb-4 block uppercase tracking-[0.3em] italic">Pick One For You</span>
                  <div className={`text-4xl font-black text-amber-900 italic tracking-tighter transition-all ${isSpinning ? 'blur-xl opacity-30 scale-90 rotate-2' : ''}`}>
                    {randomFood}
                  </div>
               </div>
               <motion.button 
                whileHover={{ rotate: 360, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={spinFood} 
                className={`relative z-10 w-20 h-20 rounded-[28px] transition-all shadow-2xl flex items-center justify-center ${isSpinning ? 'bg-amber-400 text-white' : 'bg-white text-amber-500 hover:shadow-amber-200'}`}
               >
                 <Coffee size={36} />
               </motion.button>
               <div className="absolute -bottom-10 -left-10 text-amber-500/5 rotate-12 pointer-events-none"><UtensilsCrossed size={220} /></div>
            </AppleTiltCard>
          </div>
        </div>

        {/* 教学中心：16:9 极清显示 */}
        <div className="bg-white/70 rounded-[60px] border-4 border-white shadow-2xl overflow-hidden group">
           <div className="flex flex-col md:flex-row items-center justify-between p-12 px-16 border-b border-rose-50 bg-white/40">
              <div className="flex items-center gap-16">
                 {['skill', 'crosshair'].map(tab => (
                   <button key={tab} onClick={() => setActiveTab(tab)} className={`relative py-4 text-xl font-black transition-all tracking-tighter italic ${activeTab === tab ? 'text-rose-600 scale-110' : 'text-rose-200 hover:text-rose-400'}`}>
                      {tab === 'skill' ? '技能特调馆' : '准星藏品室'}
                      {activeTab === tab && <motion.div layoutId="tab-pill-large" className="absolute -bottom-1 left-0 w-full h-2 bg-rose-500 rounded-full shadow-[0_0_15px_#fb7185]" />}
                   </button>
                 ))}
              </div>
              <div className="flex items-center gap-8 mt-8 md:mt-0">
                 <div className="px-6 py-3 bg-emerald-50 text-emerald-600 text-xs font-black rounded-full border border-emerald-100 flex items-center gap-3 shadow-sm">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]"></div> 
                   STABLE LINK
                 </div>
                 <button onClick={() => window.open(activeTab === 'skill' ? "https://val.qq.com/act/a20250110skillteach/" : "https://www.vcrdb.net/", "_blank")} className="p-5 bg-white rounded-3xl text-rose-300 hover:text-rose-600 transition-all hover:scale-110 shadow-lg ring-1 ring-rose-50"><Maximize size={24} /></button>
              </div>
           </div>
           <div className="w-full bg-[#0A0A0A] relative shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="w-full">
                  <div className={activeTab === 'skill' ? "aspect-video" : "h-[960px]"}>
                    <iframe src={activeTab === 'skill' ? "https://val.qq.com/act/a20250110skillteach/" : "https://www.vcrdb.net/"} className="w-full h-full border-none" allow="clipboard-write; fullscreen" />
                  </div>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>

        {/* 底部导航 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 pb-12">
           <div className="lg:col-span-4 bg-white/70 rounded-[50px] p-14 border-4 border-white shadow-2xl flex flex-col gap-12">
              <div className="flex items-center justify-between border-b border-rose-50 pb-12">
                <h3 className="text-2xl font-black text-rose-800 flex items-center gap-5 uppercase tracking-tighter italic">
                  <Palette size={30} className="text-rose-400" /> Toolbox
                </h3>
                <div className="w-3 h-3 rounded-full bg-rose-400 animate-ping"></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 {data.treasureChest.map((item, idx) => (
                   <motion.a whileHover={{ scale: 1.05, y: -10 }} key={idx} href={item.url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-10 rounded-[40px] bg-rose-50/30 border border-white hover:bg-white hover:shadow-2xl hover:shadow-rose-100 transition-all text-center no-underline shadow-sm ring-1 ring-rose-50/50">
                      <div className={`w-16 h-16 ${item.color} rounded-[22px] flex items-center justify-center mb-5 shadow-2xl`}>{item.icon}</div>
                      <span className="text-xs font-black uppercase tracking-widest text-rose-900/60">{item.name}</span>
                   </motion.a>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-8 bg-white/70 rounded-[60px] p-16 border-4 border-white shadow-2xl overflow-hidden relative group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-24 gap-12">
                <div className="flex items-center gap-10">
                   <div className="bg-[#2D1619] p-6 rounded-[30px] text-white shadow-2xl rotate-[-8deg] group-hover:rotate-0 transition-all duration-700 shadow-rose-900/30">
                     <Grid3X3 size={36} />
                   </div>
                   <div className="leading-none">
                      <h2 className="text-5xl font-black tracking-tighter uppercase italic text-rose-900">Portal</h2>
                      <p className="text-xs text-rose-300 font-black mt-4 uppercase tracking-[0.4em]">Integrated Hub</p>
                   </div>
                </div>
                <div className="relative group/search max-w-sm w-full">
                   <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-rose-200 group-focus-within/search:text-rose-500 transition-colors" size={24} />
                   <input type="text" placeholder="查找已同步的资源..." className="bg-white border-2 border-rose-50 text-base font-black rounded-[35px] pl-20 pr-10 py-7 w-full focus:bg-white focus:ring-[15px] focus:ring-rose-500/5 focus:border-rose-200 transition-all outline-none shadow-inner" value={appSearch} onChange={(e) => setAppSearch(e.target.value)}/>
                </div>
              </div>
              
              <div className="max-h-[550px] overflow-y-auto pr-10 custom-scrollbar-v2 pb-20">
                 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-12 gap-y-20">
                    {filteredApps.map((app, idx) => (
                      <motion.a whileHover={{ y: -18, scale: 1.2 }} key={idx} href={app.url} target="_blank" rel="noreferrer" className="flex flex-col items-center group/item no-underline">
                         <div className={`w-24 h-24 ${app.color} rounded-[32px] flex items-center justify-center text-white font-black text-4xl shadow-2xl transition-all duration-500 relative overflow-hidden group-hover/item:shadow-rose-300/40 border-4 border-white/20 group-hover/item:rotate-[-10deg]`}>
                           {app.name.charAt(0)}
                           <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                         </div>
                         <div className="mt-8 text-center leading-none">
                            <span className="text-[17px] font-black text-rose-950 tracking-tighter group-hover/item:text-rose-500 transition-colors block">{app.name}</span>
                            <span className="text-[10px] font-bold text-rose-200 uppercase tracking-widest mt-3 block">{app.cat}</span>
                         </div>
                      </motion.a>
                    ))}
                 </div>
                 {filteredApps.length === 0 && <div className="py-32 text-center text-rose-200 font-black uppercase tracking-[0.5em] opacity-50">Empty Archive</div>}
              </div>
           </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-v2::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar-v2::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-v2::-webkit-scrollbar-thumb { background: #FFDDE1; border-radius: 20px; border: 3px solid transparent; background-clip: content-box; }
        .custom-scrollbar-v2::-webkit-scrollbar-thumb:hover { background: #FB7185; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { background-color: #FFF0F3; perspective: 3000px; overflow-x: hidden; }
        * { -webkit-font-smoothing: antialiased; }
        input::placeholder { color: #F8BBCC; opacity: 1; font-weight: 700; }
        .shadow-inner { box-shadow: inset 0 2px 8px rgba(0,0,0,0.05); }
      `}} />
    </div>
  );
}
