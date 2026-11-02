// ==============================================================================
// VERITAS AI - Media Analysis Orchestrator Hook
// ==============================================================================

import { useState, useCallback } from 'react';
import { AnalysisStage, DetectionResult, SupportedMediaType } from '../types/detection';
import { VeritasApiService } from '../services/api';

export function useMediaAnalysis() {
  const [stage, setStage] = useState<AnalysisStage>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [currentStepText, setCurrentStepText] = useState<string>('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startAnalysis = useCallback(async (file: File, mediaType: SupportedMediaType) => {
    setStage('uploading');
    setProgress(5);
    setCurrentStepText('Securing encrypted file stream...');
    setError(null);
    setResult(null);

    try {
      const auditResult = await VeritasApiService.analyzeMedia(
        file,
        mediaType,
        (stepText, percent) => {
          setStage('neural_inference');
          setCurrentStepText(stepText);
          setProgress(percent);
        }
      );

      setProgress(100);
      setResult(auditResult);
      setStage('completed');
    } catch (err) {
      console.error('Detection analysis failed:', err);
      setError((err as Error).message || 'Analysis pipeline terminated unexpectedly');
      setStage('error');
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setStage('idle');
    setProgress(0);
    setCurrentStepText('');
    setResult(null);
    setError(null);
  }, []);

  return {
    stage,
    progress,
    currentStepText,
    result,
    error,
    startAnalysis,
    resetAnalysis
  };
}

