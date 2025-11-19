import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileWithContent } from '@/types'
import toast from 'react-hot-toast'
import { FilePreview } from './FilePreview'
import { useState } from 'react'
import { cn } from "@/lib/utils"

interface FileListProps {
  files: FileWithContent[];
  onRemoveFile: (index: number) => void;
  onClearAll: () => void;
}

export function FileList({ files, onRemoveFile, onClearAll }: FileListProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  if (files.length === 0) return null;
  
  // Calculate total files size for the summary
  const totalFiles = files.length;
  const fileTypes = new Set(files.map(file => file.path.split('.').pop()?.toLowerCase() || ''));
  const fileTypesArray = Array.from(fileTypes).slice(0, 3); // Show max 3 file types
  const hasMoreTypes = fileTypes.size > 3;

  const handleClearAll = () => {
    onClearAll();
    setIsDialogOpen(false);
    toast.success('All files cleared');
  };
  
  return (
    <div className={cn(
      "border border-border/40 rounded-lg overflow-hidden bg-card shadow-sm group",
      "hover:bg-card/80 transition-all duration-200"
    )}>
      {/* Dropdown Button */}
      <div className="w-full justify-between flex items-center min-h-12 py-2 px-4 font-medium text-left group-hover:bg-muted/30 transition-colors duration-200">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-muted-foreground/80 cursor-pointer flex-1 min-w-0"
        >
          <span className="font-semibold text-sm">{totalFiles}</span>
          <span className="text-sm truncate">file{totalFiles !== 1 ? 's' : ''} uploaded</span>
          {fileTypesArray.length > 0 && (
            <span className="hidden sm:inline text-xs text-muted-foreground/60">
              ({fileTypesArray.join(', ')}{hasMoreTypes ? ', ...' : ''})
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground/60 hover:text-red-500 hover:bg-red-500/5 transition-colors duration-200 h-7 px-2.5 text-xs"
                title="Clear all files"
              >
                Clear all
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] p-1 gap-0">
              <div className="p-4 sm:p-6 pb-3">
                <DialogHeader className="space-y-3">
                  <DialogTitle className="text-xl font-semibold text-foreground">
                    Clear all files?
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground leading-relaxed">
                    This will remove all <span className="font-medium text-foreground">{totalFiles} file{totalFiles !== 1 ? 's' : ''}</span> from your upload. You&apos;ll need to re-upload them if you want to use them again.
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="flex gap-3 p-4 sm:px-6 sm:pt-0">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 h-10 text-foreground/80 border-border/40 hover:text-primary hover:bg-primary/5 hover:border-1 hover:border-primary/10 transition-all duration-200"
                >
                  Keep files
                </Button>
                <Button
                  onClick={handleClearAll}
                  className="flex-1 h-10 bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 transition-all duration-200"
                >
                  Clear all
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer p-1 hover:bg-muted/50 rounded transition-colors duration-200"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground/70 transition-all duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground/70 transition-all duration-200" />
            )}
          </div>
        </div>
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
            <div className="p-3 max-h-[170px] overflow-y-auto">
              <div className="space-y-2">
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center px-3 py-1 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 border border-transparent hover:border-border/40"
                  >
                      <span className="text-xs sm:text-sm min-w-0 flex-1 text-muted-foreground/80 truncate font-medium">{file.path}</span>
                    <div className="flex items-center gap-1 opacity-80 group-hover/file:opacity-100 transition-opacity duration-200">
                      <FilePreview file={file} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFile(index);
                          toast.success('File removed');
                        }}
                        className="text-destructive/80 hover:text-red-500 hover:bg-red-500/5 transition-colors duration-200 h-8 w-8 p-0"
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
