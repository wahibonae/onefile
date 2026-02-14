import Link from "next/link";
import { Callout } from "@/components/blog/Callout";
import { BlogImage } from "@/components/blog/BlogImage";

export default function BlogPost() {
  return (
    <>
      {/* TL;DR Section */}
      <div className="not-prose rounded-xl border border-border bg-card p-5 mb-8">
        <h3 className="text-md font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          TL;DR
        </h3>
        <p className="text-sm leading-normal text-muted-foreground mb-2">
          ChatGPT limits file uploads based on your plan: <strong>Free</strong>{" "}
          (limited), <strong>Go</strong> (extended), <strong>Plus</strong>{" "}
          (expanded, ~80 files/3hrs), and <strong>Pro</strong> (unlimited). All
          plans have a 512MB file size limit.
        </p>
        <p className="text-sm leading-normal text-muted-foreground">
          <span className="font-medium">Need to upload more?</span> Use{" "}
          <a
            href="https://onefileapp.com"
            className="text-primary bg-primary/10 p-1.5 py-0.5 rounded-sm font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            OneFile
          </a>{" "}
          to combine unlimited files into one, then upload to ChatGPT. Free, no
          account needed.
        </p>
      </div>

      <p>
        Understanding ChatGPT&apos;s file upload limits is essential before you
        start a project that requires analyzing multiple documents, code files,
        or research papers. Nothing is more frustrating than hitting an upload
        wall mid-workflow.
      </p>

      <p>
        This guide covers the exact file upload limits for every ChatGPT plan in
        2025, including the newer Pro and Team tiers, plus practical solutions
        when you need to work with more files than allowed.
      </p>

      {/* Quick Reference Table - Placed early for featured snippets */}
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Plan</th>
              <th className="text-left py-3 px-4 font-semibold">Price</th>
              <th className="text-left py-3 px-4 font-semibold">
                Upload Limit
              </th>
              <th className="text-left py-3 px-4 font-semibold">File Size</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Free</td>
              <td className="py-3 px-4">$0</td>
              <td className="py-3 px-4">3 files/day</td>
              <td className="py-3 px-4">512MB</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Go</td>
              <td className="py-3 px-4">$5.50/mo</td>
              <td className="py-3 px-4">Extended</td>
              <td className="py-3 px-4">512MB</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Plus</td>
              <td className="py-3 px-4">$20/mo</td>
              <td className="py-3 px-4">~80/3hrs, 10/message</td>
              <td className="py-3 px-4">512MB</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                Pro
              </td>
              <td className="py-3 px-4">$200/mo</td>
              <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                Unlimited
              </td>
              <td className="py-3 px-4">512MB</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Team</td>
              <td className="py-3 px-4">$25/user/mo</td>
              <td className="py-3 px-4">~80/3hrs, 10/message</td>
              <td className="py-3 px-4">512MB</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Enterprise</td>
              <td className="py-3 px-4">Custom</td>
              <td className="py-3 px-4">Negotiable</td>
              <td className="py-3 px-4">512MB+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>ChatGPT File Upload Limits by Plan</h2>

      <p>
        OpenAI has different file upload restrictions depending on which ChatGPT
        plan you&apos;re on. Here&apos;s the complete breakdown:
      </p>

      <BlogImage
        src="/blog/chatgpt-plans-comparison.webp"
        alt="ChatGPT plans comparison showing file upload limits for Free, Plus, Pro, Team, and Enterprise tiers"
        caption="ChatGPT pricing tiers and their respective file upload capabilities"
      />

      <h3>ChatGPT Free Plan Limits</h3>

      <ul>
        <li>
          <strong>Files per day:</strong> 3 files maximum
        </li>
        <li>
          <strong>File size limit:</strong> 512MB per file
        </li>
        <li>
          <strong>Reset time:</strong> Limit resets every 24 hours
        </li>
      </ul>

      <p>
        The Free plan is the most restrictive. If you&apos;re analyzing research
        papers, reviewing code, or working with multiple documents, you&apos;ll
        hit this limit within minutes.
      </p>

      <Callout variant="warning">
        <p>
          <strong>Note:</strong> During peak usage hours, OpenAI may temporarily
          reduce these limits further to maintain server performance.
        </p>
      </Callout>

      <h3>ChatGPT Go Limits ($5.50/month)</h3>

      <ul>
        <li>
          <strong>File uploads:</strong> Extended access (more than Free)
        </li>
        <li>
          <strong>File size limit:</strong> 512MB per file
        </li>
        <li>
          <strong>Data analysis:</strong> Extended access to advanced data
          analysis
        </li>
        <li>
          <strong>Availability:</strong> Only available in certain regions
        </li>
      </ul>

      <p>
        Go is a newer mid-tier plan that bridges the gap between Free and Plus.
        It offers extended file upload access at a lower price point, making it
        a good option for users who need more than the Free tier but don&apos;t
        need all the Plus features.
      </p>

      <h3>ChatGPT Plus Limits ($20/month)</h3>

      <ul>
        <li>
          <strong>Files per 3 hours:</strong> 80 files (rolling window)
        </li>
        <li>
          <strong>File size limit:</strong> 512MB per file
        </li>
        <li>
          <strong>Image uploads:</strong> 20MB per image
        </li>
        <li>
          <strong>Spreadsheets:</strong> 50MB per file (Excel/CSV)
        </li>
        <li>
          <strong>Total storage:</strong> 10GB across all conversations
        </li>
      </ul>

      <p>
        Plus offers significantly more uploads than Free, but 80 files every 3
        hours can still be restrictive for large codebases or document
        collections with hundreds of files.
      </p>

      <h3>ChatGPT Pro Limits ($200/month)</h3>

      <ul>
        <li>
          <strong>File uploads:</strong> Unlimited (subject to abuse guardrails)
        </li>
        <li>
          <strong>File size limit:</strong> 512MB per file
        </li>
        <li>
          <strong>Additional features:</strong> Pro reasoning with GPT-5.2 Pro,
          maximum deep research, expanded Codex agent
        </li>
      </ul>

      <p>
        Pro is the only plan with truly unlimited file uploads. If you regularly
        work with large document collections or need to upload hundreds of files
        without hitting limits, Pro removes that friction entirely.
      </p>

      <Callout variant="info">
        <p>
          <strong>Key insight:</strong> ChatGPT Pro is the only plan with
          unlimited uploads. If file uploads are your main concern and you have
          the budget, Pro eliminates all upload restrictions.
        </p>
      </Callout>

      <h3>ChatGPT Team Limits ($25/user/month)</h3>

      <ul>
        <li>
          <strong>Files per 3 hours:</strong> 80 files (rolling window)
        </li>
        <li>
          <strong>File size limit:</strong> 512MB per file
        </li>
        <li>
          <strong>Workspace features:</strong> Shared conversations, admin
          controls
        </li>
        <li>
          <strong>Data privacy:</strong> Business data not used for training
        </li>
      </ul>

      <p>
        Team (formerly ChatGPT Business) offers the same upload limits as Plus,
        but with added workspace collaboration and privacy features.
      </p>

      <h3>ChatGPT Enterprise Limits (Custom Pricing)</h3>

      <ul>
        <li>
          <strong>Files per 3 hours:</strong> Higher limits (negotiable)
        </li>
        <li>
          <strong>File size limit:</strong> 512MB+ (negotiable)
        </li>
        <li>
          <strong>Custom features:</strong> SSO, audit logs, dedicated support,
          expanded context
        </li>
      </ul>

      <p>
        Enterprise offers the most flexibility with negotiable limits, but
        requires custom pricing discussions with OpenAI&apos;s sales team.
      </p>

      <h2>ChatGPT File Size and Format Limits</h2>

      <p>
        Beyond the number of files, ChatGPT also restricts file types and sizes:
      </p>

      <h3>Maximum File Sizes</h3>

      <ul>
        <li>
          <strong>General documents:</strong> 512MB per file
        </li>
        <li>
          <strong>Images:</strong> 20MB per image (PNG, JPG, GIF, WEBP)
        </li>
        <li>
          <strong>Spreadsheets:</strong> 50MB per file (Excel, CSV)
        </li>
        <li>
          <strong>Text files:</strong> 2 million tokens maximum
        </li>
      </ul>

      <h3>Supported File Formats</h3>

      <p>ChatGPT accepts these file types:</p>

      <ul>
        <li>
          <strong>Documents:</strong> PDF, DOCX, DOC, PPTX, PPT, TXT, RTF, ODT
        </li>
        <li>
          <strong>Spreadsheets:</strong> XLSX, XLS, CSV
        </li>
        <li>
          <strong>Code:</strong> Most programming languages (JS, PY, TS, Java,
          C, etc.)
        </li>
        <li>
          <strong>Images:</strong> PNG, JPG, JPEG, GIF, WEBP
        </li>
        <li>
          <strong>Data:</strong> JSON, XML, HTML
        </li>
      </ul>

      <Callout variant="warning">
        <p>
          <strong>Not supported:</strong> Video files, audio files, executable
          files (.exe, .app), and encrypted/password-protected documents cannot
          be uploaded to ChatGPT.
        </p>
      </Callout>

      <h2>How the Rolling Window Works</h2>

      <p>
        ChatGPT Plus, Pro, and Team use a <strong>3-hour rolling window</strong>{" "}
        for file uploads. Here&apos;s how it works:
      </p>

      <ul>
        <li>
          If you upload 80 files at 2:00 PM, you can&apos;t upload more until
          5:00 PM
        </li>
        <li>
          The window rolls forward, so files uploaded at 2:00 PM
          &quot;expire&quot; at 5:00 PM
        </li>
        <li>
          You don&apos;t have to wait for the full reset - capacity becomes
          available as older uploads age out
        </li>
      </ul>

      <p>
        This is more generous than a fixed daily limit, but can still be
        restrictive during intensive work sessions.
      </p>

      <h2>Why Does ChatGPT Limit File Uploads?</h2>

      <p>
        ChatGPT&apos;s file limits exist for several technical and business
        reasons:
      </p>

      <h3>Context Window Constraints</h3>

      <p>
        ChatGPT&apos;s context window can only handle a limited amount of text
        at once. More files mean more tokens, which can exceed processing
        limits.
      </p>

      <h3>Server Processing Costs</h3>

      <p>
        Processing files (especially PDFs with images or complex spreadsheets)
        requires significant server resources. Limiting uploads helps OpenAI
        manage infrastructure costs.
      </p>

      <h3>Storage Limitations</h3>

      <p>
        With millions of users, storing files adds up. The 10GB storage limit
        per user (on Plus) helps keep costs manageable.
      </p>

      <h2>How to Upload More Files to ChatGPT</h2>

      <p>
        If ChatGPT&apos;s file limits are blocking your workflow, here are
        practical solutions:
      </p>

      <h3>Option 1: Combine Files Before Uploading (Recommended)</h3>

      <p>
        The most effective workaround is to merge multiple files into a single
        file before uploading. ChatGPT counts files, not content. One file
        containing 100 documents counts as one upload.
      </p>

      <p>
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        is a free tool that does exactly this:
      </p>

      <ol>
        <li>
          Go to{" "}
          <a
            href="https://onefileapp.com"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            onefileapp.com
          </a>
        </li>
        <li>Drag and drop your files or folders (or import from GitHub)</li>
        <li>Download the combined output as a single .txt file</li>
        <li>Upload to ChatGPT and ask questions about any of your files</li>
      </ol>

      <Callout variant="tip">
        <p>
          <strong>Pro tip:</strong> OneFile automatically skips unnecessary
          files like node_modules, .git folders, and build artifacts. It also
          respects .gitignore rules for cleaner output.
        </p>
      </Callout>

      <p>
        For a detailed step-by-step guide with tips, see our{" "}
        <Link
          href="/blog/bypass-chatgpt-file-upload-limit-2025"
          className="text-primary hover:underline"
        >
          complete guide to bypassing ChatGPT&apos;s file upload limit
        </Link>
        .
      </p>

      <h3>Option 2: Batch Your Uploads</h3>

      <p>
        If you can&apos;t combine files, upload in batches across multiple
        messages. Reference previous uploads in your prompts to maintain
        context.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How many files can I upload to ChatGPT for free?</h3>
      <p>
        ChatGPT Free allows 3 file uploads per day. This limit resets every 24
        hours.
      </p>

      <h3>What is the ChatGPT Plus file upload limit?</h3>
      <p>
        ChatGPT Plus allows 80 files per 3-hour rolling window. Each file can be
        up to 512MB.
      </p>

      <h3>Does ChatGPT Pro have higher file limits than Plus?</h3>
      <p>
        Yes! ChatGPT Pro ($200/month) offers unlimited file uploads, while Plus
        is capped at around 80 files per 3-hour window. Pro is the only plan
        with truly unlimited uploads.
      </p>

      <h3>When does the ChatGPT file upload limit reset?</h3>
      <p>
        For Free users, the 3-file limit resets every 24 hours. For paid plans,
        the 80-file limit uses a rolling 3-hour window that continuously
        refreshes.
      </p>

      <h3>Can I upload a ZIP file to ChatGPT?</h3>
      <p>
        ChatGPT can accept ZIP files, but extraction and processing can be
        unreliable. For code projects, combining files into a readable text
        format with a tool like OneFile produces better results.
      </p>

      <h3>
        Why does ChatGPT say &quot;You&apos;ve reached your file upload
        limit&quot;?
      </h3>
      <p>
        This error appears when you&apos;ve exceeded your plan&apos;s upload
        allowance. Free users see this after 3 files/day; paid users see it
        after 80 files in a 3-hour window.
      </p>

      <h3>Is there an AI with unlimited file uploads?</h3>
      <p>
        ChatGPT Pro ($200/month) offers unlimited file uploads. For other plans
        or platforms with limits, you can effectively bypass restrictions by
        combining multiple files into one before uploading.{" "}
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        makes this easy and free.
      </p>

      <h2>Summary: ChatGPT File Upload Limits at a Glance</h2>

      <div className="bg-card border border-border rounded-lg p-5 my-6">
        <ul className="text-sm space-y-2 mb-0">
          <li>
            <strong>Free:</strong> Limited uploads (~3/day), 512MB/file
          </li>
          <li>
            <strong>Go ($5.50/mo):</strong> Extended uploads, 512MB/file
          </li>
          <li>
            <strong>Plus ($20/mo):</strong> Expanded uploads (~80/3hrs),
            512MB/file
          </li>
          <li>
            <strong>Pro ($200/mo):</strong> Unlimited uploads, 512MB/file
          </li>
          <li>
            <strong>Team ($25/user/mo):</strong> Expanded uploads (~80/3hrs),
            512MB/file
          </li>
          <li>
            <strong>Enterprise:</strong> Custom/negotiable limits
          </li>
        </ul>
      </div>

      <p>
        While ChatGPT Pro offers unlimited uploads, most users are on Free, Go,
        or Plus plans where limits apply. If you don&apos;t want to pay
        $200/month for Pro, combining files before upload is the most practical
        solution.
      </p>

      <p>
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        lets you combine unlimited files for free, no account required. Upload
        entire folders, codebases, or document collections, then send one file
        to ChatGPT with all your content intact.
      </p>
    </>
  );
}
