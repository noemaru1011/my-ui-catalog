# UI Catalog

React と TypeScript で構成された UI コンポーネントカタログです。

自分が個人開発で作ったものです。

Storybook を使用して、コンポーネントの表示・動作・バリエーションを確認し、UI の一貫性を維持します。

※テーブルやヘッダーなどは毎回異なるのでコンポーネント化してないです。
※ボタンなどは shadcn/ui をベースとてそのまま使うことが多いので、自作コンポーネント化してないです。

## Tech Stack

| 分類 | 技術 |
| ------------------ | ------------------- |
| Framework | React 19 |
| Language | TypeScript |
| UI Catalog | Storybook |
| Build Tool | Vite |
| Styling | Tailwind CSS 4 |
| UI Primitives | shadcn/ui |
| **Form(サンプル用)** | **React Hook Form、Zod** |
| Linter / Formatter | Biome |
| Package Manager | npm |
| Test | Vitest、Testing Library |
| CI/CD | GitHub ActionsGitHub |
| Deploy | GitHub Pages |
| AI | CodeX |

## Requirements

* Node.js `^24.0.0`
* npm
* Git

Node.js のバージョンは `.nvmrc` および `package.json` の `engines` に従います。

## Getting Started

### 1. Node.js のバージョンを合わせる

nvm を使用している場合、以下を実行します。

```bash
nvm use
```

### 2. 依存パッケージをインストールする

```bash
npm ci
```

インストール時には `prepare` スクリプトによって、Git フックの参照先が `.github/hooks` に設定されます。

### 3. Storybook を起動する

```bash
npm run storybook
```

ブラウザで以下の URL にアクセスします。

<http://localhost:6006>

### 4. Storybook をビルドする

```bash
npm run build-storybook
```

ビルド成果物は `storybook-static/` に出力されます。

## Directory Structure

```text
.
├── .agents
│   └── skills             # CodeX skills
├── .github/
│   ├── hooks/             # Git フック
│   └── workflows/         # GitHub Actions
├── .storybook/            # Storybook 設定
├── src/
│   ├── components/
│   │   ├── elements/      # 自作 UI コンポーネント
│   │   ├── layouts/       # レイアウト用　自作コンポーネント
│   │   ├── example/       # コンポーネントの組み合わせ例
│   │   ├── types/         # 共通の型定義等
│   │   └── ui/            # shadcn/ui の UI
│   ├── lib/               # 共通ユーティリティ
│   └── index.css          # グローバルスタイル(tailwindのみ)
├── biome.json             # Biome 設定
├── components.json        # shadcn/ui 設定
├── package.json
└── README.md
```

## Components

### Elements

自作したアプリケーションの UI を構成する、再利用可能なコンポーネントを管理します。

### Layouts

コンポーネントの配置やレイアウトを制御するためのコンポーネントです。

* Center
* Cluster
* Container
* Stack

### UI Primitives

`src/components/ui/` では、shadcn/ui をベースとした UI プリミティブを管理します。

ボタン、入力欄、ラベル、ポップオーバーなど、上位のコンポーネントを構成する基本的な UI 要素を配置します。

### Examples

複数のコンポーネントを組み合わせた使用例を管理します。

## Adding a Component

新しいコンポーネントを追加する場合は、用途に応じたディレクトリに配置します。

| 配置先 | 用途 |
| ---------------------- | ------------------------ |
| `components/elements/` | 再利用可能な UI コンポーネント |
| `components/layouts/` | レイアウト制御用コンポーネント |
| `components/ui/` | shadcn/ui ベースの UI プリミティブ(自作の場合ここに追加しない) |
| `components/example/` | 複数コンポーネントを組み合わせた使用例 |

### Storybook Stories

`elements/` および `layouts/` のコンポーネントには、実装ファイルと対応する Story,Test ファイルを配置します。

例：

```text
src/components/elements/Select/
├── Select.tsx
├── Select.test.tsx
└── Select.stories.tsx
```

Story ファイルでは、コンポーネントの基本表示、プロパティの違い、状態やバリエーションなどを確認できるようにします。

コンポーネントの仕様を変更した場合は、必要に応じて対応する Story も更新します。

### Test

コンポーネントのテスト方針や作成手順は Skills に落とし込み、コンポーネント間で一貫したテストを実施できるようにします。

テストでは、実装の詳細ではなく、コンポーネントが外部から観測できる振る舞いを中心に検証します。

主なテスト観点は以下のとおりです。

* **基本動作**：初期表示やデフォルトの状態が正しいこと
* **Props による挙動の違い**：Props の指定値や組み合わせに応じて、表示・動作・状態が適切に変化すること
* **ユーザー操作**：クリックや入力などの操作に応じて、期待する動作が行われること
* **状態の変化**：操作後の表示や状態が期待どおりに更新されること
* **制約条件**：`disabled` などの制約が適切に機能すること
* **アクセシビリティ**：ロール、ラベル、ARIA 属性などが適切に設定されていること

React コンポーネントでは、Vitest と React Testing Library を使用し、必要に応じて `userEvent` でユーザー操作を再現します。

コンポーネントの仕様を追加・変更した場合は、Skills に定義した方針に従って関連するテストを作成・更新し、既存の動作への影響がないことを確認します。

## Development Commands

| コマンド | 説明 |
| ------------------------- | ---------------------------- |
| `npm run storybook` | Storybook の開発サーバーを起動 |
| `npm run build-storybook` | Storybook を静的ビルド |
| `npm run lint` | Biome による Lint |
| `npm run format` | Biome によるフォーマット |
| `npm run check` | Biome によるチェック |
| `npm run check:fix` | Biome によるチェックと自動修正 |
| `npm run test` | Vitest でテストを実行（キャッシュをクリア） |
| `npm run test:run` | Vitest でテストを一括実行（キャッシュをクリア） |
| `npm run test:components` | コンポーネントのテストを実行（キャッシュをクリア） |
| `npm run test:storybook` | Storybook のテストを実行（キャッシュをクリア） |

### Code Quality

開発時には、必要に応じて以下を実行します。

```bash
npm run check
```

自動修正を適用する場合：

```bash
npm run check:fix
```

```bash
# テストを実行
npm run test

# テストを一括実行
npm run test:run

# コンポーネントのテストを実行
npm run test:components

# Storybook のテストを実行
npm run test:storybook
```

## Biome Configuration

Biome を使用して、コードの品質・フォーマット・命名規則を統一します。

### Configuration Rules

| 設定項目                 | ルール・値                        | 内容                        |
| -------------------- | ---------------------------- | ------------------------- |
| VCS                  | `enabled: true`              | バージョン管理との連携を有効化           |
| VCS                  | `clientKind: "git"`          | Git を使用                   |
| VCS                  | `useIgnoreFile: true`        | Git の無視設定を適用              |
| Formatter            | `indentStyle: "tab"`         | タブインデントを使用                |
| Formatter            | `lineWidth: 100`             | 行幅を 100 文字に設定             |
| JavaScript Formatter | `quoteStyle: "single"`       | シングルクォートを使用               |
| Linter               | `preset: "recommended"`      | 推奨ルールセットを適用               |
| Correctness          | `noUnusedImports: "error"`   | 未使用の import をエラーにする       |
| Correctness          | `noUnusedVariables: "error"` | 未使用の変数をエラーにする             |
| Naming Convention    | `strictCase: true`           | 大文字・小文字を厳密にチェック           |
| Naming Convention    | `level: "error"`             | 命名規則違反をエラーにする             |
| CSS Parser           | `tailwindDirectives: true`   | Tailwind CSS のディレクティブを有効化 |
| Nursery              | `useSortedClasses: "warn"`   | クラス順序の違反を警告               |
| Assist               | `enabled: true`              | コード支援機能を有効化               |
| Assist               | `organizeImports: "on"`      | import 文を自動整理             |

クラス順序チェックの対象関数には、`clsx`、`cva`、`twMerge`、`cn` を設定します。

実際の適用ルールは `biome.json` を参照してください。

## Naming Conventions

| 対象 | 適用範囲 | 命名形式 | 例 |
| ---------- | -------- | -------------------------- | -------------------------- |
| グローバル定数 | `global` | `CONSTANT_CASE` | `API_BASE_URL` |
| 変数 | `any` | `camelCase` | `userName` |
| 関数 | `any` | `camelCase` / `PascalCase` | `getUser` / `GetUser` |
| クラス | `any` | `PascalCase` | `UserService` |
| 型・インターフェース | `any` | `PascalCase` | `UserProfile` / `UserType` |

### Component Naming

* コンポーネントのディレクトリ名は `PascalCase` とします。
* コンポーネントの実装ファイルは `ComponentName.tsx` とします。
* Story ファイルは `ComponentName.stories.tsx` とします。
* React コンポーネント名は `PascalCase` とします。
* 変数や関数は原則として `camelCase` とします。

## CI

GitHub Actions による自動チェックを管理します。

* `.github/workflows/check-node-version.yml`: Node.js のバージョンチェック(簡易的)
* `.github/workflows/ci.yml`: CI の実行

具体的なチェック内容は各ワークフローファイルを参照してください。

## CD

GitHub Actions による自動デプロイを行う。

* `.github/workflows/cd.yml`: CD の実行

`main` ブランチへの push をトリガーに、Storybook のビルドと GitHub Pages へのデプロイを実行します。手動実行にも対応しています。

具体的な処理内容は、ワークフローファイルを参照してください。
