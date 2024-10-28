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
    <div className="container">
      <h1 className="text-center mb-4">Convert currencies</h1>
      <div className="row justify-content-center">
        <div className="col-md-5 col-sm-10 col-12">
          <div className="bg-info rounded-3 text-center p-3">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="First currency"
                ref={amount}
                onChange={getData}
              />
              <select
                className="form-select"
                onChange={() => setCurrencyType2(selectValue2.current.value)}
                ref={selectValue2}
              >
                <option value="">Select a currency</option>
                {currencyNameData.map((currency, index) => (
                  <option key={index} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Converted amount"
                ref={resultConversion}
                readOnly
              />
              <select
                className="form-select"
                onChange={() => setCurrencyType(selectValue.current.value)}
                ref={selectValue}
              >
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
      </div>
    </div>
  );
};

export default Converter;
