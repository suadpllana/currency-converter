import React, { useState, useEffect, useRef } from "react";
import { currencyNameData } from "./names.js"; 

const Converter = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [currencyType, setCurrencyType] = useState("");
  const [currencyType2, setCurrencyType2] = useState("");
  const amount = useRef(null);
  const selectValue = useRef(null);
  const selectValue2 = useRef(null);
  const resultConversion = useRef(null);
  const apiKey = import.meta.env.VITE_API_KEY;


  async function getData() {
    const inputAmount = parseFloat(amount.current.value) || 0; 
    if (inputAmount === 0 || !currencyType) {
      resultConversion.current.value = "";
      return;
    }

    try {
      const url = `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${currencyType2}&to=${currencyType}&amount=${inputAmount}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "currency-converter18.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const result = await response.json();
      setCurrencyData(result); 

    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  }


  useEffect(() => {
    if (currencyData && currencyData.result) {
      resultConversion.current.value = currencyData.result.convertedAmount.toFixed(2);
    }
  }, [currencyData]);


  useEffect(() => {
    getData();
  }, [currencyType]);

  return (
    <div>
      <h1>Convert currencies</h1>
      <div className="container">
        <div>
          <input ref={amount} type="number" placeholder="First currency" onChange={getData} />
          <select onChange={() => setCurrencyType2(selectValue2.current.value)} ref={selectValue2}>
            <option value="">Select a currency</option>
            {currencyNameData.map((currency, index) => (
              <option key={index} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input ref={resultConversion} type="text" placeholder="Converted amount" readOnly onChange={getData} />
          <select onChange={() => setCurrencyType(selectValue.current.value)} ref={selectValue}>
            <option value="">Select a currency</option>
            {currencyNameData.map((currency, index) => (
              <option key={index} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Converter;
