declare module 'officegen' {
  interface Slide {
    data?: Array<{
      options?: {
        text?: string;
      };
    }>;
  }

  interface OfficeGenInstance {
    on(event: 'finalize', callback: () => void): void;
    on(event: 'error', callback: (err: Error) => void): void;
    getSlides(): Slide[];
  }
  
  function officegen(type: 'pptx'): OfficeGenInstance;
  export = officegen;
} 