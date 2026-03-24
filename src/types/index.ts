export interface FileWithContent {
  path: string;
  content: string;
  /** Size of the content in bytes (approximation using string length) */
  size?: number;
}

declare global {
  interface Window {
    webkitdirectory: string;
  }
}

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
} 