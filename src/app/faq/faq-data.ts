export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  {
    category: "ChatGPT Limits",
    question: "What is ChatGPT's file upload limit?",
    answer:
      "ChatGPT Free allows 3 file uploads per day. ChatGPT Plus allows ~80 files per 3-hour rolling window (but 10 files per message). ChatGPT Pro ($200/month) offers unlimited uploads. All plans have a 512MB per-file size limit. You can work around these caps by combining all your files into one using OneFile. See our complete guide: https://onefileapp.com/blog/how-many-files-upload-chatgpt",
  },
  {
    category: "ChatGPT Limits",
    question: "What is the maximum file size for ChatGPT uploads?",
    answer:
      "ChatGPT allows files up to 512MB per file across all plans (Free, Plus, Pro, Team, Enterprise). Images are limited to 20MB, and spreadsheets to 50MB. If your file is too large, consider splitting it or using OneFile to combine multiple smaller files.",
  },
  {
    category: "ChatGPT Limits",
    question: "Why does ChatGPT say 'You've reached your file upload limit'?",
    answer:
      "This error appears when you've hit your plan's upload cap. Free users see this after 3 files per day. Plus users see it after ~80 files in a 3-hour window. The fix: combine your files into one using OneFile, then upload the single combined file. Full troubleshooting guide: https://onefileapp.com/blog/chatgpt-file-upload-limit-error",
  },
  {
    category: "ChatGPT Limits",
    question: "How many files can I upload to ChatGPT for free?",
    answer:
      "ChatGPT Free allows 3 file uploads per day. This limit resets every 24 hours. To upload more, either upgrade to Plus ($20/month) for ~80 files per 3 hours, or combine your files into one before uploading.",
  },
  {
    category: "ChatGPT Limits",
    question: "When does ChatGPT's file upload limit reset?",
    answer:
      "For Free users, the 3-file limit resets every 24 hours. For Plus, Team, and Pro users, the limit uses a rolling 3-hour window that continuously refreshes as older uploads age out. You don't have to wait for a full reset.",
  },
  {
    category: "ChatGPT Limits",
    question: "Is there an AI with unlimited file uploads?",
    answer:
      "ChatGPT Pro ($200/month) is the only mainstream AI plan with truly unlimited file uploads. On every other plan, the practical workaround is to merge multiple files into one before uploading, since per-file caps (not total-content caps) are what most platforms enforce.",
  },
  {
    category: "ChatGPT Limits",
    question: "What is ChatGPT Plus file upload limit?",
    answer:
      "ChatGPT Plus ($20/month) allows approximately 80 file uploads per 3-hour rolling window, with a maximum of 10 files per message. Each file can be up to 512MB.",
  },
  {
    category: "ChatGPT Limits",
    question: "What is ChatGPT Go file upload limit?",
    answer:
      "ChatGPT Go ($5.50/mo) allows more uploads than Free, but OpenAI has not published an exact cap. In practice it behaves similarly to Plus's rolling 3-hour window, with most users reporting a soft ceiling well below Plus's ~80-file allowance.",
  },

  // Getting Started
  {
    category: "Getting Started",
    question: "What is OneFile?",
    answer:
      "OneFile is a free, open-source tool that combines multiple files into one. It solves the problem of file upload limits on AI platforms like ChatGPT and Gemini by merging unlimited files into one, which only uses a single file slot. No more hitting upload limits.",
  },
  {
    category: "Getting Started",
    question: "How many files can I combine with OneFile?",
    answer:
      "There's no limit! You can combine 10, 100, or even 1,000+ files into one. The only constraint is your browser's memory, which can typically handle thousands of files without issues. We've tested with projects containing over 500 files successfully.",
  },
  {
    category: "Getting Started",
    question: "Do I need to create an account to use OneFile?",
    answer:
      "No account required! OneFile works completely anonymously. You only need to sign in with GitHub if you want to use the GitHub repository import feature. All other features work without any sign-up.",
  },
  {
    category: "Getting Started",
    question: "Is OneFile really free?",
    answer:
      "Yes, completely free with no hidden costs, no usage limits, and no premium tiers. OneFile is open-source software released under the MIT license. You can use it as much as you want, and even host your own version if desired.",
  },

  // AI Platforms
  {
    category: "AI Platforms",
    question: "Does this work with ChatGPT's free plan?",
    answer:
      "Yes. ChatGPT free users are limited to uploading 3 files per day. With OneFile, you can merge unlimited files into one text file and upload that single file to ChatGPT, which sidesteps the 3-file restriction. Plus users also benefit by avoiding the frustration of uploading files in batches of 10 for large projects.",
  },
  {
    category: "AI Platforms",
    question: "Which AI platforms does OneFile work with?",
    answer:
      "OneFile works with all AI platforms that accept text file uploads, including ChatGPT (free and Plus), Claude (Sonnet and Opus), Google Gemini, Grok, Perplexity, and any other AI assistant. Since it outputs plain text, it's universally compatible.",
  },
  {
    category: "AI Platforms",
    question:
      "What's the difference between uploading to ChatGPT vs Claude?",
    answer:
      "Both platforms work identically with OneFile's output. ChatGPT free limits you to 3 files per day, ChatGPT Plus to 10 files per message. Claude limits vary by plan. With OneFile, you sidestep all these restrictions by uploading one combined file to either platform.",
  },
  {
    category: "AI Platforms",
    question: "Can I use the output with GPT-5 or Claude Opus?",
    answer:
      "Absolutely! The combined text file works with all AI model versions including GPT-5, Claude Sonnet, Claude Opus, Grok, Gemini Pro, and any other LLM. The format is universal plain text.",
  },

  // File Types & Uploads
  {
    category: "File Types & Uploads",
    question: "What file types are supported?",
    answer:
      "OneFile supports 50+ file types including: PDFs (.pdf), Microsoft Office files (.docx, .xlsx, .pptx, .doc, .xls, .ppt), code files (.js, .py, .java, .cpp, .tsx, .jsx, .go, .rs, .rb, etc.), text files (.txt, .md, .csv, .tsv), configuration files (.json, .yaml, .yml, .xml, .toml, .ini, .env), web files (.html, .css, .scss), and many more. Images and binary files are automatically filtered out.",
  },
  {
    category: "File Types & Uploads",
    question: "Can I upload an entire GitHub repository?",
    answer:
      "Yes! Use our GitHub import feature to browse and select files from any public repository. You can also download a repo as a ZIP file, extract it locally, and upload the entire folder by dragging it into OneFile. We automatically respect .gitignore files and skip node_modules, .git, and other unnecessary directories.",
  },
  {
    category: "File Types & Uploads",
    question: "What happens to image files?",
    answer:
      "Image files (.jpg, .png, .gif, .svg, etc.) are automatically skipped and not included in the output. You'll see a notification showing how many images were skipped.  This is intentional but adding image support is in our roadmap.",
  },
  {
    category: "File Types & Uploads",
    question: "How does OneFile handle large files?",
    answer:
      "Simple text files are processed instantly in your browser. Complex documents like PDFs, DOCX, and XLSX are processed server-side via an API route. Files are handled in-memory during the request and never persisted, which takes a few seconds. The combined output is optimized for AI context windows, typically staying under 1-2MB for easy uploading.",
  },

  // Privacy & Security
  {
    category: "Privacy & Security",
    question: "Is my data private and secure?",
    answer:
      "Absolutely. All text file processing happens locally in your web browser using JavaScript. Your files never touch our servers or get uploaded to the internet for these file types. Complex documents (PDFs, DOCX, XLSX, PPTX) are processed server-side for text extraction. They're handled in-memory during the request and never stored or persisted. We don't log, store, or analyze your files.",
  },
  {
    category: "Privacy & Security",
    question: "Can you see my files?",
    answer:
      "No. For text files, processing is 100% browser-based, we literally cannot see them because they never reach our servers. For PDFs and Office documents, they're processed via our server-side API for text extraction. They're handled in-memory and never stored. We don't log file names, contents, or any metadata.",
  },
  {
    category: "Privacy & Security",
    question: "Is the code open source?",
    answer:
      "Yes! OneFile is fully open source under the MIT license. You can view all the code on GitHub (github.com/wahibonae/onefile), verify exactly how we handle files, report bugs, contribute improvements, or even host your own private version.",
  },
  {
    category: "Privacy & Security",
    question: "Do you store uploaded files?",
    answer:
      "No, never. Text files are processed entirely in your browser and never sent to us. Documents sent for text extraction are processed in-memory during the API request and automatically discarded when processing completes, they're never written to disk or stored in any database.",
  },

  // Technical Questions
  {
    category: "Technical Questions",
    question: "What is .gitignore support?",
    answer:
      "If your uploaded folder contains a .gitignore file, OneFile automatically reads it and excludes any files matching those patterns. This is incredibly useful for developers, when you upload a code project, we'll automatically skip node_modules, .env files, build artifacts, and anything else in your .gitignore.",
  },

  // Troubleshooting
  {
    category: "Troubleshooting",
    question: "Why are some of my files being skipped?",
    answer:
      "Files are skipped for several reasons: 1) They're in your .gitignore file, 2) They're in ignored directories (node_modules, .git, dist, build, etc.), 3) They're unsupported file types (images, videos, binaries), 4) They're empty, or 5) They failed to process. Check the toast notifications for details on what was skipped and why.",
  },
  {
    category: "Troubleshooting",
    question: "The upload is taking a long time. Is something wrong?",
    answer:
      "Large folders with thousands of files or large PDFs can take 10-30 seconds to process. You'll see a loading indicator while processing. If it's stuck for more than a minute, try refreshing and uploading fewer files at once. Complex documents (PDFs, XLSX) take longer because they require server-side processing.",
  },
  {
    category: "Troubleshooting",
    question: "I got an error while uploading. What should I do?",
    answer:
      "Common solutions: 1) Check your internet connection (needed for PDF/DOCX processing), 2) Try uploading fewer files at once, 3) Remove any corrupted files, 4) Refresh the page and try again, 5) Check if specific file types are causing issues. If problems persist, please open an issue on our GitHub repository with details.",
  },

  // Use Cases
  {
    category: "Use Cases",
    question: "How do students use OneFile?",
    answer:
      "Students merge research papers, lecture notes, and assignments into one file, then upload it to ChatGPT or Claude using just 1 upload slot. Great for thesis research, essay writing, or studying with AI tutors.",
  },
  {
    category: "Use Cases",
    question: "How do developers use OneFile?",
    answer:
      "Developers merge their entire codebase into one file for AI code review, debugging, or documentation. Instead of hitting the 3-file upload limits or uploading files one by one, upload your whole project in a single file slot. OneFile respects .gitignore automatically.",
  },
  {
    category: "Use Cases",
    question: "Can I use this for professional/business documents?",
    answer:
      "Yes! Merge meeting notes, reports, spreadsheets, and presentations into one file. Upload once to ChatGPT and get AI analysis on everything. Your data stays private, processed locally in your browser.",
  },
];
