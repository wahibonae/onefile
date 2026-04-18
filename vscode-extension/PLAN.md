# Plan: OneFile VS Code Extension

## Context
Developers who use OneFile to prepare AI prompts currently have to open a browser, drag files in, and copy output. A VS Code extension eliminates that friction: right-click files or folders in the Explorer → "Add to OneFile" → panel opens with the combined prompt ready to copy. All the core logic (file filtering, gitignore parsing, output formatting) already exists in the web app and can be ported with minimal changes.

---

## Directory Structure

New subdirectory in the repo root: `vscode-extension/`

```
vscode-extension/
├── package.json
├── tsconfig.json
├── .vscodeignore
├── esbuild.config.js
├── src/
│   ├── extension.ts              # activate() / deactivate()
│   ├── commands.ts               # registerCommands()
│   ├── panelManager.ts           # Singleton WebviewPanel
│   ├── fileState.ts              # Module-level in-memory file list (live content)
│   ├── statusBar.ts              # Status bar item
│   ├── fileProcessor/
│   │   ├── index.ts              # processUris() orchestrator + walkDirectory()
│   │   ├── constants.ts          # ALLOWED_EXTENSIONS, IGNORED_PATHS (copied from web app)
│   │   ├── gitignoreParser.ts    # GitignoreParser class (copied verbatim)
│   │   ├── pathFilter.ts         # isPathIgnored(), isExtensionAllowed()
│   │   ├── pathUtils.ts          # normalizePath() shared utility
│   │   ├── textReader.ts         # fs.promises.readFile wrapper
│   │   └── documentExtractor.ts  # Phase 1: stub only; Phase 2: PDF/DOCX/PPTX/XLSX
│   ├── outputGenerator/
│   │   ├── promptText.ts         # generatePromptText() + calculateOutputSize() (copied verbatim)
│   │   └── markdownText.ts       # generateMarkdownText() (copied verbatim)
│   └── webview/
│       ├── panelHtml.ts          # getWebviewContent() → full HTML string
│       └── messageHandler.ts     # dispatch webview → host messages
└── media/
    └── icon.svg
```

---

## Critical Source Files

- **Port from**: `src/utils/files.ts` — `GitignoreParser`, `generatePromptText`, `generateMarkdownText`, `calculateOutputSize`, `isPathIgnored`
- **Copy verbatim**: `src/constants/files.ts` — `ALLOWED_EXTENSIONS`, `IGNORED_PATHS`, `DOCUMENT_EXTENSIONS`
- **Port from**: `src/app/api/extract-text/route.ts` — `processPdf`, `processDocx`, `processPptx`, `processExcel`
- **Reference for UI**: `src/components/ToolSection.tsx` — file list + action buttons layout

---

## Implementation Details

### 1. `package.json` — Key manifest entries

```json
{
  "engines": { "vscode": "^1.85.0" },
  "main": "./out/extension.js",
  "activationEvents": [
    "onCommand:onefile.addToOneFile",
    "onCommand:onefile.openPanel",
    "onCommand:onefile.clearAll"
  ],
  "contributes": {
    "commands": [
      { "command": "onefile.addToOneFile", "title": "Add to OneFile" },
      { "command": "onefile.openPanel",    "title": "OneFile: Open Panel" },
      { "command": "onefile.clearAll",     "title": "OneFile: Clear All Files" }
    ],
    "menus": {
      "explorer/context": [
        {
          "command": "onefile.addToOneFile",
          "group": "navigation@99"
        }
      ]
    }
  },
  "dependencies": {
    "mammoth": "^1.6.0",
    "jszip": "^3.10.1",
    "exceljs": "^4.4.0",
    "pdf-parse": "^1.1.1"
  }
}
```

`activationEvents` must be explicit — newer VS Code auto-infers `onCommand`, but it's required for compatibility at the `^1.85.0` target.

**NOTE: Do not add a `when` clause to the explorer/context menu entry.** `explorerResourceIsFile` is unreliable across VS Code versions — it evaluates to `false` for file right-clicks in many environments, silently hiding the menu item. The `explorer/context` key already scopes the command to the Explorer panel only. Both files and folders are valid targets so no further restriction is needed. (Fixed in commit e52798e.)

Build with **esbuild** (bundle all deps into `out/extension.js`; only `vscode` is external). `pdf-parse` bundles cleanly unlike `pdfjs-dist` which uses dynamic `require()` calls that break esbuild's static analysis and adds ~10MB to the bundle.

### 2. Context menu command

VS Code passes the clicked URI and all selected URIs:
```typescript
vscode.commands.registerCommand(
  'onefile.addToOneFile',
  async (clickedUri: vscode.Uri, selectedUris: vscode.Uri[]) => {
    const uris = selectedUris?.length ? selectedUris : [clickedUri];
    PanelManager.getOrCreate(context);
    await addFiles(context, await processUris(uris));
  }
);
```

### 3. Folder traversal (Node.js, replaces browser `FileSystemEntry` API)

Two-pass per directory:
1. Read `.gitignore` file first → build `GitignoreParser` for that directory
2. Walk remaining entries: skip `IGNORED_PATHS`, skip disallowed extensions, recurse into subdirs

**Path normalization — create one shared utility, call it everywhere:**
```typescript
// src/fileProcessor/pathUtils.ts
export function normalizePath(p: string): string {
  return p.replace(/\\/g, '/');
}
```
Use `normalizePath()` consistently when computing relative paths, in gitignore matching, and in the webview file list. Do not do inline `.replace(/\\/g, '/')` scattered throughout — Windows path separator bugs are subtle and hard to track down.

**Multi-root workspace handling:** VS Code supports workspaces with multiple root folders. When the common ancestor of dropped URIs starts outside the workspace, `path.relative()` produces `../../other-project/file.ts` paths. Guard against this:
```typescript
// If relPath starts with '..', fall back to showing 'parentFolder/filename'
if (relPath.startsWith('..')) {
  const parts = normalizePath(absPath).split('/');
  relPath = parts.slice(-2).join('/'); // e.g. "src/index.ts"
}
```

Common root for multi-select: find longest common ancestor of all dropped URIs.

### 4. Browser API → Node.js substitutions

| Browser | Node.js |
|---|---|
| `FileReader.readAsText()` | `fs.promises.readFile(path, 'utf-8')` |
| `file.arrayBuffer()` | `fs.promises.readFile(path)` → `Buffer` |
| `crypto.subtle.digest()` | `crypto.createHash('sha256').update(data).digest('hex')` |
| `fetch('/api/extract-text')` | direct call to `documentExtractor.extractDocument()` |
| `navigator.clipboard.writeText()` | `vscode.env.clipboard.writeText()` |
| `URL.createObjectURL()` + `<a>.click()` | `vscode.window.showSaveDialog()` + `fs.promises.writeFile()` |

For PDF extraction use **`pdf-parse`** (not `pdfjs-dist`). `pdf-parse` is Node-native, ~2MB, bundles cleanly with esbuild, and has a simple API:
```typescript
import pdfParse from 'pdf-parse';
const buffer = await fs.readFile(absolutePath);
const data = await pdfParse(buffer);
return data.text;
```
`pdfjs-dist` is browser-oriented, ~10MB, and its internal dynamic `require()` calls break esbuild bundling — it would need to be marked external and shipped separately.

Extension-only filtering: **drop MIME type checks entirely** — extension-based filtering is sufficient in Node.js (no browser MIME inconsistencies to work around).

### 5. WebView panel

- `retainContextWhenHidden: true` keeps the panel alive when hidden
- Styles use VS Code CSS variables (`--vscode-button-background`, etc.) for automatic dark/light theme

**Host → WebView messages:**
```typescript
{ type: 'filesChanged', files: FileWithContent[], outputSize: number }
{ type: 'notification', kind: 'success' | 'error', message: string }
```

**WebView → Host messages:**
```typescript
{ type: 'ready' }                          // DOM loaded, send current state
{ type: 'copyToClipboard' }
{ type: 'downloadFile', format: 'txt' | 'md' }
{ type: 'removeFile', index: number }
{ type: 'clearAll' }
```

**State persistence:** `workspaceState` persists only `{ path, absolutePath }` — never full content. Live file content lives in a module-level in-memory store (`src/fileState.ts`). On activate, `restorePersistedFiles()` re-reads content from disk and calls `setFiles()` to populate the in-memory store. Files that no longer exist are silently dropped.

**Critical:** Do NOT read `getFiles()` from `workspaceState` — it only has paths, not content. Always use `getFiles()` from `fileState.ts` for the live `FileWithContent[]` array. (Bug fixed in commit 4ea3999.)

Show a note in the webview UI: *"Files are kept until you close VS Code."*

### 6. Output format (unchanged from web app)

Plain text:
```
======== FILES ========
*** path/to/file.ts ***
<content>

```

Markdown: uses ` ```lang ` fenced code blocks with language detection from extension.

---

## Implementation Phases

**Phase 1 — Core pipeline (text files only)**
1. `constants.ts` — copy from web app
2. `gitignoreParser.ts` — copy verbatim
3. `pathFilter.ts` — port (drop MIME checks)
4. `pathUtils.ts` — `normalizePath()` utility
5. `textReader.ts` — write fresh
6. `documentExtractor.ts` — Phase 1 stub (throws "not yet supported")
7. `fileProcessor/index.ts` — `processUris()` + `walkDirectory()`
8. `outputGenerator/` — copy three pure functions
9. `extension.ts` + `commands.ts` + `panelManager.ts` — wire up commands + panel
10. `webview/panelHtml.ts` + `messageHandler.ts` — full UI
11. `fileState.ts` — in-memory store (fix for content-missing bug)

**Phase 1.5 — Status bar item**
12. `statusBar.ts` — `$(files) OneFile: N files`, clicking opens panel

**Phase 2 — Document extraction**
13. Fill in `documentExtractor.ts` — PDF (pdf-parse), DOCX (mammoth), PPTX (jszip), XLSX (exceljs)

---

## Known Bugs Fixed During Implementation

### `explorerResourceIsFile` when clause (commit e52798e)
**Symptom:** "Add to OneFile" never appeared in the Explorer context menu for file right-clicks.
**Root cause:** `explorerResourceIsFile` evaluates to `false` in many VS Code environments. The `when` clause `explorerResourceIsFile || explorerResourceIsFolder` evaluated to `false || false` for files, hiding the item silently.
**Fix:** Removed the `when` clause entirely. `explorer/context` already scopes to the Explorer panel.

### File content missing after panel reopen (commit 4ea3999)
**Symptom:** Copy to clipboard and download produced empty content after the panel was closed and reopened, or after any remove/clear action.
**Root cause:** `getFiles()` read from `workspaceState`, which persists only `{ path, absolutePath }` (no content). All message handlers called `getFiles()` and passed content-less objects to `generatePromptText()`, producing `undefined` for every file's content.
**Fix:** Introduced `src/fileState.ts` as a module-level in-memory store. `workspaceState` continues to persist only paths for cross-restart recovery. `getFiles()` now reads from the in-memory store, which is populated by `restorePersistedFiles()` on activate and by `addFiles()` on every add.

---

## Verification

1. `cd vscode-extension && npm install && npm run build` — verify `out/extension.js` generated
2. Press `F5` in VS Code (Extension Development Host opens)
3. Right-click a single file → "Add to OneFile" appears in context menu → panel opens with file listed
4. Right-click a folder with `.gitignore` → verify gitignore rules respected, `node_modules` skipped
5. Multi-select files (`Ctrl+click`) → all appear in panel
6. Copy to clipboard → paste and verify `======== FILES ========` format
7. Download .txt and .md → verify correct format saved
8. Remove individual file (X button) → file disappears from panel
9. Clear All → panel empties
10. Close panel, re-open via Command Palette → previous files still listed (session state)
11. (Phase 2) Add a `.docx` → verify text extracted, not binary
12. `vsce package` → install VSIX in clean VS Code, repeat smoke tests
