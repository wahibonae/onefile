import Link from "next/link";
import { Callout } from "@/components/blog/Callout";
import { CodeBlock } from "@/components/blog/CodeBlock";

export default function BlogPost() {
  return (
    <>
      {/* TL;DR Section */}
      <div className="not-prose rounded-xl border border-border bg-card p-5 mb-8">
        <h3 className="text-md font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          TL;DR
        </h3>
        <p className="text-sm leading-normal text-muted-foreground mb-2">
          ChatGPT limits you to 3 files/day (free) or 10 files/message (Plus). The fix: combine all your files into one text file before uploading.
        </p>
        <p className="text-sm leading-normal text-muted-foreground">
          <span className="font-medium">Quick solution:</span> Go to{" "}
          <a
            href="https://www.onefileapp.com"
            className="text-primary bg-primary/10 p-1.5 py-0.5 rounded-sm font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            OneFile
          </a>
          {" "}&rarr; Upload files/folders &rarr; Download combined file &rarr; Upload to ChatGPT. Free, no account needed.
        </p>
      </div>

      <p>
        If you&apos;ve tried uploading multiple files to ChatGPT, you&apos;ve hit the frustrating 3-file limit. Whether you&apos;re analyzing research papers, sharing code for review, or preparing meeting documents, this restriction kills productivity.
      </p>

      <p>
        Here&apos;s how to bypass ChatGPT&apos;s file upload limit for free.
      </p>

      <h2>Understanding ChatGPT&apos;s File Upload Limits</h2>

      <h3>ChatGPT Free Plan Limitations</h3>

      <ul>
        <li><strong>Maximum 3 files per day</strong>: Can&apos;t upload more until the next day</li>
        <li><strong>20MB per file limit</strong>: Large documents must be split</li>
        <li><strong>Limited file types</strong>: Only common formats like PDF, DOCX, TXT</li>
        <li><strong>No folder uploads</strong>: Each file must be selected individually</li>
      </ul>

      <h3>ChatGPT Plus Limitations ($20/month)</h3>

      <ul>
        <li><strong>10-file limit per message</strong>: Still tedious for large projects with hundreds of files</li>
        <li><strong>Same 20MB per file restriction</strong>: No improvement over free</li>
        <li><strong>No folder or repository support</strong>: Can&apos;t upload entire projects at once</li>
      </ul>

      <p>
        These limits exist to manage server costs, but they&apos;re a bottleneck for legitimate use cases like analyzing research papers, reviewing codebases, or processing multiple documents.
      </p>

      <h2>The Solution: Combine Files Before Uploading</h2>

      <p>
        The workaround is simple: <strong>merge all your files into a single text file before uploading to ChatGPT</strong>. You upload one file, but ChatGPT gets access to hundreds of original files.
      </p>

      <Callout variant="info">
        <p>
          This works with <span className="font-bold">all AI platforms</span>: ChatGPT (Free and Plus), Claude, Gemini, and any AI that accepts file uploads.
        </p>
      </Callout>

      <h3>How File Combining Works</h3>

      <CodeBlock>
        <strong>Instead of:</strong> 3 separate files (limit reached) ❌<br /><br />
        <strong>Upload:</strong> 1 combined file containing 100+ files ✅<br />
        ├─ research_paper_1.pdf<br />
        ├─ research_paper_2.pdf<br />
        ├─ notes.txt<br />
        ├─ data.csv<br />
        └─ 100+ more files...
      </CodeBlock>

      <h2>Method 1: Using OneFile (Recommended)</h2>

      <p>
        <Link href="/" className="text-primary hover:underline">OneFile</Link> is a free, open-source tool that automatically combines multiple files into a single AI-ready text file.
      </p>

      <h3>Why OneFile is the Best Option</h3>

      <ul>
        <li><strong>Completely free</strong>: No subscriptions, no usage limits, no hidden costs</li>
        <li><strong>No account required</strong>: Works instantly without sign-up</li>
        <li><strong>Unlimited files</strong>: Combine 10, 100, or 1,000+ files at once</li>
        <li><strong>50+ file types supported</strong>: PDFs, Office docs, code files, CSV, and more</li>
        <li><strong>Privacy-focused</strong>: Text files processed in your browser, never stored</li>
        <li><strong>GitHub integration</strong>: Import entire repositories with one click</li>
        <li><strong>.gitignore support</strong>: Automatically skips node_modules, .git, build folders</li>
        <li><strong>Open source</strong>: Verify the code yourself on GitHub</li>
      </ul>

      <h3>Step-by-Step Guide</h3>

      <h4>Step 1: Go to OneFile</h4>
      <p>
        Visit{" "}
        <a href="https://www.onefileapp.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
          onefileapp.com
        </a>
        {" "}in any browser. No downloads needed.
      </p>

      <h4>Step 2: Upload Your Files</h4>
      <p>Three options:</p>
      <ul>
        <li><strong>Drag and drop files</strong>: Select multiple files and drag into the upload area</li>
        <li><strong>Drag and drop a folder</strong>: Upload entire project folders (respects .gitignore)</li>
        <li><strong>Import from GitHub</strong>: Sign in and select files from any repository</li>
      </ul>

      <Callout variant="tip">
        <p>
          <span className="font-bold">Pro Tip:</span> For code projects, use folder upload or GitHub import. OneFile automatically skips node_modules, .git, and build folders.
        </p>
      </Callout>

      <h4>Step 3: Download Combined File</h4>
      <p>
        Click <strong>&quot;Download&quot;</strong> to save the combined output as a .txt file. OneFile extracts text from all files, adds file path markers, and formats everything for AI consumption.
      </p>

      <h4>Step 4: Upload to ChatGPT</h4>
      <p>
        Open ChatGPT, click the attachment icon, and upload your combined file. Ask questions about any of the files you combined.
      </p>

      <Callout variant="success">
        <p>
          <span className="font-bold">Done!</span> You&apos;ve bypassed ChatGPT&apos;s 3-file limit. ChatGPT can now analyze all your files at once.
        </p>
      </Callout>

      <h2>Real-World Use Cases</h2>

      <h3>For Students</h3>
      <p>
        Analyzing 25+ research papers for a thesis? Upload the folder to OneFile, download the combined file, and ask ChatGPT to identify themes and research gaps.
      </p>

      <h3>For Developers</h3>
      <p>
        Need code review on a React project with 50+ files? Import your GitHub repository, download the combined file, and ask ChatGPT to review for bugs and security issues.
      </p>

      <h3>For Professionals</h3>
      <p>
        Preparing for a board meeting with quarterly reports? Combine all DOCX, PPTX, and XLSX files, then ask ChatGPT to summarize trends and identify risks.
      </p>

      <h2>Tips for Best Results</h2>

      <h3>Structure Your Prompts</h3>
      <p>Give ChatGPT context about what you uploaded:</p>
      <CodeBlock>
        &quot;I&apos;ve uploaded a combined file with [number] files from my [project]. Please analyze and [specific request].&quot;
      </CodeBlock>

      <h3>Reference Specific Files</h3>
      <p>OneFile adds file path markers. Use them for targeted questions:</p>
      <CodeBlock>
        &quot;Look at src/components/UserAuth.tsx and explain how authentication works.&quot;
      </CodeBlock>

      <h3>Mind the Token Limits</h3>
      <p>
        ChatGPT has a ~128K token context window (~1-2MB of text). For large projects, remove unnecessary files or split into logical groups.
      </p>

      <h3>Remove Sensitive Data</h3>
      <p>
        Check for API keys or passwords before uploading. OneFile&apos;s .gitignore support automatically skips .env files.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Does this work with ChatGPT Plus?</h3>
      <p>
        Yes. Plus users bypass the 10-file batch limit and can upload unlimited content in one file.
      </p>

      <h3>Will this work with Claude or Gemini?</h3>
      <p>
        Yes. OneFile&apos;s output works with all AI platforms: Claude, Gemini, Grok, Perplexity, and any LLM.
      </p>

      <h3>Is my data private?</h3>
      <p>
        Yes. Text files are processed in your browser and never reach our servers. Complex documents (PDFs, DOCX) are sent to our API for extraction, then immediately deleted. OneFile is open source. Verify it yourself.
      </p>

      <h3>Can I upload an entire GitHub repository?</h3>
      <p>
        Yes. Sign in with GitHub and import any repository. OneFile respects .gitignore and skips node_modules, .git, and build artifacts.
      </p>

      <h3>How large can the combined file be?</h3>
      <p>
        No limit in OneFile, but ChatGPT has a ~128K token context window. Keep combined files under 1-2MB for best results.
      </p>

      <h3>What file types are supported?</h3>
      <p>50+ file types:</p>
      <ul>
        <li><strong>Documents:</strong> PDF, DOCX, PPTX, XLSX, DOC, PPT, XLS, RTF, ODT</li>
        <li><strong>Code:</strong> JS, TS, JSX, TSX, PY, JAVA, GO, RS, RB, PHP, C, CPP, CS</li>
        <li><strong>Web:</strong> HTML, CSS, SCSS, JSON, XML, YAML, GraphQL</li>
        <li><strong>Data:</strong> CSV, TSV, SQL</li>
        <li><strong>Config:</strong> .env, .ini, .toml, .conf, .gitignore</li>
      </ul>

      <h3>Does this violate ChatGPT&apos;s Terms of Service?</h3>
      <p>
        No. You&apos;re uploading a single text file, which is allowed. The file just contains content from multiple sources.
      </p>

      <h2>Conclusion</h2>

      <p>
        ChatGPT&apos;s 3-file limit (or 10-file limit for Plus) doesn&apos;t have to slow you down. Combine your files into one before uploading, and you can work with unlimited content.
      </p>

      <p>
        <Link href="/" className="text-primary hover:underline">OneFile</Link> makes this effortless. It&apos;s free, open source, and takes seconds.
      </p>

      <div className="bg-card border border-border rounded-lg p-5 my-6">
        <p className="text-base mb-3"><strong>Quick Recap:</strong></p>
        <ol className="text-sm space-y-1 mb-0 list-decimal list-inside">
          <li>Go to <a href="https://www.onefileapp.com" className="text-primary hover:underline">onefileapp.com</a></li>
          <li>Upload files, folders, or import from GitHub</li>
          <li>Download the combined file</li>
          <li>Upload to ChatGPT and ask questions about any file</li>
        </ol>
      </div>

      <p>
        Whether you&apos;re a student, developer, or professional, bypassing ChatGPT&apos;s file limits is now as simple as combining files into one.
      </p>
    </>
  );
}
