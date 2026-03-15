import Link from "next/link";
import { Callout } from "@/components/blog/Callout";

export default function BlogPost() {
  return (
    <>
      {/* TL;DR Section */}
      <div className="not-prose rounded-xl border border-border bg-card p-5 mb-8">
        <h3 className="text-md font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          TL;DR
        </h3>
        <p className="text-sm leading-normal text-muted-foreground mb-2">
          Every AI platform limits file uploads. ChatGPT Free: 3 files/day. Claude: 5 files/chat (Free). Gemini Free: 10 files but no code/spreadsheets. Grok: mostly text-only. Perplexity Free: ~3 files/day.
        </p>
        <p className="text-sm leading-normal text-muted-foreground">
          <span className="font-medium">Skip all limits:</span>{" "}
          <a
            href="https://onefileapp.com"
            className="text-primary bg-primary/10 p-1.5 py-0.5 rounded-sm font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            OneFile
          </a>
          {" "}combines unlimited files into one &rarr; upload to any AI. Free, no account needed.
        </p>
      </div>

      <p>
        Trying to upload files to an AI chatbot shouldn&apos;t feel like solving a puzzle. But every platform &mdash; ChatGPT, Claude, Gemini, Grok, Perplexity &mdash; has different file upload limits, supported formats, and plan restrictions.
      </p>

      <p>
        We compared the file upload limits of the 5 most popular AI platforms in 2026 so you can pick the right tool for your workflow &mdash; or skip the limits entirely.
      </p>

      <h2>Quick Comparison: AI File Upload Limits (2026)</h2>

      <p>
        Here&apos;s a side-by-side comparison of every major AI platform&apos;s file upload limits:
      </p>

      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse border border-border rounded-lg bg-card">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Feature</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">ChatGPT</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Claude</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Gemini</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Grok</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Perplexity</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Free files/day</td>
              <td className="border border-border px-3 py-2">3</td>
              <td className="border border-border px-3 py-2">5 per chat</td>
              <td className="border border-border px-3 py-2">10 per prompt</td>
              <td className="border border-border px-3 py-2">Limited</td>
              <td className="border border-border px-3 py-2">~3/day</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Paid files/day</td>
              <td className="border border-border px-3 py-2">~80/3hrs</td>
              <td className="border border-border px-3 py-2">20 per chat</td>
              <td className="border border-border px-3 py-2">10 per prompt</td>
              <td className="border border-border px-3 py-2">No hard cap</td>
              <td className="border border-border px-3 py-2">Unlimited</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Max file size</td>
              <td className="border border-border px-3 py-2">512 MB</td>
              <td className="border border-border px-3 py-2">30 MB</td>
              <td className="border border-border px-3 py-2">100 MB</td>
              <td className="border border-border px-3 py-2">48 MB</td>
              <td className="border border-border px-3 py-2">~50 MB</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">PDF support</td>
              <td className="border border-border px-3 py-2">Yes</td>
              <td className="border border-border px-3 py-2">Yes</td>
              <td className="border border-border px-3 py-2">Yes</td>
              <td className="border border-border px-3 py-2">API only</td>
              <td className="border border-border px-3 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Code files</td>
              <td className="border border-border px-3 py-2">Yes</td>
              <td className="border border-border px-3 py-2">Yes</td>
              <td className="border border-border px-3 py-2">Paid only</td>
              <td className="border border-border px-3 py-2">Yes</td>
              <td className="border border-border px-3 py-2">Yes</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Spreadsheets</td>
              <td className="border border-border px-3 py-2">Yes</td>
              <td className="border border-border px-3 py-2">Yes (XLSX)</td>
              <td className="border border-border px-3 py-2">Paid only</td>
              <td className="border border-border px-3 py-2">CSV only</td>
              <td className="border border-border px-3 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Folder upload</td>
              <td className="border border-border px-3 py-2">No</td>
              <td className="border border-border px-3 py-2">No</td>
              <td className="border border-border px-3 py-2">No</td>
              <td className="border border-border px-3 py-2">No</td>
              <td className="border border-border px-3 py-2">No</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Video/Audio</td>
              <td className="border border-border px-3 py-2">No</td>
              <td className="border border-border px-3 py-2">No</td>
              <td className="border border-border px-3 py-2">Yes</td>
              <td className="border border-border px-3 py-2">No</td>
              <td className="border border-border px-3 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Cheapest paid</td>
              <td className="border border-border px-3 py-2">$20/mo</td>
              <td className="border border-border px-3 py-2">$20/mo</td>
              <td className="border border-border px-3 py-2">$20/mo</td>
              <td className="border border-border px-3 py-2">$8/mo</td>
              <td className="border border-border px-3 py-2">$20/mo</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout variant="info">
        <p>
          <strong>None of these platforms support folder uploads.</strong> If you need to upload an entire project, codebase, or folder of documents, you&apos;ll need to either upload files one by one or use a tool like{" "}
          <Link href="/" className="text-primary hover:underline font-semibold">OneFile</Link> to combine them first.
        </p>
      </Callout>

      {/* ChatGPT Section */}
      <h2>ChatGPT File Upload Limits</h2>

      <p>
        ChatGPT has the most complex upload limit system of any AI platform. Your limits depend on which of the 6 plans you&apos;re on, and they use a rolling window instead of a simple daily reset.
      </p>

      <h3>ChatGPT Upload Limits by Plan</h3>

      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse border border-border rounded-lg bg-card">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Plan</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Price</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Files per message</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Upload rate limit</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Projects file limit</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Free</td>
              <td className="border border-border px-3 py-2">$0</td>
              <td className="border border-border px-3 py-2">3</td>
              <td className="border border-border px-3 py-2">3 files/day</td>
              <td className="border border-border px-3 py-2">5 files</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Go</td>
              <td className="border border-border px-3 py-2">$5.50/mo</td>
              <td className="border border-border px-3 py-2">10</td>
              <td className="border border-border px-3 py-2">~30 files/day</td>
              <td className="border border-border px-3 py-2">25 files</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Plus</td>
              <td className="border border-border px-3 py-2">$20/mo</td>
              <td className="border border-border px-3 py-2">10</td>
              <td className="border border-border px-3 py-2">~80 files/3hrs</td>
              <td className="border border-border px-3 py-2">25 files</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Team</td>
              <td className="border border-border px-3 py-2">$25/user/mo</td>
              <td className="border border-border px-3 py-2">10</td>
              <td className="border border-border px-3 py-2">~80 files/3hrs</td>
              <td className="border border-border px-3 py-2">40 files</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Pro</td>
              <td className="border border-border px-3 py-2">$200/mo</td>
              <td className="border border-border px-3 py-2">No limit</td>
              <td className="border border-border px-3 py-2">Unlimited</td>
              <td className="border border-border px-3 py-2">40 files</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Enterprise</td>
              <td className="border border-border px-3 py-2">Custom</td>
              <td className="border border-border px-3 py-2">10</td>
              <td className="border border-border px-3 py-2">~160 files/3hrs</td>
              <td className="border border-border px-3 py-2">40 files</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>ChatGPT File Size Limits</h3>

      <ul>
        <li><strong>Documents</strong> (PDF, DOCX, TXT, PPTX): up to 512 MB per file</li>
        <li><strong>Images</strong> (PNG, JPG, GIF, WebP): up to 20 MB per file</li>
        <li><strong>Spreadsheets</strong> (XLSX, CSV): up to ~50 MB per file</li>
      </ul>

      <p>
        While the hard limit is 512 MB, OpenAI recommends keeping files under 25 MB for reliable processing. Large files can time out or return incomplete results.
      </p>

      <h3>ChatGPT Supported File Types</h3>

      <p>ChatGPT supports a wide range of file formats:</p>

      <ul>
        <li><strong>Documents:</strong> PDF, DOCX, DOC, TXT, RTF, Markdown</li>
        <li><strong>Spreadsheets:</strong> CSV, XLSX, XLS</li>
        <li><strong>Presentations:</strong> PPTX, PPT</li>
        <li><strong>Code:</strong> Python, JavaScript, TypeScript, Java, C, C++, Go, Ruby, PHP, and more</li>
        <li><strong>Data/Config:</strong> JSON, XML, YAML, TOML</li>
        <li><strong>Images:</strong> PNG, JPG, GIF, WebP</li>
      </ul>

      <p>
        <strong>Not supported:</strong> Video files, audio files, executables, password-protected documents, or encrypted archives.
      </p>

      <Callout variant="warning">
        <p>
          <strong>ChatGPT&apos;s limits use a rolling window</strong>, not a hard daily reset. For paid plans, the ~80 file limit refreshes gradually over 3 hours. For Free users, the 3-file limit resets every 24 hours.
        </p>
      </Callout>

      <p>
        For a deeper breakdown of ChatGPT limits, see our{" "}
        <Link href="/blog/how-many-files-upload-chatgpt" className="text-primary hover:underline">
          how many files you can upload to ChatGPT
        </Link>.
      </p>

      {/* Claude Section */}
      <h2>Claude File Upload Limits</h2>

      <p>
        Claude (by Anthropic) takes a simpler approach than ChatGPT: the file upload limits are the same across all plans. What changes between plans is how many messages you can send, not how many files you can attach.
      </p>

      <h3>Claude Upload Limits by Plan</h3>

      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse border border-border rounded-lg bg-card">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Plan</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Price</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Files per chat</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Max file size</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Projects</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Free</td>
              <td className="border border-border px-3 py-2">$0</td>
              <td className="border border-border px-3 py-2">5</td>
              <td className="border border-border px-3 py-2">30 MB</td>
              <td className="border border-border px-3 py-2">No</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Pro</td>
              <td className="border border-border px-3 py-2">$20/mo</td>
              <td className="border border-border px-3 py-2">20</td>
              <td className="border border-border px-3 py-2">30 MB</td>
              <td className="border border-border px-3 py-2">Yes (with RAG)</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Max</td>
              <td className="border border-border px-3 py-2">$100-200/mo</td>
              <td className="border border-border px-3 py-2">20</td>
              <td className="border border-border px-3 py-2">30 MB</td>
              <td className="border border-border px-3 py-2">Yes (with RAG)</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Team</td>
              <td className="border border-border px-3 py-2">$25/user/mo</td>
              <td className="border border-border px-3 py-2">20</td>
              <td className="border border-border px-3 py-2">30 MB</td>
              <td className="border border-border px-3 py-2">Yes (with RAG)</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Enterprise</td>
              <td className="border border-border px-3 py-2">Custom</td>
              <td className="border border-border px-3 py-2">20</td>
              <td className="border border-border px-3 py-2">30 MB</td>
              <td className="border border-border px-3 py-2">Yes (with RAG)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Claude Supported File Types</h3>

      <ul>
        <li><strong>Documents:</strong> PDF (up to 100 pages for full analysis), DOCX, TXT, RTF, HTML, Markdown, EPUB, ODT</li>
        <li><strong>Spreadsheets:</strong> XLSX (requires code execution), CSV</li>
        <li><strong>Code:</strong> Python, JavaScript, TypeScript, HTML, CSS, and other text-based formats</li>
        <li><strong>Data:</strong> JSON, XML</li>
        <li><strong>Images:</strong> JPEG, PNG, GIF, WebP (up to 8000x8000 pixels)</li>
      </ul>

      <p>
        <strong>Not supported:</strong> Video, audio, PowerPoint (PPTX), or binary files.
      </p>

      <h3>Claude Projects</h3>

      <p>
        Claude Projects lets paid users upload files as persistent knowledge that applies across all conversations in a project. Each file can be up to 30 MB, with no limit on the number of files &mdash; but Claude&apos;s 200K token context window acts as a soft cap. When your project knowledge exceeds the context window, Claude automatically switches to RAG (retrieval) mode, which can expand effective capacity by up to 10x.
      </p>

      <Callout variant="tip">
        <p>
          <strong>Claude&apos;s advantage:</strong> The 30 MB file size limit is lower than ChatGPT&apos;s 512 MB, but Claude&apos;s 200K token context window is larger than ChatGPT&apos;s 128K, meaning Claude can actually process more text content per conversation.
        </p>
      </Callout>

      {/* Gemini Section */}
      <h2>Gemini File Upload Limits</h2>

      <p>
        Google Gemini stands out as the only major AI platform that supports video and audio uploads. However, its free plan is more restricted than competitors when it comes to code and spreadsheet files.
      </p>

      <h3>Gemini Upload Limits by Plan</h3>

      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse border border-border rounded-lg bg-card">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Plan</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Price</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Files per prompt</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Max file size</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Context window</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Free</td>
              <td className="border border-border px-3 py-2">$0</td>
              <td className="border border-border px-3 py-2">10</td>
              <td className="border border-border px-3 py-2">100 MB</td>
              <td className="border border-border px-3 py-2">32K tokens</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Advanced</td>
              <td className="border border-border px-3 py-2">$19.99/mo</td>
              <td className="border border-border px-3 py-2">10</td>
              <td className="border border-border px-3 py-2">100 MB (2 GB for video)</td>
              <td className="border border-border px-3 py-2">1M tokens</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Gemini Free vs Advanced: File Type Restrictions</h3>

      <p>
        This is where Gemini gets tricky. The free plan blocks some of the most common file types:
      </p>

      <ul>
        <li><strong>Free plan supports:</strong> PDFs, DOCX, TXT, RTF, PPTX, images, and Google Docs/Slides</li>
        <li><strong>Advanced only:</strong> Spreadsheets (XLSX, CSV, Google Sheets), code files (Python, Java, C++, HTML, PHP, SQL)</li>
        <li><strong>Both plans:</strong> Video (MP4, MOV, AVI &mdash; up to 5 min free, 1 hour paid) and audio (MP3, WAV, AAC)</li>
      </ul>

      <Callout variant="warning">
        <p>
          <strong>Developers take note:</strong> Gemini Free does not support code file uploads. You need Gemini Advanced ($19.99/mo) to upload .py, .js, .java, or any code files directly.
        </p>
      </Callout>

      <h3>Gemini&apos;s Unique Strengths</h3>

      <ul>
        <li><strong>Video analysis:</strong> Upload up to 2 GB videos and ask questions about the content</li>
        <li><strong>Audio transcription:</strong> Upload audio files for automatic transcription and analysis</li>
        <li><strong>Google Drive integration:</strong> Attach files directly from Google Drive</li>
        <li><strong>Largest context window:</strong> 1 million tokens on Advanced (vs 128K for ChatGPT, 200K for Claude)</li>
      </ul>

      {/* Grok Section */}
      <h2>Grok File Upload Limits</h2>

      <p>
        Grok (by xAI) has the most limited file upload support of the major AI platforms. While the API supports document uploads, the consumer chat interface (grok.com and the X app) is still catching up.
      </p>

      <h3>Grok Upload Limits by Plan</h3>

      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse border border-border rounded-lg bg-card">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Plan</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Price</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Max file size</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Supported types</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Free</td>
              <td className="border border-border px-3 py-2">$0</td>
              <td className="border border-border px-3 py-2">48 MB</td>
              <td className="border border-border px-3 py-2">Images, TXT, MD, CSV</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Premium (X Premium+)</td>
              <td className="border border-border px-3 py-2">$8/mo</td>
              <td className="border border-border px-3 py-2">48 MB</td>
              <td className="border border-border px-3 py-2">Images, PDF, DOCX, TXT, MD, CSV, code</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">SuperGrok</td>
              <td className="border border-border px-3 py-2">$30/mo</td>
              <td className="border border-border px-3 py-2">48 MB</td>
              <td className="border border-border px-3 py-2">Images, PDF, DOCX, TXT, MD, CSV, ZIP, code</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Grok&apos;s Limitations</h3>

      <ul>
        <li><strong>No spreadsheet support:</strong> XLSX files are not supported &mdash; you need to export to CSV first</li>
        <li><strong>PDF support is limited:</strong> Full PDF reading is primarily available via the API, not always in the chat UI</li>
        <li><strong>No PPTX support:</strong> PowerPoint files cannot be uploaded</li>
        <li><strong>Consumer UI lags the API:</strong> The grok.com and X app interfaces don&apos;t support all file types that the API does</li>
      </ul>

      <p>
        Grok&apos;s main advantage is price: at $8/mo for Premium (included with X Premium+), it&apos;s the cheapest paid AI platform with file upload support.
      </p>

      {/* Perplexity Section */}
      <h2>Perplexity File Upload Limits</h2>

      <p>
        Perplexity AI focuses on search-augmented answers, and its file upload feature lets you combine uploaded documents with web search results. It has a strong file type support but limits free users significantly.
      </p>

      <h3>Perplexity Upload Limits by Plan</h3>

      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse border border-border rounded-lg bg-card">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Plan</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Price</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Files per prompt</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Max file size</th>
              <th className="border border-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Daily uploads</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Free</td>
              <td className="border border-border px-3 py-2">$0</td>
              <td className="border border-border px-3 py-2">Up to 10</td>
              <td className="border border-border px-3 py-2">~40 MB</td>
              <td className="border border-border px-3 py-2">~3 attachments</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border px-3 py-2 font-medium text-foreground">Pro</td>
              <td className="border border-border px-3 py-2">$20/mo</td>
              <td className="border border-border px-3 py-2">Up to 10</td>
              <td className="border border-border px-3 py-2">~50 MB</td>
              <td className="border border-border px-3 py-2">Unlimited</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-medium text-foreground">Enterprise</td>
              <td className="border border-border px-3 py-2">Custom</td>
              <td className="border border-border px-3 py-2">Up to 10</td>
              <td className="border border-border px-3 py-2">Up to 1 GB</td>
              <td className="border border-border px-3 py-2">Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Perplexity Supported File Types</h3>

      <ul>
        <li><strong>Documents:</strong> PDF, DOCX, XLSX, CSV, PPTX, TXT, Markdown, JSON</li>
        <li><strong>Images:</strong> PNG, JPEG</li>
        <li><strong>Audio:</strong> Supported with automatic transcription</li>
        <li><strong>Video:</strong> Supported with automatic transcription</li>
        <li><strong>Cloud integrations (Pro):</strong> Google Docs, Sheets, and Slides</li>
      </ul>

      <h3>Perplexity&apos;s Unique Strengths</h3>

      <ul>
        <li><strong>Search + files:</strong> Combine uploaded documents with real-time web search for comprehensive answers</li>
        <li><strong>Audio/video transcription:</strong> Automatically transcribes uploaded media with speaker identification</li>
        <li><strong>Cloud integrations:</strong> Pro users can attach files directly from Google Workspace</li>
      </ul>

      {/* Which AI Section */}
      <h2>Which AI Has the Best File Upload Support?</h2>

      <p>
        The answer depends on what you need:
      </p>

      <h3>Best for Free Users</h3>

      <p>
        <strong>Gemini Free</strong> wins with 10 files per prompt at 100 MB each &mdash; if you only need documents and images. For code files or spreadsheets on free plans, <strong>ChatGPT Free</strong> supports them but limits you to 3 files/day.
      </p>

      <h3>Best for Developers</h3>

      <p>
        <strong>ChatGPT Plus</strong> or <strong>Claude Pro</strong>. Both support all major code file types. Claude&apos;s larger context window (200K tokens) means it can analyze more code at once. ChatGPT&apos;s higher file count (80/3hrs vs 20/chat) is better for bulk uploads.
      </p>

      <h3>Best for Document Analysis</h3>

      <p>
        <strong>Claude Pro</strong> for PDFs under 100 pages (full visual + text analysis). <strong>Gemini Advanced</strong> for the largest context window (1M tokens) and video/audio support. <strong>Perplexity Pro</strong> if you need to combine documents with web research.
      </p>

      <h3>Best File Size Limit</h3>

      <p>
        <strong>ChatGPT</strong> at 512 MB per file. No other platform comes close &mdash; Claude caps at 30 MB, Gemini at 100 MB, Grok at 48 MB, and Perplexity at ~50 MB.
      </p>

      <h3>Best for Budget</h3>

      <p>
        <strong>Grok Premium</strong> at $8/mo (included with X Premium+) is the cheapest paid option. <strong>ChatGPT Go</strong> at $5.50/mo is next, but it&apos;s more limited in features.
      </p>

      {/* Bypass Limits Section */}
      <h2>How to Bypass File Upload Limits on Any AI</h2>

      <p>
        No matter which platform you use, there&apos;s a universal workaround: <strong>combine all your files into one before uploading</strong>. We wrote a{" "}
        <Link href="/blog/bypass-chatgpt-file-upload-limit-2025" className="text-primary hover:underline">
          step-by-step guide to bypassing ChatGPT&apos;s upload limit
        </Link>{" "}
        that works on every platform.
      </p>

      <p>
        Instead of fighting with per-file limits, per-day caps, and unsupported file types, you can merge everything into a single text file that any AI can read.
      </p>

      <h3>How It Works</h3>

      <ol>
        <li>Go to <a href="https://onefileapp.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">onefileapp.com</a></li>
        <li>Upload your files, folders, or import from GitHub</li>
        <li>OneFile extracts text from all files (including PDFs, DOCX, XLSX, PPTX)</li>
        <li>Download the combined file</li>
        <li>Upload the single file to ChatGPT, Claude, Gemini, or any AI</li>
      </ol>

      <Callout variant="tip">
        <p>
          <strong>This works on every platform&apos;s free plan.</strong> Since you&apos;re uploading a single .txt file, you only use 1 of your file upload slots &mdash; but the AI gets access to all your content.
        </p>
      </Callout>

      <h3>Why Combining Files Works Better Than Uploading Individually</h3>

      <ul>
        <li><strong>No file count limits:</strong> Combine 100+ files into one upload</li>
        <li><strong>Works with unsupported formats:</strong> OneFile extracts text from PPTX, XLSX, and other formats that some AIs can&apos;t read directly</li>
        <li><strong>Preserves file structure:</strong> Each file is clearly labeled with its path, so the AI knows which content belongs to which file</li>
        <li><strong>Works across all platforms:</strong> The same combined file works on ChatGPT, Claude, Gemini, Grok, and Perplexity</li>
        <li><strong>Free and unlimited:</strong> No account required, no usage limits</li>
      </ul>

      {/* FAQ Section */}
      <h2>Frequently Asked Questions</h2>

      <h3>Which AI allows the most file uploads for free?</h3>
      <p>
        Google Gemini allows 10 files per prompt on the free plan, the most of any platform. However, it doesn&apos;t support code files or spreadsheets on the free tier. ChatGPT Free allows only 3 files per day but supports all file types.
      </p>

      <h3>What AI has unlimited file uploads?</h3>
      <p>
        ChatGPT Pro ($200/month) is the only plan with truly unlimited file uploads. Perplexity Pro ($20/mo) offers unlimited daily uploads but caps at 10 files per prompt. For a free alternative, use{" "}
        <Link href="/" className="text-primary hover:underline">OneFile</Link> to combine unlimited files into one upload.
      </p>

      <h3>Can I upload a folder to ChatGPT, Claude, or Gemini?</h3>
      <p>
        No. None of the major AI platforms support direct folder uploads. You must select files individually. To upload entire folders or projects, use{" "}
        <Link href="/" className="text-primary hover:underline">OneFile</Link> to combine the folder contents into a single file first.
      </p>

      <h3>Which AI has the largest file size limit?</h3>
      <p>
        ChatGPT allows files up to 512 MB, the largest of any AI platform. Gemini allows 100 MB (2 GB for video), Grok caps at 48 MB, Perplexity at ~50 MB, and Claude at 30 MB.
      </p>

      <h3>What file types does every AI support?</h3>
      <p>
        PDF, TXT, and images (JPEG, PNG) are supported by all 5 platforms. DOCX is supported by all except some Grok surfaces. CSV is universally supported. XLSX, PPTX, and code files have varying support &mdash; check the comparison table above.
      </p>

      <h3>Is there a free AI with unlimited uploads?</h3>
      <p>
        No AI platform offers unlimited free uploads. The closest is Gemini Free (10 files/prompt, no daily cap mentioned) but with file type restrictions. The practical solution is using{" "}
        <Link href="/" className="text-primary hover:underline">OneFile</Link> to combine unlimited files into a single upload &mdash; it&apos;s free and works on every platform.
      </p>

      <h3>ChatGPT vs Claude: which is better for file uploads?</h3>
      <p>
        ChatGPT has higher file size limits (512 MB vs 30 MB) and more uploads per day (~80 vs 20). Claude has a larger context window (200K vs 128K tokens), meaning it can actually read more text content at once. For large individual files, choose ChatGPT. For analyzing lots of text content, choose Claude.
      </p>

      {/* Conclusion */}
      <h2>Conclusion</h2>

      <p>
        Every AI platform has file upload limitations. ChatGPT leads in file size (512 MB) and volume (~80 files/3hrs on Plus). Claude offers the largest text context window (200K tokens). Gemini uniquely supports video and audio. Grok is the most affordable. Perplexity combines files with web search.
      </p>

      <p>
        But here&apos;s the reality: if you regularly need to upload more than a few files, you&apos;ll hit limits on every platform. The most practical solution is to combine your files before uploading.
      </p>

      <div className="bg-card border border-border rounded-lg p-5 my-6">
        <p className="text-base mb-3"><strong>Skip the limits on any AI platform:</strong></p>
        <ol className="text-sm space-y-1 mb-0 list-decimal list-inside">
          <li>Go to <a href="https://onefileapp.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">onefileapp.com</a></li>
          <li>Upload files, folders, or import from GitHub</li>
          <li>Download the combined file</li>
          <li>Upload to ChatGPT, Claude, Gemini, Grok, or Perplexity</li>
        </ol>
      </div>

      <p>
        Free, open source, no account needed. Works with 50+ file types including PDFs, Office documents, code files, and more.
      </p>
    </>
  );
}
