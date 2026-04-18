import * as vscode from 'vscode'
import { getWebviewContent } from './webview/panelHtml'
import { handleMessage } from './webview/messageHandler'
import { FileWithContent } from './fileProcessor'

export class PanelManager {
  private static panel: vscode.WebviewPanel | undefined
  private static _context: vscode.ExtensionContext | undefined

  static getOrCreate(context: vscode.ExtensionContext): vscode.WebviewPanel {
    this._context = context

    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Beside)
      return this.panel
    }

    this.panel = vscode.window.createWebviewPanel(
      'onefile',
      'OneFile',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, 'media')
        ]
      }
    )

    this.panel.webview.html = getWebviewContent()

    this.panel.webview.onDidReceiveMessage(
      msg => handleMessage(msg, this.panel!, context),
      undefined,
      context.subscriptions
    )

    this.panel.onDidDispose(
      () => { this.panel = undefined },
      undefined,
      context.subscriptions
    )

    return this.panel
  }

  static postMessage(message: unknown): void {
    this.panel?.webview.postMessage(message)
  }

  static sendFileState(files: FileWithContent[], outputSize: number): void {
    this.postMessage({ type: 'filesChanged', files, outputSize })
  }

  static dispose(): void {
    this.panel?.dispose()
    this.panel = undefined
  }
}
