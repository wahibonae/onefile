import * as vscode from 'vscode'
import { promises as fs } from 'fs'
import { FileWithContent } from '../fileProcessor'
import { generatePromptText, calculateOutputSize } from '../outputGenerator/promptText'
import { generateMarkdownText } from '../outputGenerator/markdownText'
import { PanelManager } from '../panelManager'
import { updateStatusBar } from '../statusBar'
import { getFiles, setFiles } from '../fileState'

type WebviewMessage =
  | { type: 'ready' }
  | { type: 'copyToClipboard' }
  | { type: 'downloadFile'; format: 'txt' | 'md' }
  | { type: 'removeFile'; index: number }
  | { type: 'clearAll' }

/**
 * Persist only { path, absolutePath } to workspaceState for cross-restart recovery.
 * Full content is never written to disk — it lives in the in-memory fileState store.
 */
async function persistPaths(
  context: vscode.ExtensionContext,
  files: FileWithContent[]
): Promise<void> {
  const persisted = files.map(f => ({ path: f.path, absolutePath: f.absolutePath }))
  await context.workspaceState.update('onefile.files', persisted)
}

function syncPanel(files: FileWithContent[]): void {
  PanelManager.sendFileState(files, calculateOutputSize(files))
  updateStatusBar(files.length)
}

export async function handleMessage(
  msg: WebviewMessage,
  _panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
): Promise<void> {
  switch (msg.type) {
    case 'ready': {
      syncPanel(getFiles())
      break
    }

    case 'copyToClipboard': {
      const text = generatePromptText(getFiles())
      await vscode.env.clipboard.writeText(text)
      PanelManager.postMessage({ type: 'notification', kind: 'success', message: 'Copied to clipboard!' })
      break
    }

    case 'downloadFile': {
      const isMarkdown = msg.format === 'md'
      const text = isMarkdown ? generateMarkdownText(getFiles()) : generatePromptText(getFiles())
      const ext = isMarkdown ? 'md' : 'txt'

      const uri = await vscode.window.showSaveDialog({
        defaultUri: vscode.Uri.file(`onefile-prompt.${ext}`),
        filters: isMarkdown
          ? { 'Markdown': ['md'] }
          : { 'Text': ['txt'] }
      })

      if (uri) {
        await fs.writeFile(uri.fsPath, text, 'utf-8')
        PanelManager.postMessage({ type: 'notification', kind: 'success', message: `Saved as ${ext.toUpperCase()}` })
      }
      break
    }

    case 'removeFile': {
      const updated = getFiles().filter((_, i) => i !== msg.index)
      setFiles(updated)
      await persistPaths(context, updated)
      syncPanel(updated)
      break
    }

    case 'clearAll': {
      setFiles([])
      await persistPaths(context, [])
      syncPanel([])
      break
    }
  }
}

/**
 * Called by commands.ts after new files are processed.
 * Merges into the in-memory store, persists paths, and syncs the panel.
 */
export async function addFiles(
  context: vscode.ExtensionContext,
  incoming: FileWithContent[]
): Promise<void> {
  const existing = getFiles()
  const existingPaths = new Set(existing.map(f => f.path))

  const merged = [...existing]
  let added = 0
  for (const file of incoming) {
    if (!existingPaths.has(file.path)) {
      merged.push(file)
      existingPaths.add(file.path)
      added++
    }
  }

  setFiles(merged)
  await persistPaths(context, merged)
  syncPanel(merged)

  if (added > 0) {
    PanelManager.postMessage({
      type: 'notification',
      kind: 'success',
      message: `Added ${added} file${added === 1 ? '' : 's'}`
    })
  } else {
    PanelManager.postMessage({
      type: 'notification',
      kind: 'success',
      message: 'No new files to add (all already present)'
    })
  }
}
