import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileWithContent } from '@/types'
import toast from 'react-hot-toast'
import { FilePreview } from './FilePreview'
import { useState } from 'react'
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface FileListProps {
  files: FileWithContent[];
  onRemoveFile: (index: number) => void;
}

export function FileList({ files, onRemoveFile }: FileListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (files.length === 0) return null;
  
  // Calculate total files size for the summary
  const totalFiles = files.length;
  const fileTypes = new Set(files.map(file => file.path.split('.').pop()?.toLowerCase() || ''));
  const fileTypesArray = Array.from(fileTypes).slice(0, 3); // Show max 3 file types
  const hasMoreTypes = fileTypes.size > 3;
  
  return (
    <div className={cn(
      "border border-border/40 rounded-lg overflow-hidden bg-card shadow-sm group",
      "hover:bg-card/80 transition-all duration-200"
    )}>
      {/* Dropdown Button */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between flex items-center h-12 px-4 font-medium text-left cursor-pointer group-hover:bg-muted/30 transition-colors duration-200"
      >
        <span className="flex items-center gap-2 text-muted-foreground/80">
          <span className="font-semibold text-foreground text-sm">{totalFiles}</span>
          <span className="text-sm">file{totalFiles !== 1 ? 's' : ''} uploaded</span>
          {fileTypesArray.length > 0 && (
            <span className="text-xs text-muted-foreground/60">
              ({fileTypesArray.join(', ')}{hasMoreTypes ? ', ...' : ''})
            </span>
          )}
        </span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground/70 transition-all duration-200" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground/70 transition-all duration-200" />
        )}
      </div>
      
      {/* Expandable File List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-card group-hover:bg-card/80 transition-colors duration-200"
          >
            <div className={`p-4 ${files.length > 5 ? 'max-h-[200px] overflow-y-auto' : ''}`}>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-[1fr_80px] items-center p-3 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200"
                  >
                    <span className="text-sm text-muted-foreground/90 truncate pr-2 font-medium">{file.path}</span>
                    <div className="flex items-center gap-1 justify-end">
                      <FilePreview file={file} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFile(index);
                          toast.success('File removed');
                        }}
                        className="text-destructive/80 hover:text-destructive hover:bg-destructive/15 transition-colors duration-200 h-8 w-8"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 