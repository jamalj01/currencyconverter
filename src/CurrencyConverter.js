import React, { useState, useEffect } from "react";

const CurrencyConverter = ({ currencies, rates }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      if (rates[fromCurrency] && rates[toCurrency]) {
        const rate = rates[toCurrency] / rates[fromCurrency];
        setConvertedAmount(amount * rate);
        setError(null);
      } else {
        setError(
          `Exchange rate data for ${fromCurrency} or ${toCurrency} is not available.`
        );
        setConvertedAmount(0);
      }
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
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
