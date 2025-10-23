import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Folder, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'
import GitHub from '@/components/icons/Github'

interface FileUploadProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGitHubImport?: () => void;
}

export function FileUpload({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  onGitHubImport
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
        className={cn("relative rounded-xl border-2 border-dashed transition-all duration-200",
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/70 hover:bg-muted/20'
        )}
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
        <div className="flex flex-col items-center justify-center py-7 px-4 text-center">
          <motion.div
            transition={{ duration: 0.2 }}
          >
            <div className={cn("p-3 rounded-full", isDragging ? 'bg-primary/10' : 'bg-muted/50')}>
              <Upload className={cn("h-7 w-7", isDragging ? 'text-primary' : 'text-muted-foreground')} />
            </div>
          </motion.div>
          <p className="text-sm text-muted-foreground mb-3">
            Drag files here or
          </p>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative group bg-background hover:bg-muted border-border shadow-sm h-8 px-2.5 rounded-md font-medium"
                >
                  <span className="flex items-center gap-1 text-muted-foreground transition-all duration-300">
                    Choose Files
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-fit space-y-1 p-2">
                <DropdownMenuItem
                  onClick={() => fileOnlyInputRef.current?.click()}
                  className="flex items-center gap-2.5 cursor-pointer text-muted-foreground"
                >
                  <FileText className="h-4 w-4" strokeWidth={2.1} />
                  Select Files
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => folderInputRef.current?.click()}
                  className="flex items-center gap-2.5 cursor-pointer text-muted-foreground"
                >
                  <Folder className="h-4 w-4" strokeWidth={2.1} />
                  Select Folder
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {onGitHubImport && (
              <Button
                onClick={onGitHubImport}
                variant="outline"
                className="relative group bg-background hover:bg-muted border-border shadow-sm h-8 px-2.5 rounded-md font-medium"
              >
                <span className="flex items-center gap-1.5 text-muted-foreground transition-all duration-300">
                  <GitHub className="h-3.5 w-3.5" />
                  Import from GitHub
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
