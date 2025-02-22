import { Info, Upload, Files, Download, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">About Code To Prompt</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            About Code To Prompt
          </DialogTitle>
          <DialogDescription className="text-base">
            Your solution for easy and efficient code-to-AI interactions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Upload className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">File Upload Limits</p>
                <p className="text-sm text-muted-foreground">
                  No more hitting upload limits on AI platforms. Convert
                  multiple files into a single, well-formatted prompt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Files className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">Manual File Management</p>
                <p className="text-sm text-muted-foreground">
                  Stop uploading the same files repeatedly to different AI
                  assistants. Generate once, use anywhere.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Download className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">Context Window Management</p>
                <p className="text-sm text-muted-foreground">
                  Download large prompts as a single file to avoid context
                  window limits, while maintaining all your code&apos;s context.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">Comprehensive File Support</p>
                <p className="text-sm text-muted-foreground">
                  Various file formats supported (code, slides, PDFs, etc.)
                  while preserving files structure and relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
