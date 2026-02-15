import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Star, Clock, UtensilsCrossed, Sparkles, Map as MapIcon,
  ChevronRight, Navigation, Cake, Target, Shield, ExternalLink,
  Activity, AlertCircle, Crosshair, Music, X, RefreshCw, Disc,
  Film, Book, Keyboard, FileType, LayoutGrid, Search, Heart, ArrowRight,
  Maximize, Coffee, Palette, Grid3X3, Github, Send, Box
} from 'lucide-react';

/**
 * 极简版文件图标
 */
const FileTextIcon = ({ size }) => (
  <div style={{ width: size, height: size, border: '2px solid currentColor', borderRadius: '2px', position: 'relative', display: 'inline-block' }}>
    <div style={{ width: '60%', height: '2px', background: 'currentColor', position: 'absolute', top: '25%', left: '20%' }}></div>
    <div style={{ width: '40%', height: '2px', background: 'currentColor', position: 'absolute', top: '50%', left: '20%' }}></div>
  </div>
);

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
  
  searchEngines: [
    { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=', color: '#2b32e2', icon: '百' },
    { id: 'bing', name: '必应', url: 'https://www.bing.com/search?q=', color: '#00809d', icon: '必' },
    { id: 'bilibili', name: 'B站', url: 'https://search.bilibili.com/all?keyword=', color: '#fb7299', icon: '哔' },
    { id: 'douyin', name: '抖音', url: 'https://www.douyin.com/search/', color: '#fe2c55', icon: '抖' }
  ],

  treasureChest: [
    { name: "猫TV影视", url: "https://tv.cattvv.com", icon: <Film size={20} />, color: "bg-rose-50 text-rose-500 shadow-rose-100/50" },
    { name: "生活百科", url: "https://zh.wikihow.com/", icon: <Book size={20} />, color: "bg-emerald-50 text-emerald-500 shadow-emerald-100/50" },
    { name: "快捷键", url: "https://hotkeycheatsheet.com/zh", icon: <Keyboard size={20} />, color: "bg-blue-50 text-blue-500 shadow-blue-100/50" },
    { name: "格式转换", url: "https://www.aconvert.com/cn/", icon: <FileType size={20} />, color: "bg-orange-50 text-orange-500 shadow-orange-100/50" },
    { name: "工具大杂烩", url: "http://www.magicalbox.cn", icon: <Box size={20} />, color: "bg-purple-50 text-purple-500 shadow-purple-100/50" },
    { name: "PDF工具", url: "https://tools.pdf24.org/zh/", icon: <FileTextIcon size={20} />, color: "bg-rose-50 text-rose-500 shadow-rose-100/50" },
  ],

  appPortal: [
    // 社交社区
    { name: "微信", cat: "社交", url: "https://weixin.qq.com/", color: "bg-emerald-500" },
    { name: "QQ", cat: "社交", url: "https://im.qq.com/", color: "bg-blue-400" },
    { name: "微博", cat: "社交", url: "https://weibo.com/", color: "bg-red-500" },
    { name: "小红书", cat: "社区", url: "https://www.xiaohongshu.com/", color: "bg-rose-500" },
    { name: "知乎", cat: "社区", url: "https://www.zhihu.com/", color: "bg-blue-600" },
    { name: "豆瓣", cat: "社区", url: "https://www.douban.com/", color: "bg-green-700" },
    { name: "百度贴吧", cat: "社区", url: "https://tieba.baidu.com/", color: "bg-blue-500" },
    { name: "即刻", cat: "社区", url: "https://ruguoapp.com/", color: "bg-yellow-400" },
    // 影音娱乐
    { name: "B站", cat: "视频", url: "https://www.bilibili.com/", color: "bg-pink-400" },
    { name: "抖音", cat: "短视频", url: "https://www.douyin.com/", color: "bg-zinc-900" },
    { name: "快手", cat: "短视频", url: "https://www.kuaishou.com/", color: "bg-orange-500" },
    { name: "网易云", cat: "音乐", url: "https://music.163.com/", color: "bg-red-600" },
    { name: "QQ音乐", cat: "音乐", url: "https://y.qq.com/", color: "bg-emerald-400" },
    { name: "Spotify", cat: "音乐", url: "https://www.spotify.com/", color: "bg-green-500" },
    { name: "爱奇艺", cat: "视频", url: "https://www.iqiyi.com/", color: "bg-green-500" },
    { name: "腾讯视频", cat: "视频", url: "https://v.qq.com/", color: "bg-blue-500" },
    { name: "优酷", cat: "视频", url: "https://www.youku.com/", color: "bg-blue-400" },
    { name: "芒果TV", cat: "视频", url: "https://www.mgtv.com/", color: "bg-orange-400" },
    // 购物潮流
    { name: "淘宝", cat: "购物", url: "https://www.taobao.com/", color: "bg-orange-500" },
    { name: "京东", cat: "购物", url: "https://www.jd.com/", color: "bg-red-600" },
    { name: "拼多多", cat: "购物", url: "https://www.pinduoduo.com/", color: "bg-red-500" },
    { name: "得物", cat: "潮流", url: "https://www.dewu.com/", color: "bg-zinc-800" },
    { name: "识货", cat: "潮流", url: "https://www.shihuo.cn/", color: "bg-cyan-500" },
    { name: "闲鱼", cat: "购物", url: "https://www.goofish.com/", color: "bg-yellow-400" },
    { name: "唯品会", cat: "购物", url: "https://www.vip.com/", color: "bg-pink-500" },
    // 生活旅行
    { name: "美团", cat: "生活", url: "https://www.meituan.com/", color: "bg-yellow-500" },
    { name: "饿了么", cat: "生活", url: "https://www.ele.me/", color: "bg-sky-400" },
    { name: "携程", cat: "旅行", url: "https://www.ctrip.com/", color: "bg-blue-800" },
    { name: "高德地图", cat: "导航", url: "https://www.amap.com/", color: "bg-sky-500" },
    { name: "百度地图", cat: "导航", url: "https://map.baidu.com/", color: "bg-blue-600" },
    { name: "去哪儿", cat: "旅行", url: "https://www.qunar.com/", color: "bg-blue-400" },
    { name: "大众点评", cat: "生活", url: "https://www.dianping.com/", color: "bg-orange-500" },
    { name: "12306", cat: "出行", url: "https://www.12306.cn/", color: "bg-blue-600" },
    { name: "Keep", cat: "健康", url: "https://www.gotokeep.com/", color: "bg-zinc-700" },
    { name: "下厨房", cat: "生活", url: "https://www.xiachufang.com/", color: "bg-red-400" },
    // 办公智能
    { name: "ChatGPT", cat: "AI", url: "https://chatgpt.com/", color: "bg-teal-600" },
    { name: "DeepSeek", cat: "AI", url: "https://www.deepseek.com/", color: "bg-blue-900" },
    { name: "Claude", cat: "AI", url: "https://claude.ai/", color: "bg-orange-100 text-orange-900" },
    { name: "Notion", cat: "办公", url: "https://www.notion.so/", color: "bg-zinc-900" },
    { name: "WPS", cat: "办公", url: "https://www.wps.cn/", color: "bg-rose-600" },
    { name: "飞书", cat: "协作", url: "https://www.feishu.cn/", color: "bg-blue-500" },
    { name: "钉钉", cat: "协作", url: "https://www.dingtalk.com/", color: "bg-blue-600" },
    { name: "石墨文档", cat: "协作", url: "https://shimo.im/", color: "bg-zinc-600" },
    { name: "Canva", cat: "设计", url: "https://www.canva.cn/", color: "bg-purple-500" },
    // 科技存储
    { name: "GitHub", cat: "科技", url: "https://github.com/", color: "bg-zinc-800" },
    { name: "百度网盘", cat: "存储", url: "https://pan.baidu.com/", color: "bg-blue-600" },
    { name: "夸克网盘", cat: "存储", url: "https://pan.quark.cn/", color: "bg-blue-500" },
    { name: "阿里云盘", cat: "存储", url: "https://www.aliyundrive.com/", color: "bg-purple-600" },
    { name: "华为", cat: "科技", url: "https://www.huawei.com/", color: "bg-red-600" },
    { name: "小米", cat: "科技", url: "https://www.mi.com/", color: "bg-orange-600" },
    { name: "Vercel", cat: "开发", url: "https://vercel.com/", color: "bg-zinc-900" },
    { name: "StackOverflow", cat: "开发", url: "https://stackoverflow.com/", color: "bg-orange-500" }
  ]
};

export default function App() {
  const [data] = useState(INITIAL_DATA);
  const [time, setTime] = useState(new Date());
  const [randomFood, setRandomFood] = useState("想吃什么呀？");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('skill'); 
  const [appSearch, setAppSearch] = useState("");

  const [isIslandExpanded, setIsIslandExpanded] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState(INITIAL_DATA.searchEngines[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // 模拟樱花星尘粒子
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleMouseMove = (e) => {
      if (Math.random() > 0.1) return;
      const id = Date.now() + Math.random();
      const newParticle = { id, x: e.clientX, y: e.clientY, char: Math.random() > 0.5 ? '🌸' : '✨' };
      setParticles(prev => [...prev.slice(-12), newParticle]);
      setTimeout(() => {
        setParticles(current => current.filter(p => p.id !== id));
      }, 2000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => { clearInterval(timer); window.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const spinFood = () => {
    if(isSpinning) return;
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setRandomFood(data.foodOptions[Math.floor(Math.random() * data.foodOptions.length)]);
      if (++count > 20) { clearInterval(interval); setIsSpinning(false); }
    }, 60);
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
  }, [time, data]);

  const periodInfo = useMemo(() => {
    const target = new Date(data.period.nextStartDate);
    const diff = Math.ceil((target - new Date().setHours(0,0,0,0)) / 86400000);
    const progress = Math.max(5, Math.min(100, ((data.period.cycleLength - diff) / data.period.cycleLength) * 100));
    return { date: target.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' }), diff, progress };
  }, [time, data]);

  const filteredApps = useMemo(() => data.appPortal.filter(app => app.name.toLowerCase().includes(appSearch.toLowerCase())), [appSearch, data]);

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-[#5A5A5A] font-sans overflow-x-hidden relative pb-20 transition-colors duration-700">
      
      {/* 粒子效果 */}
      {particles.map(p => (
        <div key={p.id} className="particle pointer-events-none fixed z-[999] text-lg opacity-0" style={{ left: p.x, top: p.y }}>
          {p.char}
        </div>
      ))}

      {/* 遮罩 */}
      <div 
        className={`fixed inset-0 bg-rose-200/10 backdrop-blur-[4px] z-[90] transition-opacity duration-500 ${isIslandExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsIslandExpanded(false)}
      />

      <header className="sticky top-0 z-[100] bg-white/40 backdrop-blur-3xl px-12 h-24 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative">
          
          <div className="flex items-center gap-5">
             <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-300 border border-rose-50">
                <Clock size={20} className="animate-pulse" />
             </div>
             <div className="flex flex-col">
               <span className="text-xl font-black tracking-tighter text-rose-500">{time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
               <span className="text-[9px] text-rose-300 font-black uppercase tracking-[0.2em]">{time.toLocaleDateString('zh-CN', { weekday: 'short' })}</span>
             </div>
          </div>

          {/* 纯 CSS 炫技灵动岛 */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div 
              className={`relative bg-gradient-to-b from-[#3D262A] to-[#2D1619] shadow-[0_20px_50px_rgba(61,38,42,0.3)] flex flex-col items-center justify-center overflow-hidden border border-white/5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isIslandExpanded ? 'w-[640px] h-[110px] rounded-[35px] px-7 py-4' : 'w-[180px] h-[44px] rounded-full px-5 cursor-pointer hover:scale-105 active:scale-95'}
              `}
              onClick={(e) => { e.stopPropagation(); !isIslandExpanded && setIsIslandExpanded(true); }}
            >
              <div className={`flex items-center justify-between w-full transition-all duration-300 ${isIslandExpanded ? 'opacity-0 scale-90 absolute' : 'opacity-100 scale-100'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185] animate-pulse" />
                  <span className="text-[11px] font-black tracking-[0.3em] text-rose-100/70 uppercase select-none">Explore</span>
                </div>
                <Search size={16} className="text-rose-300 opacity-60" />
              </div>

              <div className={`flex items-center gap-5 w-full h-full transition-all duration-500 delay-100 ${isIslandExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
                <div className="flex items-center bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 gap-1.5">
                  {data.searchEngines.map(eng => (
                    <button 
                      key={eng.id}
                      onClick={(e) => { e.stopPropagation(); setSelectedEngine(eng); }}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative font-black text-base ${selectedEngine.id === eng.id ? 'bg-white text-[#2D1619] shadow-lg scale-110' : 'text-zinc-500 hover:text-rose-100'}`}
                    >
                      {eng.icon}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSearch} className="flex-1 flex items-center gap-3 relative">
                  <div className="absolute left-4 text-rose-300/30">
                    <Sparkles size={14} className="animate-pulse" />
                  </div>
                  <input 
                    autoFocus={isIslandExpanded}
                    type="text" 
                    placeholder={`在 ${selectedEngine.name} 中开启奇遇...`}
                    className="w-full h-12 bg-white/5 rounded-[20px] pl-11 pr-14 text-base font-bold text-white outline-none border border-white/5 focus:border-rose-400/30 transition-all placeholder:text-zinc-500/60"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute right-1.5 w-9 h-9 bg-rose-500/90 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-rose-400 transition-all">
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>

              <div 
                className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500 ${isIslandExpanded ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: selectedEngine.color, boxShadow: `0 -2px 10px ${selectedEngine.color}` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={() => setIsPlayerOpen(!isPlayerOpen)} 
              className={`p-3.5 rounded-[18px] transition-all relative ${isPlayerOpen ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/80 border border-rose-50 text-rose-300 hover:bg-rose-50'}`}
            >
               <Music size={20} className={isPlayerOpen ? 'animate-bounce' : ''} />
            </button>
          </div>
        </div>
      </header>

      {/* 音乐面板 */}
      {isPlayerOpen && (
        <div className="fixed bottom-10 right-10 z-[110] w-[380px] bg-white/90 backdrop-blur-3xl border-2 border-white rounded-[35px] shadow-2xl overflow-hidden ring-1 ring-rose-50 animate-fade-in-up">
          <div className="p-6 flex items-center justify-between bg-rose-50/20">
             <div className="flex items-center gap-4">
               <div className="w-11 h-11 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-md animate-spin-slow">
                 <Disc size={22} />
               </div>
               <div className="flex flex-col">
                  <span className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Station</span>
                  <span className="text-base font-black text-rose-700">专属电台</span>
               </div>
             </div>
             <button onClick={() => setIsPlayerOpen(false)} className="w-8 h-8 flex items-center justify-center text-rose-200 hover:text-rose-500"><X size={18} /></button>
          </div>
          <div className="h-[160px] bg-white shadow-inner"><iframe frameBorder="no" border="0" width="100%" height="450" src={`https://music.163.com/outchain/player?type=0&id=${data.musicConfig.playlistId}&auto=0&height=430`}></iframe></div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-12 pt-14 space-y-14 relative z-10">
        
        {/* 数据面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 bg-white/70 rounded-[45px] p-14 flex flex-col justify-between shadow-xl shadow-rose-100/20 border border-white relative overflow-hidden min-h-[440px] hover-tilt">
            <div className="relative z-10">
               <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-rose-50/50 text-rose-400 text-[10px] font-black rounded-full border border-rose-100/50 uppercase tracking-[0.2em] italic">❤ Synchronization</div>
               <div className="flex items-baseline gap-8 mt-14">
                  <h2 className="text-[9.5rem] font-black tracking-tighter italic leading-none text-rose-500/90 drop-shadow-xl">{loveDays}</h2>
                  <span className="text-4xl font-black text-rose-200 italic">DAYS</span>
               </div>
            </div>
            <div className="mt-14 flex gap-6 overflow-x-auto pb-6 no-scrollbar relative z-10">
              {dynamicDates.map((d, i) => (
                <div key={i} className="flex-shrink-0 bg-white/80 px-10 py-7 rounded-[30px] border border-rose-50 shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-2">
                  <div className="text-rose-400 bg-rose-50 p-4 rounded-2xl">{d.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-rose-200 font-black uppercase tracking-widest">{d.name}</span>
                    <span className="text-xl font-black mt-0.5 text-rose-800 tracking-tighter">T-{d.days} <span className="text-xs">天</span></span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-rose-100/10 blur-[100px] rounded-full"></div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-10">
            <div className={`rounded-[40px] p-10 flex flex-col justify-between shadow-xl border-2 border-white transition-all duration-500 min-h-[220px] ${periodInfo.diff < 0 ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-400 shadow-rose-100/50'}`}>
               <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl shadow-sm ${periodInfo.diff < 0 ? 'bg-white/20' : 'bg-white text-rose-400'}`}><Activity size={24} /></div>
                  <div className="text-right">
                    <span className="text-[9px] font-black opacity-60 uppercase tracking-widest italic">Prediction</span>
                    <div className="text-xl font-black mt-1 italic">{periodInfo.date}</div>
                  </div>
               </div>
               <div>
                  <div className="text-4xl font-black tracking-tighter mb-6 italic leading-none">{periodInfo.diff > 0 ? `${periodInfo.diff} Days` : "Attention"}</div>
                  <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div className={`h-full rounded-full transition-all duration-1000 ${periodInfo.diff < 0 ? 'bg-white' : 'bg-rose-300'}`} style={{ width: `${periodInfo.progress}%` }}></div>
                  </div>
               </div>
            </div>
            
            <div className="bg-amber-50/60 rounded-[40px] p-10 border-2 border-white flex items-center justify-between shadow-xl shadow-amber-100/30 overflow-hidden relative min-h-[170px]">
               <div className="relative z-10">
                  <span className="text-[10px] font-black text-amber-600/40 mb-3 block uppercase tracking-[0.2em] italic">Pick Decision</span>
                  <div className={`text-3xl font-black text-amber-800 italic tracking-tighter transition-all ${isSpinning ? 'blur-lg opacity-30 scale-95' : ''}`}>
                    {randomFood}
                  </div>
               </div>
               <button 
                onClick={spinFood} 
                className={`relative z-10 w-16 h-16 rounded-[24px] shadow-xl flex items-center justify-center transition-all active:scale-90 ${isSpinning ? 'bg-amber-400 text-white animate-spin' : 'bg-white text-amber-400 hover:rotate-12'}`}
               >
                 <Coffee size={28} />
               </button>
               <div className="absolute -bottom-10 -left-10 text-amber-500/5 rotate-12 pointer-events-none"><UtensilsCrossed size={180} /></div>
            </div>
          </div>
        </div>

        {/* 教学中心 */}
        <div className="bg-white/70 rounded-[50px] border-2 border-white shadow-xl overflow-hidden group">
           <div className="flex flex-col md:flex-row items-center justify-between p-10 px-14 border-b border-rose-50/50 bg-white/30">
              <div className="flex items-center gap-14">
                 {['skill', 'crosshair'].map(tab => (
                   <button key={tab} onClick={() => setActiveTab(tab)} className={`relative py-3 text-lg font-black transition-all tracking-tighter italic ${activeTab === tab ? 'text-rose-500 scale-105' : 'text-rose-200 hover:text-rose-300'}`}>
                      {tab === 'skill' ? '技能特调馆' : '准星藏品室'}
                      {activeTab === tab && <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-rose-400 rounded-full animate-grow-x" />}
                   </button>
                 ))}
              </div>
              <div className="flex items-center gap-6 mt-6 md:mt-0">
                 <div className="px-5 py-2.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-50 flex items-center gap-2 shadow-sm">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div> 
                   STABLE
                 </div>
                 <button onClick={() => window.open(activeTab === 'skill' ? "https://val.qq.com/act/a20250110skillteach/" : "https://www.vcrdb.net/", "_blank")} className="p-4 bg-white/80 rounded-2xl text-rose-200 hover:text-rose-500 transition-all shadow-sm"><Maximize size={20} /></button>
              </div>
           </div>
           <div className="w-full bg-[#0F0F0F] relative shadow-2xl min-h-[500px]">
              <div key={activeTab} className="w-full animate-fade-in">
                <div className={activeTab === 'skill' ? "aspect-video" : "h-[850px]"}>
                  <iframe src={activeTab === 'skill' ? "https://val.qq.com/act/a20250110skillteach/" : "https://www.vcrdb.net/"} className="w-full h-full border-none" allow="clipboard-write; fullscreen" />
                </div>
              </div>
           </div>
        </div>

        {/* 底部导航 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-10">
           {/* 修改后的 Toolbox */}
           <div className="lg:col-span-4 bg-white/70 rounded-[45px] p-12 border-2 border-white shadow-xl flex flex-col gap-10">
              <div className="flex items-center justify-between border-b border-rose-50 pb-10">
                <h3 className="text-xl font-black text-rose-800 flex items-center gap-4 uppercase tracking-tighter italic">
                  <Palette size={24} className="text-rose-300" /> Toolbox
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-5">
                 {data.treasureChest.map((item, idx) => (
                   <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 rounded-[35px] bg-rose-50/20 border border-white hover:bg-white hover:shadow-lg transition-all text-center no-underline shadow-sm hover:-translate-y-2">
                      <div className={`w-14 h-14 ${item.color} rounded-[20px] flex items-center justify-center mb-4 shadow-sm`}>{item.icon}</div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-rose-900/40">{item.name}</span>
                   </a>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-8 bg-white/70 rounded-[50px] p-14 border-2 border-white shadow-xl overflow-hidden relative group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-10">
                <div className="flex items-center gap-8">
                   <div className="bg-[#3D262A] p-5 rounded-[25px] text-white shadow-xl rotate-[-6deg] group-hover:rotate-0 transition-all duration-700">
                     <Grid3X3 size={28} />
                   </div>
                   <div className="leading-none">
                      <h2 className="text-4xl font-black tracking-tighter uppercase italic text-rose-900">Portal</h2>
                      <p className="text-[10px] text-rose-300 font-black mt-3 uppercase tracking-[0.4em]">Integrated Hub</p>
                   </div>
                </div>
                <div className="relative group/search max-w-sm w-full">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-100 group-focus-within/search:text-rose-400 transition-colors" size={20} />
                   <input type="text" placeholder="快速定位..." className="bg-white border border-rose-50 text-sm font-black rounded-[30px] pl-16 pr-8 py-5.5 w-full focus:bg-white focus:ring-[12px] focus:ring-rose-500/5 transition-all outline-none shadow-inner" value={appSearch} onChange={(e) => setAppSearch(e.target.value)}/>
                </div>
              </div>
              
              <div className="max-h-[550px] overflow-y-auto pr-8 custom-scrollbar-v2 pb-16">
                 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-10 gap-y-16">
                    {filteredApps.map((app, idx) => (
                      <a key={idx} href={app.url} target="_blank" rel="noreferrer" className="flex flex-col items-center group/item no-underline">
                         <div className={`w-20 h-20 ${app.color} rounded-[28px] flex items-center justify-center text-white font-black text-3xl shadow-lg transition-all duration-500 relative overflow-hidden group-hover/item:shadow-rose-200/50 border-4 border-white group-hover/item:rotate-[-8deg] group-hover/item:-translate-y-2`}>
                           {app.name.charAt(0)}
                           <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                         </div>
                         <div className="mt-6 text-center leading-none">
                            <span className="text-[14px] font-black text-rose-950 tracking-tighter group-hover/item:text-rose-500 transition-colors block">{app.name}</span>
                            <span className="text-[9px] font-bold text-rose-200 uppercase tracking-widest mt-2.5 block">{app.cat}</span>
                         </div>
                      </a>
                    ))}
                 </div>
                 {filteredApps.length === 0 && (
                   <div className="py-20 text-center text-rose-200 font-bold opacity-50 uppercase tracking-widest">
                     No App Found
                   </div>
                 )}
              </div>
           </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-v2::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-v2::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-v2::-webkit-scrollbar-thumb { background: #FFEAED; border-radius: 20px; border: 2px solid transparent; background-clip: content-box; }
        .custom-scrollbar-v2::-webkit-scrollbar-thumb:hover { background: #FB7185; }
        
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        
        @keyframes grow-x { from { width: 0; } to { width: 100%; } }
        .animate-grow-x { animation: grow-x 0.4s ease-out forwards; }
        
        @keyframes particle-anim {
          0% { opacity: 0; transform: scale(0) translateY(0); }
          20% { opacity: 0.7; transform: scale(1) translateY(-20px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-80px) rotate(180deg); }
        }
        .particle { animation: particle-anim 2s ease-out forwards; opacity: 0; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        body { background-color: #FFF0F3; }
        * { -webkit-font-smoothing: antialiased; }
        input::placeholder { color: #F8D7DA; font-weight: 700; }
        .shadow-inner { box-shadow: inset 0 2px 6px rgba(100,0,0,0.03); }
        
        .hover-tilt { transition: transform 0.3s ease; }
        .hover-tilt:hover { transform: perspective(1000px) rotateX(2deg) rotateY(-1deg); }
      `}} />
    </div>
  );
}
