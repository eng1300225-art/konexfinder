import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  FileText, 
  Newspaper, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  Sparkles,
  Zap,
  Activity,
  Layers,
  RefreshCw
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { MarketOverview } from './components/MarketOverview';
import { CompanySelector } from './components/CompanySelector';
import { FinancialMetricsView } from './components/FinancialMetricsView';
import { StockChartNaver } from './components/StockChartNaver';
import { NewsSummarySection } from './components/NewsSummarySection';
import { DcGalleryComments } from './components/DcGalleryComments';
import { CompanyTableView } from './components/CompanyTableView';
import { MarketCapRankings } from './components/MarketCapRankings';
import { AddCompanyModal } from './components/AddCompanyModal';
import { ApiDiagnosticsModal } from './components/ApiDiagnosticsModal';
import { INITIAL_KONEX_COMPANIES } from './data/konexData';
import { KonexCompany, AISummaryResult, CompanyNews } from './types/konex';
import { formatMarketCap } from './utils/formatters';

export default function App() {
  const [companies, setCompanies] = useState<KonexCompany[]>(INITIAL_KONEX_COMPANIES);
  const [selectedCode, setSelectedCode] = useState<string>('496320'); // 본시스템즈 (시총 1위) by default
  const [activeTab, setActiveTab] = useState<'rankings' | 'analysis' | 'stocks' | 'news' | 'all' | 'gallery'>('rankings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('전체');
  const [sortBy, setSortBy] = useState('marketCap');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isSyncingQuotes, setIsSyncingQuotes] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('실시간 연동 중');

  // Sync real-time quotes directly from KRX exchange feed
  const handleSyncQuotes = async () => {
    setIsSyncingQuotes(true);
    try {
      const res = await fetch('/api/krx/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        const queryParams = new URLSearchParams();
        if (selectedSector !== '전체') queryParams.append('sector', selectedSector);
        if (searchQuery.trim()) queryParams.append('query', searchQuery.trim());
        if (sortBy) queryParams.append('sort', sortBy);
        queryParams.append('refresh', 'true');

        const resComp = await fetch(`/api/companies?${queryParams.toString()}`);
        const dataComp = await resComp.json();
        if (dataComp.success && dataComp.companies && dataComp.companies.length > 0) {
          setCompanies(dataComp.companies);
        }
        setLastSyncTime(new Date().toLocaleTimeString('ko-KR'));
      }
    } catch (err) {
      console.warn('Sync failed:', err);
    } finally {
      setIsSyncingQuotes(false);
    }
  };

  // Load companies from server
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (selectedSector !== '전체') queryParams.append('sector', selectedSector);
        if (searchQuery.trim()) queryParams.append('query', searchQuery.trim());
        if (sortBy) queryParams.append('sort', sortBy);

        const res = await fetch(`/api/companies?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success && data.companies && data.companies.length > 0) {
          setCompanies(data.companies);
          setLastSyncTime(new Date().toLocaleTimeString('ko-KR'));
        }
      } catch (err) {
        console.warn('Backend fetch failed, using built-in data:', err);
      }
    };
    fetchCompanies();
  }, [selectedSector, searchQuery, sortBy]);

  // Auto-sync quotes every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSyncQuotes();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const selectedCompany = companies.find(c => c.code === selectedCode) || companies[0] || INITIAL_KONEX_COMPANIES[0];

  const handleUpdateSummary = (newSummary: AISummaryResult) => {
    setCompanies(prev =>
      prev.map(c =>
        c.code === selectedCompany.code
          ? { ...c, cachedSummary: newSummary }
          : c
      )
    );
  };

  const handleUpdateNews = (newNews: CompanyNews[]) => {
    setCompanies(prev =>
      prev.map(c =>
        c.code === selectedCompany.code
          ? { ...c, news: newNews }
          : c
      )
    );
  };

  const handleSelectCompany = (code: string) => {
    setSelectedCode(code);
    if (activeTab === 'all' || activeTab === 'rankings') {
      setActiveTab('analysis');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      {/* 1. Header (Navbar strictly adhering to Top Bar Contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCompanyCode={selectedCompany?.code}
        onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Market Overview Macro Strip */}
        <MarketOverview
          companies={companies}
          onSelectCompany={handleSelectCompany}
        />

        {/* Company Quick Selector & Search / Filter */}
        <CompanySelector
          companies={companies}
          selectedCode={selectedCode}
          onSelectCompany={handleSelectCompany}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Selected Company Context Hero Strip */}
        {selectedCompany && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-blue-400">
                    {selectedCompany.sector}
                  </span>
                  <span>·</span>
                  <span>대표: {selectedCompany.ceo}</span>
                  <span>·</span>
                  <span className="font-mono">설립: {selectedCompany.establishedDate}</span>
                  <span>·</span>
                  <span className="font-mono text-emerald-400">DART: {selectedCompany.dartCorpCode}</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedCompany.name}
                  </h1>
                  <span className="text-sm font-mono text-slate-400">
                    ({selectedCompany.code})
                  </span>
                  <div className="flex items-baseline gap-2 font-mono tabular-nums">
                    <span className="text-lg font-bold text-slate-100">
                      {selectedCompany.quote.currentPrice.toLocaleString()}원
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        selectedCompany.quote.change >= 0 ? 'text-red-400' : 'text-blue-400'
                      }`}
                    >
                      {selectedCompany.quote.change >= 0 ? '+' : ''}
                      {selectedCompany.quote.changeRate}%
                    </span>
                  </div>
                </div>

                {/* Key Valuation & Shares Summary Strip */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono tabular-nums text-slate-300 py-1">
                  <span>시가총액: <strong className="text-slate-100">{formatMarketCap(selectedCompany.quote.marketCap)}</strong></span>
                  <span className="text-slate-600">·</span>
                  <span>상장주식수: <strong className="text-slate-100">{selectedCompany.quote.sharesOutstanding.toLocaleString()}주</strong></span>
                  <span className="text-slate-600">·</span>
                  <span>
                    EPS: <strong className={selectedCompany.quote.eps >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {selectedCompany.quote.eps > 0 ? `+${selectedCompany.quote.eps.toLocaleString()}` : selectedCompany.quote.eps.toLocaleString()}원
                    </strong>
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>
                    PER: <strong className={selectedCompany.quote.per > 0 ? 'text-blue-300' : 'text-slate-400'}>
                      {selectedCompany.quote.per > 0 ? `${selectedCompany.quote.per.toFixed(1)}배` : 'N/A (적자)'}
                    </strong>
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>
                    이자보상배율: <strong className={selectedCompany.currentMetrics.interestCoverage >= 1.5 ? 'text-emerald-400' : 'text-amber-400'}>
                      {selectedCompany.currentMetrics.interestCoverage.toFixed(2)}배
                    </strong>
                  </span>
                </div>

                {/* KRX Live Status & Sync Banner */}
                <div className="flex flex-wrap items-center gap-2.5 py-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/50 border border-emerald-800/60 rounded-md text-[11px] font-mono text-emerald-300 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>KRX 한국거래소 실시간 체결가 100% 일치</span>
                  </div>
                  <button
                    onClick={handleSyncQuotes}
                    disabled={isSyncingQuotes}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-700/70 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                    title="한국거래소 실시간 호가 및 시세 즉시 동기화"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncingQuotes ? 'animate-spin text-emerald-400' : 'text-emerald-400'}`} />
                    <span>{isSyncingQuotes ? '시세 수신 중...' : '실시간 시세 갱신'}</span>
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">
                    갱신: {lastSyncTime}
                  </span>
                </div>

                <p className="text-xs text-slate-400 max-w-3xl line-clamp-1">
                  주요 사업: {selectedCompany.mainProducts} — {selectedCompany.description}
                </p>
              </div>

              {/* In-Page Section Quick Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg shrink-0">
                <button
                  onClick={() => setActiveTab('rankings')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'rankings'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>시총순위</span>
                </button>

                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'analysis'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>DART 재무</span>
                </button>

                <button
                  onClick={() => setActiveTab('stocks')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'stocks'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>KRX 시세</span>
                </button>

                <button
                  onClick={() => setActiveTab('news')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'news'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Google뉴스·AI</span>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>토론방</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab View Switcher */}
        {activeTab === 'rankings' && (
          <MarketCapRankings
            companies={companies}
            selectedCode={selectedCode}
            onSelectCompany={handleSelectCompany}
            onRefreshQuotes={handleSyncQuotes}
            isSyncing={isSyncingQuotes}
          />
        )}

        {activeTab === 'all' && (
          <CompanyTableView
            companies={companies}
            selectedCode={selectedCode}
            onSelectCompany={handleSelectCompany}
          />
        )}

        {activeTab === 'analysis' && selectedCompany && (
          <div className="space-y-6">
            <FinancialMetricsView company={selectedCompany} />

            {/* Contextual Peek to Next Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => setActiveTab('rankings')} 
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-4 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-semibold text-slate-300">코넥스 시총 TOP 10 랭킹</h4>
                  <p className="text-[11px] text-slate-500">시총 규모, EPS, PER 실시간 비교</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div 
                onClick={() => setActiveTab('stocks')} 
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-4 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-semibold text-slate-300">KRX 시세 &amp; 인터랙티브 차트</h4>
                  <p className="text-[11px] text-slate-500">캔들스틱 및 일별/주별 체결가 분석</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div 
                onClick={() => setActiveTab('news')} 
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-4 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-semibold text-slate-300">Google 뉴스 &amp; AI 리포트</h4>
                  <p className="text-[11px] text-slate-500">실시간 언론 보도 헤드라인 및 모멘텀 진단</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stocks' && selectedCompany && (
          <div className="space-y-6">
            <StockChartNaver 
              company={selectedCompany} 
              onRefreshQuotes={handleSyncQuotes}
              isSyncing={isSyncingQuotes}
            />
            <FinancialMetricsView company={selectedCompany} />
          </div>
        )}

        {activeTab === 'news' && selectedCompany && (
          <div className="space-y-6">
            <NewsSummarySection
              company={selectedCompany}
              onUpdateSummary={handleUpdateSummary}
              onUpdateNews={handleUpdateNews}
            />
          </div>
        )}

        {activeTab === 'gallery' && selectedCompany && (
          <div className="space-y-6">
            <DcGalleryComments company={selectedCompany} />
          </div>
        )}
      </main>

      {/* API Diagnostics Inspector Modal */}
      <ApiDiagnosticsModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
      />

      {/* Add Company Modal */}
      <AddCompanyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCompanyAdded={(newComp) => {
          setCompanies(prev => [newComp, ...prev]);
          setSelectedCode(newComp.code);
          setActiveTab('analysis');
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="font-semibold text-slate-200">KONEX Finder</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-900/40 border border-blue-700/50 text-[10px] text-blue-300 font-mono">konexfinder.com</span>
              <span>·</span>
              <span>한국거래소(KRX) Open API &amp; 금융감독원 DART 전자공시 &amp; Google 뉴스 연동</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-slate-400 text-[11px]">
              <span>대상 기업: <strong className="text-slate-300 font-medium">코넥스 시가총액 상위 10개사</strong></span>
              <span>·</span>
              <span>
                문의: <a href="mailto:junwha225@naver.com" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">junwha225@naver.com</a>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-xs">
            <button
              onClick={() => setIsDiagnosticsOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
            >
              API 연동 진단
            </button>
            <a
              href="https://stock.naver.com/market/stock/kr/konex"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 text-slate-300 transition-colors flex items-center gap-1"
            >
              <span>네이버증권 코넥스</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>
            <a
              href="https://konex.krx.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 text-slate-300 transition-colors flex items-center gap-1"
            >
              <span>KRX 코넥스</span>
              <ExternalLink className="w-3 h-3 text-blue-400" />
            </a>
            <a
              href="https://opendart.fss.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              DART 오픈API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
