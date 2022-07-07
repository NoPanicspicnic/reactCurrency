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
      <select className = 'dropdown' value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div>
        <input className='converterInputStyle' type ='number' value={amount} onChange={onChangeAmount}/>
      </div>
    </div>
  )
}
