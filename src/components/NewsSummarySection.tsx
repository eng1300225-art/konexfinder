import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Newspaper, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert,
  Radio
} from 'lucide-react';
import { KonexCompany, CompanyNews, AISummaryResult } from '../types/konex';

interface NewsSummarySectionProps {
  company: KonexCompany;
  onUpdateSummary: (newSummary: AISummaryResult) => void;
  onUpdateNews?: (news: CompanyNews[]) => void;
}

export const NewsSummarySection: React.FC<NewsSummarySectionProps> = ({ company, onUpdateSummary, onUpdateNews }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshingNews, setIsRefreshingNews] = useState(false);
  const [summary, setSummary] = useState<AISummaryResult | undefined>(company.cachedSummary);
  const [newsList, setNewsList] = useState<CompanyNews[]>(company.news);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRefreshGoogleNews = async () => {
    setIsRefreshingNews(true);
    try {
      const res = await fetch(`/api/companies/${company.code}/news`);
      const data = await res.json();
      if (data.success && data.news && data.news.length > 0) {
        setNewsList(data.news);
        if (onUpdateNews) onUpdateNews(data.news);
      }
    } catch (err) {
      console.warn('Failed to refresh Google News:', err);
    } finally {
      setIsRefreshingNews(false);
    }
  };

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`/api/companies/${company.code}/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success && data.summary) {
        setSummary(data.summary);
        onUpdateSummary(data.summary);
      } else {
        setErrorMsg(data.message || '요약 생성에 실패했습니다.');
      }
    } catch (err: any) {
      setErrorMsg('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case '최우수': return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
      case '양호': return 'text-blue-400 bg-blue-950/60 border-blue-800/80';
      case '주의': return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
      case '취약': return 'text-red-400 bg-red-950/60 border-red-800/80';
      default: return 'text-slate-300 bg-slate-900 border-slate-800';
    }
  };

  return (
    <section className="space-y-6">
      {/* AI / Smart Core Summary Card */}
      <div className="bg-gradient-to-b from-blue-950/30 to-slate-900/80 border border-blue-900/40 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>{company.name} AI 재무·뉴스 심층 분석 리포트</span>
                {summary && (
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getGradeColor(summary.financialHealth.grade)}`}>
                    재무등급: {summary.financialHealth.grade}
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                DART 사업보고서 6대 건전성 지표 + Google 뉴스 실시간 보도 종합 판정
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateSummary}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/50 rounded-lg transition-colors cursor-pointer shadow-sm shadow-blue-500/20 whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'AI 분석 중...' : summary ? 'AI 재분석 실행' : '핵심 요약 리포트 생성'}</span>
          </button>
        </div>

        {errorMsg && (
          <div className="my-3 p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Summary Content Body */}
        {summary ? (
          <div className="pt-4 space-y-5">
            {/* 1. Core Points 3-Lines */}
            <div>
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                투자 판단 핵심 3줄 브리프
              </h4>
              <div className="space-y-2">
                {summary.corePoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs text-slate-200 leading-relaxed"
                  >
                    <span className="font-mono text-blue-400 font-bold shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Financial Health Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                DART 6대 지표 기반 종합 판정
              </h4>
              <p className="text-xs text-slate-300 mb-3 bg-slate-950/40 p-2.5 rounded border border-slate-800">
                {summary.financialHealth.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {summary.financialHealth.metricsEvaluation.map((evalItem, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-medium truncate">
                        {evalItem.metricName}
                      </span>
                      <span
                        className={`font-mono tabular-nums font-bold ${
                          evalItem.status === 'safe'
                            ? 'text-emerald-400'
                            : evalItem.status === 'caution'
                            ? 'text-amber-400'
                            : 'text-red-400'
                        }`}
                      >
                        {evalItem.value}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {evalItem.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Catalysts & Risks Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-lg">
                <h5 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  주요 촉매 및 성장 모멘텀 (Catalysts)
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {summary.catalystsAndRisks.catalysts.map((cat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{cat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg">
                <h5 className="text-xs font-bold text-red-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  투자 시 유의할 위험 요인 (Risks)
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {summary.catalystsAndRisks.risks.map((risk, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-500 font-mono">
              분석 완료 시각: {summary.generatedAt}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400">
            <p className="text-sm mb-3">
              {company.name}에 대한 종합 AI 진단 보고서를 생성할 수 있습니다.
            </p>
            <button
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
            >
              지금 AI 분석 리포트 생성하기
            </button>
          </div>
        )}
      </div>

      {/* Google News Feed Section */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-100">
              {company.name} Google 뉴스 실시간 보도
            </h3>
            <span className="text-[11px] font-mono text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/40">
              Google News RSS 실시간 연동
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshGoogleNews}
              disabled={isRefreshingNews}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingNews ? 'animate-spin' : ''}`} />
              <span>뉴스 새로고침</span>
            </button>

            <a
              href={`https://news.google.com/search?q=${encodeURIComponent(company.name + ' 코넥스')}&hl=ko&gl=KR&ceid=KR:ko`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Google 뉴스 전체</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-lg transition-colors group flex flex-col sm:flex-row sm:items-start justify-between gap-3"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="font-semibold text-slate-300">
                    {item.source}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="font-mono text-slate-500">{item.date}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{item.category}</span>
                  <span className="text-slate-500">·</span>
                  <span
                    className={`font-semibold ${
                      item.sentiment === 'positive'
                        ? 'text-emerald-400'
                        : item.sentiment === 'caution'
                        ? 'text-red-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {item.sentiment === 'positive'
                      ? '호재성'
                      : item.sentiment === 'caution'
                      ? '주의'
                      : '일반보도'}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.snippet}
                </p>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-center shrink-0 flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-blue-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-800 transition-colors"
              >
                <span>기사 전문</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}

          {newsList.length === 0 && (
            <div className="py-6 text-center text-xs text-slate-400">
              구글 뉴스 피드를 불러오는 중입니다...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
