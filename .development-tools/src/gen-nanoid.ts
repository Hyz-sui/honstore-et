/**
 * @file gen-nanoid.ts
 * @description nanoid を生成してクリップボードにコピーするスクリプトだよ！
 * @author Gemini (Antigravity)
 */

import { spawn } from 'node:child_process';
import { nanoid } from 'nanoid';

/**
 * 外部コマンドを実行して標準入力にテキストを流し込むユーティリティ
 */
function tryProcess(command: string, args: string[], text: string): Promise<boolean> {
  return new Promise((resolve) => {
    const child = spawn(command, args);

    child.on('error', () => {
      resolve(false); // コマンドが存在しない場合は失敗
    });

    child.on('exit', (code) => {
      resolve(code === 0);
    });

    // 標準入力に書き込み
    try {
      child.stdin.write(text);
      child.stdin.end();
    } catch {
      resolve(false);
    }
  });
}

/**
 * クリップボードに文字列をコピーする
 * Windows, macOS, Linux (xclip, xsel, wl-copy, WSL) に対応
 */
export async function copy(text: string): Promise<void> {
  const platform = process.platform;

  // --- macOS ---
  if (platform === 'darwin') {
    if (await tryProcess('pbcopy', [], text)) return;
  }

  // --- Windows ---
  if (platform === 'win32') {
    // PowerShell経由（UTF-8/日本語対応に強い）
    const psCommand = `Set-Clipboard -Value @'\n${text.replace(/'/g, "''")}\n'@`;
    if (await tryProcess('powershell.exe', ['-NoProfile', '-Command', psCommand], '')) return;
    
    // フォールバック: 伝統的な clip.exe (Shift-JIS制限あり)
    if (await tryProcess('clip.exe', [], text)) return;
  }

  // --- Linux / BSD ---
  if (platform === 'linux' || platform === 'freebsd' || platform === 'openbsd') {
    // 1. WSL (Windows Subsystem for Linux) の場合
    if (process.env.WSL_DISTRO_NAME || process.env.IS_WSL) {
      if (await tryProcess('clip.exe', [], text)) return;
    }

    // 2. Wayland 環境 (wl-copy)
    if (process.env.WAYLAND_DISPLAY) {
      if (await tryProcess('wl-copy', [], text)) return;
    }

    // 3. X11 環境 (xclip) - 最も一般的
    if (await tryProcess('xclip', ['-selection', 'clipboard'], text)) return;

    // 4. X11 環境 (xsel)
    if (await tryProcess('xsel', ['--clipboard', '--input'], text)) return;
  }

  throw new Error('Could not find a suitable clipboard command.');
}

// 実行処理
(async () => {
  try {
    const id = nanoid();
    console.log(`Generated ID: ${id}`);
    
    await copy(id);
    console.log('✅ クリップボードにコピーしたよ！');
  } catch (err) {
    console.error('❌ エラーが発生したよ:', err);
    process.exit(1);
  }
})();
