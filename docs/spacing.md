# 余白ルール

このプロジェクトでは、コンポーネントの配置に **8px・24px・64px** の3つの余白スケールを使います。近接する要素のまとまりや、セクション間の区切りなど、視覚的な関係性と読みやすさに応じて使い分けます。

## スケール

Tailwind CSS の spacing は `1` が4pxなので、各スケールは次のユーティリティに対応します。

| スケール | Tailwind の値 | CSS px | 主な用途                                                 |
| -------- | ------------- | -----: | -------------------------------------------------------- |
| 基準     | `2`           |    8px | 関連する要素同士の間隔、入力欄や小さな部品の内側余白     |
| 3倍      | `6`           |   24px | コンポーネント内のグループや、関連するまとまり同士の間隔 |
| 8倍      | `16`          |   64px | 大きなグループやセクションを分ける余白                   |

余白には `p-2` / `px-2` / `py-2` のような padding、`m-6` / `mt-6` のような margin、`gap-16` のような要素間隔のクラスを使います。方向を限定する場合は `p`・`m`・`gap` の後に `x`、`y`、`t`、`b`、`l`、`r` を付けます。

## レイアウトでの指定

複数要素の配置には、用途に応じて [Stack](../src/components/layouts/Stack/Stack.tsx) と [Cluster](../src/components/layouts/Cluster/Cluster.tsx) を使います。`space` の値は次の余白に対応します。

| `space` | Tailwind | CSS px |
| ------- | -------- | -----: |
| `sm`    | `gap-2`  |    8px |
| `md`    | `gap-6`  |   24px |
| `lg`    | `gap-16` |   64px |

```tsx
<Stack space="sm">
  <FieldLabel>メールアドレス</FieldLabel>
  <Input />
</Stack>

<Cluster space="md">
  <Button variant="outline">キャンセル</Button>
  <Button>保存</Button>
</Cluster>
```

`Stack` は縦方向、`Cluster` は横方向（折り返しあり）の配置に使います。単一要素の内側余白など、レイアウト部品の責務ではない余白は、その要素のコンポーネント内で指定します。

## コンポーネントでの適用例

- **elements**: [Heading](../src/components/elements/Heading/Heading.tsx) の接頭辞・接尾辞との間隔や、[Blockquote](../src/components/elements/Blockquote/Blockquote.tsx) の引用文と縦線の間隔には8pxを使います。[FileUpload](../src/components/elements/FileUpload/FileUpload.tsx) のドロップ領域の内側余白には24pxを使います。
- **ui**: [Button](../src/components/ui/button.tsx) など小さな操作部品では8px、[Dialog](../src/components/ui/dialog.tsx) のコンテンツ余白や [Card](../src/components/ui/card.tsx) の標準余白では24pxを使います。Card の小サイズは8pxです。

## 例外と注意点

- `p-0` や `m-0` はブラウザーや子要素由来の余白をリセットするために使えます。
- `mx-auto` や `mt-auto` などの `auto` は、余白量を定める指定ではなく配置調整として使います。
- ポップアップの `sideOffset` や Drawer の inset のように、位置決めやコンポーネント固有の動作に必要な値は、3スケールの余白とは区別して扱います。
- 新しく余白を指定するときは、まず8px・24px・64pxから選びます。3スケールで表現できる配置は、4px・12px・16px・32pxなど別の固定余白値を追加しないでください。
