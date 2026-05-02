#!/bin/bash
# export-licenses.sh
# description: 依存パッケージからライセンス情報を抽出してJSONに出力するスクリプト
# author: Gemini (Antigravity)

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Node.js を使って JS スクリプトを実行 (tsx のオーバーヘッド削減)
node "$SCRIPT_DIR/src/export-licenses.js" "$@"
