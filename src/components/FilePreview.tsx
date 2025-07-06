import React, { useState } from 'react';
import { Eye, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileWithContent } from '@/types';
import { cn } from "@/lib/utils";

interface FilePreviewProps {
  file: FileWithContent;
}

export function FilePreview({ file }: FilePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileName = file.path.split('/').pop() || file.path;

  const getLineCount = (content: string): number => {
    return content.split('\n').length;
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-primary hover:text-primary/80 hover:bg-primary/5 h-8 w-8 p-0"
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="p-2 rounded-md bg-primary/10 flex-shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-lg font-semibold text-card-foreground truncate">
                  {fileName}
                </DialogTitle>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="truncate max-w-md">{file.path}</span>
                  <span>•</span>
                  <span>{getLineCount(file.content)} lines</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <div className="p-6 overflow-auto max-h-[calc(90vh-160px)]">
              <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
                <div className="p-4">
                  <pre className={cn(
                    "text-sm font-mono whitespace-pre-wrap text-foreground leading-relaxed",
                    "selection:bg-primary/20 selection:text-primary-foreground"
                  )}>
                    {file.content}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}