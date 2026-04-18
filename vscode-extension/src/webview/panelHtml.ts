export function getWebviewContent(): string {
  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OneFile</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      padding: 16px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    h2 {
      font-size: 14px;
      font-weight: 600;
      color: var(--vscode-foreground);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .size-badge {
      font-size: 11px;
      color: var(--vscode-descriptionForeground);
    }

    .empty-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--vscode-descriptionForeground);
      font-size: 13px;
    }

    .empty-state .icon {
      font-size: 32px;
      opacity: 0.4;
    }

    .file-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      border-radius: 4px;
      background: var(--vscode-list-inactiveSelectionBackground);
      gap: 8px;
    }

    .file-item:hover {
      background: var(--vscode-list-hoverBackground);
    }

    .file-path {
      font-size: 12px;
      color: var(--vscode-foreground);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      min-width: 0;
    }

    .remove-btn {
      background: none;
      border: none;
      color: var(--vscode-descriptionForeground);
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 14px;
      line-height: 1;
      flex-shrink: 0;
    }

    .remove-btn:hover {
      color: var(--vscode-errorForeground);
      background: var(--vscode-inputValidation-errorBackground);
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .btn-row {
      display: flex;
      gap: 6px;
    }

    button.primary {
      flex: 1;
      padding: 7px 12px;
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-family: var(--vscode-font-family);
    }

    button.primary:hover {
      background: var(--vscode-button-hoverBackground);
    }

    button.secondary {
      flex: 1;
      padding: 7px 12px;
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-family: var(--vscode-font-family);
    }

    button.secondary:hover {
      background: var(--vscode-button-secondaryHoverBackground);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .footer-note {
      font-size: 11px;
      color: var(--vscode-descriptionForeground);
      text-align: center;
    }

    .toast {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
      z-index: 100;
      white-space: nowrap;
    }

    .toast.success {
      background: var(--vscode-inputValidation-infoBackground);
      color: var(--vscode-inputValidation-infoForeground);
      border: 1px solid var(--vscode-inputValidation-infoBorder);
    }

    .toast.error {
      background: var(--vscode-inputValidation-errorBackground);
      color: var(--vscode-inputValidation-errorForeground);
      border: 1px solid var(--vscode-inputValidation-errorBorder);
    }

    .toast.visible {
      opacity: 1;
    }
  </style>
</head>
<body>

  <div class="header">
    <h2>OneFile</h2>
    <span class="size-badge" id="size-badge"></span>
  </div>

  <div id="empty-state" class="empty-state">
    <div class="icon">📄</div>
    <div>No files added yet</div>
    <div style="font-size:11px">Right-click files or folders in the Explorer<br>and choose <strong>Add to OneFile</strong></div>
  </div>

  <div id="file-list" class="file-list" style="display:none"></div>

  <div class="actions">
    <div class="btn-row">
      <button class="primary" id="btn-copy" disabled>Copy to Clipboard</button>
    </div>
    <div class="btn-row">
      <button class="secondary" id="btn-dl-txt" disabled>Download .txt</button>
      <button class="secondary" id="btn-dl-md" disabled>Download .md</button>
    </div>
    <div class="btn-row">
      <button class="secondary" id="btn-clear" disabled>Clear All</button>
    </div>
  </div>

  <div class="footer-note">Files are kept until you close VS Code</div>

  <div class="toast" id="toast"></div>

  <script>
    const vscode = acquireVsCodeApi();

    let state = vscode.getState() || { files: [], outputSize: 0 };

    // --- DOM refs ---
    const emptyState   = document.getElementById('empty-state');
    const fileListEl   = document.getElementById('file-list');
    const sizeBadge    = document.getElementById('size-badge');
    const btnCopy      = document.getElementById('btn-copy');
    const btnDlTxt     = document.getElementById('btn-dl-txt');
    const btnDlMd      = document.getElementById('btn-dl-md');
    const btnClear     = document.getElementById('btn-clear');
    const toastEl      = document.getElementById('toast');

    // --- Render ---
    function formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function render() {
      const files = state.files || [];
      const hasFiles = files.length > 0;

      emptyState.style.display  = hasFiles ? 'none' : 'flex';
      fileListEl.style.display  = hasFiles ? 'flex' : 'none';

      btnCopy.disabled   = !hasFiles;
      btnDlTxt.disabled  = !hasFiles;
      btnDlMd.disabled   = !hasFiles;
      btnClear.disabled  = !hasFiles;

      sizeBadge.textContent = hasFiles
        ? files.length + ' file' + (files.length === 1 ? '' : 's') + ' · ' + formatSize(state.outputSize || 0)
        : '';

      fileListEl.innerHTML = files.map((f, i) =>
        '<div class="file-item">' +
          '<span class="file-path" title="' + escHtml(f.path) + '">' + escHtml(f.path) + '</span>' +
          '<button class="remove-btn" data-index="' + i + '" title="Remove">✕</button>' +
        '</div>'
      ).join('');
    }

    function escHtml(str) {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    // --- Toast ---
    let toastTimer;
    function showToast(kind, message) {
      toastEl.textContent = message;
      toastEl.className = 'toast ' + kind + ' visible';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toastEl.className = 'toast ' + kind; }, 2500);
    }

    // --- Events ---
    fileListEl.addEventListener('click', e => {
      const btn = e.target.closest('.remove-btn');
      if (btn) {
        vscode.postMessage({ type: 'removeFile', index: parseInt(btn.dataset.index, 10) });
      }
    });

    btnCopy.addEventListener('click', () => vscode.postMessage({ type: 'copyToClipboard' }));
    btnDlTxt.addEventListener('click', () => vscode.postMessage({ type: 'downloadFile', format: 'txt' }));
    btnDlMd.addEventListener('click',  () => vscode.postMessage({ type: 'downloadFile', format: 'md' }));
    btnClear.addEventListener('click', () => vscode.postMessage({ type: 'clearAll' }));

    // --- Messages from extension host ---
    window.addEventListener('message', event => {
      const msg = event.data;
      switch (msg.type) {
        case 'filesChanged':
          state = { files: msg.files, outputSize: msg.outputSize };
          vscode.setState(state);
          render();
          break;
        case 'notification':
          showToast(msg.kind, msg.message);
          break;
      }
    });

    // Signal ready — host will send current file state
    vscode.postMessage({ type: 'ready' });
    render();
  </script>
</body>
</html>`
}
