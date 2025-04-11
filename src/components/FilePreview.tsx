import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CodePreview, getLanguageFromFileName } from './CodePreview';
import { FileWithContent } from '@/types';

interface FilePreviewProps {
  file: FileWithContent;
}

export function FilePreview({ file }: FilePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-primary hover:text-primary/80 hover:bg-primary/10"
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader className="pr-8">
            <DialogTitle className="truncate max-w-full">{file.path}</DialogTitle>
            <DialogDescription>
              File preview with syntax highlighting
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-auto flex-grow mt-2">
            <CodePreview 
              code={file.content} 
              language={getLanguageFromFileName(file.path)}
              fileName={file.path}
            />
          </div>
          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 