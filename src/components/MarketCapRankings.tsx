import React from 'react';
import { Trophy, TrendingUp, TrendingDown, ArrowRight, Building2, CheckCircle2, RefreshCw } from 'lucide-react';
import { KonexCompany } from '../types/konex';
import { formatMarketCap } from '../utils/formatters';

interface MarketCapRankingsProps {
  companies: KonexCompany[];
  selectedCode: string;
  onSelectCompany: (code: string) => void;
  onRefreshQuotes?: () => void;
  isSyncing?: boolean;
}

export const MarketCapRankings: React.FC<MarketCapRankingsProps> = ({
  companies,
  selectedCode,
  onSelectCompany,
  onRefreshQuotes,
  isSyncing
}) => {
  // Sort companies by market capitalization in descending order
  const rankedCompanies = [...companies].sort((a, b) => b.quote.marketCap - a.quote.marketCap);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold';
      case 2:
        return 'bg-slate-300/20 text-slate-200 border-slate-400/40 font-bold';
      case 3:
        return 'bg-amber-700/20 text-amber-400 border-amber-700/50 font-bold';
      default:
        return 'bg-slate-900 text-slate-400 border-slate-800';
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>코넥스 시가총액 순위</span>
              <span className="text-xs font-normal text-slate-400">
                (Market Cap Ranking)
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              코넥스 상장 기업들의 시가총액 기준 순위와 주요 가치지표(EPS, PER)를 한눈에 비교합니다.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onRefreshQuotes && (
            <button
              onClick={onRefreshQuotes}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 rounded-md hover:bg-emerald-900/80 transition-colors cursor-pointer disabled:opacity-50"
              title="한국거래소 실시간 시세 동기화"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-emerald-400' : 'text-emerald-400'}`} />
              <span>{isSyncing ? '동기화 중...' : '실시간 시세 갱신'}</span>
            </button>
          )}
          <a
            href="https://stock.naver.com/market/stock/kr/konex"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-md hover:bg-emerald-900/50 transition-colors"
          >
            <span>네이버페이증권 코넥스</span>
          </a>
          <a
            href="https://konex.krx.co.kr/contents/MKD/04/0406/04060100/MKD04060100.jsp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-blue-300 bg-blue-950/40 border border-blue-800/60 rounded-md hover:bg-blue-900/50 transition-colors"
          >
            <span>KRX 상장종목표</span>
          </a>
          <span className="text-xs font-mono text-slate-400 pl-2">
            총 {companies.length}개사 집계
          </span>
        </div>
      </div>

      {/* High-Density Ranking Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
              <th className="py-2.5 px-3 w-14 text-center">순위</th>
              <th className="py-2.5 px-3">기업명 (종목코드)</th>
              <th className="py-2.5 px-2">업종</th>
              <th className="py-2.5 px-3 text-right">시가총액</th>
              <th className="py-2.5 px-3 text-right">현재가 (원)</th>
              <th className="py-2.5 px-2 text-right">등락률</th>
              <th className="py-2.5 px-3 text-right">상장주식수</th>
              <th className="py-2.5 px-3 text-right">EPS (주당순익)</th>
              <th className="py-2.5 px-3 text-right">PER (배)</th>
              <th className="py-2.5 px-3 text-center">선택</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 font-mono tabular-nums text-slate-300">
            {rankedCompanies.map((comp, idx) => {
              const rank = idx + 1;
              const isSelected = comp.code === selectedCode;
              const q = comp.quote;
              const isUp = q.change >= 0;

              return (
                <tr
                  key={comp.code}
                  onClick={() => onSelectCompany(comp.code)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-950/40' : 'hover:bg-slate-850/60'
                  }`}
                >
                  {/* Rank Badge */}
                  <td className="py-3 px-3 text-center font-sans">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] border ${getRankBadge(
                        rank
                      )}`}
                    >
                      {rank}
                    </span>
                  </td>

                  {/* Company Name & Code */}
                  <td className="py-3 px-3">
                    <div className="font-sans font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{comp.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {comp.code}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-blue-400 font-sans font-normal ml-1">
                          [선택됨]
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Sector */}
                  <td className="py-3 px-2 font-sans text-slate-400 text-[11px] truncate max-w-[90px]">
                    {comp.sector.split('/')[0]}
                  </td>

                  {/* Market Cap */}
                  <td className="py-3 px-3 text-right font-bold text-slate-100 whitespace-nowrap">
                    {formatMarketCap(q.marketCap)}
                  </td>

                  {/* Current Price */}
                  <td className="py-3 px-3 text-right font-semibold text-slate-200">
                    {q.currentPrice.toLocaleString()}원
                  </td>

                  {/* Change Rate */}
                  <td className={`py-3 px-2 text-right font-semibold ${isUp ? 'text-red-400' : 'text-blue-400'}`}>
                    {isUp ? '+' : ''}{q.changeRate}%
                  </td>

                  {/* Shares */}
                  <td className="py-3 px-3 text-right text-slate-400">
                    {(q.sharesOutstanding / 10000).toFixed(1)}만주
                  </td>

                  {/* EPS */}
                  <td className={`py-3 px-3 text-right font-semibold ${q.eps >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {q.eps > 0 ? `+${q.eps.toLocaleString()}` : q.eps.toLocaleString()}원
                  </td>

                  {/* PER */}
                  <td className={`py-3 px-3 text-right font-semibold ${q.per > 0 ? 'text-blue-300' : 'text-slate-500'}`}>
                    {q.per > 0 ? `${q.per.toFixed(1)}배` : 'N/A (적자)'}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCompany(comp.code);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-blue-400 hover:text-blue-300 px-2.5 py-1 bg-blue-950/40 rounded border border-blue-800/40 hover:bg-blue-900/50"
                    >
                      <span>리포트 보기</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
