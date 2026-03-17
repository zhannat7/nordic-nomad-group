const CurrencyTicker = () => {
  const rates = [
    { flag: '🇰🇬', label: '1 KGS =', value: '0.0105 EUR' },
    { flag: '🇰🇬', label: '1 KGS =', value: '0.074 DKK' },
    { flag: '🇰🇬', label: '1 KGS =', value: '0.011 USD' },
  ];

  const extras = [
    '🌍 500+ Placed Candidates',
    '🇩🇰 Denmark',
    '🇩🇪 Germany',
    '✅ Apply Now',
    '🕐 Mon–Fri 9:00–17:00 CET',
  ];

  const content = (
    <>
      {rates.map((r, i) => (
        <span key={i} className="inline-block px-6">
          {r.flag} {r.label} <span style={{ color: '#F5A623' }}>{r.value}</span>
        </span>
      ))}
      {extras.map((e, i) => (
        <span key={`e-${i}`} className="inline-block px-6">{e}</span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap" style={{ backgroundColor: '#1B3A6B' }}>
      <div className="animate-ticker inline-block py-1.5 text-xs font-medium text-white">
        {content}{content}{content}{content}
      </div>
    </div>
  );
};

export default CurrencyTicker;
