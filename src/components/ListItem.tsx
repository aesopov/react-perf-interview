import { useState } from 'react';
import { EXPENSIVE_COMPUTATION_ITERATIONS } from '../config';
import './ListItem.css';

interface ListItemProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  timestamp: number;
}

// Intentionally expensive computation
const expensiveCalculation = (value: number): number => {
  let result = value;
  for (let i = 0; i < EXPENSIVE_COMPUTATION_ITERATIONS; i++) {
    result = Math.sqrt(result + i) * Math.sin(i) + Math.cos(result);
  }
  return result;
};

// Expensive formatting function
const formatPrice = (price: number): string => {
  const computed = expensiveCalculation(price);
  return `$${price.toFixed(2)} (computed: ${computed.toFixed(2)})`;
};

// Another expensive operation
const calculateDiscount = (price: number, rating: number): number => {
  const factor = expensiveCalculation(rating);
  return (price * (factor % 20)) / 100;
};

export const ListItem = ({ id, title, description, category, price, rating, timestamp }: ListItemProps) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const formattedPrice = formatPrice(price);
  const discount = calculateDiscount(price, rating);
  const finalPrice = price - discount;

  // Generate stars
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        ★
      </span>
    );
  }

  // Format date
  const date = new Date(timestamp);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return (
    <div className="list-item">
      <div className="list-item-header">
        <h3 className="list-item-title">{title}</h3>
        <span className={`category-badge ${category.toLowerCase()}`}>{category}</span>
      </div>

      <p className="list-item-description">{description}</p>

      <div className="list-item-meta">
        <div className="rating">
          {stars}
          <span className="rating-value">{rating}/5</span>
        </div>
        <div className="timestamp">{formattedDate}</div>
      </div>

      <div className="list-item-pricing">
        <div className="price-info">
          <div className="original-price">{formattedPrice}</div>
          <div className="discount">Discount: ${discount.toFixed(2)}</div>
          <div className="final-price">Final: ${finalPrice.toFixed(2)}</div>
        </div>
      </div>

      <div className="list-item-actions">
        <button
          className={`btn-like ${liked ? 'liked' : ''}`}
          onClick={() => {
            setLiked(!liked);
            // More expensive computation on click
            const result = expensiveCalculation(Math.random() * 1000);
            console.log(`Like clicked for item ${id}, computed: ${result}`);
          }}
        >
          {liked ? '❤️' : '🤍'} Like
        </button>

        <button
          className="btn-counter"
          onClick={() => {
            setCount(count + 1);
            // Expensive operation on every click
            const result = expensiveCalculation(count);
            console.log(`Counter: ${count}, computed: ${result}`);
          }}
        >
          Counter: {count}
        </button>

        <button
          className="btn-action"
          onClick={() => {
            // Simulate some action with expensive computation
            const start = performance.now();
            const result = expensiveCalculation(price * rating);
            const end = performance.now();
            alert(`Action executed for "${title}"\nComputation took: ${(end - start).toFixed(2)}ms\nResult: ${result.toFixed(2)}`);
          }}
        >
          Details
        </button>
      </div>

      <div className="list-item-footer">
        <span className="item-id">ID: {id}</span>
      </div>
    </div>
  );
};
