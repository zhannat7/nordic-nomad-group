import { useState, useEffect } from 'react';

const CurrencyTicker = () => {
  const [kgsToEur, setKgsToEur] = useState<number | null>(null);
  const [eurToKgs, setEurToKgs] = useState<number | null>(null);

  const fetchRates = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=EUR&to=KGS');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const rate = data.rates?.KGS;
      if (rate) {
        setEurToKgs(rate);
        setKgsToEur(1 / rate);
      }
    } catch {
      // fallback values
      setEurToKgs(95.23);
      setKgsToEur(0.0105);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const text = kgsToEur !== null && eurToKgs !== null
    ? `🇰🇬 1 KGS = ${kgsToEur.toFixed(4)} EUR  •  🇪🇺 1 EUR = ${eurToKgs.toFixed(2)} KGS`
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
