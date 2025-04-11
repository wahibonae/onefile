import { motion } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileWithContent } from '@/types'
import toast from 'react-hot-toast'
import { FilePreview } from './FilePreview'
import { useState } from 'react'

interface FileListProps {
  files: FileWithContent[];
  onRemoveFile: (index: number) => void;
}

export function FileList({ files, onRemoveFile }: FileListProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (files.length === 0) return null;
  
  // Calculate total files size for the summary
  const totalFiles = files.length;
  const fileTypes = new Set(files.map(file => file.path.split('.').pop()?.toLowerCase() || ''));
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium">Uploaded Files ({totalFiles})</label>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 w-6 p-0 rounded-full"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {isExpanded ? (
        <ScrollArea className={`rounded-md border p-4 ${files.length > 5 ? 'h-[200px]' : 'max-h-fit'}`}>
          <div className="space-y-2">
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-[1fr_80px] items-center p-2 rounded-md bg-secondary/50"
              >
                <span className="text-sm text-muted-foreground truncate pr-2">{file.path}</span>
                <div className="flex items-center gap-1 justify-end">
                  <FilePreview file={file} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onRemoveFile(index)
                      toast.success('File removed')
                    }}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="rounded-md border p-3 bg-secondary/30">
          <p className="text-sm text-muted-foreground">
            {totalFiles} file{totalFiles !== 1 ? 's' : ''} uploaded 
            {fileTypes.size > 0 ? ` (${Array.from(fileTypes).join(', ')})` : ''}
          </p>
        </div>
      )}
    </div>
  )
} 