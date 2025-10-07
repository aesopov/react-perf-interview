import { LIST_ITEM_COUNT } from '../config';

const sectors = ['Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer'];
const companies = [
  'TechCorp',
  'GlobalBank',
  'MediHealth',
  'PowerGrid',
  'RetailMax',
  'CloudNet',
  'InvestPro',
  'BioPharm',
  'SolarWave',
  'ShopEase',
];

const exchanges = ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKEX'];

export interface StockData {
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

export const generateMockData = (): StockData[] => {
  const stocks: StockData[] = [];

  for (let i = 0; i < LIST_ITEM_COUNT; i++) {
    const company = companies[i % companies.length];
    const basePrice = Math.round((Math.random() * 500 + 10) * 100) / 100;
    const openPrice = Math.round((basePrice + (Math.random() - 0.5) * 20) * 100) / 100;

    stocks.push({
      id: i + 1,
      symbol: `${company.substring(0, 3).toUpperCase()}${i}`,
      company: `${company} Inc.`,
      sector: sectors[i % sectors.length],
      exchange: exchanges[i % exchanges.length],
      price: basePrice,
      openPrice: openPrice,
      dayHigh: Math.round((basePrice + Math.random() * 15) * 100) / 100,
      dayLow: Math.round((basePrice - Math.random() * 15) * 100) / 100,
      volume: Math.floor(Math.random() * 10000000) + 100000,
      marketCap: Math.floor(Math.random() * 1000000000) + 10000000,
    });
  }

  return stocks;
};
