import React from 'react'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props


  return (
    <div>
      <div className='visualRows'>
        <select className = 'dropdown' value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className='visualRows1'>
        <input className='converterInputStyle' type ='text' value={amount} onChange={onChangeAmount}/>
      </div>
    </div>
  )
}
