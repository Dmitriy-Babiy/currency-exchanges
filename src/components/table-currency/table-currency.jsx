import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './table-currency.module.scss';

export default function TableCurrency() {
  const tableHeader = [
    { name: 'Номер строки', sortName: '' },
    { name: 'Код валюты', sortName: 'NumCode' },
    { name: 'Название валюты', sortName: 'CharCode' },
    { name: 'Курс к рублю', sortName: 'Value' },
    { name: 'Курс к доллару', sortName: 'Value' },
    { name: 'Курс к евро', sortName: 'Value' },
    { name: 'Курс к Юаню', sortName: 'Value' },
  ];

  const data = useSelector((state) => state.currency.currencyData);

  const USD = data.Valute['USD'].Value;
  const EUR = data.Valute['EUR'].Value;
  const CNY = data.Valute['CNY'].Value;
  
  const [dataValute, setDataValute] = useState(Object.values(data.Valute));
  const [view, setView] = useState(false);
  const [directionSort, setDirectionSort] = useState(true)

  function sortData(sortName) {
    const copyData = dataValute.concat();
    let sortData;
    if (sortName === '') {return}
    if (directionSort) {
      sortData = copyData.sort((a, b) => {
        return a[sortName] > b[sortName] ? 1 : -1;
      });
    } else {
      sortData = copyData.sort((a, b) => {
        return a[sortName] < b[sortName] ? 1 : -1;
      });
    }
    setDirectionSort(!directionSort)
    setDataValute(sortData);
  }

  return (
    <>
      <table>
        <caption>Курсы валют</caption>
        <thead>
          <tr>
            {tableHeader.map((item, index) => (
              <th onClick={() => {sortData(item.sortName)}} key={index}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(view ? dataValute : dataValute.slice(0, 5)).map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.NumCode}</td>
              <td>{item.CharCode}</td>
              <td>{item.Value.toFixed(4)}</td>
              <td>{(item.Value / USD).toFixed(4)}</td>
              <td>{(item.Value / EUR).toFixed(4)}</td>
              <td>{(item.Value / CNY).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => {
            setView(!view);
          }}
        >
          {view ? 'Скрыть' : 'Показать всё'}
        </button>
      </div>
    </>
  );
}
