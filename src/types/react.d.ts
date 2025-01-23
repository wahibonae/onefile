import 'react';

declare module 'react' {
  export interface DragEvent<T extends Element> extends MouseEvent<T> {
    dataTransfer: DataTransfer;
  }

  export interface ChangeEvent<T extends Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }

  export interface InputHTMLAttributes<T extends Element> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }

  export type RefObject<T> = {
    readonly current: T | null;
  }
} 