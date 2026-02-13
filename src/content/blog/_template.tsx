/**
 * BLOG POST TEMPLATE
 *
 * This is a reference template showing how to create a new blog post.
 *
 * STEPS TO CREATE A NEW BLOG POST:
 *
 * 1. Copy this file and rename it to match your blog post slug
 *    Example: your-blog-post-slug.tsx
 *
 * 2. Add your blog post metadata to /src/data/blog-posts.ts
 *    Example:
 *    {
 *      slug: "your-blog-post-slug",
 *      title: "Your Blog Post Title",
 *      description: "Your blog post description for SEO",
 *      image: "/blog/your-image.png",
 *      publishedAt: "2025-01-20",
 *      author: "Mohamed Wahib ABKARI",
 *      readingTime: "5 min read",
 *      tags: ["Tag1", "Tag2", "Tag3"],
 *      featured: false,
 *    }
 *
 * 3. Write your content in the BlogPost component below
 *
 * 4. Use the available components:
 *    - <Callout variant="info|warning|tip|success">Content</Callout>
 *    - <CodeBlock>Monospace text for prompts or examples</CodeBlock>
 *    - <BlogImage src="/path" alt="description" caption="optional" />
 *    - Regular HTML: <h2>, <h3>, <p>, <ul>, <ol>, <blockquote>, etc.
 *
 * IMPORTANT NOTES:
 * - H2 and H3 headings will automatically appear in the Table of Contents
 * - Always use semantic HTML headings (h2 for main sections, h3 for subsections)
 * - Keep paragraphs concise and readable
 * - Use callouts to highlight important information
 * - Add images to the /public directory and reference them with /image-name.ext
 */

import { Callout } from "@/components/blog/Callout";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { BlogImage } from "@/components/blog/BlogImage";

export default function BlogPost() {
  return (
    <>
      {/* Introduction */}
      <p>
        Start with an engaging introduction that explains what the reader will learn. Make it
        clear and concise. This paragraph sets the tone for the entire article.
      </p>

      <p>
        You can write multiple paragraphs in the introduction to provide context and hook the
        reader. Keep each paragraph focused on a single idea.
      </p>

      {/* Info Callout Example */}
      <Callout variant="info">
        <p>
          <strong>Info callouts</strong> are great for providing additional context, tips, or
          related information that enhances understanding.
        </p>
      </Callout>

      {/* Main Section 1 */}
      <h2>First Main Section</h2>

      <p>
        Use H2 headings for your main sections. These will automatically appear in the table of
        contents on the right sidebar. Write your content in clear, concise paragraphs.
      </p>

      {/* Subsection */}
      <h3>A Subsection with H3</h3>

      <p>
        Use H3 headings for subsections within your main sections. These will also appear in the
        table of contents, indented under their parent H2.
      </p>

      {/* Unordered List Example */}
      <p>You can use bullet lists to break down information:</p>

      <ul>
        <li>First point - keep it concise and actionable</li>
        <li>Second point - use bullet lists for related items</li>
        <li>Third point - aim for 3-7 items per list</li>
        <li>Fourth point - more than that can be overwhelming</li>
      </ul>

      {/* Ordered List Example */}
      <p>Use numbered lists for sequential steps:</p>

      <ol>
        <li>First step in the process</li>
        <li>Second step with clear instructions</li>
        <li>Third step building on the previous</li>
        <li>Final step to complete the task</li>
      </ol>

      {/* Warning Callout Example */}
      <Callout variant="warning">
        <p>
          <strong>Warning callouts</strong> help highlight potential pitfalls, common mistakes, or
          important cautions that readers should be aware of.
        </p>
      </Callout>

      {/* Main Section 2 */}
      <h2>Second Main Section</h2>

      <p>
        Continue with your next main topic. Each section should flow naturally from the previous
        one, building upon concepts already explained.
      </p>

      {/* Code Example (inline) */}
      <p>
        You can include inline code like <code>const example = true;</code> for short snippets or
        function names.
      </p>

      {/* Code Block Example */}
      <p>For longer code examples, use code blocks with proper formatting:</p>

      <pre>
        <code>{`// Example TypeScript code
function processFiles(files: File[]): Promise<string> {
  return files
    .filter(file => file.type === 'text/plain')
    .map(file => file.name)
    .join('\\n');
}`}</code>
      </pre>

      {/* CodeBlock Component Example */}
      <p>For prompts, commands, or monospace text blocks, use the CodeBlock component:</p>

      <CodeBlock>
        This is an example prompt or command.<br />
        Use line breaks for multiple lines.<br />
        Perfect for AI prompts, terminal commands, or example text.
      </CodeBlock>

      {/* Tip Callout Example */}
      <Callout variant="tip">
        <p>
          <strong>Tip callouts</strong> are perfect for pro tips, best practices, or clever tricks
          that can help readers work more efficiently.
        </p>
      </Callout>

      {/* Main Section 3 with Subsections */}
      <h2>Third Main Section with Multiple Subsections</h2>

      <p>
        Organize complex topics into subsections for better readability and navigation. The table
        of contents will help readers jump to specific parts.
      </p>

      <h3>First Subsection</h3>

      <p>
        Each subsection should focus on one specific aspect of the main topic. This makes your
        content easier to scan and understand.
      </p>

      <h3>Second Subsection</h3>

      <p>
        Continue breaking down your topic into digestible chunks. Use examples and clear
        explanations to support each point.
      </p>

      {/* Image Example */}
      <BlogImage
        src="/feature_1.webp"
        alt="Example of the OneFile interface"
        caption="This is an optional caption that describes the image. Use captions to provide context."
      />

      {/* Blockquote Example */}
      <blockquote>
        <p>
          Use blockquotes for important quotes, key takeaways, or to emphasize critical
          information. They stand out visually and draw the reader&apos;s attention.
        </p>
      </blockquote>

      {/* Main Section 4 */}
      <h2>Common Mistakes to Avoid</h2>

      <p>It&apos;s helpful to address common pitfalls and misconceptions:</p>

      <ul>
        <li>
          <strong>Mistake #1:</strong> Description of the mistake and why it&apos;s problematic
        </li>
        <li>
          <strong>Mistake #2:</strong> Another common error with explanation
        </li>
        <li>
          <strong>Mistake #3:</strong> A third mistake to watch out for
        </li>
      </ul>

      {/* Final Section */}
      <h2>Conclusion</h2>

      <p>
        Wrap up your article with a concise conclusion that summarizes the key points. Reinforce
        what the reader has learned and provide actionable next steps.
      </p>

      <p>
        Consider ending with a call-to-action that encourages readers to try what they&apos;ve
        learned or explore related topics. The CTA section at the bottom of the page will
        automatically direct them to try OneFile.
      </p>

      {/* Final Tip */}
      <Callout variant="tip">
        <p>
          Remember to proofread your content, check all links, and ensure images are properly
          optimized before publishing. Clear, well-structured content creates the best reader
          experience.
        </p>
      </Callout>
    </>
  );
}
