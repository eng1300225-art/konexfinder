import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { KonexCompany } from '../types/konex';
import { formatMarketCap } from '../utils/formatters';

interface CompanySelectorProps {
  companies: KonexCompany[];
  selectedCode: string;
  onSelectCompany: (code: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  companies,
  selectedCode,
  onSelectCompany,
  searchQuery,
  setSearchQuery,
  selectedSector,
  setSelectedSector,
  sortBy,
  setSortBy
}) => {
  const sectors = ['전체', '로봇/정밀기계', '2차전지 소재', '전기차 충전기', '바이오의약품', '나노/화학소재', '의료기기/임플란트', '반도체 검사장비'];

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 mb-6 shadow-sm">
      {/* Top Controls: Search, Sector Tabs, and Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="코넥스 시총 TOP 10 종목명/코드 검색 (예: 본시스템즈, SK시그넷, 496320)"
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5" />
            정렬:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="marketCap">시가총액 높은순</option>
            <option value="changeRate">주가 상승률 높은순</option>
            <option value="currentRatio">유동비율 건전순 (높은순)</option>
            <option value="debtRatio">부채비율 안전순 (낮은순)</option>
            <option value="operatingMargin">영업이익률 높은순</option>
            <option value="interestCoverage">이자보상배율 높은순</option>
          </select>
        </div>
      </div>

      {/* Sector filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/60 mb-4 scrollbar-none">
        {sectors.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSector(sec)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedSector === sec
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Quick horizontal company badges / scroller */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {companies.map((comp) => {
          const isSelected = comp.code === selectedCode;
          const isUp = comp.quote.change >= 0;

          return (
            <button
              key={comp.code}
              onClick={() => onSelectCompany(comp.code)}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500/40 shadow-sm'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="font-semibold text-xs text-slate-100 truncate">
                  {comp.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {comp.code}
                </span>
              </div>

              <div className="flex items-baseline justify-between text-xs">
                <span className="font-mono tabular-nums font-medium text-slate-200">
                  {comp.quote.currentPrice.toLocaleString()}원
                </span>
                <span
                  className={`font-mono tabular-nums text-[11px] font-semibold ${
                    isUp ? 'text-red-400' : 'text-blue-400'
                  }`}
                >
                  {isUp ? '+' : ''}{comp.quote.changeRate}%
                </span>
              </div>

              {/* Quiet unboxed financial status tag */}
              <div className="mt-1.5 pt-1.5 border-t border-slate-850/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate">{comp.sector.split('/')[0]}</span>
                <span className="font-mono tabular-nums text-slate-300">
                  시총 {formatMarketCap(comp.quote.marketCap, false)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
