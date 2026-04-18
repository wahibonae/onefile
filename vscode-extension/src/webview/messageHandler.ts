import * as vscode from 'vscode'
import { promises as fs } from 'fs'
import { FileWithContent } from '../fileProcessor'
import { generatePromptText, calculateOutputSize } from '../outputGenerator/promptText'
import { generateMarkdownText } from '../outputGenerator/markdownText'
import { PanelManager } from '../panelManager'

type WebviewMessage =
  | { type: 'ready' }
  | { type: 'copyToClipboard' }
  | { type: 'downloadFile'; format: 'txt' | 'md' }
  | { type: 'removeFile'; index: number }
  | { type: 'clearAll' }

function getFiles(context: vscode.ExtensionContext): FileWithContent[] {
  return context.workspaceState.get<FileWithContent[]>('onefile.files', [])
}

async function saveFiles(
  context: vscode.ExtensionContext,
  files: FileWithContent[]
): Promise<void> {
  // Persist only path + absolutePath — never the full content
  const persisted = files.map(f => ({ path: f.path, absolutePath: f.absolutePath }))
  await context.workspaceState.update('onefile.files', persisted)
}

function syncPanel(context: vscode.ExtensionContext, files: FileWithContent[]): void {
  PanelManager.sendFileState(files, calculateOutputSize(files))
}

export async function handleMessage(
  msg: WebviewMessage,
  _panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
): Promise<void> {
  const files = getFiles(context)

  switch (msg.type) {
    case 'ready': {
      syncPanel(context, files)
      break
    }

    case 'copyToClipboard': {
      const text = generatePromptText(files)
      await vscode.env.clipboard.writeText(text)
      PanelManager.postMessage({ type: 'notification', kind: 'success', message: 'Copied to clipboard!' })
      break
    }

    case 'downloadFile': {
      const isMarkdown = msg.format === 'md'
      const text = isMarkdown ? generateMarkdownText(files) : generatePromptText(files)
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
      const updated = files.filter((_, i) => i !== msg.index)
      await saveFiles(context, updated)
      syncPanel(context, updated)
      break
    }

    case 'clearAll': {
      await saveFiles(context, [])
      syncPanel(context, [])
      break
    }
  }
}

/**
 * Called by commands.ts after files are added.
 * Merges new files into the existing list (deduplicates by path).
 */
export async function addFiles(
  context: vscode.ExtensionContext,
  incoming: FileWithContent[]
): Promise<void> {
  const existing = getFiles(context)
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

  await saveFiles(context, merged)
  syncPanel(context, merged)

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
