import React, { useState, useEffect, useCallback } from 'react';
import { getMultipleRates } from '../../shared/api/currencyApi';
import './ConverterWidget.css';

const CURRENCIES = ['USD', 'EUR', 'CAD', 'CNY', 'CHF', 'SGD'];

export const ConverterWidget = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const freshRates = await getMultipleRates(CURRENCIES);
      setRates(freshRates);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Ошибка при обновлении курсов:', err);
      setError('Не удалось загрузить актуальные курсы. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    const intervalId = setInterval(fetchRates, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [fetchRates]);

  const getCurrencyName = (code) => {
    const names = {
      USD: 'Доллар США',
      EUR: 'Евро',
      CAD: 'Канадский доллар',
      CNY: 'Китайский юань',
      CHF: 'Швейцарский франк',
      SGD: 'Сингапурский доллар',
    };
    return names[code] || code;
  };

  return (
    <div className="converter">
      <h1>4. CONVERTER CURRENCY </h1>
      <div className="converter__container">
        <div className="converter__header">
          <p className="converter__base">Базовая валюта: RUB (Российский рубль)</p>
          <p className="converter__update">
            Последнее обновление: {lastUpdate || '—'}
          </p>
          <button className="converter__refresh" onClick={fetchRates} disabled={loading}>
            {loading ? 'Обновление...' : 'Обновить'}
          </button>
        </div>

        {error && <div className="converter__error">{error}</div>}

        {loading && Object.keys(rates).length === 0 ? (
          <div className="converter__loading">Загрузка курсов валют...</div>
        ) : (
          <div className="converter__grid">
            {CURRENCIES.map((currency) => (
              <div key={currency} className="converter__card">
                <div className="converter__currency-code">{currency}</div>
                <div className="converter__currency-name">
                  {getCurrencyName(currency)}
                </div>
                <div className="converter__rate">
                  {rates[currency] ? `${rates[currency]} ₽` : '—'}
                </div>
                <div className="converter__relation">
                  1 {currency} = {rates[currency] ? `${rates[currency]} ₽` : '—'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};