import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { logger } from '../logger';

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    const currentTime = performance.now();
    
    if (lastRenderTime.current > 0) {
      const timeDiff = currentTime - lastRenderTime.current;
      if (timeDiff > 16) { // More than 16ms (60fps threshold)
        logger.debug(`Slow render detected in ${componentName}`, {
          renderTime: timeDiff,
          renderCount: renderCount.current
        });
      }
    }
    
    lastRenderTime.current = currentTime;
  });

  return { renderCount: renderCount.current };
}

// Memoization helper for complex objects
export function useDeepMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = useRef<T>();
  const depsRef = useRef<React.DependencyList>();

  const areDepsEqual = (oldDeps: React.DependencyList, newDeps: React.DependencyList) => {
    if (oldDeps.length !== newDeps.length) return false;
    return oldDeps.every((dep, index) => 
      JSON.stringify(dep) === JSON.stringify(newDeps[index])
    );
  };

  if (!ref.current || !depsRef.current || !areDepsEqual(depsRef.current, deps)) {
    ref.current = factory();
    depsRef.current = deps;
  }

  return ref.current;
}

// Debounced callback hook
export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
  deps: React.DependencyList
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, ...deps]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// Throttled callback hook
export function useThrottledCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  limit: number,
  deps: React.DependencyList
): T {
  const inThrottle = useRef(false);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle.current) {
        callback(...args);
        inThrottle.current = true;
        setTimeout(() => {
          inThrottle.current = false;
        }, limit);
      }
    },
    [callback, limit, ...deps]
  ) as T;

  return throttledCallback;
}

// Optimized state setter that batches updates
export function useOptimizedState<T>(
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState(initialValue);
  const batchedUpdates = useRef<Array<T | ((prev: T) => T)>>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const optimizedSetState = useCallback((value: T | ((prev: T) => T)) => {
    batchedUpdates.current.push(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      const updates = batchedUpdates.current;
      batchedUpdates.current = [];
      
      setState(prev => {
        let result = prev;
        for (const update of updates) {
          if (typeof update === 'function') {
            result = (update as (prev: T) => T)(result);
          } else {
            result = update;
          }
        }
        return result;
      });
    }, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [state, optimizedSetState];
}

// Virtual scrolling utilities
export interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function useVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions
) {
  const { itemHeight, containerHeight, overscan = 5 } = options;
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length - 1
    );

    const visibleStart = Math.max(0, startIndex - overscan);
    const visibleEnd = Math.min(items.length - 1, endIndex + overscan);

    return {
      startIndex: visibleStart,
      endIndex: visibleEnd,
      items: items.slice(visibleStart, visibleEnd + 1),
      totalHeight: items.length * itemHeight,
      offsetY: visibleStart * itemHeight
    };
  }, [items, scrollTop, itemHeight, containerHeight, overscan]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return { visibleItems, handleScroll };
}

// Image lazy loading hook
export function useLazyImage(src: string) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
          };
          img.onerror = () => {
            setError('Failed to load image');
          };
          img.src = src;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return { imageSrc, isLoaded, error, imgRef };
}

// Memory leak prevention utilities
export function useUnmountEffect(effect: () => void) {
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    return () => {
      effectRef.current();
    };
  }, []);
}

// Bundle size optimization - code splitting helpers
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return React.lazy(importFunc);
}