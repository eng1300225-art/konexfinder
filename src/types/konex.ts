export interface FinancialMetrics {
  currentRatio: number;      // 유동비율 (%) = 유동자산 / 유동부채 * 100
  debtRatio: number;         // 부채비율 (%) = 총부채 / 자기자본 * 100
  equityRatio: number;       // 자기자본비율 (%) = 자기자본 / 총자산 * 100
  operatingMargin: number;   // 영업이익률 (%) = 영업이익 / 매출액 * 100
  netMargin: number;         // 순이익률 (%) = 당기순이익 / 매출액 * 100
  interestCoverage: number;  // 이자보상배율 (배) = 영업이익 / 이자비용
}

export type AuditOpinionType = '적정' | '한정' | '부적정' | '의견거절';

export interface AuditReport {
  year: number;
  reportName: string;
  filingDate: string;
  auditor: string;
  opinion: AuditOpinionType;
  goingConcernIssue: boolean; // 계속기업 불확실성 여부
  keyAuditPoints: string[];   // 핵심감사사항
  metrics: FinancialMetrics;
  revenue: number;            // 억원
  operatingProfit: number;    // 억원
  netProfit: number;          // 억원
  totalAssets: number;        // 억원
  totalLiabilities: number;   // 억원
  totalEquity: number;        // 억원
  currentAssets: number;      // 억원
  currentLiabilities: number; // 억원
  interestExpense: number;    // 억원
  dartReceiptNo: string;      // DART 접수번호
}

export interface StockQuote {
  currentPrice: number;
  change: number;
  changeRate: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  tradingValue: number;       // 백만원
  marketCap: number;          // 억원
  sharesOutstanding: number;  // 보통주 주식수
  foreignRatio: number;       // 외국인 소진율 (%)
  high52w: number;
  low52w: number;
  eps: number;                // 주당순이익 (원)
  per: number;                // 주가수익비율 (배)
  bps?: number;               // 주당순자산 (원)
  pbr?: number;               // 주가순자산비율 (배)
  updatedAt: string;
  krxSource?: 'KRX_OPEN_API' | 'FALLBACK_VERIFIED';
}

export interface ChartDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CompanyNews {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  sentiment: 'positive' | 'neutral' | 'caution';
  category: '실적/재무' | '기술/신제품' | '자금/공시' | '사업제휴' | '시장동향' | '공시/실적' | '수주/제휴';
  snippet: string;
  isGoogleNews?: boolean;
}

export interface DartFiling {
  rceptDt: string;
  reportNm: string;
  rceptNo: string;
  flrNm: string;
  rm?: string;
}

export interface DartOverview {
  corpName: string;
  corpNameEng: string;
  ceo: string;
  address: string;
  estDate: string;
  homeUrl: string;
  bizrNo: string;
  indutyCode: string;
}

export interface CommentReply {
  id: string;
  author: string;
  ip: string;
  content: string;
  createdAt: string;
  passwordHash?: string;
}

export interface AnonymousComment {
  id: string;
  companyCode: string;
  category: '일반' | '호재' | '악재' | '분석' | '차트' | '뇌피셜';
  title: string;
  author: string;
  ip: string;
  password?: string;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  views: number;
  replies: CommentReply[];
}

export interface AISummaryResult {
  corePoints: string[];
  financialHealth: {
    grade: '최우수' | '우수' | '양호' | '주의' | '취약';
    summary: string;
    metricsEvaluation: {
      metricName: string;
      value: string;
      status: 'safe' | 'caution' | 'danger';
      comment: string;
    }[];
  };
  catalystsAndRisks: {
    catalysts: string[];
    risks: string[];
  };
  generatedAt: string;
}

export interface KonexCompany {
  code: string;
  name: string;
  sector: string;
  ceo: string;
  establishedDate: string;
  listingDate: string;
  mainProducts: string;
  description: string;
  dartCorpCode: string;
  currentMetrics: FinancialMetrics;
  auditReports: AuditReport[];
  quote: StockQuote;
  priceSeries: {
    '1D': ChartDataPoint[];
    '1W': ChartDataPoint[];
    '3M': ChartDataPoint[];
    '1Y': ChartDataPoint[];
  };
  news: CompanyNews[];
  cachedSummary?: AISummaryResult;
  dartOverview?: DartOverview;
  recentFilings?: DartFiling[];
}

export interface ApiDiagnostics {
  krx: {
    status: 'connected' | 'auth_required' | 'fallback';
    endpoint: string;
    authKeyConfigured: boolean;
    authKeyPreview: string;
    message: string;
    lastPing: string;
  };
  dart: {
    status: 'connected' | 'error';
    endpoint: string;
    authKeyConfigured: boolean;
    authKeyPreview: string;
    message: string;
    lastPing: string;
  };
  googleNews: {
    status: 'active';
    feedUrl: string;
    language: string;
    lastFetched: string;
  };
}
