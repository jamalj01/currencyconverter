import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyConverter from './CurrencyConverter';
import DateSelector from './DateSelector';
import './App.css';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const apiKey = process.env.REACT_APP_EXCHANGERATE_API_KEY;

  useEffect(() => {
    fetchCurrencies();
    fetchRates();
  }, [selectedDate]);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
      if (response.data && response.data.conversion_rates) {
        setCurrencies(Object.keys(response.data.conversion_rates));
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const fetchRates = async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
      if (response.data && response.data.conversion_rates) {
        setRates(response.data.conversion_rates);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <CurrencyConverter currencies={currencies} rates={rates} />
    </div>
  );
};

export default App;
