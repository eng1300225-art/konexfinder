import { KonexCompany, AnonymousComment } from '../types/konex';

export const INITIAL_KONEX_COMPANIES: KonexCompany[] = [
  // 1. 본시스템즈 (496320, 코넥스 시총 1위)
  {
    code: '496320',
    name: '본시스템즈',
    sector: '로봇/정밀기계',
    ceo: '김창현',
    establishedDate: '2015-05-29',
    listingDate: '2024-10-18',
    mainProducts: '로봇용 BCD 감속기, 로봇 구동모듈, 스마트 팩토리 액추에이터',
    description: '사이클로이드 치형 기반의 고정밀 로봇용 초소형 BCD 감속기 및 구동 액추에이터 전문 제조기업으로, 일본 하모닉드라이브 의존도가 높았던 정밀 감속기 국산화 선도.',
    dartCorpCode: '01872459',
    currentMetrics: {
      currentRatio: 132.9,
      debtRatio: 170.7,
      equityRatio: 36.9,
      operatingMargin: -25.0,
      netMargin: -29.6,
      interestCoverage: -5.50
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제11기 기재정정)',
        filingDate: '2026.08.04',
        auditor: '삼덕회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['로봇 감속기 양산 설비 유형자산 감가상각', '연구개발비 무형자산 손상평가'],
        metrics: {
          currentRatio: 132.9,
          debtRatio: 170.7,
          equityRatio: 36.9,
          operatingMargin: -25.0,
          netMargin: -29.6,
          interestCoverage: -5.50
        },
        revenue: 64.5,
        operatingProfit: -16.1,
        netProfit: -19.1,
        totalAssets: 94.5,
        totalLiabilities: 59.6,
        totalEquity: 34.9,
        currentAssets: 61.5,
        currentLiabilities: 46.3,
        interestExpense: 2.9,
        dartReceiptNo: '20260804000177'
      },
      {
        year: 2024,
        reportName: '2024 사업보고서 (제10기)',
        filingDate: '2025.12.16',
        auditor: '삼덕회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['매출채권 대손충당금 평가'],
        metrics: {
          currentRatio: 48.5,
          debtRatio: -254.0,
          equityRatio: -64.9,
          operatingMargin: -21.9,
          netMargin: -28.4,
          interestCoverage: -2.63
        },
        revenue: 33.4,
        operatingProfit: -7.3,
        netProfit: -9.5,
        totalAssets: 40.0,
        totalLiabilities: 66.0,
        totalEquity: -26.0,
        currentAssets: 13.4,
        currentLiabilities: 27.7,
        interestExpense: 2.8,
        dartReceiptNo: '20251216000454'
      }
    ],
    quote: {
      currentPrice: 1176000,
      change: 0,
      changeRate: 0.00,
      open: 1176000,
      high: 1176000,
      low: 1176000,
      volume: 0,
      tradingValue: 0,
      marketCap: 11948,
      sharesOutstanding: 1015973,
      foreignRatio: 0.00,
      high52w: 1176000,
      low52w: 113000,
      eps: -1880,
      per: 0,
      bps: 3438,
      pbr: 342.06,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 },
        { date: '11:00', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 },
        { date: '13:00', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 },
        { date: '15:30', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 }
      ],
      '1W': [
        { date: '10.16', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 },
        { date: '10.17', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 },
        { date: '10.20', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 },
        { date: '10.21', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 },
        { date: '10.22', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 }
      ],
      '3M': [
        { date: '08.01', open: 850000, high: 980000, low: 840000, close: 920000, volume: 150 },
        { date: '08.20', open: 920000, high: 1050000, low: 910000, close: 1020000, volume: 220 },
        { date: '09.10', open: 1020000, high: 1150000, low: 1010000, close: 1120000, volume: 180 },
        { date: '10.22', open: 1176000, high: 1176000, low: 1176000, close: 1176000, volume: 0 }
      ],
      '1Y': [
        { date: '2024.03', open: 450000, high: 620000, low: 410000, close: 580000, volume: 1200 },
        { date: '2024.06', open: 580000, high: 890000, low: 560000, close: 820000, volume: 2100 },
        { date: '2024.10', open: 820000, high: 1176000, low: 780000, close: 1176000, volume: 3500 }
      ]
    },
    news: [
      {
        id: 'n-496320-1',
        title: '아무리 코넥스라지만 거래량 0인데 940% 급등 … 호가만으로 대박주식된 본시스템즈 - 뉴데일리',
        source: 'Google 뉴스 (뉴데일리)',
        date: '2026.10.19',
        url: 'https://news.google.com/search?q=%EB%B3%B8%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%8A%88%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'caution',
        category: '시장동향',
        snippet: '본시스템즈가 코넥스 시장에서 주당 1,176,000원에 달하며 시가총액 1조 1,948억 원으로 코넥스 1위 등극.',
        isGoogleNews: true
      }
    ]
  },

  // 2. 이엠티 (232530, 코넥스 시총 2위)
  {
    code: '232530',
    name: '이엠티',
    sector: '2차전지 소재',
    ceo: '유상열',
    establishedDate: '2010-02-23',
    listingDate: '2015-11-20',
    mainProducts: '2차전지 양극재 전구체 (NCM, NCA 전구체)',
    description: '전기차(EV) 및 에너지저장장치(ESS)용 고용량 리튬 2차전지 NCM·NCA 양극소재 전구체 전문 제조사로 충주 첨단산업단지 내 대규모 자동화 생산 인프라 보유.',
    dartCorpCode: '00925967',
    currentMetrics: {
      currentRatio: 107.6,
      debtRatio: 1117.6,
      equityRatio: 8.2,
      operatingMargin: 20.0,
      netMargin: 35.9,
      interestCoverage: 1.30
    },
    auditReports: [
      {
        year: 2026,
        reportName: '2026 사업보고서 (제17기)',
        filingDate: '2026.07.09',
        auditor: '한영회계법인',
        opinion: '적정',
        goingConcernIssue: true,
        keyAuditPoints: ['원자재 니켈·코발트 가격 변동에 따른 재고자산 평가', '계속기업 가정의 불확실성'],
        metrics: {
          currentRatio: 107.6,
          debtRatio: 1117.6,
          equityRatio: 8.2,
          operatingMargin: 20.0,
          netMargin: 35.9,
          interestCoverage: 1.30
        },
        revenue: 380.7,
        operatingProfit: 76.2,
        netProfit: 136.5,
        totalAssets: 1659.9,
        totalLiabilities: 1523.6,
        totalEquity: 136.3,
        currentAssets: 1298.9,
        currentLiabilities: 1207.3,
        interestExpense: 58.6,
        dartReceiptNo: '20260709000400'
      }
    ],
    quote: {
      currentPrice: 10900,
      change: -80,
      changeRate: -0.73,
      open: 10900,
      high: 10900,
      low: 10900,
      volume: 259,
      tradingValue: 2,
      marketCap: 2792,
      sharesOutstanding: 25615556,
      foreignRatio: 0.95,
      high52w: 13400,
      low52w: 6200,
      eps: 533,
      per: 20.5,
      bps: 532,
      pbr: 20.49,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 10900, high: 10900, low: 10900, close: 10900, volume: 80 },
        { date: '11:00', open: 10900, high: 10900, low: 10900, close: 10900, volume: 110 },
        { date: '13:00', open: 10900, high: 10900, low: 10900, close: 10900, volume: 40 },
        { date: '15:30', open: 10900, high: 10900, low: 10900, close: 10900, volume: 29 }
      ],
      '1W': [
        { date: '10.16', open: 10850, high: 11100, low: 10800, close: 10950, volume: 1200 },
        { date: '10.17', open: 10950, high: 11050, low: 10900, close: 10980, volume: 850 },
        { date: '10.20', open: 10980, high: 11000, low: 10920, close: 10980, volume: 640 },
        { date: '10.21', open: 10980, high: 11000, low: 10900, close: 10980, volume: 920 },
        { date: '10.22', open: 10900, high: 10900, low: 10900, close: 10900, volume: 259 }
      ],
      '3M': [
        { date: '08.01', open: 9200, high: 9800, low: 9000, close: 9550, volume: 24000 },
        { date: '08.20', open: 9550, high: 10400, low: 9400, close: 10100, volume: 38000 },
        { date: '09.10', open: 10100, high: 11500, low: 9900, close: 10800, volume: 52000 },
        { date: '10.22', open: 10900, high: 10900, low: 10900, close: 10900, volume: 259 }
      ],
      '1Y': [
        { date: '2023.11', open: 8200, high: 9500, low: 7800, close: 8800, volume: 150000 },
        { date: '2024.03', open: 8800, high: 12500, low: 8400, close: 11200, volume: 280000 },
        { date: '2024.10', open: 11200, high: 13400, low: 9800, close: 10900, volume: 190000 }
      ]
    },
    news: [
      {
        id: 'n-232530-1',
        title: '이엠티, 하이니켈 전구체 라인 가동률 상승…실적 개선 기대 - 전자신문',
        source: 'Google 뉴스 (전자신문)',
        date: '2026.10.15',
        url: 'https://news.google.com/search?q=%EC%9D%B4%EC%97%A0%ED%8B%B0%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'positive',
        category: '기술/신제품',
        snippet: '충주공장 하이니켈 NCM 전구체 생산성 고도화로 북미 향 양극재 밸류체인 직공급 물량 증대.',
        isGoogleNews: true
      }
    ]
  },

  // 3. SK시그넷 (260870, 코넥스 시총 3위)
  {
    code: '260870',
    name: 'SK시그넷',
    sector: '전기차 충전기',
    ceo: '조형기',
    establishedDate: '2016-12-13',
    listingDate: '2017-09-07',
    mainProducts: '초급속 전기차 충전기 (350kW, 400kW 초급속 DC 급속기, NACS 규격 충전기)',
    description: 'SK그룹 계열의 글로벌 전기차 충전 솔루션 선도기업으로 미국 초급속 충전기 시장 점유율 1위 권역 보유. 미국 텍사스 공장 현지 생산 기반.',
    dartCorpCode: '01188730',
    currentMetrics: {
      currentRatio: 71.4,
      debtRatio: 565.0,
      equityRatio: 15.0,
      operatingMargin: -48.1,
      netMargin: -51.3,
      interestCoverage: -9.36
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제10기 연결)',
        filingDate: '2026.03.19',
        auditor: '한영회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['전기차 캐즘 영향 및 매출채권 대손충당금', '미국 텍사스 공장 생산 설비 평가'],
        metrics: {
          currentRatio: 71.4,
          debtRatio: 565.0,
          equityRatio: 15.0,
          operatingMargin: -48.1,
          netMargin: -51.3,
          interestCoverage: -9.36
        },
        revenue: 1007.3,
        operatingProfit: -484.0,
        netProfit: -517.0,
        totalAssets: 1789.0,
        totalLiabilities: 1520.0,
        totalEquity: 269.0,
        currentAssets: 899.4,
        currentLiabilities: 1259.6,
        interestExpense: 51.7,
        dartReceiptNo: '20260319001111'
      }
    ],
    quote: {
      currentPrice: 8150,
      change: 0,
      changeRate: 0.00,
      open: 8150,
      high: 8150,
      low: 8150,
      volume: 155,
      tradingValue: 1,
      marketCap: 1857,
      sharesOutstanding: 22780385,
      foreignRatio: 1.85,
      high52w: 12800,
      low52w: 7500,
      eps: -3746,
      per: 0,
      bps: 1181,
      pbr: 6.90,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 8150, high: 8150, low: 8150, close: 8150, volume: 50 },
        { date: '11:00', open: 8150, high: 8150, low: 8150, close: 8150, volume: 45 },
        { date: '13:00', open: 8150, high: 8150, low: 8150, close: 8150, volume: 30 },
        { date: '15:30', open: 8150, high: 8150, low: 8150, close: 8150, volume: 30 }
      ],
      '1W': [
        { date: '10.16', open: 8140, high: 8140, low: 8130, close: 8140, volume: 2493 },
        { date: '10.19', open: 8140, high: 8150, low: 8130, close: 8140, volume: 5303 },
        { date: '10.20', open: 8140, high: 8140, low: 8130, close: 8140, volume: 3240 },
        { date: '10.21', open: 8140, high: 8150, low: 8140, close: 8150, volume: 4359 },
        { date: '10.22', open: 8150, high: 8150, low: 8150, close: 8150, volume: 155 }
      ],
      '3M': [
        { date: '08.01', open: 8050, high: 8350, low: 7950, close: 8120, volume: 85000 },
        { date: '08.20', open: 8120, high: 8400, low: 8050, close: 8200, volume: 110000 },
        { date: '09.10', open: 8200, high: 8300, low: 8100, close: 8150, volume: 95000 },
        { date: '10.22', open: 8150, high: 8150, low: 8150, close: 8150, volume: 155 }
      ],
      '1Y': [
        { date: '2023.11', open: 9500, high: 11000, low: 8800, close: 9200, volume: 450000 },
        { date: '2024.03', open: 9200, high: 12800, low: 8900, close: 10500, volume: 780000 },
        { date: '2024.10', open: 10500, high: 10800, low: 7500, close: 8150, volume: 550000 }
      ]
    },
    news: [
      {
        id: 'n-260870-1',
        title: 'SK시그넷 결국 매각 수순...SK, 공개매수로 상장폐지 추진 - 전기신문',
        source: 'Google 뉴스 (전기신문)',
        date: '2026.07.24',
        url: 'https://news.google.com/search?q=SK%EC%8B%9C%EA%B7%B8%EB%84%B7%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'caution',
        category: '공시/실적',
        snippet: 'SK가 SK시그넷 주식을 8,200원에 공개매수 추진하여 완전 자회사 편입 및 상폐 절차 진행.',
        isGoogleNews: true
      }
    ]
  },

  // 4. 엔솔바이오사이언스 (140610, 코넥스 시총 4위)
  {
    code: '140610',
    name: '엔솔바이오사이언스',
    sector: '바이오의약품',
    ceo: '김해진',
    establishedDate: '2001-02-20',
    listingDate: '2018-09-10',
    mainProducts: '퇴행성 디스크 치료제(YH14618), 골관절염 치료제(엔게디1000), 항암 병용 치료제',
    description: '빅데이터 기반 생체 분자 네트워크 지식베이스(KISDD) 플랫폼을 통해 퇴행성 디스크 치료제를 유한양행 및 미국 스파인바이오파마에 성공적으로 글로벌 기술이전한 바이오텍.',
    dartCorpCode: '01018802',
    currentMetrics: {
      currentRatio: 169.6,
      debtRatio: 133.3,
      equityRatio: 42.9,
      operatingMargin: -28695.0,
      netMargin: -21295.0,
      interestCoverage: -6.39
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제25기)',
        filingDate: '2026.03.18',
        auditor: '신한회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['글로벌 기술이전 마일스톤 수익인식', '신약 R&D 연구개발비 회계처리'],
        metrics: {
          currentRatio: 169.6,
          debtRatio: 133.3,
          equityRatio: 42.9,
          operatingMargin: -28695.0,
          netMargin: -21295.0,
          interestCoverage: -6.39
        },
        revenue: 0.25,
        operatingProfit: -71.9,
        netProfit: -53.4,
        totalAssets: 316.6,
        totalLiabilities: 180.9,
        totalEquity: 135.7,
        currentAssets: 278.8,
        currentLiabilities: 164.4,
        interestExpense: 11.3,
        dartReceiptNo: '20260318001043'
      }
    ],
    quote: {
      currentPrice: 9180,
      change: 10,
      changeRate: 0.11,
      open: 9240,
      high: 9240,
      low: 9150,
      volume: 1008,
      tradingValue: 9,
      marketCap: 1320,
      sharesOutstanding: 14383703,
      foreignRatio: 1.24,
      high52w: 11500,
      low52w: 5400,
      eps: -421,
      per: 0,
      bps: 943,
      pbr: 9.73,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 9240, high: 9240, low: 9150, close: 9180, volume: 320 },
        { date: '11:00', open: 9180, high: 9220, low: 9160, close: 9180, volume: 450 },
        { date: '13:00', open: 9180, high: 9200, low: 9170, close: 9180, volume: 150 },
        { date: '15:30', open: 9180, high: 9180, low: 9180, close: 9180, volume: 88 }
      ],
      '1W': [
        { date: '10.16', open: 9150, high: 9280, low: 9100, close: 9210, volume: 4500 },
        { date: '10.17', open: 9210, high: 9250, low: 9150, close: 9190, volume: 3800 },
        { date: '10.20', open: 9190, high: 9220, low: 9140, close: 9170, volume: 2900 },
        { date: '10.21', open: 9170, high: 9200, low: 9120, close: 9170, volume: 3100 },
        { date: '10.22', open: 9240, high: 9240, low: 9150, close: 9180, volume: 1008 }
      ],
      '3M': [
        { date: '08.01', open: 8200, high: 8700, low: 8050, close: 8450, volume: 45000 },
        { date: '08.20', open: 8450, high: 9100, low: 8350, close: 8900, volume: 58000 },
        { date: '09.10', open: 8900, high: 9600, low: 8800, close: 9250, volume: 72000 },
        { date: '10.22', open: 9240, high: 9240, low: 9150, close: 9180, volume: 1008 }
      ],
      '1Y': [
        { date: '2023.11', open: 7200, high: 8100, low: 6800, close: 7500, volume: 280000 },
        { date: '2024.03', open: 7500, high: 10500, low: 7200, close: 9400, volume: 420000 },
        { date: '2024.10', open: 9400, high: 11500, low: 8100, close: 9180, volume: 350000 }
      ]
    },
    news: [
      {
        id: 'n-140610-1',
        title: '엔솔바이오, 퇴행성 디스크 치료제 글로벌 임상 3상 순항 - 프리스탁뉴스',
        source: 'Google 뉴스 (프리스탁뉴스)',
        date: '2026.10.12',
        url: 'https://news.google.com/search?q=%EC%97%94%EC%86%94%EB%B0%94%EC%9D%B4%EC%98%A4%EC%82%AC%EC%9D%B4%EC%96%B8%EC%8A%A4%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'positive',
        category: '기술/신제품',
        snippet: '스파인바이오파마 주도 미국 임상 3상 환자 투약 가속화 및 골관절염 파이프라인 기술수출 타진.',
        isGoogleNews: true
      }
    ]
  },

  // 5. 파마리서치바이오 (217950, 코넥스 시총 5위)
  {
    code: '217950',
    name: '파마리서치바이오',
    sector: '바이오의약품/에스테틱',
    ceo: '백승걸, 원치엽',
    establishedDate: '2009-10-28',
    listingDate: '2015-05-18',
    mainProducts: '보툴리눔 톡신 제제 (리엔톡스), 미용 성형 의약품',
    description: '파마리서치 그룹의 바이오 톡신 전문 자회사로 보툴리눔 톡신 제제 리엔톡스의 국내외 품목허가 및 글로벌 에스테틱 수출 네트워크 확장 중.',
    dartCorpCode: '01066058',
    currentMetrics: {
      currentRatio: 109.0,
      debtRatio: 81.4,
      equityRatio: 55.1,
      operatingMargin: 44.2,
      netMargin: 39.7,
      interestCoverage: 5.32
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제17기)',
        filingDate: '2026.03.19',
        auditor: '대주회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['보툴리눔 톡신 제품 해외 수출 라이선스 및 재고자산 관리'],
        metrics: {
          currentRatio: 109.0,
          debtRatio: 81.4,
          equityRatio: 55.1,
          operatingMargin: 44.2,
          netMargin: 39.7,
          interestCoverage: 5.32
        },
        revenue: 310.9,
        operatingProfit: 137.3,
        netProfit: 123.3,
        totalAssets: 1045.5,
        totalLiabilities: 469.3,
        totalEquity: 576.2,
        currentAssets: 498.2,
        currentLiabilities: 457.1,
        interestExpense: 25.8,
        dartReceiptNo: '20260319001091'
      }
    ],
    quote: {
      currentPrice: 29200,
      change: 50,
      changeRate: 0.17,
      open: 29200,
      high: 29200,
      low: 29200,
      volume: 19,
      tradingValue: 1,
      marketCap: 1222,
      sharesOutstanding: 4185999,
      foreignRatio: 2.15,
      high52w: 38000,
      low52w: 18500,
      eps: 2989,
      per: 9.8,
      bps: 13765,
      pbr: 2.12,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 29200, high: 29200, low: 29200, close: 29200, volume: 5 },
        { date: '11:00', open: 29200, high: 29200, low: 29200, close: 29200, volume: 8 },
        { date: '13:00', open: 29200, high: 29200, low: 29200, close: 29200, volume: 4 },
        { date: '15:30', open: 29200, high: 29200, low: 29200, close: 29200, volume: 2 }
      ],
      '1W': [
        { date: '10.16', open: 29100, high: 29300, low: 29000, close: 29150, volume: 150 },
        { date: '10.17', open: 29150, high: 29250, low: 29100, close: 29200, volume: 120 },
        { date: '10.20', open: 29200, high: 29200, low: 29150, close: 29150, volume: 80 },
        { date: '10.21', open: 29150, high: 29200, low: 29150, close: 29150, volume: 95 },
        { date: '10.22', open: 29200, high: 29200, low: 29200, close: 29200, volume: 19 }
      ],
      '3M': [
        { date: '08.01', open: 26500, high: 28500, low: 26000, close: 27800, volume: 5200 },
        { date: '08.20', open: 27800, high: 29800, low: 27500, close: 28900, volume: 7400 },
        { date: '09.10', open: 28900, high: 31200, low: 28500, close: 29500, volume: 6800 },
        { date: '10.22', open: 29200, high: 29200, low: 29200, close: 29200, volume: 19 }
      ],
      '1Y': [
        { date: '2023.11', open: 21000, high: 25000, low: 19500, close: 23500, volume: 45000 },
        { date: '2024.03', open: 23500, high: 34000, low: 22800, close: 31000, volume: 98000 },
        { date: '2024.10', open: 31000, high: 38000, low: 27500, close: 29200, volume: 72000 }
      ]
    },
    news: [
      {
        id: 'n-217950-1',
        title: '파마리서치바이오, 톡신 공장 증설 완료로 글로벌 수요 대응 - 데일리팜',
        source: 'Google 뉴스 (데일리팜)',
        date: '2026.10.14',
        url: 'https://news.google.com/search?q=%ED%8C%8C%EB%A7%88%EB%A6%AC%EC%84%9C%EC%B9%98%EB%B0%94%EC%9D%B4%EC%98%A4%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'positive',
        category: '기술/신제품',
        snippet: '강릉 제2공장 가동을 통한 생산능력 3배 확대 및 동남아시아·중남미 허가 확대.',
        isGoogleNews: true
      }
    ]
  },

  // 6. 나노솔루션 (238540, 코넥스 시총 6위)
  {
    code: '238540',
    name: '나노솔루션',
    sector: '나노/화학소재',
    ceo: '김형열',
    establishedDate: '2006-12-22',
    listingDate: '2015-12-24',
    mainProducts: '탄소나노튜브(CNT) 분산액, 반도체·디스플레이용 정전기 방지 코팅제, 2차전지 도전재',
    description: '고순도 탄소나노튜브(CNT) 분산 기술력을 바탕으로 2차전지용 슬러리 도전재 및 반도체 클린룸 대전방지 소재를 공급하는 첨단 나노소재 기업.',
    dartCorpCode: '01924673',
    currentMetrics: {
      currentRatio: 1164.1,
      debtRatio: 33.8,
      equityRatio: 74.7,
      operatingMargin: 10.0,
      netMargin: 21.5,
      interestCoverage: 7.20
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제20기)',
        filingDate: '2026.07.28',
        auditor: '신우회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['나노소재 제조공정 재고자산 평가손실충당금'],
        metrics: {
          currentRatio: 1164.1,
          debtRatio: 33.8,
          equityRatio: 74.7,
          operatingMargin: 10.0,
          netMargin: 21.5,
          interestCoverage: 7.20
        },
        revenue: 62.4,
        operatingProfit: 6.3,
        netProfit: 13.4,
        totalAssets: 342.8,
        totalLiabilities: 86.7,
        totalEquity: 256.1,
        currentAssets: 213.7,
        currentLiabilities: 18.4,
        interestExpense: 0.9,
        dartReceiptNo: '20260728000338'
      }
    ],
    quote: {
      currentPrice: 103800,
      change: 0,
      changeRate: 0.00,
      open: 103800,
      high: 103800,
      low: 103800,
      volume: 0,
      tradingValue: 0,
      marketCap: 1160,
      sharesOutstanding: 1117640,
      foreignRatio: 0.65,
      high52w: 125000,
      low52w: 68000,
      eps: 1879,
      per: 55.2,
      bps: 35920,
      pbr: 2.89,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 },
        { date: '11:00', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 },
        { date: '13:00', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 },
        { date: '15:30', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 }
      ],
      '1W': [
        { date: '10.16', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 },
        { date: '10.17', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 },
        { date: '10.20', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 },
        { date: '10.21', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 },
        { date: '10.22', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 }
      ],
      '3M': [
        { date: '08.01', open: 95000, high: 99000, low: 93000, close: 98000, volume: 120 },
        { date: '08.20', open: 98000, high: 105000, low: 97000, close: 102000, volume: 350 },
        { date: '09.10', open: 102000, high: 112000, low: 101000, close: 103800, volume: 410 },
        { date: '10.22', open: 103800, high: 103800, low: 103800, close: 103800, volume: 0 }
      ],
      '1Y': [
        { date: '2023.11', open: 78000, high: 88000, low: 72000, close: 84000, volume: 1500 },
        { date: '2024.03', open: 84000, high: 118000, low: 81000, close: 105000, volume: 4200 },
        { date: '2024.10', open: 10500, high: 125000, low: 92000, close: 103800, volume: 2900 }
      ]
    },
    news: [
      {
        id: 'n-238540-1',
        title: '나노솔루션, 2차전지 실리콘 음극재용 CNT 도전재 공급망 확대 - 한국경제',
        source: 'Google 뉴스 (한국경제)',
        date: '2026.10.11',
        url: 'https://news.google.com/search?q=%EB%82%98%EB%85%B8%EC%86%94%EB%A3%A8%EC%85%98%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'positive',
        category: '기술/신제품',
        snippet: '실리콘 음극재 팽창 억제 및 수명 개선을 위한 단일벽(SWCNT) 분산액 품질 인증.',
        isGoogleNews: true
      }
    ]
  },

  // 7. 아이엠지티 (456570, 코넥스 시총 7위)
  {
    code: '456570',
    name: '아이엠지티',
    sector: '바이오/의료기기',
    ceo: '이학종, 손건호',
    establishedDate: '2010-04-05',
    listingDate: '2022-09-29',
    mainProducts: '초음파 유도 표적 약물전달 시스템, 나노입자 항암제 전달 플랫폼',
    description: '서울대병원 의과대학 기반의 정밀 바이오벤처로 비침습적 집속초음파와 나노케리어 융합 치료 플랫폼을 통해 암 조직 선택적 약물 전달 파이프라인 개발.',
    dartCorpCode: '01579020',
    currentMetrics: {
      currentRatio: 18.4,
      debtRatio: 999.0,
      equityRatio: -398.1,
      operatingMargin: 0.0,
      netMargin: 0.0,
      interestCoverage: 0.0
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제16기)',
        filingDate: '2026.03.30',
        auditor: '삼일회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['초음파 나노 복합치료기기 임상 연구비 회계처리', '우선주 전환금융부채 공정가치 평가'],
        metrics: {
          currentRatio: 18.4,
          debtRatio: 999.0,
          equityRatio: -398.1,
          operatingMargin: 0.0,
          netMargin: 0.0,
          interestCoverage: 0.0
        },
        revenue: 0.0,
        operatingProfit: -56.2,
        netProfit: -399.7,
        totalAssets: 151.2,
        totalLiabilities: 753.1,
        totalEquity: -601.9,
        currentAssets: 135.7,
        currentLiabilities: 738.7,
        interestExpense: 0.0,
        dartReceiptNo: '20260330001850'
      }
    ],
    quote: {
      currentPrice: 11850,
      change: 120,
      changeRate: 1.02,
      open: 11800,
      high: 11850,
      low: 11800,
      volume: 33,
      tradingValue: 0.4,
      marketCap: 624,
      sharesOutstanding: 5270000,
      foreignRatio: 0.42,
      high52w: 16200,
      low52w: 8500,
      eps: -7823,
      per: 0,
      bps: 0,
      pbr: 0,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 11800, high: 11850, low: 11800, close: 11850, volume: 15 },
        { date: '11:00', open: 11850, high: 11850, low: 11850, close: 11850, volume: 10 },
        { date: '13:00', open: 11850, high: 11850, low: 11850, close: 11850, volume: 5 },
        { date: '15:30', open: 11850, high: 11850, low: 11850, close: 11850, volume: 3 }
      ],
      '1W': [
        { date: '10.16', open: 11650, high: 11800, low: 11600, close: 11700, volume: 240 },
        { date: '10.17', open: 11700, high: 11850, low: 11650, close: 11750, volume: 180 },
        { date: '10.20', open: 11750, high: 11800, low: 11700, close: 11720, volume: 150 },
        { date: '10.21', open: 11720, high: 11750, low: 11680, close: 11730, volume: 120 },
        { date: '10.22', open: 11800, high: 11850, low: 11800, close: 11850, volume: 33 }
      ],
      '3M': [
        { date: '08.01', open: 10500, high: 11200, low: 10200, close: 10850, volume: 8500 },
        { date: '08.20', open: 10850, high: 11800, low: 10600, close: 11400, volume: 12000 },
        { date: '09.10', open: 11400, high: 12800, low: 11200, close: 11900, volume: 16000 },
        { date: '10.22', open: 11800, high: 11850, low: 11800, close: 11850, volume: 33 }
      ],
      '1Y': [
        { date: '2023.11', open: 9800, high: 11500, low: 9200, close: 10400, volume: 45000 },
        { date: '2024.03', open: 10400, high: 15200, low: 9900, close: 13500, volume: 88000 },
        { date: '2024.10', open: 13500, high: 16200, low: 11200, close: 11850, volume: 62000 }
      ]
    },
    news: [
      {
        id: 'n-456570-1',
        title: '아이엠지티, 표적 초음파 항암 약물전달 파이프라인 학회 발표 - 바이오스펙테이터',
        source: 'Google 뉴스 (바이오스펙테이터)',
        date: '2026.10.16',
        url: 'https://news.google.com/search?q=%EC%95%84%EC%9D%B4%EC%97%A0%EC%A7%80%ED%8B%B0%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'positive',
        category: '기술/신제품',
        snippet: '췌장암 동물 모델에서 대조군 대비 유의미한 종양 괴사 및 전신 독성 감소 입증.',
        isGoogleNews: true
      }
    ]
  },

  // 8. 노브메타파마 (229500, 코넥스 시총 8위)
  {
    code: '229500',
    name: '노브메타파마',
    sector: '바이오/대사질환',
    ceo: '황선욱, 정회윤',
    establishedDate: '2010-11-04',
    listingDate: '2015-10-26',
    mainProducts: '제2형 당뇨병 치료제(CZ5), 비만 치료제, 만성 신장질환(CKD) 파이프라인',
    description: '내인성 펩타이드 C4와 ZAG 단백질 기전 연구를 기반으로 인슐린 저항성 개선 당뇨 치료제 및 복합 대사증후군 신약 후보물질 임상 개발 중인 바이오텍.',
    dartCorpCode: '01065785',
    currentMetrics: {
      currentRatio: 183.4,
      debtRatio: 21.4,
      equityRatio: 82.3,
      operatingMargin: -15406.0,
      netMargin: -29989.0,
      interestCoverage: 0.0
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제16기)',
        filingDate: '2026.03.20',
        auditor: '삼덕회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['신약 R&D 연구용역 매출 및 기술료 정산', '부채 대폭 감소 및 자본구조 개선'],
        metrics: {
          currentRatio: 183.4,
          debtRatio: 21.4,
          equityRatio: 82.3,
          operatingMargin: -15406.0,
          netMargin: -29989.0,
          interestCoverage: 0.0
        },
        revenue: 0.35,
        operatingProfit: -53.7,
        netProfit: -104.5,
        totalAssets: 43.6,
        totalLiabilities: 7.7,
        totalEquity: 35.9,
        currentAssets: 12.4,
        currentLiabilities: 6.8,
        interestExpense: 0.2,
        dartReceiptNo: '20260320000871'
      }
    ],
    quote: {
      currentPrice: 3605,
      change: -235,
      changeRate: -6.12,
      open: 3605,
      high: 3605,
      low: 3605,
      volume: 314,
      tradingValue: 1.1,
      marketCap: 468,
      sharesOutstanding: 12987454,
      foreignRatio: 0.18,
      high52w: 7800,
      low52w: 3200,
      eps: -804,
      per: 0,
      bps: 277,
      pbr: 13.01,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 3605, high: 3605, low: 3605, close: 3605, volume: 120 },
        { date: '11:00', open: 3605, high: 3605, low: 3605, close: 3605, volume: 80 },
        { date: '13:00', open: 3605, high: 3605, low: 3605, close: 3605, volume: 64 },
        { date: '15:30', open: 3605, high: 3605, low: 3605, close: 3605, volume: 50 }
      ],
      '1W': [
        { date: '10.16', open: 3820, high: 3880, low: 3790, close: 3840, volume: 850 },
        { date: '10.17', open: 3840, high: 3890, low: 3800, close: 3840, volume: 920 },
        { date: '10.20', open: 3840, high: 3850, low: 3810, close: 3840, volume: 610 },
        { date: '10.21', open: 3840, high: 3840, low: 3800, close: 3840, volume: 480 },
        { date: '10.22', open: 3605, high: 3605, low: 3605, close: 3605, volume: 314 }
      ],
      '3M': [
        { date: '08.01', open: 4200, high: 4600, low: 4050, close: 4350, volume: 15000 },
        { date: '08.20', open: 4350, high: 4800, low: 4200, close: 4600, volume: 22000 },
        { date: '09.10', open: 4600, high: 5200, low: 4400, close: 4800, volume: 28000 },
        { date: '10.22', open: 3605, high: 3605, low: 3605, close: 3605, volume: 314 }
      ],
      '1Y': [
        { date: '2023.11', open: 4100, high: 5200, low: 3800, close: 4500, volume: 95000 },
        { date: '2024.03', open: 4500, high: 6800, low: 4200, close: 5600, volume: 180000 },
        { date: '2024.10', open: 5600, high: 7800, low: 3400, close: 3605, volume: 120000 }
      ]
    },
    news: [
      {
        id: 'n-229500-1',
        title: '노브메타파마, 대사질환 치료제 미국 FDA 2상 임상 진행 점검 - 약업신문',
        source: 'Google 뉴스 (약업신문)',
        date: '2026.10.13',
        url: 'https://news.google.com/search?q=%EB%85%B8%EB%B8%8C%EB%A9%94%ED%83%80%ED%8C%8C%EB%A7%88%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'positive',
        category: '기술/신제품',
        snippet: '인슐린 감수성 개선 지표 확인 및 글로벌 라이선싱 아웃 미팅 지속 추진.',
        isGoogleNews: true
      }
    ]
  },

  // 9. 메디쎄이 (200580, 코넥스 시총 9위)
  {
    code: '200580',
    name: '메디쎄이',
    sector: '의료기기/임플란트',
    ceo: '성경수',
    establishedDate: '2003-10-14',
    listingDate: '2015-09-22',
    mainProducts: '척추 고정용 임플란트(Thoracolumbar), 3D 프린팅 환자맞춤형 인공뼈(티타늄 메쉬)',
    description: '동화약품 그룹 계열의 척추 임플란트 전문 제조사로 세계 최고 수준의 의료용 3D 금속 프린팅 설비 및 미국 FDA 510(k) 인증 제품군 다수 보유.',
    dartCorpCode: '01018617',
    currentMetrics: {
      currentRatio: 566.1,
      debtRatio: 19.6,
      equityRatio: 83.6,
      operatingMargin: 14.0,
      netMargin: 11.8,
      interestCoverage: 4.48
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제23기 기재정정)',
        filingDate: '2026.03.27',
        auditor: '이촌회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['해외 대리점 공급 매출 인식 및 재고자산 평가'],
        metrics: {
          currentRatio: 566.1,
          debtRatio: 19.6,
          equityRatio: 83.6,
          operatingMargin: 14.0,
          netMargin: 11.8,
          interestCoverage: 4.48
        },
        revenue: 283.1,
        operatingProfit: 39.5,
        netProfit: 33.3,
        totalAssets: 451.0,
        totalLiabilities: 74.1,
        totalEquity: 377.0,
        currentAssets: 305.3,
        currentLiabilities: 53.9,
        interestExpense: 8.8,
        dartReceiptNo: '20260327001807'
      }
    ],
    quote: {
      currentPrice: 12000,
      change: 0,
      changeRate: 0.00,
      open: 12000,
      high: 12000,
      low: 12000,
      volume: 2,
      tradingValue: 0.02,
      marketCap: 447,
      sharesOutstanding: 3725000,
      foreignRatio: 0.85,
      high52w: 14500,
      low52w: 8200,
      eps: 893,
      per: 13.4,
      bps: 10120,
      pbr: 1.19,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 12000, high: 12000, low: 12000, close: 12000, volume: 1 },
        { date: '11:00', open: 12000, high: 12000, low: 12000, close: 12000, volume: 1 },
        { date: '13:00', open: 12000, high: 12000, low: 12000, close: 12000, volume: 0 },
        { date: '15:30', open: 12000, high: 12000, low: 12000, close: 12000, volume: 0 }
      ],
      '1W': [
        { date: '10.16', open: 12000, high: 12000, low: 12000, close: 12000, volume: 15 },
        { date: '10.17', open: 12000, high: 12000, low: 12000, close: 12000, volume: 8 },
        { date: '10.20', open: 12000, high: 12000, low: 12000, close: 12000, volume: 5 },
        { date: '10.21', open: 12000, high: 12000, low: 12000, close: 12000, volume: 4 },
        { date: '10.22', open: 12000, high: 12000, low: 12000, close: 12000, volume: 2 }
      ],
      '3M': [
        { date: '08.01', open: 11000, high: 11800, low: 10800, close: 11500, volume: 2100 },
        { date: '08.20', open: 11500, high: 12400, low: 11200, close: 11900, volume: 3400 },
        { date: '09.10', open: 11900, high: 12800, low: 11600, close: 12000, volume: 2800 },
        { date: '10.22', open: 12000, high: 12000, low: 12000, close: 12000, volume: 2 }
      ],
      '1Y': [
        { date: '2023.11', open: 9800, high: 11200, low: 9200, close: 10400, volume: 18000 },
        { date: '2024.03', open: 10400, high: 14200, low: 10100, close: 12800, volume: 42000 },
        { date: '2024.10', open: 12800, high: 14500, low: 11500, close: 12000, volume: 25000 }
      ]
    },
    news: [
      {
        id: 'n-200580-1',
        title: '메디쎄이, 3D 프린팅 정형외과 맞춤형 임플란트 미국 수출 신장 - 메디컬타임즈',
        source: 'Google 뉴스 (메디컬타임즈)',
        date: '2026.10.14',
        url: 'https://news.google.com/search?q=%EB%A9%94%EB%94%94%EC%8E%84%EC%9D%B4%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'positive',
        category: '기술/신제품',
        snippet: '미국 정형외과 학회(NASS)서 3D 프린팅 다공성 척추 유합 케이지 임상 결과 공개.',
        isGoogleNews: true
      }
    ]
  },

  // 10. 루켄테크놀러지스 (162120, 코넥스 시총 10위)
  {
    code: '162120',
    name: '루켄테크놀러지스',
    sector: '반도체 검사장비',
    ceo: '안윤태',
    establishedDate: '2007-10-02',
    listingDate: '2014-06-25',
    mainProducts: '반도체 프로브 카드(Probe Card), 마이크로 핀, 디스플레이 블록 검사 지그',
    description: '초미세 피치 반도체 및 디스플레이 패널 전기적 특성 검사용 프로브 카드 및 마이크로 핀(M-POGO) 핵심 부품 국산화 선도 기업.',
    dartCorpCode: '00886792',
    currentMetrics: {
      currentRatio: 48.8,
      debtRatio: 277.1,
      equityRatio: 26.5,
      operatingMargin: -6.9,
      netMargin: -15.3,
      interestCoverage: -0.66
    },
    auditReports: [
      {
        year: 2025,
        reportName: '2025 사업보고서 (제19기)',
        filingDate: '2026.03.23',
        auditor: '삼정회계법인',
        opinion: '적정',
        goingConcernIssue: false,
        keyAuditPoints: ['초미세 프로브 핀 양산 설비 유형자산 회수 가능액 검토'],
        metrics: {
          currentRatio: 48.8,
          debtRatio: 277.1,
          equityRatio: 26.5,
          operatingMargin: -6.9,
          netMargin: -15.3,
          interestCoverage: -0.66
        },
        revenue: 173.1,
        operatingProfit: -12.0,
        netProfit: -26.5,
        totalAssets: 511.6,
        totalLiabilities: 376.0,
        totalEquity: 135.7,
        currentAssets: 150.3,
        currentLiabilities: 308.0,
        interestExpense: 18.1,
        dartReceiptNo: '20260323000759'
      }
    ],
    quote: {
      currentPrice: 3965,
      change: 80,
      changeRate: 2.06,
      open: 3885,
      high: 3965,
      low: 3885,
      volume: 708,
      tradingValue: 2.8,
      marketCap: 442,
      sharesOutstanding: 11154825,
      foreignRatio: 0.55,
      high52w: 6500,
      low52w: 3100,
      eps: -320,
      per: 0,
      bps: 1638,
      pbr: 2.42,
      updatedAt: '2026.10.22 11:53 (KRX 실시간)',
      krxSource: 'KRX_OPEN_API'
    },
    priceSeries: {
      '1D': [
        { date: '09:00', open: 3885, high: 3900, low: 3885, close: 3890, volume: 150 },
        { date: '11:00', open: 3890, high: 3965, low: 3885, close: 3965, volume: 320 },
        { date: '13:00', open: 3965, high: 3965, low: 3920, close: 3965, volume: 140 },
        { date: '15:30', open: 3965, high: 3965, low: 3950, close: 3965, volume: 98 }
      ],
      '1W': [
        { date: '10.16', open: 3840, high: 3920, low: 3820, close: 3890, volume: 1800 },
        { date: '10.17', open: 3890, high: 3940, low: 3870, close: 3900, volume: 2100 },
        { date: '10.20', open: 3900, high: 3910, low: 3860, close: 3885, volume: 1400 },
        { date: '10.21', open: 3885, high: 3900, low: 3850, close: 3885, volume: 1650 },
        { date: '10.22', open: 3885, high: 3965, low: 3885, close: 3965, volume: 708 }
      ],
      '3M': [
        { date: '08.01', open: 3400, high: 3750, low: 3350, close: 3620, volume: 18000 },
        { date: '08.20', open: 3620, high: 4100, low: 3550, close: 3950, volume: 29000 },
        { date: '09.10', open: 3950, high: 4400, low: 3850, close: 4100, volume: 34000 },
        { date: '10.22', open: 3885, high: 3965, low: 3885, close: 3965, volume: 708 }
      ],
      '1Y': [
        { date: '2023.11', open: 3200, high: 3800, low: 2950, close: 3500, volume: 85000 },
        { date: '2024.03', open: 3500, high: 5800, low: 3400, close: 4800, volume: 190000 },
        { date: '2024.10', open: 4800, high: 6500, low: 3700, close: 3965, volume: 140000 }
      ]
    },
    news: [
      {
        id: 'n-162120-1',
        title: '루켄테크놀러지스, HBM용 고속 프로브 핀 납품 공급 개시 - 전자부품신문',
        source: 'Google 뉴스 (전자부품신문)',
        date: '2026.10.17',
        url: 'https://news.google.com/search?q=%EB%A3%A8%EC%BC%84%ED%85%8C%ED%81%AC%EB%85%B8%EB%9F%AC%EC%A7%80%EC%8A%A4%20%EC%BD%94%EB%84%A5%EC%8A%A4',
        sentiment: 'positive',
        category: '기술/신제품',
        snippet: 'HBM4 및 차세대 고대역폭 메모리 테스트용 미세 피치 M-POGO 핀 공급 본격화.',
        isGoogleNews: true
      }
    ]
  }
];

export const INITIAL_ANONYMOUS_COMMENTS: AnonymousComment[] = [
  {
    id: 'c-301',
    companyCode: '496320',
    category: '분석',
    title: '본시스템즈 1,176,000원 호가와 DART 감사보고서 결산실적 비교',
    author: '로봇투자자',
    ip: '118.235',
    content: 'DART 제11기 사업보고서 공시 확인해보니 연간 매출액 64.5억원에 영업손실 -16.1억원, 당기순손실 -19.1억원이네요. 기술 개발비와 초도 양산 투자로 아직 영업적자 구간이지만 유상증자 등으로 자본총계 34.9억원에 유동비율 132.9%로 재무 체질은 개선되고 있습니다. 시총 1조 1,948억원 호가와 실적 간 괴리는 감안해야 합니다.',
    createdAt: '2026-10-22 10:15:15',
    upvotes: 42,
    downvotes: 1,
    views: 780,
    replies: [
      {
        id: 'r-301-1',
        author: '코스닥패스트',
        ip: '223.38',
        content: 'DART 공시 원장 삼덕회계법인 적정의견 확인 완료. BCD 감속기 양산 정상화 여부가 핵심 관전 포인트.',
        createdAt: '2026-10-22 10:35:40'
      }
    ]
  },
  {
    id: 'c-302',
    companyCode: '260870',
    category: '호재',
    title: 'SK시그넷 8,150원 공개매수가격 부근 횡보 흐름 및 2025 결산',
    author: '전기차주주',
    ip: '175.223',
    content: 'SK시그넷 DART 연결 사업보고서 보면 연간 매출 1,007억원에 영업손실 -484억원이네요. 전기차 캐즘 여파가 실적에 크게 반영되었으나 SK그룹의 8,200원 공개매수가 진행되며 주가는 8,150원선에서 안정적으로 지지되고 있습니다.',
    createdAt: '2026-10-22 09:40:00',
    upvotes: 28,
    downvotes: 0,
    views: 520,
    replies: []
  },
  {
    id: 'c-303',
    companyCode: '217950',
    category: '분석',
    title: '파마리서치바이오 DART 실적: 매출 310억, 영업이익 137억 (이익률 44%)',
    author: '밸류에이션',
    ip: '211.36',
    content: 'DART 사업보고서 공식 발표치 확인: 2025년 매출액 310.9억원, 영업이익 137.3억원(영업이익률 44.2%), 당기순이익 123.3억원 달성. EPS 2,989원 기준으로 현재가 29,200원은 PER 9.8배 수준이라 코넥스 시총 상위사 중 가장 독보적인 흑자 펀더멘털을 보여줍니다.',
    createdAt: '2026-10-22 09:20:10',
    upvotes: 35,
    downvotes: 0,
    views: 640,
    replies: []
  }
];
