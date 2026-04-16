import axios from 'axios';

const API_URL = 'https://api.currencyapi.com/v3/latest';

export const getMultipleRates = async (currencies) => {
    try {
        const response = await axios.get('https://api.allorigins.win/raw', {
            params: {
                url: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/rub.json`
            }
        });
        
        console.log('Ответ от API:', response.data);
        
        if (response.data && response.data.rub) {
            const rates = {};
            currencies.forEach(currency => {
                const currencyLower = currency.toLowerCase();
                if (response.data.rub[currencyLower]) {
                    const rate = 1 / response.data.rub[currencyLower];
                    rates[currency] = Math.round(rate * 100) / 100;
                }
            });
            return rates;
        }
        throw new Error('Не удалось получить курсы');
    } catch (error) {
        console.error('Ошибка загрузки курсов:', error);
        throw error;
    }
};