import { Info, Upload, Download, Check, Code, GraduationCap, Briefcase, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="text-foreground/80 border-border/40 hover:text-primary hover:bg-primary/5 hover:border-1 hover:border-primary/10 transition-all duration-200">
          <Info className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">About OneFile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            About OneFile
          </DialogTitle>
          <DialogDescription className="text-base">
            Break through AI platform upload limits. Combine unlimited files into one single file.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Upload className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">No More Upload Limits</p>
                <p className="text-sm text-muted-foreground">
                  ChatGPT limits you to 5-20 files? We merge all of them into one file that you can upload.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Download className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">Any File Type</p>
                <p className="text-sm text-muted-foreground">
                  PDFs, docs, spreadsheets, code, text files - all processed and formatted perfectly. (images not supported yet)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium">Instant Filtering</p>
                <p className="text-sm text-muted-foreground">
                  Automatically skips .gitignore files and junk files.<br />
                  Preserves structure and formats everything for AI usage.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed pt-4">
            <p className="font-semibold text-base mb-2 text-muted-foreground">OneFile is made for:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className={cn("flex items-center gap-2 p-3 rounded-lg bg-muted border border-border")}>
                <Code className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Developers</p>
                  <p className="text-xs text-muted-foreground">Share entire codebases with AI</p>
                </div>
              </div>
              
              <div className={cn("flex items-center gap-2 p-3 rounded-lg bg-muted border border-border")}>
                <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Students</p>
                  <p className="text-xs text-muted-foreground">Combine study materials</p>
                </div>
              </div>
              
              <div className={cn("flex items-center gap-2 p-3 rounded-lg bg-muted border border-border")}>
                <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Professionals</p>
                  <p className="text-xs text-muted-foreground">Merge meeting notes & docs</p>
                </div>
              </div>
              
              <div className={cn("flex items-center gap-2 p-3 rounded-lg bg-muted border border-border")}>
                <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Anyone</p>
                  <p className="text-xs text-muted-foreground">Multiple files → One prompt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
