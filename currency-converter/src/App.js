import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyRow from './CurrencyRow';


const BASE_URL = 'https://www.frankfurter.app/latest?from=USD'
/*const BASE_URL_GRID = 'https://www.frankfurter.app/latest?from=USD'
/*const BASE_TYPES = 'https://www.frankfurter.app/currencies'*/

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount,setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [gridFromCurrency, setGridFromCurrency]= useState()
  const [gridExchangeRate, setGridExchangeRate]= useState([])

  var toAmount = 1;
  var fromAmount = 1;
  if (exchangeRate !== undefined) {
      if (amountInFromCurrency) {
      fromAmount = amount
      toAmount = amount * exchangeRate
    }
    else {
      toAmount = amount
      fromAmount = amount / exchangeRate
    }
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
        setGridExchangeRate([(data.amount), ...Object.values(data.rates)])
        setGridFromCurrency(data.base)
        /*console.log(data);*/
      })
  }, [])

  useEffect(() => {
    if(fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const currentToCurrency = toCurrency
        const currentFromCurrency = fromCurrency

        if(fromCurrency === data.base && toCurrency === data.base) {
          setExchangeRate(data.amount/data.amount)
        }
        else if(fromCurrency === data.base && toCurrency !== data.base) {
          setExchangeRate(data.rates[currentToCurrency]/data.amount)
        }
        else if(toCurrency === data.base && fromCurrency !== data.base) {
          setExchangeRate(data.amount/data.rates[currentFromCurrency])
        }
        else {
          setExchangeRate(data.rates[currentToCurrency]/data.rates[currentFromCurrency])
        }
      })
    }
  }, [fromCurrency, toCurrency])


  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const listGridCurrency = [];
      const defaultGridExchangeRate = [(data.amount), ...Object.values(data.rates)];
      for (let i = 0; i < Object.keys(data.rates).length; i++) {
        if (Object.keys(data.rates)[i] === gridFromCurrency) {
          for(let j = 0; j < Object.keys(data.rates).length; j++) {
            listGridCurrency.push(Math.round(Object.values(data.rates)[j] / Object.values(data.rates)[i] * 10000)/10000);
          }
          listGridCurrency.unshift(Math.round((data.amount)/Object.values(data.rates)[i] * 10000)/10000);
          setGridExchangeRate(listGridCurrency);
          /*console.log(gridExchangeRate);*/
          /*console.log(listGridCurrency);*/
        }
        /*console.log(Object.keys(data.rates)[i]);*/
      }
      if ('USD' === gridFromCurrency) {
        setGridExchangeRate(defaultGridExchangeRate);
      }
    })
  }, [gridFromCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  function onChangeGridCurrency(e) {
    setGridFromCurrency(e.target.value)
  }

  return (
    <div className="App">
      {/*this is the little blue style at the top of the page*/}
      <div className="blue-top">
      </div>
      <div className="link-to-portfolio">
      </div>
      <div className="converter-top">
        <div className='title-top'>
          <h1>Currency Converter</h1>
        </div>
        <div>
          <h3>By Nicholas Emmons</h3>
        </div>
        <CurrencyRow
        className=''
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
        />
        <div className='equalSign'>=</div>
        <CurrencyRow
        className=''
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
        />
      </div>
      <div className="flex-container">
        <div className='grid-top'>
          <select id = 'table-dropdown' className = 'dropdown' value={gridFromCurrency} onChange={onChangeGridCurrency}>
            {currencyOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="grid-container">
         <p className="grid-item3">United States dollar</p>
         <p className="grid-item3">Australian dollar</p>
         <p className="grid-item3">Bulgarian lev</p>
         <p className="grid-item3">Brazilian real</p>
         <p className="grid-item3">Canadian dollar</p>
         <p className="grid-item3">Swiss franc</p>
         <p className="grid-item3">Chinese Renminbi</p>
         <p className="grid-item3">Czech koruna</p>
         <p className="grid-item3">Danish krone</p>
         <p className="grid-item3">European Euro</p>
         <p className="grid-item3">Great British Pound</p>
         <p className="grid-item3">Hong Kong dollar</p>
         <p className="grid-item3">Croatian kuna</p>
         <p className="grid-item3">Hungarian forint</p>
         <p className="grid-item3">Indonesian rupiah</p>
         <p className="grid-item3">Israeli new shekel</p>
         <p className="grid-item3">Indian rupee</p>
         <p className="grid-item3">Icelandic króna</p>
         <p className="grid-item3">Japanese yen</p>
         <p className="grid-item3">South Korean won</p>
         <p className="grid-item3">Mexican peso</p>
         <p className="grid-item3">Malaysian ringgit</p>
         <p className="grid-item3">Norwegian krone</p>
         <p className="grid-item3">New Zealand dollar</p>
         <p className="grid-item3">Philippine peso</p>
         <p className="grid-item3">Polish złoty</p>
         <p className="grid-item3">Romanian leu</p>
         <p className="grid-item3">Swedish krona</p>
         <p className="grid-item3">Singapore dollar</p>
         <p className="grid-item3">Thai baht</p>
         <p className="grid-item3">Turkish lira</p>
         <p className="grid-item3">South African rand</p>
        </div>
        <div className="grid-container2">
          {currencyOptions.map(option => (
            <div className="grid-item" key={option} value={option}>{option}</div>
          ))}
        </div>
        <div className="grid-container2">
        {gridExchangeRate.map(option => (
          <div className="grid-item2" key={option} value={option}>{option}</div>
        ))}
        </div>
      </div>
      <div>
        <a href="https://github.com/NoPanicspicnic" className="rounded" id="GitHub"><span><i className="fab fa-github"></i>GitHub</span></a>
        <a href="https://my.indeed.com/p/nicholase-n1qfg0r" className="rounded" id="Indeed"><span><i className="fas fa-info"></i>Indeed</span></a>
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
