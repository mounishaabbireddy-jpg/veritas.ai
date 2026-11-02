// ==============================================================================
// VERITAS AI - Drag-and-Drop File Upload Zone & Preset Samples
// ==============================================================================

import React, { useRef } from 'react';
import { UploadCloud, FileImage, Film, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { SupportedMediaType } from '../../types/detection';
import { ALLOWED_EXTENSIONS } from '../../services/api';

interface DropzoneProps {
  mediaType: SupportedMediaType;
  isDragging: boolean;
  error: string | null;
  onFileSelect: (file: File) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onLoadSample: (type: 'fake' | 'real') => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  mediaType,
  isDragging,
  error,
  onFileSelect,
  onDrop,
  onDragOver,
  onDragLeave,
  onLoadSample,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptString = mediaType === 'image' 
    ? '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp' 
    : '.mp4,.mov,.webm,video/mp4,video/quicktime,video/webm';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Interactive Drop Area */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-veritas-cyan bg-veritas-cyan/10 shadow-2xl shadow-veritas-cyan/20 scale-[1.01]'
            : 'border-slate-800 hover:border-veritas-cyan/50 bg-slate-900/40 hover:bg-slate-900/70'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptString}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-veritas-cyan/10 border border-veritas-cyan/30 flex items-center justify-center text-veritas-cyan shadow-lg shadow-veritas-cyan/10 group-hover:scale-110 transition-transform">
            {mediaType === 'image' ? (
              <FileImage className="w-8 h-8" />
            ) : (
              <Film className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold text-white">
              Drag & Drop {mediaType === 'image' ? 'Image' : 'Video'} or <span className="text-veritas-cyan underline decoration-veritas-cyan/40">Browse Files</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Supported: {ALLOWED_EXTENSIONS.join(', ').toUpperCase()} &bull; Max 50MB
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-[11px] font-mono text-slate-300 border border-slate-700">
            <UploadCloud className="w-3.5 h-3.5 text-veritas-cyan" /> Secure Client-Side Sandbox Verification
          </div>
        </div>
      </div>

      {/* Error alert if any */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Preset Test Samples for instant evaluation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-veritas-cyan" /> Test with forensic presets:
        </span>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLoadSample('fake');
            }}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
          >
            Load Deepfake Sample (Synthetic)
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLoadSample('real');
            }}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3 h-3" /> Load Certified Authentic
          </button>
        </div>
      </div>
    </div>
  );
};

