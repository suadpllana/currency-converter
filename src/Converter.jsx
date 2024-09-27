import React, { useState, useEffect, useRef } from "react";
import "./names.js";
import { currencyNameData } from "./names.js";

const Converter = () => {
  const [currencyData, setCurrencyData] = useState({});
  const [amountData, setAmountData] = useState(0);
  const amount = useRef(null);
  const selectValue = useRef(null);
  const result = useRef(null);
  const apiKey = import.meta.env.VITE_API_KEY
  async function getData() {
    try{
        const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setCurrencyData(data.rates);
    }
  
    catch(err){
        alert("something went wrong")
        return;
    }
  }

  function convertCurrency() {
    const selectedCurrency = selectValue.current.value;
    const inputAmount = parseFloat(amount.current.value) || 0; 

    if (currencyData[selectedCurrency] && inputAmount) {
      const convertedValue = inputAmount * currencyData[selectedCurrency];
      setAmountData(convertedValue);
      result.current.value = convertedValue.toFixed(2);
    } else {
      result.current.value = "Invalid currency or amount";
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Convert Euro to other currencies</h1>
      <div className="container">
        <div>
          <input
            ref={amount}
            type="number"
            placeholder="Amount in Euro"
            onChange={convertCurrency} 
          />
         
        </div>

        <div>
          <input
            ref={result}
            type="text"
            placeholder="Converted amount"
            readOnly
          />
           <select onChange={convertCurrency} ref={selectValue}>
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
