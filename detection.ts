// ==============================================================================
// VERITAS AI - TypeScript Type Definitions
// ==============================================================================

export type SupportedMediaType = 'image' | 'video';

export type AssessmentResult = 'GENUINE' | 'SYNTHETIC' | 'SUSPICIOUS' | 'INCONCLUSIVE';

export type AnalysisStage = 
  | 'idle' 
  | 'uploading' 
  | 'preprocessing' 
  | 'frequency_analysis' 
  | 'biometric_extraction' 
  | 'neural_inference' 
  | 'completed' 
  | 'error';

export interface ForensicMetrics {
  elaScore: number;                 // Error Level Analysis compression delta
  spectralAnomaly: number;          // 2D FFT / High-frequency spatial noise
  facialSymmetry: number;           // Biometric landmark deviation
  boundaryWarping: number;          // Edge blending / seam blur
  temporalConsistency?: number;     // Frame-to-frame flicker (for video)
  audioSyncScore?: number;          // Lip-sync / formant gap
}

export interface DetectionResult {
  auditId: string;
  mediaHash: string;
  filename: string;
  mediaType: SupportedMediaType;
  fileSizeFormatted: string;
  timestamp: string;
  confidenceScore: number;         // 0 - 100
  assessment: AssessmentResult;
  isDemoMode: boolean;             // Explicit flag for Demo vs Genuine API
  forensics: ForensicMetrics;
  modelBackbone: string;
  signaturesDetected: string[];
  explanation: string;
}

export interface UploadFileValidation {
  isValid: boolean;
  error?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'enterprise';
}

