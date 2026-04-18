# OneFile for VS Code

Combine files and folders into a single AI-ready prompt, directly from your editor.

## What it does

Select files or folders in the Explorer, click **Add to OneFile**, and get a formatted text prompt ready to paste into ChatGPT, Claude, Gemini, or any AI tool. No browser needed.

Output format:
```
======== FILES ========
*** src/index.ts ***
<file content>

*** src/utils.ts ***
<file content>
```

## Install

1. Download the `.vsix` file from the [releases page](https://github.com/wahibonae/onefile)
2. In VS Code: `Extensions` → `...` → `Install from VSIX…`

Or install from the VS Code Marketplace (once published):
```
ext install onefile.onefile-vscode
```

## Usage

### Add files
Right-click any file or folder in the Explorer panel → **Add to OneFile**

Multi-select files with `Ctrl+Click`, then right-click → **Add to OneFile**

### Open the panel
`Ctrl+Shift+P` → **OneFile: Open Panel**

The status bar shows the current file count: `$(files) OneFile: 3 files`

### Export your prompt
From the OneFile panel:
- **Copy to Clipboard** — copies the plain-text prompt
- **Download .txt** — saves as `onefile-prompt.txt`
- **Download .md** — saves as `onefile-prompt.md` with fenced code blocks

### Remove files
Click the **✕** button next to any file in the panel, or use **Clear All**.

## Supported file types

- **Code**: `.js`, `.jsx`, `.ts`, `.tsx`, `.py`, `.java`, `.rb`, `.php`, `.go`, `.rs`, `.c`, `.cpp`, `.cs`, `.swift`, `.kt`, `.scala`, `.dart`, `.lua`, and more
- **Web**: `.html`, `.css`, `.scss`, `.json`, `.xml`, `.yaml`, `.graphql`
- **Config**: `.env`, `.toml`, `.ini`, `.tf`, `.proto`
- **Documents**: `.pdf`, `.docx`, `.pptx`, `.xlsx`, `.xls`
- **Markdown / text**: `.md`, `.txt`, `.tex`
- **Data**: `.csv`, `.tsv`, `.sql`

Automatically skips: `node_modules`, `.git`, `dist`, `build`, `.next`, `__pycache__`, and files matched by `.gitignore`.

## Notes

- Files are kept in the panel until you close VS Code (stored in workspace state)
- `.gitignore` rules in uploaded folders are respected
- Document files (PDF, DOCX, PPTX, XLSX) are processed locally — no data leaves your machine

## License

MIT — part of the [OneFile](https://github.com/wahibonae/onefile) project
