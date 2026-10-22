import React, { useState } from 'react';
import { ExternalLink, TrendingUp, TrendingDown, Clock, BarChart2, CandlestickChart, Activity, ShieldCheck, RefreshCw } from 'lucide-react';
import { KonexCompany, ChartDataPoint } from '../types/konex';
import { formatMarketCap } from '../utils/formatters';

interface StockChartNaverProps {
  company: KonexCompany;
  onRefreshQuotes?: () => void;
  isSyncing?: boolean;
}

export const StockChartNaver: React.FC<StockChartNaverProps> = ({ company, onRefreshQuotes, isSyncing }) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '3M' | '1Y'>('1W');
  const [chartType, setChartType] = useState<'line' | 'candle'>('candle');
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);

  const quote = company.quote;
  const isBullish = quote.change >= 0;
  const dataSeries: ChartDataPoint[] = company.priceSeries[timeframe] || company.priceSeries['1W'];

  // Calculate scales for SVG rendering
  const minPrice = Math.min(...dataSeries.map(d => d.low)) * 0.985;
  const maxPrice = Math.max(...dataSeries.map(d => d.high)) * 1.015;
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...dataSeries.map(d => d.volume)) || 1;

  const svgWidth = 800;
  const svgHeight = 320;
  const chartHeight = 220; // top area for price
  const volumeHeight = 70; // bottom area for volume
  const gap = 15;
  const paddingLeft = 15;
  const paddingRight = 65;

  const getX = (index: number) => {
    if (dataSeries.length <= 1) return paddingLeft;
    const step = (svgWidth - paddingLeft - paddingRight) / (dataSeries.length - 1);
    return paddingLeft + index * step;
  };

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  const getVolY = (vol: number) => {
    const volRatio = vol / maxVolume;
    return svgHeight - (volRatio * volumeHeight);
  };

  const linePoints = dataSeries.map((d, i) => `${getX(i)},${getY(d.close)}`).join(' ');
  const areaPoints = `${getX(0)},${chartHeight} ${linePoints} ${getX(dataSeries.length - 1)},${chartHeight}`;
  const candleWidth = Math.max(4, Math.min(24, ((svgWidth - paddingLeft - paddingRight) / dataSeries.length) * 0.65));

  const naverFinanceUrl = `https://finance.naver.com/item/main.naver?code=${company.code}`;
  const krxUrl = `https://konex.krx.co.kr/contents/MKD/04/0406/04060100/MKD04060100.jsp`;

  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm space-y-6">
      {/* Top Header: KRX Open API Status & Naver Finance */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              한국거래소(KRX) Open API 실시간 시세
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs font-mono text-slate-400">
              종목코드 {company.code}
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 font-mono">
              AUTH_KEY 연동
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-bold font-mono tabular-nums text-slate-100">
              {quote.currentPrice.toLocaleString()}원
            </h2>
            <div className={`flex items-center gap-1 font-mono tabular-nums text-sm font-semibold ${
              isBullish ? 'text-red-400' : 'text-blue-400'
            }`}>
              {isBullish ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isBullish ? '+' : ''}{quote.change.toLocaleString()}원</span>
              <span>({isBullish ? '+' : ''}{quote.changeRate}%)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons & Sync */}
        <div className="flex flex-wrap items-center gap-2">
          {onRefreshQuotes && (
            <button
              onClick={onRefreshQuotes}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              title="KRX 실시간 호가 및 체결가 즉시 동기화"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-400' : 'text-emerald-400'}`} />
              <span>{isSyncing ? '동기화 중...' : '실시간 시세 갱신'}</span>
            </button>
          )}
          <a
            href={krxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/60 rounded-lg transition-colors shadow-sm"
          >
            <span>KRX 시장정보</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </a>
          <a
            href={naverFinanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-lg transition-colors shadow-sm"
          >
            <span>NAVER 증권</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>
        </div>
      </div>

      {/* KRX Price Key Indicators Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 py-2 px-3 bg-slate-950/60 rounded-lg text-xs font-mono tabular-nums border border-slate-800/60">
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">시가</span>
          <span className="text-slate-200 font-semibold">{quote.open.toLocaleString()}원</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">고가</span>
          <span className="text-red-400 font-semibold">{quote.high.toLocaleString()}원</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">저가</span>
          <span className="text-blue-400 font-semibold">{quote.low.toLocaleString()}원</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">거래량</span>
          <span className="text-slate-200 font-semibold">{quote.volume.toLocaleString()}주</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">거래대금</span>
          <span className="text-slate-200 font-semibold">{quote.tradingValue.toLocaleString()}백만</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">시가총액</span>
          <span className="text-slate-200 font-semibold">{formatMarketCap(quote.marketCap)}</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">52주 최고</span>
          <span className="text-red-400">{quote.high52w.toLocaleString()}원</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">52주 최저</span>
          <span className="text-blue-400">{quote.low52w.toLocaleString()}원</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">외국인소진율</span>
          <span className="text-slate-300">{quote.foreignRatio}%</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">상장주식수</span>
          <span className="text-slate-300">{(quote.sharesOutstanding / 10000).toFixed(1)}만주</span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">EPS (순이익)</span>
          <span className={`font-semibold ${quote.eps >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {quote.eps > 0 ? `+${quote.eps.toLocaleString()}` : quote.eps.toLocaleString()}원
          </span>
        </div>
        <div>
          <span className="text-[11px] font-sans text-slate-400 block mb-0.5">PER (배율)</span>
          <span className={`font-semibold ${quote.per > 0 ? 'text-blue-300' : 'text-slate-400'}`}>
            {quote.per > 0 ? `${quote.per.toFixed(1)}배` : '적자 (N/A)'}
          </span>
        </div>
        <div className="col-span-2 sm:col-span-4 lg:col-span-6 flex items-center justify-end text-[11px] font-sans text-slate-500 pt-1 border-t border-slate-900">
          <Clock className="w-3 h-3 mr-1" />
          <span>시세 기준: {quote.updatedAt}</span>
        </div>
      </div>

      {/* Chart Controls: Timeframe and Chart Type */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Timeframe Selectors */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          {(['1D', '1W', '3M', '1Y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => {
                setTimeframe(tf);
                setHoveredPoint(null);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf === '1D' ? '1일' : tf === '1W' ? '1주일' : tf === '3M' ? '3개월' : '1년'}
            </button>
          ))}
        </div>

        {/* Candle vs Line Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setChartType('candle')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              chartType === 'candle'
                ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CandlestickChart className="w-3.5 h-3.5" />
            <span>봉차트 (캔들)</span>
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              chartType === 'line'
                ? 'bg-slate-800 text-blue-400 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>라인차트</span>
          </button>
        </div>
      </div>

      {/* Hover Info Banner */}
      <div className="h-6 flex items-center text-xs font-mono tabular-nums text-slate-300">
        {hoveredPoint ? (
          <div className="flex items-center gap-4 bg-slate-950/80 px-3 py-1 rounded border border-slate-800">
            <span className="text-slate-400 font-sans">{hoveredPoint.date}</span>
            <span>시가: {hoveredPoint.open.toLocaleString()}원</span>
            <span className="text-red-400">고가: {hoveredPoint.high.toLocaleString()}원</span>
            <span className="text-blue-400">저가: {hoveredPoint.low.toLocaleString()}원</span>
            <span className="font-bold text-white">종가: {hoveredPoint.close.toLocaleString()}원</span>
            <span className="text-slate-400">거래량: {hoveredPoint.volume.toLocaleString()}</span>
          </div>
        ) : (
          <span className="text-slate-500 text-[11px] font-sans">
            * 차트 위에 마우스를 올리면 해당 시점 시가·고가·저가·종가 상세 데이터가 표시됩니다.
          </span>
        )}
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="relative bg-slate-950/70 border border-slate-800/80 rounded-xl p-2 overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-72 md:h-80 select-none overflow-visible"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-axis Price Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = chartHeight * pct;
            const priceVal = Math.round(maxPrice - pct * priceRange);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={svgWidth - paddingRight + 8}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {priceVal.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Volume divider line */}
          <line
            x1={paddingLeft}
            y1={chartHeight + gap}
            x2={svgWidth - paddingRight}
            y2={chartHeight + gap}
            stroke="#334155"
            strokeWidth="1"
          />
          <text
            x={paddingLeft}
            y={chartHeight + gap - 4}
            fill="#64748b"
            fontSize="9"
          >
            거래량 (Volume)
          </text>

          {/* Render Volume Bars */}
          {dataSeries.map((d, i) => {
            const x = getX(i);
            const volY = getVolY(d.volume);
            const isBarBullish = d.close >= d.open;
            return (
              <rect
                key={`vol-${i}`}
                x={x - candleWidth / 2}
                y={volY}
                width={candleWidth}
                height={svgHeight - volY}
                fill={isBarBullish ? 'rgba(239, 68, 68, 0.45)' : 'rgba(59, 130, 246, 0.45)'}
                className="transition-opacity hover:opacity-100"
              />
            );
          })}

          {/* Render Line Chart */}
          {chartType === 'line' && (
            <>
              <polygon points={areaPoints} fill="url(#chartGradient)" />
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={linePoints}
              />
              {dataSeries.map((d, i) => (
                <circle
                  key={`pt-${i}`}
                  cx={getX(i)}
                  cy={getY(d.close)}
                  r={hoveredPoint?.date === d.date ? 5 : 3}
                  fill={hoveredPoint?.date === d.date ? '#60a5fa' : '#3b82f6'}
                  stroke="#0f172a"
                  strokeWidth="1.5"
                />
              ))}
            </>
          )}

          {/* Render Candlestick Chart */}
          {chartType === 'candle' &&
            dataSeries.map((d, i) => {
              const x = getX(i);
              const openY = getY(d.open);
              const closeY = getY(d.close);
              const highY = getY(d.high);
              const lowY = getY(d.low);
              const isUp = d.close >= d.open;
              const candleColor = isUp ? '#ef4444' : '#3b82f6';
              const topY = Math.min(openY, closeY);
              const bodyHeight = Math.max(2, Math.abs(openY - closeY));

              return (
                <g key={`candle-${i}`}>
                  {/* High - Low Wick */}
                  <line
                    x1={x}
                    y1={highY}
                    x2={x}
                    y2={lowY}
                    stroke={candleColor}
                    strokeWidth="1.5"
                  />
                  {/* Candle Body */}
                  <rect
                    x={x - candleWidth / 2}
                    y={topY}
                    width={candleWidth}
                    height={bodyHeight}
                    fill={isUp ? '#ef4444' : '#3b82f6'}
                    stroke={candleColor}
                    strokeWidth="1"
                    rx="1"
                  />
                </g>
              );
            })}

          {/* Date Labels on X-axis */}
          {dataSeries.map((d, i) => {
            const interval = dataSeries.length > 10 ? Math.ceil(dataSeries.length / 6) : 1;
            if (i % interval !== 0 && i !== dataSeries.length - 1) return null;
            return (
              <text
                key={`label-${i}`}
                x={getX(i)}
                y={chartHeight + gap + 15}
                fill="#64748b"
                fontSize="10"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {d.date}
              </text>
            );
          })}

          {/* Transparent Hover Hit Boxes */}
          {dataSeries.map((d, i) => {
            const step = (svgWidth - paddingLeft - paddingRight) / Math.max(1, dataSeries.length - 1);
            return (
              <rect
                key={`hit-${i}`}
                x={getX(i) - step / 2}
                y={0}
                width={step}
                height={svgHeight}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoveredPoint(d)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
};
