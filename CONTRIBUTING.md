# Contributing Guide

このドキュメントでは、開発環境の構築方法、実装時のルール、テスト、Pull Request の作成手順について説明します。

## 1. 開発環境の構築

### 1.1. 必要な環境

| Tool       | Version     |
| ---------- | ----------- |
| Node.js    | `>=24.22.2` |
| npm        | Required    |
| Git        | Required    |
| GitHub CLI | Required    |

Node.js のバージョンは `.nvmrc` と `package.json` の `engines` で管理しています。

### 1.2. Repository のクローン

```bash
git clone https://github.com/noemaru1011/my-ui-catalog.git

cd my-ui-catalog
```

### 1.3. Node.js の環境構築

nvm を使用している場合、プロジェクトで指定された Node.js のバージョンを適用します。

```bash
nvm use
```

### 1.4. 依存関係のインストール

```bash
npm ci
```

インストール時には `prepare` スクリプトによって、Git フックの参照先が `.github/hooks` に設定されます。

### 1.5. Storybook の起動

```bash
npm run storybook
```

ブラウザで以下にアクセスします。

```bash
http://localhost:6006
```

### 1.6. Storybook のビルド

```bash
npm run build-storybook
```

ビルド成果物は `storybook-static/` に出力されます。

---

## 2. 開発コマンド

### 2.1. Lint・フォーマット

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run lint`      | Biome による Lint              |
| `npm run format`    | Biome によるフォーマット       |
| `npm run check`     | Biome によるチェック           |
| `npm run check:fix` | Biome によるチェックと自動修正 |

### 2.2. テスト

| Command                   | Description                    |
| ------------------------- | ------------------------------ |
| `npm run test`            | Vitest の Watch モード         |
| `npm run test:run`        | 全 Vitest プロジェクトのテスト |
| `npm run test:components` | コンポーネントテスト           |
| `npm run test:storybook`  | Storybook の Story テスト      |
| `npm run test:coverage`   | カバレッジ付きテスト           |
| `npm run test:e2e`        | Playwright E2E テスト          |

### 2.3. i18n

| Command                     | Description                              |
| --------------------------- | ---------------------------------------- |
| `npm run i18n:check`        | 日本語・英語の翻訳キーが揃っているか確認 |
| `npm run i18n:check:unused` | 使用されていない翻訳キーを確認           |

---

## 3. コンポーネント構成

### 3.1. Elements

自作したアプリケーションの UI を構成する、再利用可能なコンポーネントを管理します。

### 3.2. Layouts

コンポーネントの配置やレイアウトを制御するためのコンポーネントを管理します。

主なコンポーネント：

- `AppLayout`：アプリケーション全体の基本レイアウトを提供する
- `Center`：子要素を中央に配置する
- `Cluster`：子要素を横方向にまとめて配置する
- `Container`：コンテンツの最大幅などを制御する
- `Grid`：子要素をグリッド形式で配置する
- `Reel`：子要素を横方向に並べ、横スクロール可能にする
- `Stack`：子要素を縦方向に積み重ねて配置する
- `Error`：404・403・500 などのエラー画面を提供する

### 3.3. UI Primitives

`src/components/ui/` では、shadcn/ui をベースとした UI プリミティブを管理します。

ボタン、入力欄、ラベル、ポップオーバーなど、上位のコンポーネントを構成する基本的な UI 要素を配置します。

### 3.4. Examples

複数のコンポーネントを組み合わせた使用例を管理します。

- `src/components/example/form/`：フォームの実装例
- `src/components/example/table/`：テーブルの実装例

#### Form

以下の技術を組み合わせたフォームの実装例です。

- Zod：入力値のバリデーション
- React Hook Form：フォーム状態の管理
- カスタムフック：フォーム処理の共通化
- フォーム UI：入力画面の構築
- ページ：フォームの利用例

#### Table

TanStack Table v9 を使用したテーブルの実装例です。

- ソート
- 絞り込み
- ページネーション
- 行編集

---

## 4. 開発フロー

本リポジトリでは、品質の担保と開発効率の向上を目的に、Issue を起点とした開発フローを採用しています。

### 4.1. Issue の作成

- `.github/ISSUE_TEMPLATE/issue.md` のテンプレートに従ってタスクを起票します。
- 起票された Issue は GitHub Projects の `Todo` に追加します。

### 4.2. ブランチ作成・実装

- Issue 画面の「Create a branch」から作業用ブランチを作成します。
- GitHub Projects のステータスを `In Progress` に変更します。
- 実装・テストを行います。

### 4.3. Pull Request の作成

- 実装完了後、`.github/PULL_REQUEST_TEMPLATE.md` に従って PR を作成します。
- GitHub Projects のステータスを `In Review` に変更します。
- PR の説明欄に `Closes #<Issue番号>` を記載し、Issue と紐付けます。

### 4.4. レビュー・マージ

- CI の通過およびレビュアーの承認後、マージを行います。
- マージされると紐づいた Issue が自動的にクローズされ、プロジェクトボードのステータスも `Done` へ移行します。

---

## 5. Git Hooks

ローカル開発環境では、Git Hooks によるコミット前のチェックを実施します。

| Hook         | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| `pre-commit` | コミット前に Lint やフォーマットチェックなどを実行                     |
| `commit-msg` | コミットメッセージが Conventional Commits などの規約に沿っているか検証 |

コミット時には Git Hooks が自動実行されます。

---

## 6. CI / CD

`.github/workflows/` に定義された以下のワークフローが自動実行されます。

| Workflow                 | Description                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `ci.yml`                 | 自動テスト、ビルド、静的解析を実行                                                                  |
| `check-node-version.yml` | `.nvmrc` を変更した際に `package.json` のバージョンとの差異を検証                                   |
| `cd.yml`                 | `master` ブランチへのマージをトリガーに本番環境へ自動デプロイ                                       |
| `npm-publish.yml`        | `v*` 形式のタグ push または手動実行をトリガーに、チェック・テスト・ビルド後、npm にパッケージを公開 |

**CI がすべてパスすることをマージの必須条件とします。**

---

## 7. 依存パッケージの管理

Dependabot による依存パッケージの自動更新を導入しています。

- `.github/dependabot.yml` の設定に基づき、依存ライブラリのアップデートやセキュリティパッチの PR が定期的に自動作成されます。
- Dependabot による PR も通常の PR と同様に CI の通過を確認したうえでマージします。

---

## 8. コードレビュー・ブランチ保護

品質担保および開発ルール維持のため、`.github/CODEOWNERS` とブランチ保護ルール（Rulesets）を設定しています。

### 8.1. 保護対象ファイル・ディレクトリ

- `.github/`・`.agents/`：CI/CD ワークフロー、Git Hooks、AI 向け指示書などの開発ルール・自動化基盤
- `*.test.ts(x)`・`*.spec.ts(x)`・`/e2e/`：単体テストおよび E2E テストコード

### 8.2. 変更・削除時の運用ルール

- 上記ファイルを含む PR を作成すると、自動的にコードオーナー（`@noemaru1011`）がレビュアーに割り当てられます。
- テストの削除やルールの変更が正当な理由に基づく場合は、PR 上で理由を明記し、コードオーナーの承認（Approve）を得てください。
