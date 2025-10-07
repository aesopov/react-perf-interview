# React Performance Optimization Guide

## Interview Challenge Overview

This is a live stock market tracker with real-time price updates. The app displays 500 stocks with prices updating every 100ms, simulating a real trading platform.

**Target:** Achieve 50+ FPS (green indicator) consistently
**Current State:** Likely experiencing poor FPS due to multiple performance issues

---

## Performance Issues Present

### 1. **Missing React.memo on StockItem**
**Problem:** Every stock component re-renders whenever ANY stock's price updates.

**Impact:**
- 500 stocks × 10 updates/second = 5,000+ renders per second
- All stocks re-render even if their props haven't changed
- Massive wasted CPU cycles

**Solution:**
Wrap `StockItem` with `React.memo`:

```tsx
export const StockItem = React.memo(({ id, symbol, ... }: StockItemProps) => {
  // component code
});
```

**Expected Improvement:** Prevents unnecessary re-renders, 3-5x FPS improvement

---

### 2. **No Memoization of Calculations**
**Problem:** Price change and percentage calculations run on every render for every stock.

**Impact:**
- Simple calculations multiplied by 500 stocks × 10 times/second
- Unnecessary computation blocking the main thread

**Solution:**
Use `useMemo` to cache calculated values:

```tsx
const priceChange = useMemo(() => price - openPrice, [price, openPrice]);
const changePercent = useMemo(() => (priceChange / openPrice) * 100, [priceChange, openPrice]);
const isPositive = useMemo(() => priceChange >= 0, [priceChange]);
```

**Expected Improvement:** 10-20% FPS boost

---

### 3. **Function Definitions Inside Component**
**Problem:** `formatVolume` and `formatMarketCap` are recreated on every render.

**Impact:**
- Memory churn from creating new function objects
- Prevents effective memoization

**Solution Option 1:** Move outside component:
```tsx
const formatVolume = (vol: number): string => {
  if (vol >= 1000000) return `${(vol / 1000000).toFixed(2)}M`;
  if (vol >= 1000) return `${(vol / 1000).toFixed(2)}K`;
  return vol.toString();
};

export const StockItem = ({ ... }) => {
  // use formatVolume
};
```

**Solution Option 2:** Use `useCallback`:
```tsx
const formatVolume = useCallback((vol: number): string => {
  if (vol >= 1000000) return `${(vol / 1000000).toFixed(2)}M`;
  if (vol >= 1000) return `${(vol / 1000).toFixed(2)}K`;
  return vol.toString();
}, []);
```

**Expected Improvement:** Minor, but cleaner code

---

### 4. **Inline Arrow Functions in onClick Handlers**
**Problem:** New function closures created on every render.

**Impact:**
- Memory pressure from creating closures
- Can prevent shallow comparison optimizations

**Solution:**
Use `useCallback`:

```tsx
const handleWatchlistToggle = useCallback(() => {
  setWatchlisted(!watchlisted);
  console.log(`Watchlist toggled for ${symbol}`);
}, [watchlisted, symbol]);

const handleTrade = useCallback(() => {
  alert(`Trade executed for ${symbol}\nPrice: $${price.toFixed(2)}`);
}, [symbol, price]);

// In JSX
<button onClick={handleWatchlistToggle}>
<button onClick={handleTrade}>
```

**Expected Improvement:** Enables better memoization, minor FPS gain

---

### 5. **No Virtualization**
**Problem:** All 500 stocks are rendered in the DOM at once, even though only ~5-8 are visible on screen.

**Impact:**
- 500 DOM nodes always in memory
- All 500 components update on every price change
- Excessive memory usage
- Slow scrolling

**Solution:**
Implement virtual scrolling using `react-window` or `react-virtualized`:

```bash
npm install react-window
```

```tsx
import { FixedSizeList } from 'react-window';

// In App.tsx
<FixedSizeList
  height={800}
  itemCount={stocks.length}
  itemSize={220}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <StockItem {...stocks[index]} />
    </div>
  )}
</FixedSizeList>
```

**Expected Improvement:** 10-20x faster, massive FPS boost ⭐⭐⭐⭐⭐

---

### 6. **Entire App Re-renders on Every Price Update**
**Problem:** State updates in `App` component cause full tree re-render.

**Impact:**
- Even with React.memo, context changes force re-renders
- Header and other components re-render unnecessarily

**Solution:**
Already using proper state updates with functional updates, but consider:

```tsx
// Move FPSCounter outside the re-rendering tree if possible
// Or ensure it's memoized
const MemoizedFPSCounter = React.memo(FPSCounter);
```

**Expected Improvement:** Minor

---

### 7. **Rapid Update Interval (100ms)**
**Problem:** Updates happen 10 times per second, which may be too aggressive.

**Impact:**
- Constant re-renders
- May be faster than necessary for visual updates

**Solution (if appropriate for use case):**
Reduce update frequency or batch updates:

```tsx
// Option 1: Slower updates
setInterval(() => { /* ... */ }, 500); // 2 updates/second

// Option 2: RequestAnimationFrame for visual updates
const updatePrices = () => {
  setStocks(/* ... */);
  requestAnimationFrame(updatePrices);
};
requestAnimationFrame(updatePrices);
```

**Expected Improvement:** Significant, but may not be desired for "real-time" feel

---

### 8. **Object Spread in State Updates**
**Problem:** Creating new objects for every stock on every update.

**Impact:**
- Memory allocation pressure
- Garbage collection overhead

**Solution:**
Already implemented well with functional state updates. Consider using `immer` for more complex scenarios:

```tsx
import { produce } from 'immer';

setStocks((prevStocks) =>
  produce(prevStocks, (draft) => {
    draft.forEach((stock) => {
      const change = (Math.random() - 0.5) * 5;
      const newPrice = Math.max(1, stock.price + change);
      stock.price = Math.round(newPrice * 100) / 100;
      stock.dayHigh = Math.max(stock.dayHigh, newPrice);
      stock.dayLow = Math.min(stock.dayLow, newPrice);
    });
  })
);
```

**Expected Improvement:** Minor, more readable code

---

## Optimization Priority (Recommended Order)

1. **Add React.memo to StockItem** ⭐⭐⭐⭐⭐ (biggest immediate impact)
2. **Implement virtualization** ⭐⭐⭐⭐⭐ (essential for scalability)
3. **Memoize calculations with useMemo** ⭐⭐⭐⭐
4. **Move helper functions outside component** ⭐⭐⭐
5. **Use useCallback for event handlers** ⭐⭐⭐
6. **Consider reducing update frequency** ⭐⭐

---

## Testing Your Optimizations

1. **Profile with React DevTools:**
   - Install React DevTools browser extension
   - Open Profiler tab
   - Record a session while prices update
   - Identify components with excessive renders

2. **Monitor FPS Counter:**
   - Note starting FPS (likely red/yellow)
   - Apply optimizations incrementally
   - Check FPS after each change
   - Target: consistent 50+ FPS (green)

3. **Use Chrome DevTools Performance:**
   - Record performance profile
   - Look for long tasks
   - Identify scripting bottlenecks

---

## Advanced Optimizations (Bonus)

### Web Workers for Price Updates
Move price calculation logic off the main thread:

```tsx
// priceWorker.ts
self.onmessage = (e) => {
  const stocks = e.data;
  const updated = stocks.map(stock => {
    const change = (Math.random() - 0.5) * 5;
    const newPrice = Math.max(1, stock.price + change);
    return {
      ...stock,
      price: Math.round(newPrice * 100) / 100,
      dayHigh: Math.max(stock.dayHigh, newPrice),
      dayLow: Math.min(stock.dayLow, newPrice),
    };
  });
  self.postMessage(updated);
};
```

### Throttle/Debounce Visual Updates
Use `requestAnimationFrame` to sync with browser paint:

```tsx
const rafRef = useRef<number>();

useEffect(() => {
  const updateLoop = () => {
    setStocks(/* update logic */);
    rafRef.current = requestAnimationFrame(updateLoop);
  };
  rafRef.current = requestAnimationFrame(updateLoop);

  return () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, []);
```

### CSS Containment
Add to `.stock-item` CSS:

```css
.stock-item {
  contain: layout style paint;
  content-visibility: auto;
}
```

---

## Expected Results After Optimization

| Optimization Level | FPS Range | Status |
|-------------------|-----------|--------|
| No optimizations | 5-20 FPS | 🔴 Red |
| React.memo only | 15-30 FPS | 🟡 Yellow |
| + useMemo | 20-35 FPS | 🟡 Yellow |
| + Virtualization | 50-60 FPS | 🟢 Green |
| All optimizations | 58-60 FPS | 🟢 Green ⭐ |

---

## Interview Tips

1. **Explain your thinking:** Describe the performance problem before fixing it
2. **Measure first:** Use profiling tools to identify actual bottlenecks
3. **Incremental changes:** Apply one optimization at a time and verify impact
4. **Discuss trade-offs:** Every optimization has costs (complexity, memory, etc.)
5. **Real-world context:** Consider whether 100ms updates are necessary
6. **Don't modify FPSCounter:** It's meant to remain unchanged

Good luck! 🚀
