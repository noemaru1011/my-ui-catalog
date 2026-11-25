 <div align="center">

<img src="my-icon.jpg" alt="UI Catalog" width="180" />

# UI Catalog

React と TypeScript で構築した、個人開発の UI コンポーネントカタログです。

Storybook を活用し、コンポーネントの表示・動作・バリエーションを一元管理します。

[**カタログを確認する**](https://noemaru1011.github.io/my-ui-catalog/)

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

## 技術スタック

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

## 主な機能

### Elements

アプリケーションの UI を構成する、再利用可能なコンポーネントを提供します。

### Layouts

コンテンツの配置やレイアウトを制御するコンポーネントを提供します。

- `AppLayout`：アプリケーション全体の基本レイアウトを提供する
- `Center`：子要素を中央に配置する
- `Cluster`：子要素を横方向にまとめて配置する
- `Container`：コンテンツの最大幅などを制御する
- `Grid`：子要素をグリッド形式で配置する
- `Reel`：子要素を横方向に並べ、横スクロール可能にする
- `Stack`：子要素を縦方向に積み重ねて配置する
- `Error`：404・403・500 などのエラー画面を提供する

### UI Primitives

shadcn/ui をベースとした、ボタン・入力欄・ラベル・ポップオーバーなどの基本的な UI コンポーネントを提供します。

## 使い方

### 1. インストール

```bash
npm install @noemaru1011/ui
```

### 2. i18nextの初期化

i18nextとreact-i18nextを利用する場合は、アプリケーションでi18nextを初期化します。

```tsx
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'ja',
	fallbackLng: 'ja',
	resources: {
		ja: {
			translation: {},
		},
		en: {
			translation: {},
		},
	},
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
```

### 3. CSSの読み込み

アプリケーションのエントリーポイントでCSSを読み込みます。

```tsx
import '@noemaru1011/ui/style.css';
```

### 4. Providerの設定

`ThemeProvider`、`TooltipProvider`、`Toaster` をアプリケーションのルートに設定します。

```tsx
import { ThemeProvider, primitives } from '@noemaru1011/ui';

const { Toaster, TooltipProvider } = primitives;

function Root() {
	return (
		<ThemeProvider>
			<TooltipProvider delay={100}>
				<App />
				<Toaster />
			</TooltipProvider>
		</ThemeProvider>
	);
}
```

### 5. コンポーネントの利用

利用したいコンポーネントをインポートして使用します。

```tsx
import { Button, Card } from '@noemaru1011/ui';

function Example() {
	return (
		<Card>
			<Button>ボタン</Button>
		</Card>
	);
}
```

### 6. Primitivesの利用

基本的なUIコンポーネントは `primitives` から利用できます。

```tsx
import { primitives } from '@noemaru1011/ui';

const { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } = primitives;
```

### 7. Layoutsの利用

レイアウトコンポーネントを組み合わせて、画面構成を作成できます。

```tsx
import { Center, Container, Stack } from '@noemaru1011/ui';

function Example() {
	return (
		<Container>
			<Center>
				<Stack>
					<h1>タイトル</h1>
					<p>コンテンツ</p>
				</Stack>
			</Center>
		</Container>
	);
}
```

### 8. コンポーネント一覧

各コンポーネントの使用方法やバリエーションは、Storybookで確認できます。

[Storybook](https://noemaru1011.github.io/my-ui-catalog/)

## 開発に参加する

開発環境の構築、コマンド一覧、テストの実行方法、開発フローなどについては、以下を参照してください。

- [CONTRIBUTING.md](CONTRIBUTING.md)
