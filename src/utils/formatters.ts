/**
 * Utility functions for formatting Korean financial and stock market values
 */

/**
 * Format market capitalization (in 억원) into natural Korean denominations (조, 억).
 * Example:
 *  - 11948 => "1조 1,948억원" (or "1조 1,948억" if includeWon is false)
 *  - 2792  => "2,792억원" (or "2,792억")
 *  - 20000 => "2조원" (or "2조")
 */
export function formatMarketCap(marketCapInEok: number, includeWon: boolean = true): string {
  if (!marketCapInEok || isNaN(marketCapInEok)) {
    return includeWon ? '0억원' : '0억';
  }

  const wonSuffix = includeWon ? '원' : '';

  if (marketCapInEok >= 10000) {
    const jo = Math.floor(marketCapInEok / 10000);
    const remainder = marketCapInEok % 10000;
    if (remainder === 0) {
      return `${jo}조${wonSuffix}`;
    }
    return `${jo}조 ${remainder.toLocaleString()}억${wonSuffix}`;
  }

  return `${marketCapInEok.toLocaleString()}억${wonSuffix}`;
}

/**
 * Format stock price with KRW symbol/unit
 */
export function formatPrice(price: number): string {
  if (!price && price !== 0) return '-';
  return `${price.toLocaleString()}원`;
}
