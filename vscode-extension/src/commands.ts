import * as vscode from 'vscode'
import { promises as fs } from 'fs'
import { processUris, FileWithContent } from './fileProcessor'
import { PanelManager } from './panelManager'
import { addFiles } from './webview/messageHandler'
import { calculateOutputSize } from './outputGenerator/promptText'
import { updateStatusBar } from './statusBar'

/** Restore persisted file paths from workspaceState, re-reading content from disk. */
export async function restorePersistedFiles(context: vscode.ExtensionContext): Promise<void> {
  type PersistedFile = { path: string; absolutePath: string }
  const persisted = context.workspaceState.get<PersistedFile[]>('onefile.files', [])

  if (persisted.length === 0) {
    return
  }

  const restored: FileWithContent[] = []
  for (const entry of persisted) {
    try {
      const content = await fs.readFile(entry.absolutePath, 'utf-8')
      restored.push({ path: entry.path, content, absolutePath: entry.absolutePath })
    } catch {
      // File was deleted or moved — skip silently
    }
  }

  // Write back the restored set (drops any files that no longer exist)
  const persistedRestored = restored.map(f => ({ path: f.path, absolutePath: f.absolutePath }))
  await context.workspaceState.update('onefile.files', persistedRestored)
}

export function registerCommands(context: vscode.ExtensionContext): void {
  // onefile.addToOneFile — context menu on files/folders in Explorer
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'onefile.addToOneFile',
      async (clickedUri: vscode.Uri, selectedUris: vscode.Uri[]) => {
        const uris = selectedUris?.length ? selectedUris : [clickedUri]

        if (!uris || uris.length === 0) {
          vscode.window.showErrorMessage('OneFile: No files selected.')
          return
        }

        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: 'OneFile: Processing files…',
            cancellable: false
          },
          async () => {
            const incoming = await processUris(uris)
            const panel = PanelManager.getOrCreate(context)
            panel // ensure panel is open
            await addFiles(context, incoming)
          }
        )
      }
    )
  )

  // onefile.openPanel — open/reveal the panel
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'onefile.openPanel',
      () => {
        const panel = PanelManager.getOrCreate(context)
        panel // ensure panel is revealed
        // State will be sent when webview fires 'ready'
      }
    )
  )

  // onefile.clearAll — clear files from panel and state
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'onefile.clearAll',
      async () => {
        await context.workspaceState.update('onefile.files', [])
        PanelManager.sendFileState([], calculateOutputSize([]))
        updateStatusBar(0)
        PanelManager.postMessage({ type: 'notification', kind: 'success', message: 'Cleared all files' })
      }
    )
  )
}
