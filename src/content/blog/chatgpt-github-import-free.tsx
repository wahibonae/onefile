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
          ChatGPT&apos;s GitHub connector is only available on paid plans (Plus,
          Pro, Team, Enterprise). Free and Go users can&apos;t import
          repositories directly.
        </p>
        <p className="text-sm leading-normal text-muted-foreground">
          <span className="font-medium">Free solution:</span>{" "}
          <a
            href="https://onefileapp.com"
            className="text-primary bg-primary/10 p-1.5 py-0.5 rounded-sm font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            OneFile
          </a>{" "}
          lets you import any GitHub repository and convert it to a single file
          you can upload to ChatGPT. Free, no account required.
        </p>
      </div>

      <p>
        OpenAI launched the GitHub connector for ChatGPT in May 2025, letting
        users analyze code repositories directly within ChatGPT. There&apos;s
        one catch: <strong>it&apos;s only available on paid plans</strong>.
      </p>

      <p>
        If you&apos;re on ChatGPT Free or Go, you&apos;ll see the GitHub option
        but can&apos;t use it. This guide shows you how to import any GitHub
        repository to ChatGPT for free.
      </p>

      <h2>Which ChatGPT Plans Have GitHub Access?</h2>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Plan</th>
              <th className="text-left py-3 px-4 font-semibold">Price</th>
              <th className="text-left py-3 px-4 font-semibold">
                GitHub Access
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Free</td>
              <td className="py-3 px-4">$0</td>
              <td className="py-3 px-4 text-red-500">❌ No</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Go</td>
              <td className="py-3 px-4">$15/mo</td>
              <td className="py-3 px-4 text-red-500">❌ No</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Plus</td>
              <td className="py-3 px-4">$20/mo</td>
              <td className="py-3 px-4 text-green-500">✅ Yes</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Pro</td>
              <td className="py-3 px-4">$200/mo</td>
              <td className="py-3 px-4 text-green-500">✅ Yes</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Team</td>
              <td className="py-3 px-4">$25/user/mo</td>
              <td className="py-3 px-4 text-green-500">✅ Yes</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Enterprise</td>
              <td className="py-3 px-4">Custom</td>
              <td className="py-3 px-4 text-green-500">✅ Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        That&apos;s $20/month minimum just to analyze your own code. For
        students, hobbyists, or developers who occasionally need AI code review,
        that&apos;s a steep price. (See our{" "}
        <Link
          href="/blog/chatgpt-file-upload-limits-2025"
          className="text-primary hover:underline"
        >
          complete guide to ChatGPT file upload limits
        </Link>{" "}
        for all plan details.)
      </p>

      <h2>The Free Alternative: OneFile</h2>

      <p>
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        is a free, open-source tool that converts any GitHub repository into a
        single text file. You can then upload this file to ChatGPT (or any AI)
        for analysis.
      </p>

      <h3>Why OneFile Works</h3>

      <ul>
        <li>
          <strong>100% free</strong>: No subscription, no limits, no hidden
          costs
        </li>
        <li>
          <strong>No account required</strong>: Works instantly in your browser
        </li>
        <li>
          <strong>GitHub integration</strong>: Import any public repo with one
          click
        </li>
        <li>
          <strong>Smart filtering</strong>: Automatically skips node_modules,
          .git, build folders
        </li>
        <li>
          <strong>Respects .gitignore</strong>: Only includes relevant source
          files
        </li>
        <li>
          <strong>Works everywhere</strong>: ChatGPT, Claude, Gemini, any AI
          platform
        </li>
      </ul>

      <Callout variant="tip">
        <p>
          OneFile is open source. You can verify exactly how it works on{" "}
          <a
            href="https://github.com/wahibonae/onefile"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </Callout>

      <h2>How to Import GitHub to ChatGPT (Free)</h2>

      <p>Here&apos;s the step-by-step process:</p>

      <h3>Step 1: Go to OneFile</h3>

      <p>
        Visit{" "}
        <a
          href="https://onefileapp.com"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          onefileapp.com
        </a>
        . No download or installation needed.
      </p>

      <h3>Step 2: Import Your Repository</h3>

      <p>You have two options:</p>

      <ul>
        <li>
          <strong>Sign in with GitHub</strong>: Click &quot;Import from
          GitHub&quot; and select your repository
        </li>
        <li>
          <strong>Upload manually</strong>: Clone your repo locally, then drag
          the folder into OneFile
        </li>
      </ul>

      <p>
        OneFile automatically filters out dependencies, build artifacts, and
        binary files. Only source code and documentation are included.
      </p>

      <h3>Step 3: Download the Combined File</h3>

      <p>
        Click <strong>&quot;Download&quot;</strong> to save the combined output
        as a .txt file. This single file contains your entire repository in an
        AI-readable format.
      </p>

      <h3>Step 4: Upload to ChatGPT</h3>

      <p>
        Open ChatGPT, click the attachment icon, and upload your downloaded
        file. Then ask ChatGPT to analyze, review, or explain your code.
      </p>

      <CodeBlock>
        <strong>Example prompt:</strong>
        <br />
        &quot;I&apos;ve uploaded my entire repository. Please review the code
        architecture, identify potential bugs, and suggest improvements.&quot;
      </CodeBlock>

      <Callout variant="success">
        <p>
          That&apos;s it. You&apos;ve just imported a GitHub repository to
          ChatGPT without paying $20/month.
        </p>
      </Callout>

      <h2>OneFile vs ChatGPT GitHub Connector</h2>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Feature</th>
              <th className="text-left py-3 px-4 font-semibold">
                ChatGPT Connector
              </th>
              <th className="text-left py-3 px-4 font-semibold">OneFile</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Price</td>
              <td className="py-3 px-4">$20+/month</td>
              <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                Free
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Account required</td>
              <td className="py-3 px-4">Yes (paid)</td>
              <td className="py-3 px-4">No</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Works with Claude/Gemini</td>
              <td className="py-3 px-4">No</td>
              <td className="py-3 px-4">Yes</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Private repos</td>
              <td className="py-3 px-4">Yes</td>
              <td className="py-3 px-4">Available Soon</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Auto-filter dependencies</td>
              <td className="py-3 px-4">Unknown</td>
              <td className="py-3 px-4">Yes</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Open source</td>
              <td className="py-3 px-4">No</td>
              <td className="py-3 px-4">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Common Use Cases</h2>

      <h3>Code Review</h3>
      <p>
        Import your project and ask ChatGPT to review for bugs, security issues,
        or performance problems. Works great for pull request preparation.
      </p>

      <h3>Understanding New Codebases</h3>
      <p>
        Starting on a new project? Import the repo and ask ChatGPT to explain
        the architecture, key components, and how different parts connect.
      </p>

      <h3>Documentation Generation</h3>
      <p>
        Give ChatGPT your entire codebase and ask it to generate README files,
        API documentation, or inline comments.
      </p>

      <h3>Learning from Open Source</h3>
      <p>
        Found an interesting project on GitHub? Import it and ask ChatGPT to
        explain how specific features are implemented.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is this against ChatGPT&apos;s Terms of Service?</h3>
      <p>
        No. You&apos;re simply pasting or uploading text content, which is a
        standard ChatGPT feature available to all users.
      </p>

      <h3>Can I import private repositories?</h3>
      <p>
        Yes. Sign in with GitHub on OneFile to access your private repos. Your
        code is processed in your browser and never stored on our servers.
      </p>

      <h3>What about large repositories?</h3>
      <p>
        ChatGPT has a context limit (~128K tokens). For very large codebases,
        consider importing only the relevant directories or splitting into
        multiple conversations. You can also use OneFile to{" "}
        <Link
          href="/blog/bypass-chatgpt-file-upload-limit-2025"
          className="text-primary hover:underline"
        >
          bypass ChatGPT&apos;s file upload limits
        </Link>
        .
      </p>

      <h3>Does this work with Claude and Gemini?</h3>
      <p>
        Yes. OneFile&apos;s output works with any AI that accepts text input:
        Claude, Gemini, Grok, Perplexity, local LLMs, and more.
      </p>

      <h2>Conclusion</h2>

      <p>
        ChatGPT&apos;s GitHub connector is locked behind a $20/month paywall. If
        you just need to analyze code with AI occasionally, that&apos;s an
        unnecessary expense.
      </p>

      <p>
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        gives you the same capability for free. Import any GitHub repository,
        get a single combined file, and upload it to ChatGPT in under 30
        seconds.
      </p>

      <div className="bg-card border border-border rounded-lg p-5 my-6">
        <p className="text-base mb-3">
          <strong>Quick steps:</strong>
        </p>
        <ol className="text-sm space-y-1 mb-0 list-decimal list-inside">
          <li>
            Go to{" "}
            <a
              href="https://onefileapp.com"
              className="text-primary hover:underline"
            >
              onefileapp.com
            </a>
          </li>
          <li>Import your GitHub repository</li>
          <li>Download the combined file</li>
          <li>Upload to ChatGPT and start asking questions</li>
        </ol>
      </div>

      <p>Free, open source, no account required. That&apos;s it.</p>
    </>
  );
}
