import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyRow from './CurrencyRow';


const BASE_URL = 'https://altexchangerateapi.herokuapp.com/latest?from=USD'
const BASE_TYPES = 'https://altexchangerateapi.herokuapp.com/currencies'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount,setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [newToExchangeRate, setNewToExchangeRate] = useState()
  const [newFromExchangeRate, setNewFromExchangeRate] = useState()

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }
  else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[8]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
        console.log(data);
      })
  }, [])

/*  useEffect(() => {
    fetch(BASE_TYPES)
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])*/

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const currentToCurrency = toCurrency
        const currentFromCurrency = fromCurrency


        if(fromCurrency == data.base) {
          setNewFromExchangeRate(data.amount)
        }
        else {
          setNewFromExchangeRate(data.rates[currentToCurrency])
        }

        if(toCurrency == data.base) {
          setNewToExchangeRate(data.amount)
        }
        else {
          setNewToExchangeRate(data.rates[currentToCurrency])
        }


        setNewToExchangeRate(data.rates[currentToCurrency])
        setNewFromExchangeRate(data.rates[currentFromCurrency])
        const currentExchangeRate = newToExchangeRate/newFromExchangeRate
        setExchangeRate(data.rates[currentToCurrency]/data.rates[currentFromCurrency])


        console.log(newFromExchangeRate);
        console.log(newToExchangeRate);
        console.log(currentExchangeRate);

        console.log(currentFromCurrency);
        console.log(fromCurrency);
        console.log(currentToCurrency);
        console.log(toCurrency);

        console.log(exchangeRate);
      })
      /*fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))*/
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className="App">
      {/*this is the little blue style at the top of the page*/}
      <div className="blue-top">
      </div>
      <div className="converter-top">
        <div>
          <h1>Converter</h1>
        </div>
        <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
        />
        <div>=</div>
        <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
        />
      </div>

    </div>
  );
}



export default App;



<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
