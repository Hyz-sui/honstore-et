# 開発ツール・ドキュメント

> [!NOTE]
> 本ドキュメントは、AIアシスタントのGemini (Antigravity) によって作成されました。

本ディレクトリには、プロジェクトの開発効率を向上させるための各種ツールが格納されています。

## コンポーネント作成ツール (`create-component.sh`)

Reactコンポーネントおよび対応するCSSモジュールのディレクトリ構造とファイルの雛形を自動生成するツールです。

### 使用方法

#### 1. 引数指定による実行
第1引数にコンポーネントの種類 (`ui`, `features`, `layouts`)、第2引数にコンポーネント名 (kebab-case) を指定して実行します。

```bash
./.development-tools/create-component.sh <type> <name>
```

例:
```bash
./.development-tools/create-component.sh ui search-button
```

#### 2. 対話モードによる実行
引数を指定せずに実行した場合、対話形式で必要な情報を入力することができます。

```bash
./.development-tools/create-component.sh
```

### 生成されるファイル
指定されたディレクトリ内に以下のファイルが生成されます。

- `{name}.tsx`: コンポーネント定義ファイル（最小限の定義のみ）
- `{name}.module.css`: CSSモジュールファイル（空ファイル）

### 技術仕様
- 本ツールの中核は TypeScript (`src/create-component.ts`) で実装されています。
- 実行には `npx tsx` を使用しています。

---

## nanoid 生成・コピーツール (`gen-nanoid.sh`)

`nanoid` ライブラリを使用して ID を生成し、自動的にクリップボードにコピーするツールです。

### 使用方法

プロジェクトのルートディレクトリから以下のコマンドを実行します。

```bash
pnpm gen-nanoid
```

実行後、生成された ID がコンソールに表示され、クリップボードにコピーされます。

### 技術仕様
- `nanoid` ライブラリを `devDependencies` として使用しています。
- クリップボードへのコピーには、OS ごとの標準的なコマンド (`pbcopy`, `clip.exe`, `xclip` 等) を内部で使用しています。
