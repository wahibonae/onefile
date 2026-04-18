import * as vscode from 'vscode'

let statusBarItem: vscode.StatusBarItem | undefined

export function createStatusBar(): vscode.StatusBarItem {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBarItem.command = 'onefile.openPanel'
  statusBarItem.tooltip = 'Open OneFile panel'
  updateStatusBar(0)
  statusBarItem.show()
  return statusBarItem
}

export function updateStatusBar(fileCount: number): void {
  if (!statusBarItem) {
    return
  }
  if (fileCount === 0) {
    statusBarItem.text = '$(files) OneFile: empty'
  } else {
    statusBarItem.text = `$(files) OneFile: ${fileCount} file${fileCount === 1 ? '' : 's'}`
  }
}

export function disposeStatusBar(): void {
  statusBarItem?.dispose()
  statusBarItem = undefined
}
