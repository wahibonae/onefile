import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Folder, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'

interface FileUploadProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export function FileUpload({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef
}: FileUploadProps) {
  const fileOnlyInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Upload Files</label>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/70 hover:bg-muted/20'
        }`}
      >
        <input
          type="file"
          ref={fileOnlyInputRef}
          onChange={onFileChange}
          multiple
          className="hidden"
        />
        <input
          type="file"
          ref={folderInputRef}
          onChange={onFileChange}
          multiple
          webkitdirectory=""
          directory=""
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
          <motion.div
            transition={{ duration: 0.2 }}
          >
            <div className={cn("p-3 rounded-full", isDragging ? 'bg-primary/10' : 'bg-muted/50')}>
              <Upload className={cn("h-8 w-8", isDragging ? 'text-primary' : 'text-muted-foreground')} />
            </div>
          </motion.div>
          <p className="text-sm text-muted-foreground mb-3">
            Drag files here or
          </p>
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              variant="outline"
              className="relative group bg-background hover:bg-muted border-border shadow-sm h-9 px-3 rounded-lg font-medium"
            >
              <span className="flex items-center gap-1.5 text-muted-foreground transition-all duration-300">
                Choose Files
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </span>
            </Button>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute mt-2 w-44 rounded-xl shadow-lg bg-popover border border-border z-10"
              >
                <div className="p-1.5">
                  <button
                    onClick={() => {
                      fileOnlyInputRef.current?.click()
                      setIsDropdownOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium group hover:bg-primary/5 hover:text-primary transition-colors text-muted-foreground"
                  >
                    <FileText className="h-4 w-4 group-hover:text-primary" strokeWidth={2.1} />
                    Select Files
                  </button>
                  <button
                    onClick={() => {
                      folderInputRef.current?.click()
                      setIsDropdownOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium group hover:bg-primary/5 hover:text-primary transition-colors text-muted-foreground"
                  >
                    <Folder className="h-4 w-4 group-hover:text-primary" strokeWidth={2.1} />
                    Select Folder
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 