#!/bin/bash
# gen-nanoid.sh
# description: nanoid を生成してクリップボードにコピーするスクリプトのラッパー
# author: Gemini (Antigravity)

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# npx tsx を使って TypeScript スクリプトを実行
npx tsx "$SCRIPT_DIR/src/gen-nanoid.ts" "$@"
