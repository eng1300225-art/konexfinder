import React from 'react';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'rankings' | 'all' | 'analysis' | 'stocks' | 'news' | 'gallery';
  setActiveTab: (tab: 'rankings' | 'all' | 'analysis' | 'stocks' | 'news' | 'gallery') => void;
  selectedCompanyCode: string;
  onOpenDiagnostics: () => void;
  onOpenAddModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDiagnostics
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('rankings')}
            className="text-left group flex items-center gap-2.5 focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition-colors">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              KONEX Finder
            </span>
          </button>
        </div>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('rankings')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'rankings'
                ? 'text-blue-400 border-b-2 border-blue-500 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            시총순위
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'analysis'
                ? 'text-blue-400 border-b-2 border-blue-500 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            DART재무
          </button>
          <button
            onClick={() => setActiveTab('stocks')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'stocks'
                ? 'text-blue-400 border-b-2 border-blue-500 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            KRX시세
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'news'
                ? 'text-blue-400 border-b-2 border-blue-500 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Google뉴스
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'all'
                ? 'text-blue-400 border-b-2 border-blue-500 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            전체비교
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'gallery'
                ? 'text-blue-400 border-b-2 border-blue-500 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            토론방
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDiagnostics}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>DART·KRX 연동 가동중</span>
          </button>
        </div>
      </div>
    </header>
  );
};
