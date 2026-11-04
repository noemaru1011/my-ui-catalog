# 色のルール

色は [index.css](../src/index.css) のCSS変数を基準にし、コンポーネントでは用途を表すTailwindクラスを使います。直接の色指定や、Tailwindの色パレットをコンポーネントに繰り返し指定するのではなく、既存のセマンティックトークンを優先します。

## 使い方

`@theme inline` で登録した `--color-*` 変数は、対応するTailwindクラスとして利用できます。

```tsx
<div className="bg-card text-card-foreground">
	<button className="bg-primary text-primary-foreground">保存</button>
	<a href="/help">ヘルプ</a>
</div>;
```

リンクは `@layer base` で `text-link` が適用されるため、通常は個別に色を指定しません。背景色と文字色は読みやすさを保つため、`primary` と `primary-foreground` のような組み合わせで使います。

## ブランド・用途別カラー

| トークン                  | 用途                        | ライトテーマ      | ダークテーマ |
| ------------------------- | --------------------------- | ----------------- | ------------ |
| `primary`                 | 主操作・主要な強調          | Blue 900          | Blue 300     |
| `primary-foreground`      | Primary上の文字・アイコン   | 白                | 暗色         |
| `secondary`               | 第二の強調                  | Blue 700          | Blue 500     |
| `secondary-foreground`    | Secondary上の文字・アイコン | 白                | 暗色         |
| `tertiary`                | 第三の強調                  | `#001a4d`         | `#8fb8ff`    |
| `link`                    | リンク                      | `tertiary` と同色 | `#8fb8ff`    |
| `focal-1`                 | 注目箇所の強調              | Yellow 300        | Yellow 300   |
| `focal-2`                 | 注目箇所の強調              | 黒                | 黒           |
| `search-highlight`        | 検索結果の背景              | Fuchsia 200       | Fuchsia 900  |
| `search-highlight-border` | 検索結果の境界              | Fuchsia 900       | Fuchsia 300  |
| `success`                 | 成功状態                    | Green 600         | Green 400    |
| `error`                   | エラー状態                  | Red 800           | Red 400      |
| `warning`                 | 警告状態                    | Yellow 700        | Yellow 400   |

利用例は `bg-primary`、`text-link`、`border-search-highlight-border`、`text-success` のようなクラスです。用途に対応するクラスがない場合は、既存トークンを確認してから追加します。

## 共通UIカラー

`background` / `foreground` はページ全体、`card` や `popover` は面とその上の文字、`muted` や `accent` は控えめな面や操作中の強調に使います。

| トークン                             | 用途                             |
| ------------------------------------ | -------------------------------- |
| `background` / `foreground`          | ページの背景と標準文字色         |
| `card` / `card-foreground`           | カードの背景と文字色             |
| `popover` / `popover-foreground`     | ポップアップの背景と文字色       |
| `primary` / `primary-foreground`     | 主要な操作面とその文字色         |
| `secondary` / `secondary-foreground` | 第二の操作面とその文字色         |
| `muted` / `muted-foreground`         | 控えめな背景と補助文字           |
| `accent` / `accent-foreground`       | 選択・ホバーなどの強調面と文字色 |
| `destructive`                        | 破壊的操作や危険状態             |
| `border`                             | 標準の境界線                     |
| `input`                              | 入力欄の境界                     |
| `ring`                               | フォーカスリング                 |

クラスは `bg-background`、`text-muted-foreground`、`border-input`、`ring-ring` のように使います。`error` と `destructive` はどちらも赤系ですが、状態表示と破壊的操作で用途を区別します。

## チャート・サイドバー

- チャートは `chart-1` から `chart-5` を使います。現状、ライト・ダークテーマで同じ値です。
- サイドバーは `sidebar`、`sidebar-foreground`、`sidebar-primary`、`sidebar-accent`、`sidebar-border`、`sidebar-ring` と、それぞれの `*-foreground` を使います。
- `sidebar-primary` と `sidebar-ring` は通常の `primary` と `ring` を参照するため、テーマ変更に連動します。

## テーマと変更時の注意

- ライトテーマは `:root`、ダークテーマは `.dark` で定義します。テーマを切り替えるときは、用途トークンの値をテーマごとに調整します。
- コンポーネントでは `text-[#...]` のような固定色や `text-blue-900` のようなパレット直指定より、`text-primary` や `text-error` などの用途トークンを優先します。
- 新しい色トークンを追加する場合は、`@theme inline`、ライトテーマ、ダークテーマ、およびこのドキュメントを一緒に更新します。
- 背景と前景の組み合わせは、ライト・ダーク両方でコントラストを確認します。特に `focal-2` は両テーマで黒のため、暗い背景上ではそのまま使わないでください。
