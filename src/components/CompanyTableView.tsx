import React from 'react';
import { ExternalLink, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { KonexCompany } from '../types/konex';
import { formatMarketCap } from '../utils/formatters';

interface CompanyTableViewProps {
  companies: KonexCompany[];
  selectedCode: string;
  onSelectCompany: (code: string) => void;
}

export const CompanyTableView: React.FC<CompanyTableViewProps> = ({
  companies,
  selectedCode,
  onSelectCompany
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100">
            코넥스 시총 TOP 10 기업 DART 6대 재무지표 &amp; KRX 시세 일괄 비교
          </h3>
          <p className="text-xs text-slate-400">
            원하는 기업 행을 클릭하면 해당 종목의 DART 사업보고서, KRX 캔들차트, Google 뉴스 및 투자자 토론방으로 이동합니다.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-500">
          총 {companies.length}개사 비교
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
              <th className="py-2.5 px-3">종목명 (코드)</th>
              <th className="py-2.5 px-2">업종</th>
              <th className="py-2.5 px-3 text-right">현재가 (원)</th>
              <th className="py-2.5 px-2 text-right">등락률</th>
              <th className="py-2.5 px-3 text-right">시총(억)</th>
              <th className="py-2.5 px-3 text-right">EPS(원)</th>
              <th className="py-2.5 px-2 text-right">PER(배)</th>
              <th className="py-2.5 px-2 text-center">감사의견</th>
              <th className="py-2.5 px-3 text-right">유동비율</th>
              <th className="py-2.5 px-3 text-right">부채비율</th>
              <th className="py-2.5 px-3 text-right">자기자본비율</th>
              <th className="py-2.5 px-3 text-right">영업이익률</th>
              <th className="py-2.5 px-3 text-right">순이익률</th>
              <th className="py-2.5 px-3 text-right">이자보상배율</th>
              <th className="py-2.5 px-3 text-center">상세분석</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 font-mono tabular-nums text-slate-300">
            {companies.map((comp) => {
              const m = comp.currentMetrics;
              const q = comp.quote;
              const isSelected = comp.code === selectedCode;
              const isUp = q.change >= 0;
              const report = comp.auditReports[0];

              return (
                <tr
                  key={comp.code}
                  onClick={() => onSelectCompany(comp.code)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-950/40' : 'hover:bg-slate-850/60'
                  }`}
                >
                  {/* Name & Code */}
                  <td className="py-3 px-3">
                    <div className="font-sans font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{comp.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {comp.code}
                      </span>
                    </div>
                  </td>

                  {/* Sector */}
                  <td className="py-3 px-2 font-sans text-slate-400 text-[11px] truncate max-w-[90px]">
                    {comp.sector.split('/')[0]}
                  </td>

                  {/* Current Price */}
                  <td className="py-3 px-3 text-right font-semibold text-slate-200">
                    {q.currentPrice.toLocaleString()}
                  </td>

                  {/* Change Rate */}
                  <td className={`py-3 px-2 text-right font-semibold ${isUp ? 'text-red-400' : 'text-blue-400'}`}>
                    {isUp ? '+' : ''}{q.changeRate}%
                  </td>

                  {/* Market Cap */}
                  <td className="py-3 px-3 text-right text-slate-300 font-semibold whitespace-nowrap">
                    {formatMarketCap(q.marketCap, false)}
                  </td>

                  {/* EPS */}
                  <td className={`py-3 px-3 text-right font-semibold ${q.eps >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {q.eps > 0 ? `+${q.eps.toLocaleString()}` : q.eps.toLocaleString()}
                  </td>

                  {/* PER */}
                  <td className={`py-3 px-2 text-right font-semibold ${q.per > 0 ? 'text-blue-300' : 'text-slate-400'}`}>
                    {q.per > 0 ? `${q.per.toFixed(1)}` : 'N/A'}
                  </td>

                  {/* Audit Opinion */}
                  <td className="py-3 px-2 text-center font-sans">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      report?.opinion === '적정' && !report?.goingConcernIssue
                        ? 'text-emerald-400 bg-emerald-950/40'
                        : 'text-amber-400 bg-amber-950/40'
                    }`}>
                      {report?.opinion || '적정'}
                      {report?.goingConcernIssue ? '*' : ''}
                    </span>
                  </td>

                  {/* 1. 유동비율 */}
                  <td className={`py-3 px-3 text-right font-semibold ${
                    m.currentRatio >= 150 ? 'text-emerald-400' : m.currentRatio >= 100 ? 'text-amber-300' : 'text-red-400'
                  }`}>
                    {m.currentRatio.toFixed(1)}%
                  </td>

                  {/* 2. 부채비율 */}
                  <td className={`py-3 px-3 text-right font-semibold ${
                    m.debtRatio <= 100 ? 'text-emerald-400' : m.debtRatio <= 200 ? 'text-amber-300' : 'text-red-400'
                  }`}>
                    {m.debtRatio.toFixed(1)}%
                  </td>

                  {/* 3. 자기자본비율 */}
                  <td className={`py-3 px-3 text-right ${
                    m.equityRatio >= 40 ? 'text-emerald-400' : m.equityRatio >= 25 ? 'text-amber-300' : 'text-red-400'
                  }`}>
                    {m.equityRatio.toFixed(1)}%
                  </td>

                  {/* 4. 영업이익률 */}
                  <td className={`py-3 px-3 text-right font-semibold ${
                    m.operatingMargin >= 10 ? 'text-emerald-400' : m.operatingMargin >= 0 ? 'text-blue-300' : 'text-red-400'
                  }`}>
                    {m.operatingMargin >= 0 ? '+' : ''}{m.operatingMargin.toFixed(1)}%
                  </td>

                  {/* 5. 순이익률 */}
                  <td className={`py-3 px-3 text-right ${
                    m.netMargin >= 5 ? 'text-emerald-400' : m.netMargin >= 0 ? 'text-blue-300' : 'text-red-400'
                  }`}>
                    {m.netMargin >= 0 ? '+' : ''}{m.netMargin.toFixed(1)}%
                  </td>

                  {/* 6. 이자보상배율 */}
                  <td className={`py-3 px-3 text-right font-semibold ${
                    m.interestCoverage >= 1.5 ? 'text-emerald-400' : m.interestCoverage >= 1.0 ? 'text-amber-300' : 'text-red-400'
                  }`}>
                    {m.interestCoverage.toFixed(2)}배
                  </td>

                  {/* Detail link */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCompany(comp.code);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-blue-400 hover:text-blue-300 px-2 py-1 bg-blue-950/40 rounded border border-blue-800/40 hover:bg-blue-900/50 cursor-pointer"
                    >
                      <span>선택</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-2 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>* 녹색: 건전/안전 구간 · 황색: 적정/보통 · 적색: 위험 구간 · 감사의견 *표시는 계속기업 불확실성 기재</span>
        <span>출처: 금융감독원 전자공시시스템(DART) Open API &amp; 한국거래소(KRX)</span>
      </div>
    </div>
  );
};
