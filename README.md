# React Performance Interview Challenge

A hands-on coding challenge for Senior React positions focused on identifying and fixing performance issues.

## 🎯 Challenge Overview

This React application intentionally suffers from severe performance problems. Your task is to optimize it to achieve smooth 60 FPS scrolling.

**What you'll see:**
- 🔴 Red/Yellow FPS counter at the top (< 50 FPS)
- 1,000 items in a scrollable list
- Sluggish scrolling and interactions
- High CPU usage

**Your goal:**
- 🟢 Green FPS counter (>= 50 FPS)
- Smooth scrolling experience
- Identify all performance bottlenecks

## 🚀 Getting Started

```bash
cd react-perf-interview
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📋 Rules

1. ✅ **DO** modify any code except the FPS counter component
2. ✅ **DO** install and use additional libraries (virtualization, etc.)
3. ✅ **DO** refactor components and logic
4. ❌ **DO NOT** modify `src/components/FPSCounter.tsx` or `FPSCounter.css`
5. ❌ **DO NOT** reduce `LIST_ITEM_COUNT` below 1,000 (that's cheating!)

## 🔍 What We're Evaluating

- **Performance knowledge:** Can you identify performance bottlenecks?
- **React expertise:** Do you know when to use `memo`, `useMemo`, `useCallback`?
- **Practical solutions:** Can you implement virtualization properly?
- **Trade-off awareness:** Do you understand the costs of your optimizations?
- **Measurement:** Do you validate improvements with profiling tools?

## 📚 Resources

See [OPTIMIZATION_GUIDE.md](./OPTIMIZATION_GUIDE.md) for hints and solutions (for interviewers/candidates who get stuck).

## 🛠️ Built With

- React 18
- TypeScript
- Vite
- CSS3

## 📊 Expected Performance

| State | FPS | Status |
|-------|-----|--------|
| Initial (unoptimized) | 5-15 | 🔴 Red |
| Basic optimizations | 20-40 | 🟡 Yellow |
| Fully optimized | 50-60 | 🟢 Green |

## 💡 Interview Format

**For candidates:**
1. Review the app (5 min)
2. Identify issues (10 min)
3. Implement fixes (30-40 min)
4. Explain your approach (10 min)

**Time:** 60 minutes total

## 🎓 Learning Outcomes

Even if you're not interviewing, this challenge teaches:
- React rendering optimization
- Virtual scrolling implementation
- Memoization strategies
- Performance profiling
- Real-world performance debugging

## 📝 Configuration

Adjust difficulty in `src/config.ts`:

```typescript
export const LIST_ITEM_COUNT = 1000; // Number of items
export const EXPENSIVE_COMPUTATION_ITERATIONS = 10000; // CPU load per item
```

---

**Good luck!** 🚀
