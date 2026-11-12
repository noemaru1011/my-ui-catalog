<div align="center">

<img src="./docs/my-icon.jpg" alt="UI Catalog" width="180" />

# UI Catalog

## 概要

このプロジェクトは、React と TypeScript で構築した、個人開発の UI コンポーネントカタログです。
Storybook を活用し、コンポーネントの表示・動作・バリエーションを一元管理します。

[**カタログを確認する**](https://noemaru1011.github.io/my-ui-catalog/)
<!-- Tech Stack -->
<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
  <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white" />
  <img src="https://img.shields.io/badge/react--i18next-26A69A?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/i18next--cli-26A69A?style=for-the-badge&logo=i18next&logoColor=white" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" />
  <img src="https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white" />
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
</p>

</div>

### 技術スタック

| カテゴリー           | 技術名                              |
| -------------------- | ----------------------------------- |
| Framework            | React                               |
| Language             | TypeScript                          |
| UI Catalog           | Storybook                           |
| Build Tool           | Vite                                |
| Styling              | Tailwind CSS                        |
| UI Primitives        | shadcn/ui                           |
| Internationalization | i18next, react-i18next, i18next-cli |
| Form (Sample)        | React Hook Form, Zod                |
| Linter / Formatter   | Biome                               |
| Package Manager      | npm                                 |
| Test                 | Vitest, Testing Library, Playwright |
| CI/CD                | GitHub Actions                      |
| Deployment           | GitHub Pages                        |

## インストール及びスタート方法

### 1. 環境準備

| Tool    | Version     |
| ------- | ----------- |
| Node.js | `>=24.22.2` |
| npm     | Required    |
| Git     | Required    |

Node.js のバージョンは `.nvmrc` と `package.json` の `engines` で管理しています。

### 2. Repositoryをクローン

```bash
git clone https://github.com/noemaru1011/my-ui-catalog.git

cd my-ui-catalog
```

### 3. Node.jsの環境構築

nvm を使用している場合、プロジェクトで指定された Node.js のバージョンを適用します。

```bash
nvm use
```

### 4. 依存関係のインストール

```bash
npm ci
```

インストール時には `prepare` スクリプトによって、Git フックの参照先が `.github/hooks` に設定されます。

### 5. Storybookの起動

```bash
npm run storybook
```

ブラウザで以下にアクセスします。

<http://localhost:6006>

### 6. Storybookのビルド

```bash
npm run build-storybook
```

ビルド成果物は `storybook-static/` に出力されます。

## 使い方

### 1. プロジェクトを実行するコマンド

```bash
# Biome による Lint
npm run lint

# Biome によるフォーマット
npm run format

# Biome によるチェック
npm run check

# Biome によるチェックと自動修正
npm run check:fix

# Vitest の Watch モードでテストを実行
npm run test

# 全 Vitest プロジェクトのテストを一括実行
npm run test:run

# コンポーネントテストを実行
npm run test:components

# Storybook の Story テストを実行
npm run test:storybook

# カバレッジ付きでテストを実行
npm run test:coverage

# Playwright E2E テストを実行 
npm run test:e2e

# 日本語・英語の翻訳キーが揃っているか確認
npm run i18n:check

# 使用されていない翻訳キーがないか確認
npm run i18n:check:unused
```

### 2. プロジェクトの主な機能の使い方を説明

#### Elements

自作したアプリケーションの UI を構成する、再利用可能なコンポーネントを管理します。

#### Layouts

コンポーネントの配置やレイアウトを制御するためのコンポーネントを管理します。

#### UI Primitives

`src/components/ui/` では、shadcn/ui をベースとした UI プリミティブを管理します。

ボタン、入力欄、ラベル、ポップオーバーなど、上位のコンポーネントを構成する基本的な UI 要素を配置します。

#### Examples

複数のコンポーネントを組み合わせた使用例を管理します。

- `src/components/example/form/`：フォームの実装例
- `src/components/example/table/`：テーブルの実装例

### 3. コード例

#### Layouts

- **Center**：子要素を中央に配置する
- **Cluster**：子要素を横方向にまとめて配置する
- **Container**：コンテンツの最大幅などを制御する
- **Stack**：子要素を縦方向に積み重ねて配置する

#### Form

`src/components/example/form/`

以下の技術を組み合わせたフォームの実装例です。

- Zod：入力値のバリデーション
- React Hook Form：フォーム状態の管理
- カスタムフック：フォーム処理の共通化
- フォーム UI：入力画面の構築
- ページ：フォームの利用例

#### Table

`src/components/example/table/`

TanStack Table v9 を使用したテーブルの実装例です。

- ソート
- 絞り込み
- ページネーション
- 行編集

## 運用

本リポジトリでは、品質の担保と開発効率の向上を目的に、以下のルールと自動化ツールを導入しています。

### 1. 開発フローと GitHub Projects 連携

すべての作業は **Issue** を起点とし、GitHub Projects 上でステータスを管理します。

1. **Issue の作成**
   - `.github/ISSUE_TEMPLATE/issue.md` のテンプレートに従ってタスクを起票します。
   - 起票された Issue はプロジェクトボードの `Todo` に追加されます。
2. **ブランチ作成・実装**
   - Issue 画面の「Create a branch」から作業用ブランチを作成し、ステータスを `In Progress` に変更します。
   - コミット時には Git Hooks（`pre-commit` / `commit-msg`）が自動実行され、コードフォーマットやコミットメッセージの規約チェックが行われます。
3. **Pull Request（PR）の作成**
   - 実装完了後、`.github/PULL_REQUEST_TEMPLATE.md` に従って PR を作成し、ステータスを `In Review` に変更します。
   - PR の説明欄に `Closes #<Issue番号>` を記載し、Issue と紐付けます。
4. **レビュー・マージ**
   - CI の通過およびレビュアーの承認後、マージを行います。
   - マージされると紐づいた Issue が自動的にクローズされ、プロジェクトボードのステータスも `Done` へ移行します。

### 2. ローカル開発環境（Git Hooks）

- **`pre-commit`**: コミット前に Lint やフォーマットチェック等を実行します。
- **`commit-msg`**: コミットメッセージが規約（Conventional Commits 等）に沿っているか検証します。

### 3. CI / CD（GitHub Actions）

`.github/workflows` に定義された以下のワークフローが自動実行されます。

- **`ci.yml`**: 自動テスト、ビルド、静的解析を実行します。**CI がすべてパスすることがマージの必須条件です。**
- **`check-node-version.yml`**: .nvmrcを変更した際に、package.jsonのバージョンに差異がないか検証します。
- **`cd.yml`**: `master` ブランチへのマージをトリガーに、本番環境への自動デプロイを実行します。
- **`shadcn-ui-check.yml`**: src/components/ui 配下の変更されたコンポーネントを最新の shadcn/ui Registry と比較し、整合性を検証します。KEEP: コメントが記載されたコンポーネントは比較対象外とします。

### 4. 依存パッケージの自動更新（Dependabot）

- `.github/dependabot.yml` の設定に基づき、依存ライブラリのアップデートやセキュリティパッチの PR が定期的に自動作成されます。
- Dependabot による PR も通常の PR と同様に CI の通過を確認したうえでマージします。

### 5. コードオーナーとブランチ保護（CODEOWNERS）

品質担保および開発ルール維持のため、`.github/CODEOWNERS` とブランチ保護ルール（Rulesets）により、重要ファイルの変更にはコードオーナーの承認を必須としています。

- **保護対象ファイル・ディレクトリ**
  - **`.github/`・`.agents/`**: CI/CD ワークフロー、Git Hooks、AI 向け指示書などの開発ルール・自動化基盤
  - **`*.test.ts(x)`・`*.spec.ts(x)`・`/e2e/`**: 単体テストおよび E2E テストコード（テスト削除・改ざんによる CI 突破の防止）
- **変更・削除時の運用ルール**
  - 上記ファイルを含む PR を作成すると、自動的にコードオーナー（`@noemaru1011`）がレビュアーに割り当てられます。
  - テストの削除やルールの変更が正当な理由に基づく場合は、PR 上で理由を明記し、コードオーナーの承認（Approve）を得た
