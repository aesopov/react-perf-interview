import { useState, useEffect } from 'react';
import { FPSCounter } from './components/FPSCounter';
import { StockItem } from './components/StockItem';
import { generateMockData, type StockData } from './utils/mockData';
import { LIST_ITEM_COUNT } from './config';
import './App.css';

const initialStocks = generateMockData();

function App() {
  const [stocks, setStocks] = useState<StockData[]>(initialStocks);

  useEffect(() => {
    const priceUpdateInterval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const change = (Math.random() - 0.5) * 5;
          const newPrice = Math.max(1, stock.price + change);

          return {
            ...stock,
            price: Math.round(newPrice * 100) / 100,
            dayHigh: Math.max(stock.dayHigh, newPrice),
            dayLow: Math.min(stock.dayLow, newPrice),
          };
        })
      );
    }, 100);

    return () => {
      clearInterval(priceUpdateInterval);
    };
  }, []);

  return (
    <div className="app">
      <FPSCounter />

      <div className="app-content">
        <div className="app-header">
          <h1>Stock Market Performance Challenge</h1>
          <p className="subtitle">
            Live tracking {LIST_ITEM_COUNT.toLocaleString()} stocks - Optimize for smooth updates!
          </p>
        </div>

        <div className="list-container">
          {stocks.map((stock) => (
            <StockItem
              key={stock.id}
              id={stock.id}
              symbol={stock.symbol}
              company={stock.company}
              sector={stock.sector}
              exchange={stock.exchange}
              price={stock.price}
              openPrice={stock.openPrice}
              dayHigh={stock.dayHigh}
              dayLow={stock.dayLow}
              volume={stock.volume}
              marketCap={stock.marketCap}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
