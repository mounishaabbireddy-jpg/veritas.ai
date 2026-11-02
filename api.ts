// ==============================================================================
// VERITAS AI - API Gateway & Detection Client Service
// ==============================================================================

import { DetectionResult, SupportedMediaType, UploadFileValidation } from '../types/detection';
import { ForensicEngine } from './forensicEngine';

const API_BASE_URL = import.meta.env.VITE_VERITAS_API_URL || '';
const MAX_SIZE_MB = Number(import.meta.env.VITE_MAX_FILE_SIZE_MB) || 50;

export const SUPPORTED_FORMATS: Record<SupportedMediaType, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/webp'],
  video: ['video/mp4', 'video/quicktime', 'video/webm']
};

export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov', '.webm'];

export class VeritasApiService {
  /**
   * Validates selected file format and size limits
   */
  static validateFile(file: File, expectedType?: SupportedMediaType): UploadFileValidation {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        isValid: false,
        error: `Unsupported format: ${file.name}. Allowed formats: JPG, JPEG, PNG, WEBP, MP4, MOV, WEBM.`
      };
    }

    if (expectedType) {
      const allowedMimes = SUPPORTED_FORMATS[expectedType];
      const isMimeValid = allowedMimes.some(mime => file.type.toLowerCase().includes(mime.split('/')[1]));
      if (!isMimeValid && file.type) {
        return {
          isValid: false,
          error: `File type mismatch: expected ${expectedType.toUpperCase()} file.`
        };
      }
    }

    const maxBytes = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      return {
        isValid: false,
        error: `File exceeds maximum limit of ${MAX_SIZE_MB}MB (${(file.size / (1024 * 1024)).toFixed(1)}MB).`
      };
    }

    return { isValid: true };
  }

  /**
   * Submits media file for detection analysis
   * Contacts production endpoint if configured, else returns simulated demo audit.
   */
  static async analyzeMedia(
    file: File,
    mediaType: SupportedMediaType,
    onProgress?: (stage: string, percent: number) => void
  ): Promise<DetectionResult> {
    const hash = await ForensicEngine.computeSHA256(file);
    const auditId = ForensicEngine.generateAuditId();
    const formattedSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    // Check if live API is defined
    if (API_BASE_URL && API_BASE_URL.startsWith('http')) {
      try {
        if (onProgress) onProgress('Transmitting encrypted payload to VERITAS Gateway...', 25);
        const formData = new FormData();
        formData.append('media', file);
        formData.append('hash', hash);

        const response = await fetch(`${API_BASE_URL}/detect/${mediaType}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const remoteData = await response.json();
          if (onProgress) onProgress('Analysis finalized by Neural Core', 100);
          return {
            ...remoteData,
            auditId,
            mediaHash: hash,
            filename: file.name,
            mediaType,
            fileSizeFormatted: formattedSize,
            isDemoMode: false,
            timestamp: new Date().toUTCString(),
          };
        }
      } catch (err) {
        console.warn('Backend API connection failed, continuing in Demo Mode:', err);
      }
    }

    // Client-Side Simulated Neural Analysis (Demo Mode)
    // Run multi-phase simulated progress sequence
    if (onProgress) {
      onProgress('Stage 1/4: Preprocessing & Color-Space Normalization', 20);
      await this.sleep(400);
      onProgress('Stage 2/4: Error Level Analysis & Compression Residuals', 50);
      await this.sleep(500);
      onProgress('Stage 3/4: Vision Transformer & Biometric Landmark Verification', 80);
      await this.sleep(400);
      onProgress('Stage 4/4: Synthesizing Multimodal Authenticity Matrix', 95);
      await this.sleep(300);
    }

    // Deterministic simulation based on file characteristics
    const isSyntheticLikely = file.name.toLowerCase().includes('fake') || 
                              file.name.toLowerCase().includes('deep') || 
                              file.name.toLowerCase().includes('ai') || 
                              file.name.toLowerCase().includes('synth') ||
                              (file.size % 2 === 0);

    const confidence = isSyntheticLikely 
      ? Math.floor(88 + Math.random() * 11) 
      : Math.floor(12 + Math.random() * 16);

    const assessment = isSyntheticLikely ? 'SYNTHETIC' : 'GENUINE';

    return {
      auditId,
      mediaHash: hash,
      filename: file.name,
      mediaType,
      fileSizeFormatted: formattedSize,
      timestamp: new Date().toUTCString(),
      confidenceScore: confidence,
      assessment,
      isDemoMode: true,
      modelBackbone: 'ResNet-18 Multi-Scale CNN + ViT-B/16 (Demo Simulator)',
      forensics: {
        elaScore: isSyntheticLikely ? Math.floor(74 + Math.random() * 20) : Math.floor(12 + Math.random() * 14),
        spectralAnomaly: isSyntheticLikely ? Math.floor(82 + Math.random() * 14) : Math.floor(15 + Math.random() * 12),
        facialSymmetry: isSyntheticLikely ? Math.floor(45 + Math.random() * 20) : Math.floor(91 + Math.random() * 8),
        boundaryWarping: isSyntheticLikely ? Math.floor(78 + Math.random() * 18) : Math.floor(8 + Math.random() * 10),
        temporalConsistency: mediaType === 'video' ? (isSyntheticLikely ? 48 : 94) : undefined,
        audioSyncScore: mediaType === 'video' ? (isSyntheticLikely ? 38 : 92) : undefined,
      },
      signaturesDetected: isSyntheticLikely 
        ? [
            'High-frequency checkerboard artifacts consistent with StyleGAN/Diffusion',
            'Unnatural boundary gradient transition along facial perimeter',
            'Compression discrepancy between subject and ambient background'
          ]
        : [
            'Continuous PRNU sensor noise pattern verified across sensor grid',
            'Consistent Bayer CFA interpolation pattern',
            'Natural eye corneal micro-reflection symmetry verified'
          ],
      explanation: isSyntheticLikely 
        ? 'Neural model flagged significant anomalous frequency variance and edge blending artifacts consistent with synthetic generation.'
        : 'Media exhibits organic physical lens dispersion and sensor noise coherence. No synthetic generation patterns identified.'
    };
  }

  private static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

