import { useEffect, useRef, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './FPSCounter.css';

/**
 * FPS Counter Component
 * DO NOT MODIFY - This component should remain unchanged during the interview
 *
 * Displays real-time FPS with a visual gauge indicator
 * - Red background: < 20 FPS
 * - Yellow background: 20-49 FPS
 * - Green background: >= 50 FPS
 */
export const FPSCounter = () => {
  const [fps, setFps] = useState(60);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef(0);

  useEffect(() => {
    const measureFPS = () => {
      frameCountRef.current++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTimeRef.current;

      if (elapsed >= 1000) {
        const currentFPS = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFPS);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(measureFPS);
    };

    animationFrameRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const getBackgroundColor = () => {
    if (fps < 20) return '#ef4444';
    if (fps < 50) return '#eab308';
    return '#22c55e';
  };

  const getPathColor = () => {
    if (fps < 20) return '#dc2626';
    if (fps < 50) return '#ca8a04';
    return '#16a34a';
  };

  const getStatusText = () => {
    if (fps >= 50) return '✓ Optimal';
    if (fps >= 20) return '⚠ Reduced';
    return '✗ Poor';
  };

  return (
    <div className="fps-counter" style={{ backgroundColor: getBackgroundColor() }}>
      <div className="fps-gauge-container">
        <div className="fps-gauge">
          <CircularProgressbarWithChildren
            value={fps}
            maxValue={60}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: getPathColor(),
              trailColor: 'rgba(255, 255, 255, 0.3)',
              pathTransitionDuration: 0.3,
            })}
          >
            <div className="fps-value">
              <span className="fps-number">{fps}</span>
              <span className="fps-label">FPS</span>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="fps-status">{getStatusText()}</div>
      </div>
    </div>
  );
};
