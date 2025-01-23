import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileWithContent } from '@/types'
import toast from 'react-hot-toast'

interface FileListProps {
  files: FileWithContent[];
  onRemoveFile: (index: number) => void;
}

export function FileList({ files, onRemoveFile }: FileListProps) {
  if (files.length === 0) return null

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Uploaded Files</label>
      <ScrollArea className="h-[200px] rounded-md border p-4">
        <div className="space-y-2">
          {files.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-md bg-secondary/50"
            >
              <span className="text-sm text-muted-foreground">{file.path}</span>
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
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 