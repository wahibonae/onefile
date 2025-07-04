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
          <span className="sr-only">About OneFile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            About OneFile
          </DialogTitle>
          <DialogDescription className="text-base">
            Your solution for combining multiple files into AI-ready prompts.
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
                  multiple files (PDFs, docs, CSVs, code, etc.) into a single, well-formatted prompt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Files className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">Universal File Support</p>
                <p className="text-sm text-muted-foreground">
                  Perfect for students combining study materials, professionals merging meeting notes,
                  researchers aggregating papers, and anyone working with multiple files.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Download className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">Easy Export</p>
                <p className="text-sm text-muted-foreground">
                  Download your merged content as a single file or copy to clipboard.
                  Use with ChatGPT, Claude, Gemini, or any AI platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">Smart Processing</p>
                <p className="text-sm text-muted-foreground">
                  Automatically handles various file formats (PDFs, docs, spreadsheets, code, text)
                  while preserving structure and relationships.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Perfect for:</strong> Students, researchers, business professionals, data analysts,
              legal professionals, entrepreneurs, and anyone who needs to combine files for AI assistance.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
