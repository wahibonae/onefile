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
          AI can generate documentation for your entire codebase in minutes. The best approaches: dedicated tools like <strong>Mintlify</strong> and <strong>DocuWriter.ai</strong>, AI coding assistants like <strong>Cursor</strong> and <strong>Claude Code</strong>, or general-purpose AI like ChatGPT/Claude with your codebase uploaded.
        </p>
        <p className="text-sm leading-normal text-muted-foreground">
          <span className="font-medium">Quick workflow:</span> Use{" "}
          <a
            href="https://www.onefileapp.com"
            className="text-primary bg-primary/10 p-1.5 py-0.5 rounded-sm font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            OneFile
          </a>
          {" "}to combine your codebase into one file, upload to any AI, and generate docs with a single prompt.
        </p>
      </div>

      <p>
        Documentation is the least favorite task for most developers. It&apos;s tedious, time-consuming, and often outdated the moment you finish writing it.
      </p>

      <p>
        But in 2025, AI has fundamentally changed how we approach documentation. You can now generate comprehensive, accurate documentation for an entire codebase in minutes, not days.
      </p>

      <p>
        This guide covers every practical method to generate documentation from code using AI, from dedicated documentation platforms to prompts you can use with any AI assistant.
      </p>

      <h2>Why AI-Generated Documentation Works</h2>

      <p>
        Before diving into tools, let&apos;s address the skepticism: <em>Can AI really write good documentation?</em>
      </p>

      <p>
        The answer is yes, with caveats. AI excels at:
      </p>

      <ul>
        <li><strong>Describing what code does</strong>: Function signatures, parameters, return types</li>
        <li><strong>Explaining logic flow</strong>: How different parts connect and interact</li>
        <li><strong>Generating consistent formatting</strong>: JSDoc, docstrings, markdown</li>
        <li><strong>Creating boilerplate docs</strong>: README files, API references, setup guides</li>
      </ul>

      <p>
        AI struggles with:
      </p>

      <ul>
        <li><strong>Business context</strong>: Why certain decisions were made</li>
        <li><strong>Edge cases</strong>: Subtle behaviors that aren&apos;t obvious from code</li>
        <li><strong>Institutional knowledge</strong>: Historical context, deprecated approaches</li>
      </ul>

      <p>
        The best approach: use AI to generate the 80% of documentation that&apos;s mechanical, then spend your time on the 20% that requires human context.
      </p>

      <h2>Method 1: Dedicated Documentation Platforms</h2>

      <p>
        If documentation is a serious need for your team, dedicated platforms offer the most polished experience.
      </p>

      <h3>Mintlify</h3>

      <p>
        <a href="https://mintlify.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Mintlify</a> is used by companies like Anthropic, Cursor, and Perplexity for their public documentation. It&apos;s an AI-powered documentation platform that creates beautiful, searchable docs.
      </p>

      <p><strong>Key features:</strong></p>

      <ul>
        <li><strong>AI writing assistant</strong>: Generate and improve documentation with AI suggestions</li>
        <li><strong>Git-based workflow</strong>: Docs live in your repo, update with your code</li>
        <li><strong>API reference generation</strong>: Automatically generate docs from OpenAPI specs</li>
        <li><strong>Beautiful templates</strong>: Professional design out of the box</li>
        <li><strong>Search powered by AI</strong>: Users can ask questions, not just search keywords</li>
      </ul>

      <p><strong>Best for:</strong> Teams building public-facing documentation, API references, and developer portals.</p>

      <p><strong>How to use:</strong></p>

      <ol>
        <li>Connect your GitHub repository to Mintlify</li>
        <li>Add a <code>docs/</code> folder with markdown files</li>
        <li>Use Mintlify&apos;s AI to generate initial content from your codebase</li>
        <li>Customize and refine with their visual editor</li>
        <li>Deploy (docs auto-update when you push to Git)</li>
      </ol>

      <Callout variant="tip">
        <p>
          Mintlify offers a generous free tier for open-source projects. If you&apos;re building in public, start there.
        </p>
      </Callout>

      <h3>DocuWriter.ai</h3>

      <p>
        <a href="https://www.docuwriter.ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">DocuWriter.ai</a> focuses specifically on generating code documentation and API docs from source files.
      </p>

      <p><strong>Key features:</strong></p>

      <ul>
        <li><strong>Code documentation generation</strong>: Analyzes source files and generates inline docs</li>
        <li><strong>API documentation</strong>: Creates comprehensive API references</li>
        <li><strong>Multiple languages</strong>: Supports JavaScript, Python, Java, Go, and more</li>
        <li><strong>GitHub integration</strong>: Import repositories directly</li>
        <li><strong>Export options</strong>: Markdown, HTML, or integrate with your existing docs</li>
      </ul>

      <p><strong>Best for:</strong> Generating technical documentation quickly, especially inline code comments and API references.</p>

      <p><strong>Workflow with OneFile:</strong></p>

      <p>
        Before generating documentation with DocuWriter.ai, you can use{" "}
        <Link href="/" className="text-primary hover:underline">OneFile</Link> to prepare your codebase:
      </p>

      <ol>
        <li>Go to <a href="https://www.onefileapp.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">onefileapp.com</a> and upload your project folder (or import from GitHub)</li>
        <li>Download the combined file</li>
        <li>Upload to DocuWriter.ai for analysis</li>
        <li>Review generated documentation and export</li>
      </ol>

      <p>
        Alternatively, DocuWriter.ai supports direct GitHub import.
      </p>

      <h2>Method 2: AI Coding Assistants</h2>

      <p>
        If you already use an AI coding assistant, you have powerful documentation capabilities built in. These tools understand your codebase context and can generate docs inline as you work.
      </p>

      <h3>Cursor</h3>

      <p>
        <a href="https://cursor.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Cursor</a> is an AI-first code editor built on VS Code. It can generate documentation across your entire project.
      </p>

      <p><strong>Generate inline documentation:</strong></p>

      <ol>
        <li>Select a function or a code block</li>
        <li>Press <code>Cmd+K</code> (Mac) or <code>Ctrl+K</code> (Windows)</li>
        <li>Type: &quot;Add JSDoc comments to all functions&quot;</li>
      </ol>

      <p><strong>Generate a README:</strong></p>

      <ol>
        <li>Open the AI pane with <code>Cmd+I</code></li>
        <li>Use this prompt:</li>
      </ol>

      <CodeBlock>
        Analyze this codebase and generate a comprehensive README.md that includes:<br /><br />
        1. Project overview and purpose<br />
        2. Tech stack and dependencies<br />
        3. Installation instructions<br />
        4. Usage examples with code snippets<br />
        5. Project structure explanation<br />
        6. Configuration options<br />
        7. Contributing guidelines<br /><br />
        Base everything on the actual code, not assumptions.
      </CodeBlock>

      <h3>Windsurf</h3>

      <p>
        <a href="https://codeium.com/windsurf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Windsurf</a> (by Codeium) is another AI-powered IDE with strong documentation capabilities through its Cascade feature.
      </p>

      <p><strong>Best documentation prompt for Windsurf:</strong></p>

      <CodeBlock>
        I need comprehensive documentation for this project. Please:<br /><br />
        1. Add docstrings/JSDoc to all functions and classes that lack them<br />
        2. Generate a README with setup instructions<br />
        3. Create an API.md file documenting all public interfaces<br />
        4. Add inline comments explaining complex logic<br /><br />
        Use the existing code style and conventions.
      </CodeBlock>

      <h3>Claude Code (CLI)</h3>

      <p>
        <a href="https://claude.ai/code" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Claude Code</a> is Anthropic&apos;s command-line tool that brings Claude directly into your terminal with full codebase awareness.
      </p>

      <p><strong>Why it&apos;s great for documentation:</strong></p>

      <ul>
        <li>Automatically indexes your entire codebase</li>
        <li>Understands file relationships and dependencies</li>
        <li>Can create and edit multiple files at once</li>
        <li>Works from your terminal with no practical context window limits</li>
      </ul>

      <p><strong>Documentation prompts for Claude Code:</strong></p>

      <p>Generate a complete README:</p>

      <CodeBlock>
        Generate a detailed README.md for this project. Include:<br />
        - What this project does (based on actual code analysis)<br />
        - How to install and run it<br />
        - Key features with examples<br />
        - Project structure overview<br />
        - Environment variables and configuration
      </CodeBlock>

      <p>Add documentation to existing code:</p>

      <CodeBlock>
        Add comprehensive documentation to all files in src/. For each function:<br />
        - Add JSDoc/docstring with description<br />
        - Document all parameters and return types<br />
        - Add @example where helpful<br />
        - Note any side effects or important behaviors
      </CodeBlock>

      <p>Generate API documentation:</p>

      <CodeBlock>
        Create an API.md file documenting all exported functions and classes.<br />
        For each export include:<br />
        - Function signature<br />
        - Description of what it does<br />
        - Parameters table (name, type, description)<br />
        - Return value<br />
        - Usage example<br />
        Group by module/file.
      </CodeBlock>

      <Callout variant="info">
        <p>
          Claude Code works best when you give it specific, structured requests. The more detail in your prompt, the better the output.
        </p>
      </Callout>

      <h2>Method 3: General-Purpose AI (ChatGPT, Claude, Gemini)</h2>

      <p>
        Don&apos;t have access to specialized tools? Any modern AI assistant can generate documentation. You just need to give it your code.
      </p>

      <h3>The Challenge: Context</h3>

      <p>
        The main limitation of ChatGPT, Claude, and Gemini for documentation is <strong>context</strong>. They can only see what you paste or upload. For a single file, that&apos;s easy. For an entire codebase? You need a strategy.
      </p>

      <h3>Solution: Combine Your Codebase First</h3>

      <p>
        The most effective approach is to combine your entire codebase into a single file before uploading. This gives the AI complete context to understand how everything connects.
      </p>

      <p><strong>Using OneFile:</strong></p>

      <ol>
        <li>Go to <a href="https://www.onefileapp.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">onefileapp.com</a></li>
        <li>Drag your project folder (or import from GitHub)</li>
        <li>OneFile automatically skips <code>node_modules</code>, <code>.git</code>, build artifacts</li>
        <li>Download the combined file</li>
        <li>Upload to ChatGPT, Claude, or Gemini</li>
      </ol>

      <Callout variant="tip">
        <p>
          OneFile respects your <code>.gitignore</code> file, so only relevant source code is included. No need to manually filter out dependencies.
        </p>
      </Callout>

      <h3>Best Documentation Prompts</h3>

      <p>Once your codebase is uploaded, use these prompts:</p>

      <p><strong>Comprehensive README:</strong></p>

      <CodeBlock>
        I&apos;ve uploaded my entire codebase. Please generate a professional README.md that includes:<br /><br />
        ## Overview<br />
        - What this project does (analyze the actual code)<br />
        - Key features and capabilities<br /><br />
        ## Tech Stack<br />
        - List all frameworks, libraries, and tools used<br /><br />
        ## Getting Started<br />
        - Prerequisites<br />
        - Installation steps (check package.json or requirements.txt)<br />
        - How to run the project<br /><br />
        ## Project Structure<br />
        - Explain the folder organization<br />
        - Describe key files and their purposes<br /><br />
        ## Usage<br />
        - Common use cases with examples<br /><br />
        ## Configuration<br />
        - Environment variables (check for .env.example or config files)<br />
        - Available options<br /><br />
        Base everything on the actual code, not assumptions. Use markdown formatting.
      </CodeBlock>

      <p><strong>API Documentation:</strong></p>

      <CodeBlock>
        Generate API documentation for this codebase. For each public function/method/endpoint:<br /><br />
        - Name and signature<br />
        - Description of what it does<br />
        - Parameters (name, type, required/optional, description)<br />
        - Return value (type and description)<br />
        - Example usage<br />
        - Any errors it might throw<br /><br />
        Organize by module or feature area. Output in markdown format suitable for a docs site.
      </CodeBlock>

      <p><strong>Inline Code Comments:</strong></p>

      <CodeBlock>
        For each function in this codebase, generate JSDoc comments (or docstrings for Python) that include:<br /><br />
        - @description - What the function does<br />
        - @param - Each parameter with type and description<br />
        - @returns - What it returns<br />
        - @throws - Any exceptions (if applicable)<br />
        - @example - A usage example<br /><br />
        Output as a list of functions with their complete documentation blocks that I can copy into my code.
      </CodeBlock>

      <p><strong>Architecture Overview:</strong></p>

      <CodeBlock>
        Analyze this codebase and create an ARCHITECTURE.md document that explains:<br /><br />
        1. High-level system design<br />
        2. How data flows through the application<br />
        3. Key components and their responsibilities<br />
        4. How components interact with each other<br />
        5. Design patterns used<br />
        6. Database schema (if applicable)<br />
        7. External integrations<br /><br />
        Include ASCII diagrams where helpful. This should help a new developer understand the codebase quickly.
      </CodeBlock>

      <h3>Model Comparison for Documentation</h3>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Model</th>
              <th className="text-left py-3 px-4 font-semibold">Context Window</th>
              <th className="text-left py-3 px-4 font-semibold">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4">GPT-4o</td>
              <td className="py-3 px-4">128K tokens</td>
              <td className="py-3 px-4">Medium codebases, good all-rounder</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Claude 3.5 Sonnet</td>
              <td className="py-3 px-4">200K tokens</td>
              <td className="py-3 px-4">Large codebases, detailed technical docs</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Gemini 1.5 Pro</td>
              <td className="py-3 px-4">1M+ tokens</td>
              <td className="py-3 px-4">Very large codebases, monorepos</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Claude 3 Opus</td>
              <td className="py-3 px-4">200K tokens</td>
              <td className="py-3 px-4">Complex architecture docs, nuanced explanations</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Best Practices for AI-Generated Documentation</h2>

      <h3>1. Always Review and Edit</h3>

      <p>
        AI-generated documentation is a starting point, not a finished product. Always review for:
      </p>

      <ul>
        <li>Accuracy (AI can misunderstand intent)</li>
        <li>Completeness (important details might be missing)</li>
        <li>Tone (ensure it matches your team&apos;s style)</li>
        <li>Security (remove any sensitive information that slipped through)</li>
      </ul>

      <h3>2. Provide Context in Your Prompts</h3>

      <p>
        The more context you give, the better the output. Include:
      </p>

      <ul>
        <li>Who the documentation is for (beginners, experienced devs, end users)</li>
        <li>What format you need (markdown, JSDoc, reStructuredText)</li>
        <li>Any existing conventions in your project</li>
        <li>Specific areas that need more detail</li>
      </ul>

      <h3>3. Document Incrementally</h3>

      <p>
        Don&apos;t try to document everything at once. Start with:
      </p>

      <ol>
        <li><strong>README</strong>: Project overview and quick start</li>
        <li><strong>API reference</strong>: Public interfaces and functions</li>
        <li><strong>Architecture</strong>: How the system works</li>
        <li><strong>Contributing guide</strong>: How to add new code</li>
      </ol>

      <h3>4. Keep Documentation in Sync</h3>

      <p>
        Documentation that&apos;s out of date is worse than no documentation. Use tools that integrate with your Git workflow (like Mintlify) or regenerate docs periodically with AI.
      </p>

      <Callout variant="warning">
        <p>
          <strong>Don&apos;t commit AI-generated docs without review.</strong> Hallucinations happen. A wrong code example in your docs can waste hours of developer time.
        </p>
      </Callout>

      <h2>Quick Reference: Which Method to Use</h2>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Situation</th>
              <th className="text-left py-3 px-4 font-semibold">Recommended Method</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Public documentation site</td>
              <td className="py-3 px-4">Mintlify</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Quick API docs from code</td>
              <td className="py-3 px-4">DocuWriter.ai</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Inline code comments</td>
              <td className="py-3 px-4">Cursor / Windsurf / Claude Code</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">One-time README generation</td>
              <td className="py-3 px-4">OneFile + ChatGPT/Claude</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Large monorepo</td>
              <td className="py-3 px-4">OneFile + Gemini (1M context)</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Ongoing documentation updates</td>
              <td className="py-3 px-4">Claude Code (terminal-based)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Conclusion</h2>

      <p>
        Documentation no longer has to be the task you dread. With AI tools available in 2025, you can generate comprehensive docs in minutes instead of days.
      </p>

      <p>
        The key is choosing the right tool for your needs:
      </p>

      <ul>
        <li><strong>Mintlify</strong> for polished, public-facing documentation</li>
        <li><strong>DocuWriter.ai</strong> for quick code and API documentation</li>
        <li><strong>Cursor, Windsurf, or Claude Code</strong> for inline docs as you code</li>
        <li><strong>ChatGPT, Claude, or Gemini</strong> (with <Link href="/" className="text-primary hover:underline">OneFile</Link>) for flexible, one-time documentation tasks</li>
      </ul>

      <p>
        Start with a README. It takes five minutes with AI and makes your project immediately more accessible to others, and to future you.
      </p>

      <Callout variant="tip">
        <p>
          <strong>Quick start:</strong> Upload your project to <a href="https://www.onefileapp.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">OneFile</a>, download the combined file, paste into Claude or ChatGPT, and ask for a README. You&apos;ll have professional documentation in under 5 minutes.
        </p>
      </Callout>
    </>
  );
}
