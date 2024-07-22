import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ currencies, rates }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    if (fromCurrency && toCurrency && rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount(amount * rate);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span> to </span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>
          {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
        </h3>
      </div>
    </div>
  );
};

export default CurrencyConverter;
