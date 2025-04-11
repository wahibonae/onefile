import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Folder, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

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
    <div>
      <label className="block text-sm font-medium mb-2">Upload Files</label>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative rounded-lg border-2 border-dashed transition-all duration-200 ${
          isDragging 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-muted hover:border-primary hover:bg-secondary/40'
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
            animate={{ scale: isDragging ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className={`h-8 w-8 mb-3 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          </motion.div>
          <p className="text-sm text-muted-foreground mb-3 max-w-xs">
            Drag files here or
          </p>
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              variant="outline"
              size="sm"
              className="relative group"
            >
              <span className="flex items-center gap-1">
                Choose Files
                <ChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
              </span>
            </Button>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute mt-1 w-36 rounded-lg shadow-lg bg-popover border border-border z-10"
              >
                <div className="p-1">
                  <button
                    onClick={() => {
                      fileOnlyInputRef.current?.click()
                      setIsDropdownOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary transition-colors"
                  >
                    <FileText className="h-3 w-3" />
                    Select Files
                  </button>
                  <button
                    onClick={() => {
                      folderInputRef.current?.click()
                      setIsDropdownOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary transition-colors"
                  >
                    <Folder className="h-3 w-3" />
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