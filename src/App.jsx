import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Star, Clock, UtensilsCrossed, Sparkles, Map as MapIcon,
  ChevronRight, Navigation, Cake, Target, Shield, ExternalLink,
  Activity, AlertCircle, Crosshair, Music, X, RefreshCw, Disc,
  LogIn, UserCheck, Film, Book, Keyboard, FileType, Image as ImageIcon,
  GitBranch, FileText, LayoutGrid, Search, Heart, ArrowRight,
  Maximize, GraduationCap, Layout, Cpu, Zap, Radio, Box, ShieldCheck
} from 'lucide-react';

/**
 * --------------------------------------------------------------------
 * 配置数据
 * --------------------------------------------------------------------
 */
const INITIAL_DATA = {
  loveStartDate: "2022-01-12", 
  musicConfig: { playlistId: "8285130451" },
  importantDates: [
    { name: "你的生日", date: "2026-12-29", icon: <Cake size={16} /> },
    { name: "四周年纪念", date: "2026-01-12", icon: <Calendar size={16} /> },
  ],
  period: { nextStartDate: "2026-03-07", cycleLength: 30 },
  foodOptions: ["火锅", "螺蛳粉", "麻辣烫", "日料", "烤肉", "汉堡", "轻食", "家里蹲", "湘菜", "意面"],
  
  treasureChest: [
    { name: "猫TV影视", url: "https://tv.cattvv.com", icon: <Film size={18} />, color: "bg-rose-400" },
    { name: "wikiHow", url: "https://zh.wikihow.com/", icon: <Book size={18} />, color: "bg-emerald-500" },
    { name: "快捷键大全", url: "https://hotkeycheatsheet.com/zh", icon: <Keyboard size={18} />, color: "bg-blue-500" },
    { name: "Aconvert", url: "https://www.aconvert.com/cn/", icon: <FileType size={18} />, color: "bg-orange-500" },
    { name: "思维导图", url: "https://wanglin2.github.io/mind-map/#/", icon: <GitBranch size={18} />, color: "bg-purple-400" },
    { name: "PDF24", url: "https://tools.pdf24.org/zh/", icon: <FileText size={18} />, color: "bg-red-500" },
  ],

  appPortal: [
    { name: "微信", cat: "社交", url: "https://weixin.qq.com/", color: "bg-green-500" },
    { name: "微博", cat: "社交", url: "https://weibo.com/", color: "bg-red-500" },
    { name: "小红书", cat: "社交", url: "https://www.xiaohongshu.com/", color: "bg-rose-500" },
    { name: "知乎", cat: "社区", url: "https://www.zhihu.com/", color: "bg-blue-600" },
    { name: "豆瓣", cat: "社区", url: "https://www.douban.com/", color: "bg-green-600" },
    { name: "B站", cat: "娱乐", url: "https://www.bilibili.com/", color: "bg-pink-400" },
    { name: "抖音", cat: "娱乐", url: "https://www.douyin.com/", color: "bg-zinc-900" },
    { name: "网易云", cat: "音乐", url: "https://music.163.com/", color: "bg-red-600" },
    { name: "淘宝", cat: "购物", url: "https://www.taobao.com/", color: "bg-orange-500" },
    { name: "京东", cat: "购物", url: "https://www.jd.com/", color: "bg-red-600" },
    { name: "拼多多", cat: "购物", url: "https://www.pinduoduo.com/", color: "bg-red-500" },
    { name: "得物", cat: "购物", url: "https://www.dewu.com/", color: "bg-zinc-900" },
    { name: "ChatGPT", cat: "AI", url: "https://chatgpt.com/", color: "bg-emerald-600" },
    { name: "DeepSeek", cat: "AI", url: "https://www.deepseek.com/", color: "bg-blue-900" },
    { name: "WPS", cat: "办公", url: "https://www.wps.cn/", color: "bg-rose-600" },
    { name: "Apple", cat: "科技", url: "https://www.apple.com/cn/", color: "bg-zinc-900" },
    { name: "百度网盘", cat: "存储", url: "https://pan.baidu.com/", color: "bg-blue-600" },
    { name: "GitHub", cat: "代码", url: "https://github.com/", color: "bg-zinc-900" },
  ]
};

export default function App() {
  const [data] = useState(INITIAL_DATA);
  const [time, setTime] = useState(new Date());
  const [randomFood, setRandomFood] = useState("吃什么？");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [playerKey, setPlayerKey] = useState(0); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appSearch, setAppSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const spinFood = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setRandomFood(data.foodOptions[Math.floor(Math.random() * data.foodOptions.length)]);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 80);
  };

  const periodInfo = useMemo(() => {
    const targetDate = new Date(data.period.nextStartDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    const progress = Math.max(0, Math.min(100, ((data.period.cycleLength - diffDays) / data.period.cycleLength) * 100));
    return { nextDate: targetDate.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' }), diffDays, progress };
  }, [data.period, time]);

  const loveDays = useMemo(() => {
    const start = new Date(data.loveStartDate);
    return Math.floor((new Date() - start) / (1000 * 60 * 60 * 24));
  }, [data.loveStartDate, time]);

  const filteredApps = useMemo(() => {
    return (data.appPortal || []).filter(app => 
      app.name.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.cat.toLowerCase().includes(appSearch.toLowerCase())
    );
  }, [appSearch, data.appPortal]);

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#1a1a1a] font-sans pb-12 overflow-x-hidden selection:bg-pink-100">
      
      {/* --- 浮动播放器 --- */}
      <div className="w-full flex flex-col items-center sticky top-0 z-[100] pointer-events-none">
        <div className={`w-full max-w-xl transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) transform pointer-events-auto shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] ${isPlayerOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 absolute'}`}>
          <div className="bg-white/90 backdrop-blur-3xl border-x border-b border-white/50 rounded-b-[2.5rem] overflow-hidden relative">
             <div className="h-1 w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"></div>
             <div className="p-4 flex items-center justify-between px-8 bg-white/20">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white animate-spin-slow shadow-lg">
                      <Disc size={20} className="text-pink-400" />
                   </div>
                   <div className="flex flex-col leading-none">
                     <span className="text-[10px] font-black uppercase tracking-wider text-zinc-900 leading-none">Sweet Radio</span>
                     <span className="text-[8px] font-bold text-zinc-400 mt-1 uppercase leading-none">Cloud Active</span>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   {!isLoggedIn ? (
                     <button onClick={() => { window.open("https://music.163.com/#/login", "_blank"); setIsLoggedIn(true); }} className="px-3 py-1.5 bg-red-500 text-white rounded-full text-[10px] font-black italic shadow-md hover:brightness-110 transition-all">登录</button>
                   ) : (
                     <div className="p-1.5 bg-green-50 text-green-600 rounded-full border border-green-100 leading-none"><UserCheck size={12} /></div>
                   )}
                   <button onClick={() => setPlayerKey(k => k + 1)} className="p-2 text-zinc-300 hover:text-pink-500 transition-colors leading-none"><RefreshCw size={14} /></button>
                   <button onClick={() => setIsPlayerOpen(false)} className="p-2 text-zinc-400 hover:bg-zinc-100 rounded-full leading-none"><X size={18} /></button>
                </div>
             </div>
             <div className="w-full h-[110px] overflow-hidden bg-white/50">
                <iframe key={playerKey} frameBorder="no" border="0" width="100%" height="450" src={`https://music.163.com/outchain/player?type=0&id=${data.musicConfig.playlistId}&auto=0&height=430`}></iframe>
             </div>
          </div>
        </div>
        <div className="pointer-events-auto">
          <button onClick={() => setIsPlayerOpen(!isPlayerOpen)} className={`px-12 py-2.5 rounded-b-[2rem] shadow-2xl flex items-center gap-3 transition-all duration-500 ${isPlayerOpen ? 'bg-zinc-900 text-white' : 'bg-white text-pink-500 border-x border-b border-pink-50 font-black'}`}>
            <Radio size={16} className={isPlayerOpen ? "" : "animate-pulse"} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">{isPlayerOpen ? "HIDE" : "RADIO"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto pt-8 px-6 space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2 leading-none">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-[10px] uppercase tracking-[0.3em] leading-none">
              <Zap size={12} fill="currentColor" /> Welcome Back
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-zinc-900 italic uppercase leading-none">SWEET SPACE</h1>
          </div>
          <div className="bg-white/70 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-white shadow-sm flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Local Time</span>
               <span className="text-xl font-black italic text-zinc-800 leading-none">{time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
             </div>
             <div className="h-8 w-px bg-zinc-100"></div>
             <div className="flex flex-col">
               <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">{time.toLocaleDateString('zh-CN', { weekday: 'long' })}</span>
               <span className="text-sm font-bold text-zinc-500 leading-none">{time.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}</span>
             </div>
          </div>
        </header>

        {/* 主布局格 - Bento Style */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* 左侧大版块 (占 8 列) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* 顶栏：纪念日 + 生理期 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-zinc-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[260px] group">
                  <div className="relative z-10">
                     <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4 italic leading-none">Days in Love</div>
                     <div className="text-8xl font-black tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700">{loveDays}<span className="text-xl ml-4 opacity-30 font-normal italic uppercase">Days</span></div>
                  </div>
                  <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-6 leading-none">
                     <div className="flex items-center gap-3 text-xs font-bold text-zinc-400 italic leading-none">
                        <Heart className="text-pink-500 fill-pink-500" size={14} /> Since 2022.01.12
                     </div>
                     <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={20} />
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
               </div>

               <div className={`rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-lg min-h-[260px] transition-all duration-700 ${periodInfo.diffDays < 0 ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gradient-to-br from-rose-400 to-pink-500'}`}>
                  <div className="flex justify-between items-start leading-none">
                     <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md"><Activity size={24} /></div>
                     <div className="text-right leading-none">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Vitals Monitor</div>
                        <div className="text-lg font-black italic leading-none">{periodInfo.nextDate}</div>
                     </div>
                  </div>
                  <div className="leading-none">
                     <div className="text-5xl font-black tracking-tighter italic mb-4 leading-none">
                        {periodInfo.diffDays > 0 ? `${periodInfo.diffDays} 天后` : periodInfo.diffDays === 0 ? "就在今天" : `已推迟 ${Math.abs(periodInfo.diffDays)}天`}
                     </div>
                     <div className="w-full bg-black/10 h-2.5 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-white h-full shadow-[0_0_15px_white]" style={{ width: `${periodInfo.progress}%` }}></div>
                     </div>
                  </div>
               </div>
            </div>

            {/* 我来教你放技能 (核心更新：强制 16:9 比例) */}
            <div className="bg-white rounded-[3.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-zinc-100 flex flex-col overflow-hidden group relative">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ff4655] to-transparent z-20"></div>
               <div className="bg-white border-b border-zinc-100 p-6 px-10 flex items-center justify-between z-10 leading-none">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#ff4655] p-3 rounded-2xl text-white shadow-lg shadow-red-200 group-hover:rotate-6 transition-transform leading-none">
                       <GraduationCap size={22} />
                    </div>
                    <div className="leading-none">
                      <h2 className="text-lg font-black italic uppercase tracking-widest text-zinc-900 leading-none">我来教你放技能</h2>
                      <div className="flex items-center gap-2 mt-2 leading-none">
                         <span className="px-2 py-0.5 bg-zinc-100 text-zinc-400 text-[8px] font-bold rounded uppercase tracking-tighter leading-none">Official 16:9 View</span>
                         <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse"></span>
                         <p className="text-[9px] font-bold text-zinc-300 uppercase tracking-tighter leading-none">Skill Teaching System</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => window.open("https://val.qq.com/act/a20250110skillteach/", "_blank")} className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 text-zinc-400 hover:text-[#ff4655] hover:bg-red-50 hover:border-red-100 transition-all shadow-sm flex items-center gap-2 leading-none">
                     <span className="text-[10px] font-black hidden md:block">全屏</span>
                     <Maximize size={14} />
                  </button>
               </div>
               
               {/* 强制 16:9 的视频容器 */}
               <div className="w-full aspect-video bg-[#121212] relative overflow-hidden">
                  <iframe 
                    src="https://val.qq.com/act/a20250110skillteach/" 
                    className="absolute inset-0 w-full h-full border-none" 
                    allow="clipboard-write; fullscreen" 
                    title="技能教学" 
                  />
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
               </div>
            </div>
          </div>

          {/* 右侧侧边栏 (占 4 列) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
             
             {/* 准星同步 */}
             <div className="bg-white rounded-[3rem] shadow-sm border border-zinc-100 flex flex-col overflow-hidden h-[400px] group relative leading-none">
                <div className="p-6 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/30 leading-none">
                   <div className="flex items-center gap-3 leading-none">
                     <div className="bg-[#ff4655] p-2.5 rounded-xl text-white shadow-md shadow-red-100 leading-none"><Crosshair size={18} /></div>
                     <span className="font-black italic uppercase text-sm tracking-widest text-zinc-900 leading-none">准星中枢</span>
                   </div>
                   <ShieldCheck size={16} className="text-zinc-200" />
                </div>
                <div className="flex-1 bg-[#121212]">
                   <iframe src="https://val.isoox.cn/crosshair" className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity" title="准星查询" />
                </div>
             </div>

             {/* 饮食决策 */}
             <div className="bg-[#fffbeb] rounded-[3rem] p-8 border border-yellow-100 flex items-center justify-between shadow-sm relative overflow-hidden group leading-none">
                <div className="relative z-10 leading-none">
                   <div className="text-[10px] font-black text-yellow-600/60 uppercase tracking-widest italic mb-3 leading-none">Decision Maker</div>
                   <div className={`text-3xl font-black text-yellow-900 italic tracking-tighter transition-all duration-300 ${isSpinning ? 'blur-sm scale-95 opacity-50' : ''} leading-none`}>{randomFood}</div>
                </div>
                <button onClick={spinFood} disabled={isSpinning} className={`relative z-10 p-5 rounded-2xl shadow-xl transition-all active:scale-90 ${isSpinning ? 'bg-yellow-200 text-white animate-spin' : 'bg-white text-yellow-500 hover:shadow-yellow-100 hover:shadow-2xl'}`}>
                   <UtensilsCrossed size={24} />
                </button>
                <div className="absolute -bottom-4 -left-4 text-yellow-500/5 rotate-12"><UtensilsCrossed size={120} /></div>
             </div>

             {/* 小众百宝箱 */}
             <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-zinc-100 space-y-6 leading-none">
                <div className="flex items-center gap-3 border-b border-zinc-50 pb-4 leading-none">
                   <Box className="text-zinc-300" size={18} />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 leading-none">Treasure Chest</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                   {data.treasureChest.map((item, idx) => (
                     <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-50 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-zinc-100 group/tile no-underline">
                        <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white mb-2 shadow-sm group-hover/tile:rotate-6 transition-transform`}>
                          {item.icon}
                        </div>
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-tighter text-center line-clamp-1">{item.name}</span>
                     </a>
                   ))}
                </div>
             </div>
          </div>

          {/* 底部全宽：应用门户 */}
          <div className="col-span-12 bg-white rounded-[4rem] p-10 shadow-sm border border-zinc-100 relative overflow-hidden group">
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 leading-none">
                <div className="flex items-center gap-5 leading-none">
                   <div className="bg-zinc-900 p-4 rounded-3xl text-white shadow-xl group-hover:rotate-3 transition-transform duration-500"><LayoutGrid size={28} /></div>
                   <div className="leading-none">
                     <h2 className="text-3xl font-black tracking-tighter italic uppercase text-zinc-900 leading-none">App Launchpad</h2>
                     <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2 italic leading-none">快速访问您的核心生产力入口</p>
                   </div>
                </div>
                <div className="relative group/search">
                   <div className="absolute inset-y-0 left-5 flex items-center text-zinc-300 group-focus-within/search:text-pink-400 transition-colors"><Search size={18} /></div>
                   <input 
                      type="text" 
                      placeholder="SEARCH APPS..." 
                      className="bg-zinc-50 border-none text-[11px] font-black rounded-2xl pl-12 pr-6 py-4 w-full md:w-[320px] focus:ring-4 focus:ring-pink-500/10 focus:bg-white transition-all shadow-inner tracking-widest" 
                      value={appSearch} 
                      onChange={(e) => setAppSearch(e.target.value)}
                   />
                </div>
             </div>

             <div className="max-h-[460px] overflow-y-auto pr-4 custom-scrollbar-v2">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 pb-6 px-2">
                   {filteredApps.map((app, idx) => (
                     <a key={idx} href={app.url} target="_blank" rel="noreferrer" className="group/app flex flex-col items-center no-underline">
                       <div className={`w-16 h-16 ${app.color} rounded-[1.8rem] flex items-center justify-center text-white font-black text-xl shadow-md group-hover/app:shadow-xl group-hover/app:-translate-y-2 transition-all duration-500 relative overflow-hidden`}>
                         {app.name.charAt(0)}
                         <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/app:opacity-100 transition-opacity"></div>
                       </div>
                       <div className="mt-4 text-center leading-none">
                         <span className="text-[10px] font-black text-zinc-800 uppercase tracking-tighter block leading-none">{app.name}</span>
                         <span className="text-[7px] font-bold text-zinc-300 uppercase tracking-widest leading-none mt-1.5">{app.cat}</span>
                       </div>
                     </a>
                   ))}
                </div>
             </div>
          </div>

        </div>

        <footer className="pt-12 pb-8 flex flex-col items-center gap-4 opacity-20 leading-none">
          <p className="text-[10px] font-black uppercase tracking-[2em] ml-[2em] text-zinc-400 leading-none">Archive Sync System</p>
        </footer>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-v2::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-v2::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-v2::-webkit-scrollbar-thumb { background: #f472b6; border-radius: 20px; }
        
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        
        body { background-color: #f8f9fc; }
        .no-underline { text-decoration: none !important; }
      `}} />
    </div>
  );
}
