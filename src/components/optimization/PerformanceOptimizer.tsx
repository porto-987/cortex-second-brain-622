
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, Zap } from 'lucide-react';

interface PerformanceStats {
  loadTime: number;
  memoryUsage: number;
  interactions: number;
  slowOperations: number;
}

interface PerformanceReport {
  vitals: {
    loadComplete?: number;
    memoryUsage?: {
      used: number;
    };
    recentMetrics?: Array<{
      category: string;
    }>;
  };
  slowOperations?: Array<unknown>;
}

export function PerformanceOptimizer({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<PerformanceStats>({
    loadTime: 0,
    memoryUsage: 0,
    interactions: 0,
    slowOperations: 0
  });
  
  const [showAlert, setShowAlert] = useState(false);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  const updateStats = useCallback(() => {
    const now = performance.now();
    
    // Update every 30 seconds instead of continuous polling
    if (now - lastUpdateRef.current < 30000) {
      animationFrameRef.current = requestAnimationFrame(updateStats);
      return;
    }
    
    lastUpdateRef.current = now;
    
    try {
      const report = performanceMonitor.getPerformanceReport() as PerformanceReport;
      const memoryInfo = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
      
      const newStats = {
        loadTime: report.vitals.loadComplete || performance.now(),
        memoryUsage: report.vitals.memoryUsage?.used || memoryInfo?.usedJSHeapSize || 0,
        interactions: report.vitals.recentMetrics?.filter((m) => m.category === 'interaction').length || 0,
        slowOperations: report.slowOperations?.length || 0
      };
      
      setStats(newStats);
      
      // Show alert if performance is degraded
      if (newStats.slowOperations > 5 || newStats.memoryUsage > 50000000) {
        setShowAlert(true);
      }
    } catch (error) {
      // Silently handle errors in performance monitoring
    }
    
    animationFrameRef.current = requestAnimationFrame(updateStats);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateStats);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateStats]);

  const handleAlertClose = useCallback(() => {
    setShowAlert(false);
  }, []);

  return (
    <>
      {showAlert && (
        <Alert className="fixed top-16 right-4 z-[70] w-80 border-yellow-500 bg-yellow-50">
          <Activity className="w-4 h-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Performance dégradée détectée. Optimisation en cours...
            <button 
              onClick={handleAlertClose}
              className="ml-2 text-sm underline hover:no-underline"
            >
              OK
            </button>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Performance Monitor */}
      <div className="fixed bottom-16 right-4 z-[60]">
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-xs text-gray-600">
            {stats.interactions} interactions
          </span>
        </div>
      </div>
      
      {children}
    </>
  );
}
