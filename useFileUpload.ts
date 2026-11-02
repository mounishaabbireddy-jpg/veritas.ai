// ==============================================================================
// VERITAS AI - File Upload Custom Hook
// ==============================================================================

import { useState, useCallback } from 'react';
import { SupportedMediaType } from '../types/detection';
import { VeritasApiService } from '../services/api';

export function useFileUpload(mediaType: SupportedMediaType) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleSelectFile = useCallback((selectedFile: File) => {
    setError(null);
    const validation = VeritasApiService.validateFile(selectedFile, mediaType);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file selected');
      return false;
    }

    // Revoke previous preview URL to avoid memory leak
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreviewUrl(objectUrl);
    return true;
  }, [mediaType, previewUrl]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSelectFile(e.dataTransfer.files[0]);
    }
  }, [handleSelectFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }, [previewUrl]);

  return {
    file,
    previewUrl,
    error,
    isDragging,
    handleSelectFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeFile,
    setError
  };
}

