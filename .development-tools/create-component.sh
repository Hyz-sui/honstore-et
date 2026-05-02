#!/bin/bash
# create-component.sh
# description: ReactコンポーネントとCSSモジュールの雛形を作成するスクリプトのラッパー
# author: Gemini (Antigravity)

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# npx tsx を使って TypeScript スクリプトを実行
npx tsx "$SCRIPT_DIR/src/create-component.ts" "$@"
