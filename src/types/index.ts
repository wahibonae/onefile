export interface FileWithContent {
  path: string;
  content: string;
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