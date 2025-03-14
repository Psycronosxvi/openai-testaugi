import { User } from './auth';

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}

export interface FileUploadLimits {
  images: number;    // in bytes
  documents: number; // in bytes
  audio: number;     // in bytes
  video: number;     // in bytes
  datasets: number;  // in bytes
}

// File type definitions
export const FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  AUDIO: ['audio/mpeg', 'audio/wav'],
  VIDEO: ['video/mp4', 'video/quicktime'],
  DATASETS: ['text/csv', 'application/json', 'application/xml']
} as const;

// Upload limits based on account type
export const UPLOAD_LIMITS: Record<'free' | 'premium', FileUploadLimits> = {
  free: {
    images: 10 * 1024 * 1024,      // 10MB
    documents: 50 * 1024 * 1024,   // 50MB
    audio: 100 * 1024 * 1024,      // 100MB
    video: 500 * 1024 * 1024,      // 500MB
    datasets: 100 * 1024 * 1024    // 100MB
  },
  premium: {
    images: 50 * 1024 * 1024,      // 50MB
    documents: 200 * 1024 * 1024,  // 200MB
    audio: 500 * 1024 * 1024,      // 500MB
    video: 2048 * 1024 * 1024,     // 2GB
    datasets: 1024 * 1024 * 1024   // 1GB
  }
};

export function getFileType(mimeType: string): keyof FileUploadLimits | null {
  if (FILE_TYPES.IMAGES.includes(mimeType)) return 'images';
  if (FILE_TYPES.DOCUMENTS.includes(mimeType)) return 'documents';
  if (FILE_TYPES.AUDIO.includes(mimeType)) return 'audio';
  if (FILE_TYPES.VIDEO.includes(mimeType)) return 'video';
  if (FILE_TYPES.DATASETS.includes(mimeType)) return 'datasets';
  return null;
}

export function validateFileUpload(file: File, user: User | null): ValidationResult {
  const fileType = getFileType(file.type);
  
  if (!fileType) {
    return {
      valid: false,
      error: 'Unsupported file type'
    };
  }

  const limits = UPLOAD_LIMITS[user?.plan || 'free'];
  const maxSize = limits[fileType];

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds the ${user?.plan || 'free'} plan limit of ${formatBytes(maxSize)}`
    };
  }

  return { valid: true, error: null };
}

function formatBytes(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}