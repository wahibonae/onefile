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
          <strong>ChatGPT Free:</strong> 3 files per day.{" "}
          <strong>ChatGPT Plus:</strong> ~80 files per 3 hours (10 per message).{" "}
          <strong>ChatGPT Pro:</strong> Unlimited.
        </p>
        <p className="text-sm leading-normal text-muted-foreground">
          <span className="font-medium">Need more?</span> Use{" "}
          <a
            href="https://onefileapp.com"
            className="text-primary bg-primary/10 p-1.5 py-0.5 rounded-sm font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            OneFile
          </a>{" "}
          to combine unlimited files into one, then upload to ChatGPT. Free,
          works on any plan.
        </p>
      </div>

      <p>
        <strong>How many files can you upload to ChatGPT?</strong> It depends on
        your plan. ChatGPT Free allows 3 files per day. ChatGPT Plus allows
        approximately 80 files per 3-hour window. ChatGPT Pro allows unlimited
        uploads.
      </p>

      <p>
        This guide covers the exact file upload limits for every ChatGPT plan in
        2026, including per-message limits, daily caps, and file size
        restrictions.
      </p>

      {/* Quick Answer Table - Early for featured snippets */}
      <h2>ChatGPT File Upload Limits (2026)</h2>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Plan</th>
              <th className="text-left py-3 px-4 font-semibold">Price</th>
              <th className="text-left py-3 px-4 font-semibold">
                Files You Can Upload
              </th>
              <th className="text-left py-3 px-4 font-semibold">Per Message</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Free</td>
              <td className="py-3 px-4">$0</td>
              <td className="py-3 px-4">3 files/day</td>
              <td className="py-3 px-4">3 files</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Go</td>
              <td className="py-3 px-4">$5.50/mo</td>
              <td className="py-3 px-4">Extended (more than Free)</td>
              <td className="py-3 px-4">~10 files</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Plus</td>
              <td className="py-3 px-4">$20/mo</td>
              <td className="py-3 px-4">~80 files/3 hours</td>
              <td className="py-3 px-4">10 files</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                Pro
              </td>
              <td className="py-3 px-4">$200/mo</td>
              <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                Unlimited
              </td>
              <td className="py-3 px-4">Unlimited</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Team</td>
              <td className="py-3 px-4">$25/user/mo</td>
              <td className="py-3 px-4">~80 files/3 hours</td>
              <td className="py-3 px-4">10 files</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Enterprise</td>
              <td className="py-3 px-4">Custom</td>
              <td className="py-3 px-4">Negotiable</td>
              <td className="py-3 px-4">Negotiable</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>ChatGPT Free: 3 Files Per Day</h2>

      <p>
        On ChatGPT&apos;s free plan, you can upload{" "}
        <strong>3 files per day</strong>. This limit resets every 24 hours.
      </p>

      <ul>
        <li>
          <strong>Daily limit:</strong> 3 files total
        </li>
        <li>
          <strong>Per message:</strong> Up to 3 files
        </li>
        <li>
          <strong>File size:</strong> 512MB per file
        </li>
        <li>
          <strong>Reset:</strong> Every 24 hours
        </li>
      </ul>

      <p>
        Once you hit the limit, you&apos;ll see the error:{" "}
        <em>&quot;You&apos;ve reached your file upload limit.&quot;</em>{" "}
        You&apos;ll need to wait until the next day or upgrade your plan.
      </p>

      <Callout variant="warning">
        <p>
          <strong>Note:</strong> The 3-file limit counts all file types - PDFs,
          documents, code files, images. Each upload uses one of your 3 daily
          slots.
        </p>
      </Callout>

      <h2>ChatGPT Plus: ~80 Files Per 3 Hours</h2>

      <p>ChatGPT Plus ($20/month) significantly increases your upload limit:</p>

      <ul>
        <li>
          <strong>Rolling limit:</strong> ~80 files per 3-hour window
        </li>
        <li>
          <strong>Per message:</strong> 10 files maximum
        </li>
        <li>
          <strong>File size:</strong> 512MB per file
        </li>
        <li>
          <strong>Reset:</strong> Rolling 3-hour window (not a hard reset)
        </li>
      </ul>

      <h3>How the Rolling Window Works</h3>

      <p>
        Unlike the Free plan&apos;s daily reset, Plus uses a{" "}
        <strong>rolling 3-hour window</strong>:
      </p>

      <ul>
        <li>
          Upload 80 files at 2:00 PM → can&apos;t upload more until 5:00 PM
        </li>
        <li>
          As time passes, older uploads &quot;expire&quot; and free up capacity
        </li>
        <li>
          You don&apos;t have to wait for a full reset - capacity becomes
          available gradually
        </li>
      </ul>

      <h3>The 10-File Per Message Limit</h3>

      <p>
        Even with Plus, you can only attach{" "}
        <strong>10 files per message</strong>. For larger projects, you&apos;ll
        need to upload in batches across multiple messages.
      </p>

      <Callout variant="info">
        <p>
          <strong>Example:</strong> To upload 50 files with Plus, you&apos;d
          need to send 5 separate messages with 10 files each. This is tedious
          for large codebases.
        </p>
      </Callout>

      <h2>ChatGPT Pro: Unlimited Uploads</h2>

      <p>
        ChatGPT Pro ($200/month) is the only plan with truly unlimited file
        uploads:
      </p>

      <ul>
        <li>
          <strong>Upload limit:</strong> Unlimited (subject to abuse guardrails)
        </li>
        <li>
          <strong>Per message:</strong> No practical limit
        </li>
        <li>
          <strong>File size:</strong> 512MB per file
        </li>
        <li>
          <strong>Additional perks:</strong> Unlimited GPT-5.2 and advanced
          reasoning features
        </li>
      </ul>

      <p>
        At $200/month ($2,400/year), Pro is designed for power users and
        professionals who need heavy AI usage without restrictions.
      </p>

      <h2>File Size Limits (All Plans)</h2>

      <p>Regardless of your plan, ChatGPT has file size restrictions:</p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">File Type</th>
              <th className="text-left py-3 px-4 font-semibold">
                Maximum Size
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Documents (PDF, DOCX, TXT, etc.)</td>
              <td className="py-3 px-4">512MB</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Images (PNG, JPG, GIF, WEBP)</td>
              <td className="py-3 px-4">20MB</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Spreadsheets (XLSX, CSV)</td>
              <td className="py-3 px-4">50MB</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Text content</td>
              <td className="py-3 px-4">~2 million tokens</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Supported File Types</h2>

      <p>ChatGPT accepts these file formats:</p>

      <ul>
        <li>
          <strong>Documents:</strong> PDF, DOCX, DOC, PPTX, PPT, TXT, RTF, ODT
        </li>
        <li>
          <strong>Spreadsheets:</strong> XLSX, XLS, CSV
        </li>
        <li>
          <strong>Code:</strong> JS, TS, PY, Java, C, C++, Go, Rust, Ruby, PHP,
          and more
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
          <strong>Not supported:</strong> Video files, audio files, executables
          (.exe, .app), and password-protected documents.
        </p>
      </Callout>

      <h2>How to Upload More Files Than Your Limit</h2>

      <p>
        If ChatGPT&apos;s limits are blocking your workflow, you have a few
        options:
      </p>

      <h3>Option 1: Combine Files (Recommended)</h3>

      <p>
        The most effective workaround:{" "}
        <strong>merge multiple files into one before uploading</strong>. ChatGPT
        counts files, not content. One file containing 100 documents counts as
        one upload.
      </p>

      <p>
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        does this automatically:
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
        <li>Upload your files or folders (or import from GitHub)</li>
        <li>Download the combined output as a single file</li>
        <li>Upload to ChatGPT - all your content in one file</li>
      </ol>

      <p>
        This works on any plan, including Free. Combine 100 files into one,
        upload it, and ChatGPT can analyze all of them.
      </p>

      <h3>Option 2: Upgrade Your Plan</h3>

      <ul>
        <li>
          <strong>Free → Plus ($20/mo):</strong> Goes from 3 files/day to ~80
          files/3 hours
        </li>
        <li>
          <strong>Plus → Pro ($200/mo):</strong> Truly unlimited uploads
        </li>
      </ul>

      <p>
        See our{" "}
        <Link
          href="/blog/onefile-vs-chatgpt-plus-file-uploads"
          className="text-primary hover:underline"
        >
          OneFile vs. ChatGPT Plus comparison
        </Link>{" "}
        to decide if upgrading is worth it for your use case.
      </p>

      <h3>Option 3: Batch Your Uploads</h3>

      <p>
        If you&apos;re on Plus or higher, upload in batches of 10 files across
        multiple messages. Reference previous uploads in your prompts to
        maintain context.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How many files can I upload to ChatGPT for free?</h3>
      <p>
        ChatGPT Free allows 3 file uploads per day. The limit resets every 24
        hours.
      </p>

      <h3>How many files can ChatGPT Plus users upload?</h3>
      <p>
        ChatGPT Plus users can upload approximately 80 files per 3-hour rolling
        window, with a maximum of 10 files per message.
      </p>

      <h3>
        Why does ChatGPT say &quot;You&apos;ve reached your file upload
        limit&quot;?
      </h3>
      <p>
        This error appears when you&apos;ve hit your plan&apos;s upload cap.
        Free users see it after 3 files per day. Plus users see it after ~80
        files in 3 hours. Wait for the limit to reset, upgrade your plan, or use{" "}
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        to combine files.
      </p>

      <h3>Can I upload a folder to ChatGPT?</h3>
      <p>
        No, ChatGPT doesn&apos;t support folder uploads directly. You need to
        select files individually. However, you can use OneFile to upload entire
        folders, combine them into one file, and then upload that to ChatGPT.
      </p>

      <h3>What&apos;s the maximum file size for ChatGPT?</h3>
      <p>
        512MB per file for documents, 20MB for images, and 50MB for
        spreadsheets. These limits apply to all plans.
      </p>

      <h3>How do I upload more than 10 files to ChatGPT at once?</h3>
      <p>
        ChatGPT limits you to 10 files per message (on Plus/Pro). To upload more
        at once, combine your files into a single file using{" "}
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>
        , then upload that one file containing all your content.
      </p>

      <h3>Does ChatGPT Pro really have unlimited uploads?</h3>
      <p>
        Yes, ChatGPT Pro ($200/month) has no explicit file upload limits.
        However, OpenAI may throttle extreme usage to prevent abuse.
      </p>

      <h2>Summary</h2>

      <div className="bg-card border border-border rounded-lg p-5 my-6">
        <ul className="text-sm space-y-2 mb-0">
          <li>
            <strong>ChatGPT Free:</strong> 3 files per day, resets every 24
            hours
          </li>
          <li>
            <strong>ChatGPT Go:</strong> Extended uploads (more than Free)
          </li>
          <li>
            <strong>ChatGPT Plus:</strong> ~80 files per 3 hours, 10 per message
          </li>
          <li>
            <strong>ChatGPT Pro:</strong> Unlimited uploads
          </li>
          <li>
            <strong>All plans:</strong> 512MB max file size
          </li>
        </ul>
      </div>

      <p>
        If you need to upload more files than your plan allows, the easiest
        solution is to{" "}
        <Link href="/" className="text-primary hover:underline">
          combine your files into one
        </Link>{" "}
        before uploading. This works on any plan and costs nothing.
      </p>

      <p>
        For a complete breakdown of all limits including message caps and
        feature access, see our{" "}
        <Link
          href="/blog/chatgpt-file-upload-limits-2025"
          className="text-primary hover:underline"
        >
          ChatGPT File Upload Limits 2025 guide
        </Link>
        .
      </p>
    </>
  );
}
