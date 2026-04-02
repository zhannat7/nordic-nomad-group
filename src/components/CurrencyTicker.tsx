import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

const CurrencyTicker = () => {
  const { lang } = useI18n();
  const [text, setText] = useState('');

  const fetchRates = async () => {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/KGS');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const usdRate = data.rates?.USD;
      const eurRate = data.rates?.EUR;
      const dkkRate = data.rates?.DKK;
      if (usdRate && eurRate && dkkRate) {
        const usdToKgs = (1 / usdRate).toFixed(2);
        const eurToKgs = (1 / eurRate).toFixed(2);
        const dkkToKgs = (1 / dkkRate).toFixed(2);
        setText(`🇺🇸 1 USD = ${usdToKgs} сом  •  🇪🇺 1 EUR = ${eurToKgs} сом  •  🇩🇰 1 DKK = ${dkkToKgs} сом`);
      }
    } catch {
      setText('🇺🇸 1 USD = 89.50 сом  •  🇪🇺 1 EUR = 97.20 сом  •  🇩🇰 1 DKK = 13.02 сом');
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (lang !== 'ru' && lang !== 'ky') return null;

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
