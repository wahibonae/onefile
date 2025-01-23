export interface FileWithContent {
  path: string;
  content: string;
}

// Add webkitdirectory type declaration
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
} 