import React, { useState } from 'react';
import { X, PlusCircle, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { KonexCompany } from '../types/konex';

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompanyAdded: (newCompany: KonexCompany) => void;
}

export const AddCompanyModal: React.FC<AddCompanyModalProps> = ({
  isOpen,
  onClose,
  onCompanyAdded
}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [sector, setSector] = useState('바이오/제약');
  const [ceo, setCeo] = useState('');
  const [mainProducts, setMainProducts] = useState('');
  const [description, setDescription] = useState('');
  const [currentPrice, setCurrentPrice] = useState('3500');
  const [changeRate, setChangeRate] = useState('1.5');
  const [marketCap, setMarketCap] = useState('250');

  // 6 Financial ratios
  const [currentRatio, setCurrentRatio] = useState('165.0');
  const [debtRatio, setDebtRatio] = useState('78.5');
  const [equityRatio, setEquityRatio] = useState('56.0');
  const [operatingMargin, setOperatingMargin] = useState('12.4');
  const [netMargin, setNetMargin] = useState('9.2');
  const [interestCoverage, setInterestCoverage] = useState('3.8');

  // Audit info
  const [auditor, setAuditor] = useState('삼일회계법인');
  const [opinion, setOpinion] = useState<'적정' | '한정' | '부적정' | '의견거절'>('적정');
  const [goingConcernIssue, setGoingConcernIssue] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) {
      setErrorMsg('종목코드(6자리)와 기업명을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          name: name.trim(),
          sector,
          ceo: ceo.trim() || '대표이사',
          mainProducts: mainProducts.trim() || '신제품 및 기술 서비스',
          description: description.trim() || `${name.trim()} 코넥스 상장 기업 DART 재무분석 데이터입니다.`,
          currentPrice: Number(currentPrice) || 3000,
          changeRate: Number(changeRate) || 0.0,
          marketCap: Number(marketCap) || 200,
          currentRatio: Number(currentRatio) || 150.0,
          debtRatio: Number(debtRatio) || 80.0,
          equityRatio: Number(equityRatio) || 50.0,
          operatingMargin: Number(operatingMargin) || 10.0,
          netMargin: Number(netMargin) || 7.0,
          interestCoverage: Number(interestCoverage) || 3.0,
          auditor: auditor.trim() || '회계법인',
          opinion,
          goingConcernIssue
        })
      });

      const data = await res.json();
      if (data.success && data.company) {
        onCompanyAdded(data.company);
        onClose();
      } else {
        setErrorMsg(data.message || '기업 등록에 실패했습니다.');
      }
    } catch (err) {
      setErrorMsg('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-slate-100">
              신규 코넥스 기업 등록 (DART &amp; 네이버 연동)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          사후적으로 새로운 코넥스 상장 기업을 언제든 등록할 수 있습니다. 등록 즉시 전체 검색, DART 6대 재무지표 분석, 네이버 차트 및 익명 갤러리가 자동 활성화됩니다.
        </p>

        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Group 1: Basic Info */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              기본 기업 정보
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-slate-400 mb-1">종목코드 (6자리) *</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="예: 299480"
                  required
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">기업명 *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 대한바이오"
                  required
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">업종</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="바이오/제약">바이오/제약</option>
                  <option value="IT/로봇/AI">IT/로봇/AI</option>
                  <option value="IT/SW">IT/SW</option>
                  <option value="반도체/장비">반도체/장비</option>
                  <option value="소비재/제조">소비재/제조</option>
                  <option value="제조/엔지니어링">제조/엔지니어링</option>
                  <option value="물류/유통">물류/유통</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-400 mb-1">대표이사</label>
                <input
                  type="text"
                  value={ceo}
                  onChange={(e) => setCeo(e.target.value)}
                  placeholder="대표이사 성명"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">주요 제품 및 서비스</label>
                <input
                  type="text"
                  value={mainProducts}
                  onChange={(e) => setMainProducts(e.target.value)}
                  placeholder="예: 정밀 의료기기, 바이오 진단"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Group 2: DART 6 Financial Indicators */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <h4 className="font-semibold text-slate-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                DART 감사보고서 6대 재무지표
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                기준치 자동 건전성 판정에 사용됩니다
              </span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono">
              <div>
                <label className="block text-slate-400 mb-1 font-sans">1. 유동비율 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={currentRatio}
                  onChange={(e) => setCurrentRatio(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-sans">2. 부채비율 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={debtRatio}
                  onChange={(e) => setDebtRatio(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-sans">3. 자기자본비율 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={equityRatio}
                  onChange={(e) => setEquityRatio(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-sans">4. 영업이익률 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={operatingMargin}
                  onChange={(e) => setOperatingMargin(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-sans">5. 순이익률 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={netMargin}
                  onChange={(e) => setNetMargin(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-sans">6. 이자보상배율 (배)</label>
                <input
                  type="number"
                  step="0.01"
                  value={interestCoverage}
                  onChange={(e) => setInterestCoverage(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-slate-400 mb-1">외부감사인</label>
                <input
                  type="text"
                  value={auditor}
                  onChange={(e) => setAuditor(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">감사의견</label>
                <select
                  value={opinion}
                  onChange={(e: any) => setOpinion(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="적정">적정</option>
                  <option value="한정">한정</option>
                  <option value="부적정">부적정</option>
                  <option value="의견거절">의견거절</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="goingConcern"
                  checked={goingConcernIssue}
                  onChange={(e) => setGoingConcernIssue(e.target.checked)}
                  className="rounded border-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="goingConcern" className="text-slate-300 cursor-pointer">
                  계속기업 불확실성 기재
                </label>
              </div>
            </div>
          </div>

          {/* Group 3: Stock Quote */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <h4 className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              주가 및 시가총액 (네이버 증권 연동 초기값)
            </h4>
            <div className="grid grid-cols-3 gap-2.5 font-mono">
              <div>
                <label className="block text-slate-400 mb-1 font-sans">현재가 (원)</label>
                <input
                  type="number"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-sans">등락률 (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={changeRate}
                  onChange={(e) => setChangeRate(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-sans">시가총액 (억원)</label>
                <input
                  type="number"
                  value={marketCap}
                  onChange={(e) => setMarketCap(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:bg-slate-800 shadow-sm shadow-blue-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isSubmitting ? '등록 중...' : '코넥스 기업 등록 완료'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
