import React, { useState } from 'react';
import './table-currency.module.scss';
import { useSelector } from 'react-redux';

export default function TableCurrency() {
  const tableHeader = [
    'Номер строки',
    'Код валюты',
    'Название валюты',
    'Курс к рублю',
    'Курс к доллару',
    'Курс к евро',
    'Курс к Юаню',
  ];

  const сharCodeСurrency = [
    'AUD',
    'AZN',
    'GBP',
    'AMD',
    'BYN',
    'BGN',
    'BRL',
    'HUF',
    'HKD',
    'DKK',
  ];

  const data = useSelector((state) => state.currency.currencyData);
  const [view, setView] = useState(false)

  const USD = data.Valute['USD'].Value;
  const EUR = data.Valute['EUR'].Value;
  const CNY = data.Valute['CNY'].Value;

  return (
    <>
      <table>
        <caption>Курсы валют</caption>
        <thead>
          <tr>
            {tableHeader.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(view ? сharCodeСurrency : сharCodeСurrency.slice(0, 5)).map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.Valute[item].NumCode}</td>
              <td>{data.Valute[item].CharCode}</td>
              <td>{data.Valute[item].Value.toFixed(4)}</td>
              <td>{(data.Valute[item].Value / USD).toFixed(4)}</td>
              <td>{(data.Valute[item].Value / EUR).toFixed(4)}</td>
              <td>{(data.Valute[item].Value / CNY).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => {setView(!view)}}>{view ? 'Скрыть' : 'Показать всё'}</button>
      </div>
    </>
  );
}
