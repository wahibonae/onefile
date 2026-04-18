import * as vscode from 'vscode'
import { registerCommands, restorePersistedFiles } from './commands'
import { PanelManager } from './panelManager'

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  registerCommands(context)
  await restorePersistedFiles(context)
}

export function deactivate(): void {
  PanelManager.dispose()
}
