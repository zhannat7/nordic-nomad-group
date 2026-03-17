import { useState, useEffect } from 'react';

interface Rates {
  kgsToEur: number | null;
  kgsToDkk: number | null;
  kgsToUsd: number | null;
}

const CurrencyTicker = () => {
  const [rates, setRates] = useState<Rates>({ kgsToEur: null, kgsToDkk: null, kgsToUsd: null });

  const fetchRates = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=EUR&to=KGS,DKK,USD');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const kgs = data.rates?.KGS;
      const dkk = data.rates?.DKK;
      const usd = data.rates?.USD;
      if (kgs) {
        setRates({
          kgsToEur: 1 / kgs,
          kgsToDkk: dkk / kgs,
          kgsToUsd: usd / kgs,
        });
      }
    } catch {
      setRates({ kgsToEur: 0.0105, kgsToDkk: 0.074, kgsToUsd: 0.011 });
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const { kgsToEur, kgsToDkk, kgsToUsd } = rates;
  const text = kgsToEur !== null
    ? `🇰🇬 1 KGS = ${kgsToEur.toFixed(4)} EUR  •  🇰🇬 1 KGS = ${kgsToDkk!.toFixed(4)} DKK  •  🇰🇬 1 KGS = ${kgsToUsd!.toFixed(4)} USD`
    : 'Loading exchange rates...';

  return (
    <div className="overflow-hidden whitespace-nowrap" style={{ backgroundColor: '#1B3A6B' }}>
      <div className="animate-ticker inline-block py-1.5 text-xs font-medium text-white">
        <span className="inline-block px-8">{text}</span>
        <span className="inline-block px-8">{text}</span>
        <span className="inline-block px-8">{text}</span>
        <span className="inline-block px-8">{text}</span>
      </div>
    </div>
  );
};

export default CurrencyTicker;
