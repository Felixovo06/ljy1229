import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Star,
  Clock,
  UtensilsCrossed,
  Sparkles,
  Map as MapIcon,
  ChevronRight,
  Navigation,
  Cake,
  Target,
  Shield,
  ExternalLink,
  Activity,
  AlertCircle,
  Crosshair,
  Music,
  X,
  ChevronDown,
  ChevronUp,
  Music2,
  Box,
  Compass,
  RefreshCw,
  Disc,
  LogIn,
  UserCheck,
  Film,
  Book,
  Keyboard,
  FileType,
  Image as ImageIcon,
  GitBranch,
  FileText,
  LayoutGrid,
  Search,
  Heart,
  ArrowRight
} from 'lucide-react';

/**
 * --------------------------------------------------------------------
 * 配置数据 - 核心记录与站点索引
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
    { name: "猫TV影视", desc: "极简影视资源库", url: "https://tv.cattvv.com", icon: <Film size={18} />, color: "bg-rose-400" },
    { name: "wikiHow", desc: "生活百科指南", url: "https://zh.wikihow.com/", icon: <Book size={18} />, color: "bg-emerald-500" },
    { name: "快捷键大全", desc: "软件快捷键速查", url: "https://hotkeycheatsheet.com/zh", icon: <Keyboard size={18} />, color: "bg-blue-500" },
    { name: "Aconvert", desc: "格式在线转换", url: "https://www.aconvert.com/cn/", icon: <FileType size={18} />, color: "bg-orange-500" },
    { name: "好壁纸", desc: "高颜值审美壁纸", url: "http://www.haowallpaper.com", icon: <ImageIcon size={18} />, color: "bg-indigo-400" },
    { name: "思维导图", desc: "在线流畅绘图", url: "https://wanglin2.github.io/mind-map/#/", icon: <GitBranch size={18} />, color: "bg-purple-400" },
    { name: "PDF24", desc: "全能PDF工具箱", url: "https://tools.pdf24.org/zh/", icon: <FileText size={18} />, color: "bg-red-500" },
  ],

  appPortal: [
    { name: "微信", cat: "社交", url: "https://weixin.qq.com/", color: "bg-green-500" },
    { name: "微博", cat: "社交", url: "https://weibo.com/", color: "bg-red-500" },
    { name: "小红书", cat: "社交", url: "https://www.xiaohongshu.com/", color: "bg-rose-500" },
    { name: "QQ", cat: "社交", url: "https://im.qq.com/", color: "bg-blue-400" },
    { name: "知乎", cat: "社区", url: "https://www.zhihu.com/", color: "bg-blue-600" },
    { name: "豆瓣", cat: "社区", url: "https://www.douban.com/", color: "bg-green-600" },
    { name: "B站", cat: "娱乐", url: "https://www.bilibili.com/", color: "bg-pink-400" },
    { name: "抖音", cat: "娱乐", url: "https://www.douyin.com/", color: "bg-zinc-900" },
    { name: "网易云", cat: "音乐", url: "https://music.163.com/", color: "bg-red-600" },
    { name: "Spotify", cat: "音乐", url: "https://www.spotify.com/", color: "bg-green-400" },
    { name: "腾讯视频", cat: "视频", url: "https://v.qq.com/", color: "bg-blue-400" },
    { name: "爱奇艺", cat: "视频", url: "https://www.iqiyi.com/", color: "bg-green-400" },
    { name: "芒果TV", cat: "视频", url: "https://www.mgtv.com/", color: "bg-orange-400" },
    { name: "YouTube", cat: "海外", url: "https://www.youtube.com/", color: "bg-red-600" },
    { name: "Netflix", cat: "海外", url: "https://www.netflix.com/", color: "bg-red-700" },
    { name: "Valorant", cat: "游戏", url: "https://playvalorant.com/", color: "bg-rose-600" },
    { name: "LOL", cat: "游戏", url: "https://lol.qq.com/", color: "bg-yellow-600" },
    { name: "Steam", cat: "游戏", url: "https://store.steampowered.com/", color: "bg-gray-700" },
    { name: "Epic", cat: "游戏", url: "https://www.epicgames.com/", color: "bg-gray-800" },
    { name: "原神", cat: "游戏", url: "https://ys.mihoyo.com/", color: "bg-blue-300" },
    { name: "王者荣耀", cat: "游戏", url: "https://pvp.qq.com/", color: "bg-orange-700" },
    { name: "WeGame", cat: "平台", url: "https://www.wegame.com.cn/", color: "bg-orange-400" },
    { name: "WPS", cat: "办公", url: "https://www.wps.cn/", color: "bg-rose-600" },
    { name: "飞书", cat: "办公", url: "https://www.feishu.cn/", color: "bg-blue-500" },
    { name: "钉钉", cat: "办公", url: "https://www.dingtalk.com/", color: "bg-blue-600" },
    { name: "Notion", cat: "笔记", url: "https://www.notion.so/", color: "bg-gray-800" },
    { name: "Obsidian", cat: "笔记", url: "https://obsidian.md/", color: "bg-purple-600" },
    { name: "Canva", cat: "设计", url: "https://www.canva.cn/", color: "bg-indigo-500" },
    { name: "Figma", cat: "设计", url: "https://www.figma.com/", color: "bg-orange-500" },
    { name: "剪映", cat: "创作", url: "https://www.capcut.cn/", color: "bg-gray-800" },
    { name: "ChatGPT", cat: "AI", url: "https://chatgpt.com/", color: "bg-emerald-600" },
    { name: "DeepSeek", cat: "AI", url: "https://www.deepseek.com/", color: "bg-blue-800" },
    { name: "淘宝", cat: "生活", url: "https://www.taobao.com/", color: "bg-orange-500" },
    { name: "京东", cat: "生活", url: "https://www.jd.com/", color: "bg-red-600" },
    { name: "拼多多", cat: "生活", url: "https://www.pinduoduo.com/", color: "bg-red-500" },
    { name: "高德地图", cat: "出行", url: "https://www.amap.com/", color: "bg-sky-500" },
    { name: "携程", cat: "出行", url: "https://www.ctrip.com/", color: "bg-blue-700" },
    { name: "谷歌", cat: "工具", url: "https://www.google.com/", color: "bg-red-400" },
    { name: "百度网盘", cat: "云存储", url: "https://pan.baidu.com/", color: "bg-blue-500" },
    { name: "GitHub", cat: "代码", url: "https://github.com/", color: "bg-zinc-900" },
    { name: "闲鱼", cat: "生活", url: "https://www.goofish.com/", color: "bg-yellow-400" },
  ]
};

export default function App() {
  const [data] = useState(INITIAL_DATA);
  const [time, setTime] = useState(new Date());
  const [randomFood, setRandomFood] = useState("今天吃什么？");
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
      if (count > 15) {
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
    return data.appPortal.filter(app => 
      app.name.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.cat.toLowerCase().includes(appSearch.toLowerCase())
    );
  }, [appSearch, data.appPortal]);

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#1a1a1a] font-sans selection:bg-pink-100 pb-20 overflow-x-hidden">
      
      {/* --- 顶部音乐电台 (物理裁剪模式) --- */}
      <div className="w-full flex flex-col items-center sticky top-0 z-[100] pointer-events-none">
        <div className={`w-full max-w-2xl transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) transform pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${isPlayerOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 absolute'}`}>
          <div className="bg-white/95 backdrop-blur-2xl border-x border-b border-white rounded-b-[2.5rem] overflow-hidden relative shadow-2xl">
             <div className="h-1 w-full bg-gradient-to-r from-pink-400 to-indigo-400"></div>
             <div className="p-4 flex items-center justify-between px-10 bg-white/40">
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg animate-spin-slow">
                      <Disc size={18} className="text-pink-400" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xs font-black uppercase tracking-widest text-gray-900 leading-none">音乐电台</span>
                     <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">账号同步中</span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   {!isLoggedIn ? (
                     <button onClick={() => { window.open("https://music.163.com/#/login", "_blank"); setIsLoggedIn(true); }} className="px-4 py-1.5 bg-red-500 text-white rounded-full text-[10px] font-black italic shadow-lg hover:scale-105 transition-transform"><LogIn size={12} className="inline mr-1"/> 登录网易云</button>
                   ) : (
                     <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black italic border border-green-100"><UserCheck size={12} /> 已同步</div>
                   )}
                   <button onClick={() => setPlayerKey(k => k + 1)} className="p-2 text-gray-300 hover:text-pink-500 transition-colors"><RefreshCw size={14} /></button>
                   <button onClick={() => setIsPlayerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X size={18} /></button>
                </div>
             </div>
             <div className="w-full h-[110px] overflow-hidden bg-white px-4 border-t border-gray-50">
                <iframe key={playerKey} frameBorder="no" border="0" width="100%" height="450" src={`https://music.163.com/outchain/player?type=0&id=${data.musicConfig.playlistId}&auto=0&height=430`}></iframe>
             </div>
          </div>
        </div>
        <div className="pointer-events-auto">
          <button onClick={() => setIsPlayerOpen(!isPlayerOpen)} className={`px-10 py-2.5 rounded-b-[2rem] shadow-xl flex items-center gap-3 transition-all duration-500 transform hover:translate-y-0.5 active:scale-95 ${isPlayerOpen ? 'bg-gray-900 text-white' : 'bg-white text-pink-500 border-x border-b border-pink-50 font-black'}`}>
            {isPlayerOpen ? <span className="text-[10px] font-black uppercase tracking-widest leading-none">收起频道</span> : <><Music size={18} className="animate-pulse" /><span className="text-[10px] font-black uppercase tracking-widest leading-none text-center">展开电台</span></>}
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto space-y-8 pt-8 px-4 md:px-8">
        
        {/* Header - 保持英文，去除土味副标题 */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 animate-in fade-in duration-700">
          <h1 className="text-6xl font-black tracking-tighter flex items-center gap-6 text-gray-900 italic leading-none uppercase">
            SWEET SPACE <Sparkles className="text-pink-400 animate-pulse" size={44} />
          </h1>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-pink-50 flex items-center gap-4">
             <div className="flex items-center gap-2 text-pink-500 font-black italic">
               <Clock size={16} /><span className="text-base leading-none">{time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
             </div>
             <div className="h-4 w-px bg-pink-100"></div>
             <span className="text-gray-500 font-bold text-[10px] uppercase leading-none tracking-wider">{time.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' })}</span>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
          
          {/* Row 1: 个人看板 */}
          <div className="md:col-span-4 bg-gray-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[320px]">
             <div className="relative z-10">
                <div className="bg-white/10 w-fit p-3 rounded-2xl backdrop-blur-md mb-6 border border-white/10 shadow-lg"><Star className="text-yellow-400 fill-yellow-400" size={24} /></div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 italic">我们的纪念日</div>
                <div className="text-8xl font-black tracking-tighter leading-none">{loveDays}<span className="text-2xl ml-3 opacity-30 font-normal uppercase leading-none">天</span></div>
             </div>
             <div className="relative z-10 space-y-3 pt-6 border-t border-white/10">
                {data.importantDates?.slice(0, 1).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center opacity-80">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">{item.icon} {item.name}</div>
                    <div className="text-xs font-black italic text-pink-400">还剩 {Math.ceil((new Date(item.date) - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24))} 天</div>
                  </div>
                ))}
             </div>
          </div>

          <div className={`md:col-span-4 rounded-[3.5rem] p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-700 min-h-[320px] ${periodInfo.diffDays < 0 ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gradient-to-br from-rose-400 to-pink-500 shadow-rose-100'}`}>
             <div className="relative z-10 flex justify-between items-start leading-none">
               <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg leading-none">{periodInfo.diffDays < 0 ? <AlertCircle size={26} /> : <Activity size={26} />}</div>
               <div className="text-right leading-none text-[10px] font-black uppercase tracking-widest opacity-60">生理看板</div>
             </div>
             <div className="relative z-10 text-white">
                <div className="text-6xl font-black mb-6 tracking-tighter italic leading-none">{periodInfo.diffDays > 0 ? (<>{periodInfo.diffDays}<span className="text-2xl ml-3 opacity-70 uppercase font-normal leading-none text-white/80">天后</span></>) : periodInfo.diffDays === 0 ? "就在今天！" : (<><span className="text-2xl mr-3 opacity-70 uppercase font-normal text-white/70">已推迟</span>{Math.abs(periodInfo.diffDays)}<span className="text-2xl ml-1 font-normal opacity-40">天</span></>)}</div>
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden shadow-inner"><div className="bg-white h-full shadow-[0_0_15px_white]" style={{ width: `${periodInfo.progress}%` }}></div></div>
                <div className="mt-4 text-[10px] font-black uppercase tracking-widest opacity-70 leading-none">周期正常</div>
             </div>
          </div>

          <div className="md:col-span-4 bg-[#fffbeb] rounded-[3.5rem] p-10 border border-yellow-100 flex flex-col justify-between shadow-sm group hover:shadow-md transition-all min-h-[320px]">
             <div><div className="text-[11px] font-black text-yellow-600 uppercase tracking-widest italic opacity-60 leading-none">今天吃什么</div><p className="text-[10px] text-yellow-700/50 font-bold mt-2 uppercase italic leading-none">让随机性决定灵感</p></div>
             <div className="flex items-center justify-between mt-6">
                <div className={`text-4xl font-black text-yellow-900 transition-all duration-300 ${isSpinning ? 'blur-[4px] scale-95 opacity-50' : 'opacity-100'} leading-none italic tracking-tighter`}>{randomFood}</div>
                <button onClick={spinFood} disabled={isSpinning} className={`p-7 rounded-[2.5rem] shadow-2xl transition-all active:scale-90 ${isSpinning ? 'bg-yellow-200 text-white animate-spin' : 'bg-white text-yellow-500 hover:shadow-yellow-100 hover:shadow-2xl'}`}><UtensilsCrossed size={32} /></button>
             </div>
          </div>

          {/* Row 2: 小众百宝箱 */}
          <div className="md:col-span-12 bg-white rounded-[4rem] p-12 shadow-sm border border-zinc-100 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-10 px-4">
               <div className="flex items-center gap-5">
                 <div className="bg-pink-500 p-4 rounded-[1.8rem] text-white shadow-xl group-hover:rotate-6 transition-transform"><Box size={30} strokeWidth={2.5} /></div>
                 <div><h2 className="text-3xl font-black tracking-tighter italic uppercase text-gray-900 leading-none">小众百宝箱</h2><p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 italic leading-none">悉心收集的工具与资源库</p></div>
               </div>
               <Compass className="text-pink-50 animate-spin-slow hidden md:block" size={60} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {data.treasureChest?.map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="group/card relative flex flex-col p-6 bg-gray-50/50 rounded-[2.5rem] hover:bg-white hover:shadow-xl hover:scale-[1.03] transition-all duration-500 border border-transparent hover:border-pink-100 text-center items-center overflow-hidden">
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm group-hover/card:rotate-6 transition-transform`}>{item.icon}</div>
                  <h3 className="font-black text-gray-800 mb-2 leading-tight text-[11px] uppercase tracking-tighter">{item.name}</h3>
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-md border-t border-gray-50"><p className="text-[9px] font-bold text-pink-600 leading-tight line-clamp-2">{item.desc}</p></div>
                </a>
              ))}
            </div>
          </div>

          {/* Row 3: 瓦罗兰特大板块 */}
          <div className="md:col-span-6 bg-white rounded-[3.5rem] shadow-sm border border-zinc-100 flex flex-col overflow-hidden relative group min-h-[550px]">
            <div className="bg-gray-50 border-b border-gray-100 p-6 px-10 flex items-center justify-between flex-shrink-0">
               <div className="flex items-center gap-4 leading-none"><div className="bg-indigo-500 p-3 rounded-2xl text-white shadow-lg"><MapIcon size={22} /></div><h2 className="text-lg font-black italic uppercase tracking-widest text-gray-900 leading-none">战术指挥中心</h2></div>
               <div className="flex gap-1.5 items-center bg-white p-2.5 px-4 rounded-full border border-gray-100 leading-none"><span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">地图实时同步</span><div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div></div>
            </div>
            <div className="flex-1 w-full bg-[#121212] relative overflow-hidden"><iframe src="https://val.isoox.cn" className="w-full h-full border-none" title="Tactical Hub" /></div>
          </div>

          <div className="md:col-span-6 bg-white rounded-[3.5rem] shadow-sm border border-zinc-100 flex flex-col overflow-hidden relative group min-h-[550px]">
            <div className="bg-gray-50 border-b border-gray-100 p-6 px-10 flex items-center justify-between flex-shrink-0">
               <div className="flex items-center gap-4 leading-none"><div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg"><Crosshair size={22} /></div><h2 className="text-lg font-black italic uppercase tracking-widest text-gray-900 leading-none">准星同步中枢</h2></div>
               <div className="flex gap-1.5 items-center bg-white p-2.5 px-4 rounded-full border border-gray-100 leading-none"><span className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none">数据已连接</span><Target size={14} className="text-red-400 animate-spin-slow" /></div>
            </div>
            <div className="flex-1 w-full bg-[#121212] relative overflow-hidden"><iframe src="https://val.isoox.cn/crosshair" className="w-full h-full border-none" title="Crosshair Hub" /></div>
          </div>

          {/* Row 4: 超级应用门户 (带搜索与滚动) */}
          <div className="md:col-span-12 bg-white rounded-[4rem] p-10 md:p-14 shadow-xl border border-zinc-100 relative overflow-hidden group">
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-5">
                   <div className="bg-gray-900 p-4 rounded-[1.8rem] text-white shadow-xl transition-transform duration-500 group-hover:scale-110"><LayoutGrid size={32} strokeWidth={2.5} /></div>
                   <div><h2 className="text-3xl font-black tracking-tighter italic uppercase text-gray-900 leading-none">应用门户</h2><p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 italic leading-none">全网主流官网入口快速直达 (55+ 应用)</p></div>
                </div>
                <div className="relative group/search">
                   <div className="absolute inset-y-0 left-5 flex items-center text-zinc-400 transition-colors"><Search size={18} /></div>
                   <input type="text" placeholder="搜索应用或分类..." className="bg-gray-50 border border-zinc-100 text-sm font-bold rounded-2xl pl-12 pr-6 py-4 w-full md:w-[320px] focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:bg-white transition-all shadow-inner tracking-widest" value={appSearch} onChange={(e) => setAppSearch(e.target.value)}/>
                </div>
             </div>
             <div className="max-h-[380px] overflow-y-auto pr-6 custom-scrollbar-v2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-4">
                   {filteredApps.map((app, idx) => (
                     <a key={idx} href={app.url} target="_blank" rel="noreferrer" className="group/app flex flex-col items-center p-4 bg-gray-50/80 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-pink-100">
                       <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-white font-black text-base shadow-lg group-hover/app:-rotate-6 transition-all duration-500 relative overflow-hidden`}>{app.name.charAt(0)}</div>
                       <div className="mt-3 text-center"><span className="text-[10px] font-black text-zinc-800 tracking-tighter truncate w-full block uppercase leading-none">{app.name}</span><span className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">{app.cat}</span></div>
                     </a>
                   ))}
                </div>
             </div>
          </div>

        </div>

        <footer className="pt-16 pb-12 flex flex-col items-center gap-10 opacity-30 leading-none text-zinc-400">
          <p className="text-[11px] font-black uppercase tracking-[1.8em] ml-[1.8em] leading-none italic font-mono uppercase">Archive Sync System · Established Jan. 2022</p>
        </footer>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fee2e2; border-radius: 20px; }
        .custom-scrollbar-v2::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-v2::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-v2::-webkit-scrollbar-thumb { background: #f472b6; border-radius: 20px; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}} />
    </div>
  );
}
