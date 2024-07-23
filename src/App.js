import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CurrencyConverter from "./CurrencyConverter";
import DateSelector from "./DateSelector";
import "./App.css";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_EXCHANGERATE_API_KEY;

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const debounceFetch = setTimeout(fetchRates, 300);
    return () => clearTimeout(debounceFetch);
  }, [selectedDate]);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
      );
      if (response.data && response.data.conversion_rates) {
        setCurrencies(Object.keys(response.data.conversion_rates));
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/history/USD/${year}/${month}/${day}`
      );
      if (response.data && response.data.conversion_rates) {
        setRates(response.data.conversion_rates);
      } else {
        console.error("Invalid response format:", response);
        setRates({});
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
      setError("Error fetching rates. Please try again.");
      setRates({});
    } finally {
      setLoading(false);
    }
  }, [selectedDate, apiKey]);

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CurrencyConverter currencies={currencies} rates={rates} />
      )}
    </div>
  );
};

export default App;
