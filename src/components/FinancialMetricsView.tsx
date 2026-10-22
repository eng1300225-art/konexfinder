import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  XCircle,
  BarChart3,
  Building,
  RefreshCw
} from 'lucide-react';
import { KonexCompany, AuditReport, FinancialMetrics } from '../types/konex';
import { formatMarketCap } from '../utils/formatters';

interface FinancialMetricsViewProps {
  company: KonexCompany;
}

export const FinancialMetricsView: React.FC<FinancialMetricsViewProps> = ({ company }) => {
  const [selectedReportIndex, setSelectedReportIndex] = useState(0);
  const [filings, setFilings] = useState(company.recentFilings || []);
  const [isRefreshingFilings, setIsRefreshingFilings] = useState(false);

  const currentReport: AuditReport | undefined = company.auditReports[selectedReportIndex] || company.auditReports[0];
  const metrics = currentReport?.metrics || company.currentMetrics;

  const handleRefreshFilings = async () => {
    setIsRefreshingFilings(true);
    try {
      const res = await fetch(`/api/companies/${company.code}/dart-filings`);
      const data = await res.json();
      if (data.success && data.filings) {
        setFilings(data.filings);
      }
    } catch (err) {
      console.warn('Failed to refresh filings:', err);
    } finally {
      setIsRefreshingFilings(false);
    }
  };

  // Helper for metrics health
  const getMetricStatus = (key: keyof FinancialMetrics, value: number) => {
    switch (key) {
      case 'currentRatio': // 유동비율: >150% safe, 100-150 caution, <100 danger
        if (value >= 150) return { label: '우수', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', level: 'safe' };
        if (value >= 100) return { label: '보통', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/60', level: 'caution' };
        return { label: '위험', color: 'text-red-400', bg: 'bg-red-950/40 border-red-800/60', level: 'danger' };
      case 'debtRatio': // 부채비율: <100 safe, 100-200 caution, >200 danger
        if (value <= 100) return { label: '안전', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', level: 'safe' };
        if (value <= 200) return { label: '적정', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/60', level: 'caution' };
        return { label: '과다(위험)', color: 'text-red-400', bg: 'bg-red-950/40 border-red-800/60', level: 'danger' };
      case 'equityRatio': // 자기자본비율: >40 safe, 25-40 caution, <25 danger
        if (value >= 40) return { label: '우수', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', level: 'safe' };
        if (value >= 25) return { label: '보통', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/60', level: 'caution' };
        return { label: '취약', color: 'text-red-400', bg: 'bg-red-950/40 border-red-800/60', level: 'danger' };
      case 'operatingMargin': // 영업이익률: >10 high, >0 pos, <0 neg
        if (value >= 10) return { label: '고수익', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', level: 'safe' };
        if (value >= 0) return { label: '흑자', color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-800/60', level: 'safe' };
        return { label: '영업적자', color: 'text-red-400', bg: 'bg-red-950/40 border-red-800/60', level: 'danger' };
      case 'netMargin': // 순이익률: >5 high, >0 pos, <0 neg
        if (value >= 5) return { label: '우수', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', level: 'safe' };
        if (value >= 0) return { label: '흑자', color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-800/60', level: 'safe' };
        return { label: '순손실', color: 'text-red-400', bg: 'bg-red-950/40 border-red-800/60', level: 'danger' };
      case 'interestCoverage': // 이자보상배율: >1.5 safe, 1.0-1.5 caution, <1.0 danger
        if (value >= 1.5) return { label: '충분', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', level: 'safe' };
        if (value >= 1.0) return { label: '경계', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/60', level: 'caution' };
        return { label: '이자미지급(위험)', color: 'text-red-400', bg: 'bg-red-950/40 border-red-800/60', level: 'danger' };
    }
  };

  const metricCards = [
    {
      id: 'currentRatio' as keyof FinancialMetrics,
      title: '유동비율 (Current Ratio)',
      formula: '유동자산 / 유동부채 × 100',
      value: `${metrics.currentRatio.toFixed(1)}%`,
      raw: metrics.currentRatio,
      benchmark: '150% 이상 건전 (100% 미만 위험)',
      desc: '1년 내 현금화 가능한 유동자산으로 1년 내 만기가 돌아오는 단기 부채를 갚을 수 있는 여력입니다.',
      status: getMetricStatus('currentRatio', metrics.currentRatio),
      calcDetail: `유동자산 ${currentReport?.currentAssets || 0}억 / 유동부채 ${currentReport?.currentLiabilities || 0}억`
    },
    {
      id: 'debtRatio' as keyof FinancialMetrics,
      title: '부채비율 (Debt to Equity)',
      formula: '총부채 / 자기자본 × 100',
      value: `${metrics.debtRatio.toFixed(1)}%`,
      raw: metrics.debtRatio,
      benchmark: '100% 이하 양호 (200% 초과 주의)',
      desc: '자기자본 대비 타인자본(부채)의 의존도입니다. 100% 이하가 가장 안전하며 200%를 넘기면 금융비용 부담이 가중됩니다.',
      status: getMetricStatus('debtRatio', metrics.debtRatio),
      calcDetail: `총부채 ${currentReport?.totalLiabilities || 0}억 / 자기자본 ${currentReport?.totalEquity || 0}억`
    },
    {
      id: 'equityRatio' as keyof FinancialMetrics,
      title: '자기자본비율 (Equity Ratio)',
      formula: '자기자본 / 총자산 × 100',
      value: `${metrics.equityRatio.toFixed(1)}%`,
      raw: metrics.equityRatio,
      benchmark: '40% 이상 우수 (25% 미만 취약)',
      desc: '총자산 중 회사의 순수한 자기자본이 차지하는 비중으로, 외부 경기 충격에 대한 방어력을 뜻합니다.',
      status: getMetricStatus('equityRatio', metrics.equityRatio),
      calcDetail: `자기자본 ${currentReport?.totalEquity || 0}억 / 총자산 ${currentReport?.totalAssets || 0}억`
    },
    {
      id: 'operatingMargin' as keyof FinancialMetrics,
      title: '영업이익률 (Operating Margin)',
      formula: '영업이익 / 매출액 × 100',
      value: `${metrics.operatingMargin.toFixed(1)}%`,
      raw: metrics.operatingMargin,
      benchmark: '10% 이상 고수익 (0% 미만 영업손실)',
      desc: '주력 사업 본업을 통해 창출한 영업이익률로 기업의 본질적 가격 결정력과 원가 경쟁력을 나타냅니다.',
      status: getMetricStatus('operatingMargin', metrics.operatingMargin),
      calcDetail: `영업이익 ${currentReport?.operatingProfit || 0}억 / 매출액 ${currentReport?.revenue || 0}억`
    },
    {
      id: 'netMargin' as keyof FinancialMetrics,
      title: '순이익률 (Net Margin)',
      formula: '당기순이익 / 매출액 × 100',
      value: `${metrics.netMargin.toFixed(1)}%`,
      raw: metrics.netMargin,
      benchmark: '5% 이상 우수 (0% 미만 당기손실)',
      desc: '금융비용, 외환손익, 법인세 등을 모두 제하고 최종 주주에게 남는 순이익의 비율입니다.',
      status: getMetricStatus('netMargin', metrics.netMargin),
      calcDetail: `당기순익 ${currentReport?.netProfit || 0}억 / 매출액 ${currentReport?.revenue || 0}억`
    },
    {
      id: 'interestCoverage' as keyof FinancialMetrics,
      title: '이자보상배율 (Interest Coverage)',
      formula: '영업이익 / 이자비용',
      value: `${metrics.interestCoverage.toFixed(2)}배`,
      raw: metrics.interestCoverage,
      benchmark: '1.5배 이상 충분 (1.0배 미만 한계기업)',
      desc: '영업이익으로 금융 차입금 이자를 몇 배나 감당할 수 있는지 측정합니다. 1.0배 미만이면 영업해서 이자조차 못 내는 위험 기업입니다.',
      status: getMetricStatus('interestCoverage', metrics.interestCoverage),
      calcDetail: `영업이익 ${currentReport?.operatingProfit || 0}억 / 이자비용 ${currentReport?.interestExpense || 0}억`
    }
  ];

  return (
    <section className="space-y-6">
      {/* Audit Report Header & DART Reference Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                금융감독원 DART Open API 연동
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-400 font-mono">
                DART 고유번호 {company.dartCorpCode}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>{company.name}</span>
              <span className="text-sm font-normal text-slate-400">
                {currentReport?.reportName}
              </span>
            </h2>
          </div>

          {/* Report Year Selector & DART Link */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg">
              {company.auditReports.map((report, idx) => (
                <button
                  key={report.year}
                  onClick={() => setSelectedReportIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    selectedReportIndex === idx
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {report.year}년 사업보고서
                </button>
              ))}
            </div>

            <a
              href={`https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${currentReport?.dartReceiptNo || '20260319001111'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>DART 원문 열람</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Auditor & Opinion Status Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-1">외부 감사법인</span>
            <span className="font-semibold text-slate-200">{currentReport?.auditor || '회계법인'}</span>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">감사의견</span>
            <span className={`inline-flex items-center gap-1 font-semibold ${
              currentReport?.opinion === '적정' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {currentReport?.opinion === '적정' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-red-400" />
              )}
              {currentReport?.opinion} 의견
            </span>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">계속기업 존속 불확실성</span>
            <span className={`font-semibold ${
              currentReport?.goingConcernIssue ? 'text-red-400' : 'text-slate-300'
            }`}>
              {currentReport?.goingConcernIssue ? '기재 (유의 필요)' : '해당사항 없음 (안전)'}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">공시 제출일자</span>
            <span className="font-mono tabular-nums text-slate-300">{currentReport?.filingDate}</span>
          </div>
        </div>

        {/* Valuation & Per-Share Data: Market Cap, Shares, EPS, PER, BPS, PBR */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-slate-300">
              기업 가치평가 및 주당 지표 (Valuation &amp; Per-Share Metrics)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              KRX 시세 &amp; DART 결산 기준
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs font-mono tabular-nums">
            <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[11px] font-sans text-slate-400 block mb-0.5">시가총액</span>
              <span className="text-sm font-bold text-slate-100 whitespace-nowrap">
                {formatMarketCap(company.quote.marketCap)}
              </span>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[11px] font-sans text-slate-400 block mb-0.5">상장주식수</span>
              <span className="text-sm font-bold text-slate-100">
                {company.quote.sharesOutstanding.toLocaleString()}주
              </span>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[11px] font-sans text-slate-400 block mb-0.5">EPS (주당순이익)</span>
              <span className={`text-sm font-bold ${company.quote.eps >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {company.quote.eps > 0 ? `+${company.quote.eps.toLocaleString()}` : company.quote.eps.toLocaleString()}원
              </span>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[11px] font-sans text-slate-400 block mb-0.5">PER (주가수익비율)</span>
              <span className={`text-sm font-bold ${company.quote.per > 0 ? 'text-blue-300' : 'text-slate-400'}`}>
                {company.quote.per > 0 ? `${company.quote.per.toFixed(1)}배` : 'N/A (적자)'}
              </span>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[11px] font-sans text-slate-400 block mb-0.5">BPS (주당순자산)</span>
              <span className="text-sm font-bold text-slate-200">
                {company.quote.bps ? `${company.quote.bps.toLocaleString()}원` : '-'}
              </span>
            </div>

            <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[11px] font-sans text-slate-400 block mb-0.5">PBR (주가순자산비율)</span>
              <span className="text-sm font-bold text-purple-300">
                {company.quote.pbr ? `${company.quote.pbr.toFixed(2)}배` : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Financial Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-100">
              DART 사업보고서 6대 핵심 재무건전성 지표
            </h3>
            <span className="text-xs text-slate-400">
              (안정성 3개 · 수익성 2개 · 이자상환 1개)
            </span>
          </div>
          <span className="text-xs text-slate-500">
            * DART 최신 사업보고서 재무제표 원장 기준
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metricCards.map((card) => (
            <div
              key={card.id}
              className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/80 transition-colors"
            >
              <div>
                {/* Header: Name and Status Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-300">
                      {card.title}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500">
                      산출: {card.formula}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${card.status.bg} ${card.status.color} whitespace-nowrap`}
                  >
                    {card.status.label}
                  </span>
                </div>

                {/* Big Metric Value */}
                <div className="my-2 flex items-baseline justify-between">
                  <span className={`text-2xl font-bold font-mono tabular-nums ${
                    card.status.level === 'danger' ? 'text-red-400' : card.status.level === 'caution' ? 'text-amber-300' : 'text-slate-100'
                  }`}>
                    {card.value}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {card.calcDetail}
                  </span>
                </div>

                {/* Benchmark guideline */}
                <div className="bg-slate-950/60 rounded px-2.5 py-1 text-[11px] text-slate-400 flex items-center justify-between mb-3">
                  <span>기준치:</span>
                  <span className="font-medium text-slate-300">{card.benchmark}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Status Visual Meter Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/60">
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                  {card.id === 'currentRatio' && (
                    <div
                      className={`h-full ${
                        card.raw >= 150 ? 'bg-emerald-500' : card.raw >= 100 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (card.raw / 250) * 100)}%` }}
                    />
                  )}
                  {card.id === 'debtRatio' && (
                    <div
                      className={`h-full ${
                        card.raw <= 100 ? 'bg-emerald-500' : card.raw <= 200 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (card.raw / 300) * 100)}%` }}
                    />
                  )}
                  {card.id === 'equityRatio' && (
                    <div
                      className={`h-full ${
                        card.raw >= 40 ? 'bg-emerald-500' : card.raw >= 25 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (card.raw / 80) * 100)}%` }}
                    />
                  )}
                  {card.id === 'operatingMargin' && (
                    <div
                      className={`h-full ${
                        card.raw >= 10 ? 'bg-emerald-500' : card.raw >= 0 ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(5, Math.min(100, ((card.raw + 15) / 35) * 100))}%` }}
                    />
                  )}
                  {card.id === 'netMargin' && (
                    <div
                      className={`h-full ${
                        card.raw >= 5 ? 'bg-emerald-500' : card.raw >= 0 ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(5, Math.min(100, ((card.raw + 15) / 35) * 100))}%` }}
                    />
                  )}
                  {card.id === 'interestCoverage' && (
                    <div
                      className={`h-full ${
                        card.raw >= 1.5 ? 'bg-emerald-500' : card.raw >= 1.0 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(5, Math.min(100, (Math.max(0, card.raw) / 8) * 100))}%` }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DART Live Filings Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-100">
              {company.name} DART 전자공시 실시간 목록
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              DART Open API 연동
            </span>
          </div>
          <button
            onClick={handleRefreshFilings}
            disabled={isRefreshingFilings}
            className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingFilings ? 'animate-spin' : ''}`} />
            <span>공시 새로고침</span>
          </button>
        </div>

        {filings.length > 0 ? (
          <div className="divide-y divide-slate-850">
            {filings.map((f, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between gap-4 text-xs hover:bg-slate-850/30 px-2 rounded transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500 text-[11px] shrink-0">
                    {f.rceptDt}
                  </span>
                  <span className="font-medium text-slate-200">
                    {f.reportNm}
                  </span>
                  {f.rm && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      ({f.rm})
                    </span>
                  )}
                </div>
                <a
                  href={`https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${f.rceptNo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 shrink-0 font-medium px-2 py-1 bg-blue-950/40 rounded border border-blue-900/40"
                >
                  <span>DART 원문</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-slate-400">
            최근 DART 공시 목록을 불러오는 중입니다...
          </div>
        )}
      </div>

      {/* Multi-Year Financial Comparison Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-100">
              연도별 결산 실적 원장 비교 (단위: 억원)
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            DART 정기보고서 공시 원장
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="py-2.5 px-3 font-semibold">재무 항목</th>
                {company.auditReports.map(r => (
                  <th key={r.year} className="py-2.5 px-3 text-right font-semibold">
                    {r.year}년 (결산)
                  </th>
                ))}
                <th className="py-2.5 px-3 text-right font-semibold text-blue-400">
                  전년비 증감률 (YoY)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums text-slate-300">
              <tr className="hover:bg-slate-850/40">
                <td className="py-2.5 px-3 font-sans text-slate-200 font-medium">매출액</td>
                {company.auditReports.map(r => (
                  <td key={r.year} className="py-2.5 px-3 text-right">
                    {r.revenue.toLocaleString()}억원
                  </td>
                ))}
                <td className="py-2.5 px-3 text-right text-emerald-400">
                  {company.auditReports.length >= 2
                    ? `${(((company.auditReports[0].revenue - company.auditReports[1].revenue) / company.auditReports[1].revenue) * 100).toFixed(1)}%`
                    : '-'}
                </td>
              </tr>
              <tr className="hover:bg-slate-850/40">
                <td className="py-2.5 px-3 font-sans text-slate-200 font-medium">영업이익</td>
                {company.auditReports.map(r => (
                  <td key={r.year} className={`py-2.5 px-3 text-right ${r.operatingProfit >= 0 ? 'text-slate-200' : 'text-red-400'}`}>
                    {r.operatingProfit.toLocaleString()}억원
                  </td>
                ))}
                <td className="py-2.5 px-3 text-right text-emerald-400">
                  {company.auditReports.length >= 2 && company.auditReports[1].operatingProfit !== 0
                    ? `${(((company.auditReports[0].operatingProfit - company.auditReports[1].operatingProfit) / Math.abs(company.auditReports[1].operatingProfit)) * 100).toFixed(1)}%`
                    : '-'}
                </td>
              </tr>
              <tr className="hover:bg-slate-850/40">
                <td className="py-2.5 px-3 font-sans text-slate-200 font-medium">당기순이익</td>
                {company.auditReports.map(r => (
                  <td key={r.year} className={`py-2.5 px-3 text-right ${r.netProfit >= 0 ? 'text-slate-200' : 'text-red-400'}`}>
                    {r.netProfit.toLocaleString()}억원
                  </td>
                ))}
                <td className="py-2.5 px-3 text-right text-emerald-400">
                  {company.auditReports.length >= 2 && company.auditReports[1].netProfit !== 0
                    ? `${(((company.auditReports[0].netProfit - company.auditReports[1].netProfit) / Math.abs(company.auditReports[1].netProfit)) * 100).toFixed(1)}%`
                    : '-'}
                </td>
              </tr>
              <tr className="hover:bg-slate-850/40">
                <td className="py-2.5 px-3 font-sans text-slate-200 font-medium">총자산</td>
                {company.auditReports.map(r => (
                  <td key={r.year} className="py-2.5 px-3 text-right">
                    {r.totalAssets.toLocaleString()}억원
                  </td>
                ))}
                <td className="py-2.5 px-3 text-right text-slate-400">
                  {company.auditReports.length >= 2
                    ? `${(((company.auditReports[0].totalAssets - company.auditReports[1].totalAssets) / company.auditReports[1].totalAssets) * 100).toFixed(1)}%`
                    : '-'}
                </td>
              </tr>
              <tr className="hover:bg-slate-850/40">
                <td className="py-2.5 px-3 font-sans text-slate-200 font-medium">총부채</td>
                {company.auditReports.map(r => (
                  <td key={r.year} className="py-2.5 px-3 text-right">
                    {r.totalLiabilities.toLocaleString()}억원
                  </td>
                ))}
                <td className="py-2.5 px-3 text-right text-slate-400">
                  {company.auditReports.length >= 2
                    ? `${(((company.auditReports[0].totalLiabilities - company.auditReports[1].totalLiabilities) / company.auditReports[1].totalLiabilities) * 100).toFixed(1)}%`
                    : '-'}
                </td>
              </tr>
              <tr className="hover:bg-slate-850/40">
                <td className="py-2.5 px-3 font-sans text-slate-200 font-medium">자기자본</td>
                {company.auditReports.map(r => (
                  <td key={r.year} className="py-2.5 px-3 text-right font-semibold text-blue-300">
                    {r.totalEquity.toLocaleString()}억원
                  </td>
                ))}
                <td className="py-2.5 px-3 text-right text-blue-400">
                  {company.auditReports.length >= 2
                    ? `${(((company.auditReports[0].totalEquity - company.auditReports[1].totalEquity) / company.auditReports[1].totalEquity) * 100).toFixed(1)}%`
                    : '-'}
                </td>
              </tr>
              <tr className="hover:bg-slate-850/40">
                <td className="py-2.5 px-3 font-sans text-slate-200 font-medium">이자비용</td>
                {company.auditReports.map(r => (
                  <td key={r.year} className="py-2.5 px-3 text-right text-amber-300">
                    {r.interestExpense.toLocaleString()}억원
                  </td>
                ))}
                <td className="py-2.5 px-3 text-right text-slate-400">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Key Audit Points */}
        {currentReport?.keyAuditPoints && currentReport.keyAuditPoints.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300 block mb-2">
              감사인 핵심 감사사항 (Key Audit Matters):
            </span>
            <div className="flex flex-wrap gap-2">
              {currentReport.keyAuditPoints.map((pt, i) => (
                <div
                  key={i}
                  className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-300 flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
