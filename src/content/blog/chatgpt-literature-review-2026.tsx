import Link from "next/link";
import { Callout } from "@/components/blog/Callout";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { FolderOpen, FileText, ArrowDown, ArrowUp } from "lucide-react";
import Sparkles from "@/components/icons/Sparkles";

export default function BlogPost() {
  return (
    <>
      {/* TL;DR */}
      <div className="not-prose rounded-xl border border-border bg-card p-5 mb-8">
        <h3 className="text-md font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          TL;DR
        </h3>
        <p className="text-sm leading-normal text-muted-foreground mb-2">
          Most ChatGPT literature review guides assume you have 5 to 10 papers.
          Real reviews involve 50 to 300. ChatGPT Plus caps at 10 files per
          message. Claude caps at 20. To run a real AI-assisted review, you
          have to combine papers first.
        </p>
        <p className="text-sm leading-normal text-muted-foreground">
          <span className="font-medium">The workflow:</span> Use{" "}
          <Link
            href="/"
            className="text-primary bg-primary/10 p-1.5 py-0.5 rounded-sm font-semibold"
          >
            OneFile
          </Link>{" "}
          to merge your PDF library into one upload, send it to whichever
          frontier model you already use (Claude 4.x, GPT-5.5, and Gemini
          3 Pro all hold 1M tokens), then run structured prompts. Free, no
          account.
        </p>
      </div>

      <p>
        A literature review is supposed to map what we already know about a
        topic so you can position your own work against it. In practice it
        means reading 50 to 300 papers, taking structured notes, comparing
        methods, and synthesizing themes. It is the single most time-consuming
        step in most graduate projects, and AI is genuinely good at parts of
        it.
      </p>

      <p>
        The problem is that almost every guide you find online quietly assumes
        a 5-paper review. That is not what most PhD students, postdocs, or
        systematic reviewers are doing. This guide is about the workflow when
        you have 50, 100, or 200+ papers and you actually want AI to help.
      </p>

      <h2>Why Normal ChatGPT Workflows Break for Real Literature Reviews</h2>

      <p>
        If you try to do a real literature review by uploading PDFs to
        ChatGPT, you hit a wall fast:
      </p>

      <ul>
        <li>
          <strong>ChatGPT Free:</strong> 3 files per day, full stop.
        </li>
        <li>
          <strong>ChatGPT Plus ($20/mo):</strong> 10 files per message, ~80
          files per 3-hour window.
        </li>
        <li>
          <strong>Claude:</strong> 20 files per message across all paid plans.
        </li>
        <li>
          <strong>Gemini Free:</strong> 10 files per prompt, with format
          restrictions.
        </li>
      </ul>

      <p>
        None of these is enough for a real review. And even if you stay
        patient and upload in batches, each new chat loses the context from
        the previous batch. You end up doing the same synthesis manually that
        you were trying to automate.
      </p>

      <p>
        For a complete breakdown of every platform&apos;s file limits, see{" "}
        <Link
          href="/blog/ai-file-upload-limits-compared"
          className="text-primary hover:underline"
        >
          Claude vs ChatGPT vs Gemini upload limits compared
        </Link>
        .
      </p>

      <h2>The Workaround: Combine First, Then Upload Once</h2>

      <p>
        The real fix is to flip the problem. Instead of sending the AI 50
        files, send it 1 file that contains 50 papers. The upload limit then
        only counts as a single file, and the AI sees the entire corpus in
        one conversation.
      </p>

      <p>
        That is what{" "}
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        does. Drag a folder of PDFs into it, OneFile extracts the text from
        every paper, formats them with clear filename headers, and gives you
        one combined file or copy-pastable text. You then upload that single
        file to whichever AI you prefer.
      </p>

      <Callout variant="info">
        <p>
          <strong>Why filename headers matter:</strong> When you ask the AI to
          quote or cite a specific paper, it needs to know which chunk came
          from which file. OneFile preserves filenames in the output so the
          AI can attribute claims back to the correct paper.
        </p>
      </Callout>

      <h2>Choosing an AI for Literature Review</h2>

      <p>
        Three frontier general models are the realistic options for
        AI-assisted literature review:{" "}
        <strong>Claude Opus 4.7 / Sonnet 4.6</strong>,{" "}
        <strong>ChatGPT (GPT-5.5)</strong>, and{" "}
        <strong>Gemini 3 Pro</strong>. All three have 1M-token context
        windows, enough to hold a curated corpus of 150 to 250 typical
        papers in one conversation.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Model</th>
              <th className="text-left py-3 px-4 font-semibold">
                Context Window
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                Strengths for Lit Review
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-semibold">
                Claude Opus 4.7 / Sonnet 4.6
              </td>
              <td className="py-3 px-4">1M tokens</td>
              <td className="py-3 px-4">
                Reliable instruction following over long, structured prompts
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-semibold">
                ChatGPT (GPT-5.5)
              </td>
              <td className="py-3 px-4">1M tokens (API)</td>
              <td className="py-3 px-4">
                Lower hallucination on sensitive domains, broad ecosystem
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-semibold">Gemini 3 Pro</td>
              <td className="py-3 px-4">1M tokens</td>
              <td className="py-3 px-4">
                Native multimodal: PDFs with figures, images, audio
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4">ChatGPT Free</td>
              <td className="py-3 px-4">Smaller, varies</td>
              <td className="py-3 px-4">
                Small reviews only, upgrade or batch by sub-topic
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground italic">
        Vendor models and limits change often. Check the official Anthropic,
        OpenAI, and Google model pages before relying on these specs for a
        production workflow.
      </p>

      <p>
        The right model for your literature review is usually{" "}
        <strong>whichever subscription you already have</strong>. Two
        practical tiebreakers when you have a choice:
      </p>

      <ul>
        <li>
          <strong>Corpora with figures, tables, or charts you want
          analyzed directly:</strong> Gemini 3 Pro&apos;s native
          multimodal handling gives it an edge.
        </li>
        <li>
          <strong>Long structured prompts across many papers in one
          conversation:</strong> Claude 4.x and GPT-5.5 both follow
          multi-step instructions well.
        </li>
      </ul>

      <Callout variant="info">
        <p>
          <strong>Curate your corpus before you upload it.</strong> Recall
          on specific passages weakens in the middle of any model&apos;s
          context window, so a focused 50 to 100 papers usually gives
          sharper answers than 200+ dumped in at once. Combine the papers
          you actually want analyzed, not your entire Zotero library.
        </p>
      </Callout>

      <h3>What About Purpose-Built Tools Like Elicit and Consensus?</h3>

      <p>
        Specialized literature-review tools (<strong>Elicit</strong>,
        <strong> Consensus</strong>, <strong>SciSpace</strong>,
        <strong> Paperguide</strong>, <strong>Scite</strong>) are excellent
        at the parts of the review that involve searching across millions
        of papers, citation networks, and structured extraction over a
        curated database. They are often the right starting point if you
        do not yet know which papers you need.
      </p>

      <p>
        The workflow in this guide is for a different stage: you already
        have a folder of PDFs and you want to run cross-corpus questions,
        contradictions, and synthesis against papers <em>you have
        chosen</em>. The general models above, combined with{" "}
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        to merge them into one upload, give you full control over the
        corpus and the prompts. The two approaches are complementary, not
        competing.
      </p>

      <h2>The Full Workflow</h2>

      <p>
        Here is the end-to-end flow, from a folder of PDFs to a structured
        synthesis you can build on.
      </p>

      <div className="not-prose my-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-base font-semibold text-foreground">
            The Pipeline at a Glance
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            From your PDF folder to verified synthesis in four steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1: Gather */}
          <div className="flex flex-col">
            <div className="bg-secondary/30 border border-border/60 rounded-lg p-4 h-36 flex items-center justify-center mb-3 overflow-hidden">
              <div className="w-full p-2.5 font-mono">
                <div className="text-xs text-foreground/80 flex items-center gap-1.5 mb-1.5">
                  <FolderOpen className="h-3.5 w-3.5 text-primary" />
                  <span>papers/</span>
                </div>
                <div className="space-y-0.5 ml-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-foreground/70">
                    <FileText className="h-2.5 w-2.5" />
                    <span className="truncate">paper-001.pdf</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-foreground/70">
                    <FileText className="h-2.5 w-2.5" />
                    <span className="truncate">paper-002.pdf</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground/60 italic ml-4">
                    + 62 more
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm leading-snug mb-1">
                1. Gather
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your folder of PDFs from Zotero or anywhere.
              </p>
            </div>
          </div>

          {/* Step 2: Combine */}
          <div className="flex flex-col">
            <div className="bg-secondary/30 border border-border/60 rounded-lg p-4 h-36 flex items-center justify-center mb-3 shadow-sm overflow-hidden">
              <div className="w-full border-2 border-dashed border-primary/40 rounded-lg p-3 bg-primary/5 text-center">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1.5">
                  <ArrowDown
                    className="h-5 w-5 text-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="text-xs font-medium text-foreground">
                  Combined
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                  corpus.txt
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm leading-snug mb-1">
                2. Combine
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                OneFile merges every paper into one file.
              </p>
            </div>
          </div>

          {/* Step 3: Send to AI */}
          <div className="flex flex-col">
            <div className="bg-secondary/30 border border-border/60 rounded-lg p-4 h-36 flex items-center justify-center mb-3 shadow-sm overflow-hidden">
              <div className="w-full">
                <div className="text-[10px] text-muted-foreground/70 mb-1.5 font-medium">
                  Claude
                </div>
                <div className="text-xs text-foreground/80 leading-snug mb-2 line-clamp-2">
                  Identify themes across these papers...
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-mono inline-flex items-center gap-1">
                    <FileText className="h-2.5 w-2.5" />
                    corpus.txt
                  </span>
                  <div className="bg-primary text-background rounded-full h-6 w-6 flex items-center justify-center">
                    <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm leading-snug mb-1">
                3. Send to AI
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upload to Claude, ChatGPT, or Gemini.
              </p>
            </div>
          </div>

          {/* Step 4: Synthesize */}
          <div className="flex flex-col">
            <div className="bg-secondary/30 border border-border/60 rounded-lg p-4 h-36 flex items-center justify-center mb-3 shadow-sm overflow-hidden">
              <div className="w-full p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    AI synthesis
                  </span>
                </div>
                <p className="text-[11px] text-foreground leading-snug mb-1.5">
                  Across 64 papers:
                </p>
                <ul className="text-[10px] text-foreground/70 space-y-0.5">
                  <li className="flex items-start gap-1">
                    <span className="text-primary">&bull;</span>
                    <span>5 recurring themes</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-primary">&bull;</span>
                    <span>3 contradictions</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-primary">&bull;</span>
                    <span>4 method gaps</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm leading-snug mb-1">
                4. Synthesize
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Run structured prompts across the full corpus.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3>Step 1: Gather and Pre-Screen Papers</h3>

      <p>
        Before you let AI near anything, do a fast manual triage. Open your
        reference manager (Zotero, Mendeley, EndNote), filter by relevance,
        and export the PDFs you actually want analyzed into one folder.
        Skipping irrelevant papers at this stage is cheaper than asking AI to
        filter them later.
      </p>

      <Callout variant="tip">
        <p>
          <strong>Practical tip:</strong> If you have 300 candidate papers,
          start with the most-cited 50. Run the AI workflow on those, then
          use what you learn to refine which of the remaining 250 deserve
          deeper attention.
        </p>
      </Callout>

      <h3>Step 2: Combine With OneFile</h3>

      <ol>
        <li>
          Go to{" "}
          <Link
            href="/"
            className="text-primary hover:underline font-semibold"
          >
            onefileapp.com
          </Link>
        </li>
        <li>Drag your folder of PDFs into the upload area</li>
        <li>
          OneFile extracts text from each PDF and combines them with filename
          headers
        </li>
        <li>Click Copy or Download</li>
      </ol>

      <p>
        You now have one combined file containing every paper, ready to
        upload or paste into any AI. OneFile is free, no account, and runs
        the PDF extraction on its API without storing anything.
      </p>

      <h3>Step 3: Upload to Your AI of Choice</h3>

      <p>
        Open a new conversation in Claude, ChatGPT, or Gemini. Attach the
        combined file from OneFile, or paste the content directly into the
        message. Pasting text bypasses any per-message file count cap
        entirely. For corpora with figures or charts you want analyzed
        visually, Gemini 3 Pro handles PDFs natively. Otherwise, use
        whichever model you already pay for.
      </p>

      <h3>Step 4: Run Structured Prompts</h3>

      <p>
        This is where the real value happens. Below are the prompts that
        work at scale, not the generic ones you find in most guides. Use
        them in order, each builds on the previous output.
      </p>

      <h2>Prompts That Work at Scale</h2>

      <h3>Prompt 1: Corpus Mapping</h3>

      <p>
        Start by getting AI to understand what is in front of it. This also
        gives you a structured summary you can reference later.
      </p>

      <CodeBlock
        copyText={`You have access to {N} academic papers I just uploaded. For each paper, extract:

1. Authors and year
2. Research question or hypothesis
3. Method (1 sentence)
4. Key finding (1 sentence)
5. Stated limitations

Return as a markdown table. If a field is unclear, write "Not stated" rather than guessing.`}
      >
        You have access to {"{N}"} academic papers I just uploaded. For each
        paper, extract:<br />
        <br />
        1. Authors and year<br />
        2. Research question or hypothesis<br />
        3. Method (1 sentence)<br />
        4. Key finding (1 sentence)<br />
        5. Stated limitations<br />
        <br />
        Return as a markdown table. If a field is unclear, write &quot;Not
        stated&quot; rather than guessing.
      </CodeBlock>

      <Callout variant="warning">
        <p>
          <strong>Why &quot;rather than guessing&quot; matters:</strong>{" "}
          Without an explicit instruction to flag uncertainty, AI tends to
          fill gaps with plausible-sounding inferences instead of saying it
          does not know. With it, you get a table where the blanks tell you
          exactly which papers need a closer human read.
        </p>
      </Callout>

      <h3>Prompt 2: Theme Extraction</h3>

      <p>
        Now that AI has the corpus mapped, ask it to find patterns across
        papers.
      </p>

      <CodeBlock
        copyText={`Across all {N} papers, identify 5 to 7 recurring themes or research questions. For each theme:

1. Name the theme
2. List which papers (by filename or first author) address it
3. Summarize the dominant position
4. List any papers that disagree or take a contrarian stance

Do not include themes that only appear in a single paper.`}
      >
        Across all {"{N}"} papers, identify 5 to 7 recurring themes or
        research questions. For each theme:<br />
        <br />
        1. Name the theme<br />
        2. List which papers (by filename or first author) address it<br />
        3. Summarize the dominant position<br />
        4. List any papers that disagree or take a contrarian stance<br />
        <br />
        Do not include themes that only appear in a single paper.
      </CodeBlock>

      <h3>Prompt 3: Methodological Comparison</h3>

      <CodeBlock
        copyText={`Group these papers by methodology (e.g., RCT, observational, qualitative, systematic review, modeling). For each method group:

1. How many papers use this method
2. What are the typical sample sizes or scopes
3. What strengths and weaknesses do the authors themselves acknowledge
4. Are there methods that the literature notably lacks`}
      >
        Group these papers by methodology (e.g., RCT, observational,
        qualitative, systematic review, modeling). For each method group:
        <br />
        <br />
        1. How many papers use this method<br />
        2. What are the typical sample sizes or scopes<br />
        3. What strengths and weaknesses do the authors themselves
        acknowledge<br />
        4. Are there methods that the literature notably lacks
      </CodeBlock>

      <h3>Prompt 4: Contradictions and Gaps</h3>

      <p>
        This is where AI is most valuable, because it can hold the entire
        corpus in attention at once. Humans struggle to compare claims
        across 60 papers; LLMs do not.
      </p>

      <CodeBlock
        copyText={`Identify direct contradictions in this corpus, where one paper's finding directly disputes another's. For each contradiction:

1. Quote the conflicting claims (with filenames)
2. Note any differences in method or sample that could explain the disagreement
3. Flag whether one paper has cited and addressed the other

Also list 3 to 5 underexplored questions, topics raised in multiple papers but not directly investigated.`}
      >
        Identify direct contradictions in this corpus, where one paper&apos;s
        finding directly disputes another&apos;s. For each contradiction:
        <br />
        <br />
        1. Quote the conflicting claims (with filenames)<br />
        2. Note any differences in method or sample that could explain the
        disagreement<br />
        3. Flag whether one paper has cited and addressed the other<br />
        <br />
        Also list 3 to 5 underexplored questions, topics raised in multiple
        papers but not directly investigated.
      </CodeBlock>

      <h3>Prompt 5: Positioning Your Work</h3>

      <CodeBlock
        copyText={`I am writing a paper on {your topic}. Based on the literature I've given you:

1. Which 8 to 12 papers are most essential to cite in my introduction
2. What gap or contradiction does my work address that the literature has not
3. What is the strongest objection a reviewer might raise based on existing work, and which paper would they cite
4. Suggest 2 to 3 ways to frame my contribution`}
      >
        I am writing a paper on {"{your topic}"}. Based on the literature
        I&apos;ve given you:<br />
        <br />
        1. Which 8 to 12 papers are most essential to cite in my
        introduction<br />
        2. What gap or contradiction does my work address that the
        literature has not<br />
        3. What is the strongest objection a reviewer might raise based on
        existing work, and which paper would they cite<br />
        4. Suggest 2 to 3 ways to frame my contribution
      </CodeBlock>

      <h2>How to Verify AI Output (Critical)</h2>

      <p>
        AI is fast but unreliable. Every output you plan to use in your
        actual review needs verification. Here is the minimum check:
      </p>

      <ul>
        <li>
          <strong>Spot-check a sample of citations.</strong> Pick random
          AI-attributed claims and confirm the source paper actually
          supports them. AI sometimes synthesizes a plausible claim across
          several papers but attributes it to one.
        </li>
        <li>
          <strong>Verify direct quotes character-for-character.</strong> If
          the AI gives you a quoted passage, search the source PDF for the
          exact string. Paraphrases drift and quotes get reconstructed, and
          both happen silently.
        </li>
        <li>
          <strong>Re-check the contradictions.</strong> What reads like a
          contradiction sometimes turns out to be two papers using the same
          term in different scopes or definitions. Open both and confirm
          before citing the conflict.
        </li>
        <li>
          <strong>Test the gaps.</strong> Before claiming the literature
          lacks something, do a fresh database search. AI only sees what
          you uploaded, so a gap in your corpus is not necessarily a gap in
          the field.
        </li>
      </ul>

      <Callout variant="warning">
        <p>
          <strong>Never copy AI output verbatim into your manuscript.</strong>{" "}
          Use it as a draft scaffold, then rewrite in your own voice with
          verified citations. Most journals now flag AI-generated text, and
          your own framing will be sharper anyway.
        </p>
      </Callout>

      <h2>When This Approach Fails</h2>

      <p>
        AI-assisted literature review at scale works well for some questions
        and badly for others. It is most useful when:
      </p>

      <ul>
        <li>You need a fast overview of an unfamiliar subfield</li>
        <li>
          You want to map themes or methods across many papers, not analyze
          one paper deeply
        </li>
        <li>You are pre-screening for a systematic review</li>
        <li>You need to find contradictions or gaps quickly</li>
      </ul>

      <p>It is unreliable when:</p>

      <ul>
        <li>
          Your topic involves recent papers AI hasn&apos;t seen in training
          (it can still read them, but may anchor on outdated context)
        </li>
        <li>
          The papers use heavy domain-specific notation (mathematical proofs,
          chemical structures, niche statistical methods)
        </li>
        <li>You need exact numerical extraction from tables and figures</li>
        <li>
          The work is highly interpretive and depends on close reading of
          author voice
        </li>
      </ul>

      <h2>What This Workflow Actually Saves You</h2>

      <p>
        The hours that go into a literature review fall into two buckets.
        <strong> Mechanical work</strong>: reading abstracts, extracting
        basic metadata, scanning for relevance, building a summary table,
        spotting which methods recur.
        <strong> Judgment work</strong>: deciding which papers actually
        matter to your argument, framing your contribution, close reading
        of the 10 or 15 papers that shape your thesis.
      </p>

      <p>
        AI is genuinely useful for the mechanical bucket and unreliable for
        the judgment bucket. The point of this workflow is not to do your
        review for you. It is to compress the first bucket so you have
        more attention left for the second. You still read the central
        papers carefully. You just stop spending an afternoon building a
        summary table that AI can draft in two minutes and you can verify
        in twenty.
      </p>

      <h2>FAQ</h2>

      <h3>How many papers can I really combine with OneFile?</h3>
      <p>
        OneFile has no file count limit. The bottleneck is the AI&apos;s
        context window. Claude 4.x, GPT-5.5, and Gemini 3 Pro all hold
        1M tokens, which fits 150 to 250 typical papers in one
        conversation. Recall on specific passages weakens in the middle
        of very long contexts, though, so a focused corpus of 50 to 100
        papers usually gives sharper answers than 200+ at once.
      </p>

      <h3>Is using AI for literature review ethical?</h3>
      <p>
        Using AI to summarize and synthesize papers you have legally
        accessed is generally accepted. Using AI to generate text that goes
        into your manuscript without disclosure is not. Most journals now
        require disclosure of AI assistance. Check your institution&apos;s
        policy and the journal&apos;s submission guidelines before
        submission.
      </p>

      <h3>Will AI cite papers correctly?</h3>
      <p>
        Better than a few years ago, but still not perfectly. When you
        upload the papers yourself, the AI has the actual text to
        reference, which substantially reduces (but does not eliminate)
        fabricated citations. The risk goes up sharply when you ask
        about papers outside what you uploaded. Treat every citation as
        a claim to verify until you have spot-checked enough on a given
        topic to gauge how the model handles it.
      </p>

      <h3>What about NotebookLM, Elicit, Consensus, or Scite?</h3>
      <p>
        Those are research-specific platforms with their own models,
        databases, and indexing layers. They are very good at search
        across millions of papers, citation networks, and structured
        extraction over a curated database. Use them at the discovery
        stage. OneFile is different: it just combines the PDFs you have
        already chosen so you can run them through any general-purpose AI
        you prefer (Claude, ChatGPT, Gemini). The two approaches stack
        well, find papers with Elicit or Consensus, analyze them in
        depth with a frontier model via OneFile.
      </p>

      <h3>Does this work for systematic reviews?</h3>
      <p>
        For the screening and extraction stages, yes. AI can pre-screen
        abstracts against your PICO criteria, extract structured data from
        included papers, and flag inconsistencies. Final inclusion
        decisions, risk-of-bias assessment, and synthesis still need human
        judgment.
      </p>

      <h2>Conclusion</h2>

      <p>
        A real literature review is not a 5-paper exercise. With{" "}
        <Link href="/" className="text-primary hover:underline">
          OneFile
        </Link>{" "}
        you can hand AI your entire corpus at once and ask the kind of
        cross-paper questions that take humans weeks to answer. The catch
        is the same as any AI workflow: it is fast, it is wrong sometimes,
        and the verification step is non-negotiable.
      </p>

      <p>
        If you do this well, you get back the hours you used to spend on
        the mechanical first pass and you can spend them on the part of
        research that actually matters: thinking carefully about what your
        work adds to the conversation the literature is already having.
      </p>

      <div className="bg-card border border-border rounded-lg p-5 my-6">
        <p className="text-base mb-3">
          <strong>Quick steps to get started:</strong>
        </p>
        <ol className="text-sm space-y-1 mb-0 list-decimal list-inside">
          <li>
            Go to{" "}
            <Link
              href="/"
              className="text-primary hover:underline"
            >
              onefileapp.com
            </Link>
          </li>
          <li>Upload your folder of papers</li>
          <li>Copy or download the combined file</li>
          <li>
            Paste into Claude (or ChatGPT) and run the corpus mapping prompt
            above
          </li>
        </ol>
      </div>

      <p>
        Free, open source, no account needed. Works with Claude, ChatGPT,
        Gemini, and any LLM.
      </p>
    </>
  );
}
