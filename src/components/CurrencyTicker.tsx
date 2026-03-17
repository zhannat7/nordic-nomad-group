import { useState, useEffect } from 'react';

const CurrencyTicker = () => {
  const [text, setText] = useState('Loading exchange rates...');

  const fetchRates = async () => {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const kgs = data.rates?.KGS;
      const dkk = data.rates?.DKK;
      const usd = data.rates?.USD;
      if (kgs) {
        const kgsToEur = (1 / kgs).toFixed(4);
        const kgsToDkk = (dkk / kgs).toFixed(4);
        const kgsToUsd = (usd / kgs).toFixed(4);
        setText(`🇰🇬 1 KGS = ${kgsToEur} EUR  •  🇰🇬 1 KGS = ${kgsToDkk} DKK  •  🇰🇬 1 KGS = ${kgsToUsd} USD`);
      }
    } catch {
      setText('🇰🇬 1 KGS = 0.0097 EUR  •  🇰🇬 1 KGS = 0.0724 DKK  •  🇰🇬 1 KGS = 0.0112 USD');
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
