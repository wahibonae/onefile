import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-tomorrow.css'; // You can choose a different theme

interface CodePreviewProps {
  code: string;
  language: string;
  fileName: string;
}

export function getLanguageFromFileName(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  const extensionMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'py': 'python',
    'java': 'java',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'md': 'markdown',
    'yaml': 'yaml',
    'yml': 'yaml',
    'sh': 'bash',
    'bash': 'bash',
    'sql': 'sql',
    'txt': 'text',
    // Add more mappings as needed
  };
  
  return extensionMap[extension] || 'text';
}

export function CodePreview({ code, language, fileName }: CodePreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Highlight all code elements when the component mounts or code changes
    Prism.highlightAll();
  }, [code, language, isExpanded]);

  // If no language is provided, try to detect it from the filename
  const detectedLanguage = language || getLanguageFromFileName(fileName);
  
  // Determine if code is long and needs truncation
  const lines = code.split('\n');
  const isLongCode = lines.length > 20;
  const displayCode = isLongCode && !isExpanded 
    ? lines.slice(0, 20).join('\n') + '\n// ... truncated ...' 
    : code;

  return (
    <div className="rounded-md overflow-hidden border border-border">
      <div className="bg-muted px-4 py-2 flex justify-between items-center border-b border-border">
        <span className="text-sm font-medium truncate max-w-[80%]">{fileName}</span>
        {isLongCode && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      <pre className={`p-4 overflow-auto ${isExpanded ? 'max-h-[500px]' : 'max-h-[300px]'}`}>
        <code className={`language-${detectedLanguage}`}>
          {displayCode}
        </code>
      </pre>
    </div>
  );
} 