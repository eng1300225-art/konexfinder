import React from 'react';
import { TrendingUp, BarChart3, ShieldCheck, AlertCircle, Building2, Layers } from 'lucide-react';
import { KonexCompany } from '../types/konex';
import { formatMarketCap } from '../utils/formatters';

interface MarketOverviewProps {
  companies: KonexCompany[];
  onSelectCompany: (code: string) => void;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ companies, onSelectCompany }) => {
  const profitableCount = companies.filter(c => c.currentMetrics.operatingMargin > 0).length;
  const safeDebtCount = companies.filter(c => c.currentMetrics.debtRatio <= 100).length;
  const safeCoverageCount = companies.filter(c => c.currentMetrics.interestCoverage >= 1.5).length;
  const totalMarketCap = companies.reduce((sum, c) => sum + c.quote.marketCap, 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {/* 1. Monitored KONEX Companies & Total Market Cap */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">분석 대상 코넥스 기업</span>
          <Building2 className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div className="flex items-baseline gap-2 my-1">
          <span className="text-xl font-bold font-mono tabular-nums text-slate-100">
            {companies.length}개사
          </span>
          <span className="text-xs font-mono tabular-nums text-slate-400">
            (합산 시총 {formatMarketCap(totalMarketCap, false)})
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          DART 최신 정기감사보고서 전수 분석
        </div>
      </div>

      {/* 2. DART Audit Healthy Debt Companies */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">부채비율 100% 이하 안전기업</span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-2 my-1">
          <span className="text-xl font-bold font-mono tabular-nums text-emerald-400">
            {safeDebtCount}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            / {companies.length}개사 ({Math.round((safeDebtCount / companies.length) * 100)}%)
          </span>
        </div>
        <div className="text-[11px] text-slate-500">
          DART 최신 감사보고서 원장 기준
        </div>
      </div>

      {/* 3. Operating Profit Margin Positive Companies */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">영업이익 흑자 달성 기업</span>
          <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div className="flex items-baseline gap-2 my-1">
          <span className="text-xl font-bold font-mono tabular-nums text-blue-400">
            {profitableCount}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            / {companies.length}개사 ({Math.round((profitableCount / companies.length) * 100)}%)
          </span>
        </div>
        <div className="text-[11px] text-slate-500">
          본업을 통한 지속 영업현금 창출
        </div>
      </div>

      {/* 4. Interest Coverage Ratio Safe Companies */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">이자보상배율 1.5배 이상</span>
          <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
        </div>
        <div className="flex items-baseline gap-2 my-1">
          <span className="text-xl font-bold font-mono tabular-nums text-purple-300">
            {safeCoverageCount}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            / {companies.length}개사 ({Math.round((safeCoverageCount / companies.length) * 100)}%)
          </span>
        </div>
        <div className="text-[11px] text-slate-500">
          차입금 이자 미지급 리스크 없음
        </div>
      </div>
    </div>
  );
};
