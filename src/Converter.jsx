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
  const cryptoValue = useRef(null)
  const [cryptoData , setCryptoData] = useState("")
  const [cryptos, setCryptos] = useState([])
  const usdAmount = useRef(null)

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
      console.log(result)
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

 async  function cryptoConverter(){
  if(usdAmount.current.value === ""){
    return
  }
  const url = `https://fast-price-exchange-rates.p.rapidapi.com/api/v1/convert?amount=${usdAmount.current.value}&base_currency=USD&quote_currency=${cryptoValue.current.value}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '5746b3ee16msh8ad6ef3a1df473fp1850acjsn64a08673d84a',
      'x-rapidapi-host': 'fast-price-exchange-rates.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    setCryptoData(result.to.BTC)
  } catch (error) {
    console.error(error);
  }

  }


 

  useEffect(() => {
    cryptoConverter()
   
  } ,[])

  const facts =[
    "Most Traded Currency: The US Dollar (USD) is the most traded currency in the world, accounting for about 88% of all foreign exchange transactions.",
    "Oldest Currency: The British Pound Sterling (GBP) is the world’s oldest currency still in use, dating back over 1,200 years.",
    "Most Valuable Currency: The Kuwaiti Dinar (KWD) is currently the most valuable currency in the world.",
    "Currency with the Most Coins: The Euro (€) has the most denominations of coins, with 8 coins ranging from 1 cent to €2.",
    "Shortest Lifespan Currency: The Zimbabwean Dollar (ZWD) had one of the shortest lifespans due to hyperinflation, with multiple versions issued between 1980 and 2009.",
    "Smallest Denomination Ever: The Hungarian Pengő had denominations as low as one milliardth (1/1,000,000,000) of a pengő due to hyperinflation in 1946.",
    "Largest Denomination Ever Printed: The Hungarian 100 Quintillion Pengő (100,000,000,000,000,000,000) note was printed during hyperinflation in 1946.",
    "First Paper Currency: Paper currency was first introduced in China during the Tang Dynasty (618–907 AD) and became widely used during the Song Dynasty.",
    "Most Counterfeited Currency: The US Dollar (USD) and the Euro (€) are among the most counterfeited currencies globally.",
    "Heaviest Coins: The heaviest coin is the Swedish Plate Money, issued in the 17th century, weighing up to 19.7 kilograms.",
    "Longest Lifespan of Coins: Ancient Roman coins, like the denarius, remained in circulation for over 500 years in some cases.",
    "Most Colors on a Banknote: The Swiss Franc (CHF) banknotes are known for their vibrant designs and use of multiple colors, often considered works of art.",
     "Most High-Tech Currency: The Canadian Dollar (CAD) polymer banknotes feature advanced security elements, like holograms and transparent windows.",
     "First Cryptocurrency: Bitcoin (BTC), launched in 2009, is the world’s first decentralized cryptocurrency and remains the most valuable.",
     "Most Hyperinflationary Currency: Zimbabwe's Dollar in the late 2000s saw inflation rates of over 79.6 billion percent per month at its peak.",
     "Longest Continuous Use of Coins: The Spanish Reales de a Ocho (Pieces of Eight) were used for over 300 years and were the world's first widely circulated global currency."
  ]

  return (
    <div className="container">
      <h1 className="text-center mb-4">Convert currencies</h1>
      <div className="row justify-content-center">
        <div className="col-md-5 col-sm-10 col-12">
          <div className="change bg-primary rounded-3 text-center p-3">
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

                <h1 className="mt-5">USD to bitcoin converter</h1>
      <div className="crypto">
        <input ref={usdAmount} type="number" placeholder="USD amount" /><br /><br />
     
        
        <select ref={cryptoValue} name="" id="">
          <option value="">Choose crypto currency</option>
                <option value="BTC">Bitcoin</option>
      
          </select><br /><br />
          <button className="calculate" onClick={cryptoConverter}>Calculate</button><br /><br />
         {cryptoData && <input type="text"  readOnly placeholder="result" value={cryptoData.toFixed(10)  }/>} 
      </div>

      <h1 className="curr">Currency fun facts</h1>
      <div className="factsContainer">
        {facts.map((fact) => (
          <div>
            <p>{fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Converter;
