import { useState } from 'react';
import './StockItem.css';

interface StockItemProps {
  id: number;
  symbol: string;
  company: string;
  sector: string;
  exchange: string;
  price: number;
  openPrice: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap: number;
}

export const StockItem = ({
  id,
  symbol,
  company,
  sector,
  exchange,
  price,
  openPrice,
  dayHigh,
  dayLow,
  volume,
  marketCap,
}: StockItemProps) => {
  const [watchlisted, setWatchlisted] = useState(false);

  const priceChange = price - openPrice;
  const changePercent = (priceChange / openPrice) * 100;
  const isPositive = priceChange >= 0;

  const formatVolume = (vol: number): string => {
    if (vol >= 1000000) return `${(vol / 1000000).toFixed(2)}M`;
    if (vol >= 1000) return `${(vol / 1000).toFixed(2)}K`;
    return vol.toString();
  };

  const formatMarketCap = (cap: number): string => {
    if (cap >= 1000000000) return `$${(cap / 1000000000).toFixed(2)}B`;
    if (cap >= 1000000) return `$${(cap / 1000000).toFixed(2)}M`;
    return `$${cap.toLocaleString()}`;
  };

  return (
    <div className="stock-item">
      <div className="stock-header">
        <div className="stock-title">
          <h3 className="stock-symbol">{symbol}</h3>
          <span className="stock-company">{company}</span>
        </div>
        <div className="stock-badges">
          <span className={`sector-badge ${sector.toLowerCase()}`}>{sector}</span>
          <span className="exchange-badge">{exchange}</span>
        </div>
      </div>

      <div className="stock-price-section">
        <div className="current-price">${price.toFixed(2)}</div>
        <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '▲' : '▼'} ${Math.abs(priceChange).toFixed(2)} ({changePercent.toFixed(2)}%)
        </div>
      </div>

      <div className="stock-stats">
        <div className="stat-item">
          <span className="stat-label">Open</span>
          <span className="stat-value">${openPrice.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">High</span>
          <span className="stat-value">${dayHigh.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Low</span>
          <span className="stat-value">${dayLow.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Volume</span>
          <span className="stat-value">{formatVolume(volume)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">{formatMarketCap(marketCap)}</span>
        </div>
      </div>

      <div className="stock-actions">
        <button
          className={`btn-watchlist ${watchlisted ? 'active' : ''}`}
          onClick={() => {
            setWatchlisted(!watchlisted);
            console.log(`Watchlist toggled for ${symbol}`);
          }}
        >
          {watchlisted ? '★' : '☆'} Watchlist
        </button>

        <button
          className="btn-trade"
          onClick={() => {
            alert(`Trade executed for ${symbol}\nPrice: $${price.toFixed(2)}`);
          }}
        >
          Trade
        </button>
      </div>
    </div>
  );
};
