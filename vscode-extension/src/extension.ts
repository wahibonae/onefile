import * as vscode from 'vscode'
import { registerCommands, restorePersistedFiles } from './commands'
import { PanelManager } from './panelManager'
import { createStatusBar, disposeStatusBar } from './statusBar'

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const bar = createStatusBar()
  context.subscriptions.push(bar)
  registerCommands(context)
  await restorePersistedFiles(context)
}

export function deactivate(): void {
  PanelManager.dispose()
  disposeStatusBar()
}
