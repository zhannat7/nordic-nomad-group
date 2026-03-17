import { useState, useEffect } from 'react';

const FIXED_EUR_TO_KGS = 95.23;

const CurrencyTicker = () => {
  const [text, setText] = useState('Loading exchange rates...');

  const fetchRates = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=EUR&to=DKK,USD');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const dkk = data.rates?.DKK;
      const usd = data.rates?.USD;
      if (dkk && usd) {
        const kgsToEur = 1 / FIXED_EUR_TO_KGS;
        const kgsToDkk = dkk / FIXED_EUR_TO_KGS;
        const kgsToUsd = usd / FIXED_EUR_TO_KGS;
        setText(`🇰🇬 1 KGS = ${kgsToEur.toFixed(4)} EUR  •  🇰🇬 1 KGS = ${kgsToDkk.toFixed(4)} DKK  •  🇰🇬 1 KGS = ${kgsToUsd.toFixed(4)} USD`);
      }
    } catch {
      const kgsToEur = 1 / FIXED_EUR_TO_KGS;
      setText(`🇰🇬 1 KGS = ${kgsToEur.toFixed(4)} EUR  •  🇰🇬 1 KGS = 0.0785 DKK  •  🇰🇬 1 KGS = 0.0121 USD`);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

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
