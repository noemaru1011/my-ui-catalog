# 角丸ルール

このプロジェクトでは、通常の角丸を **10px** に統一します。基準値は [index.css](../src/index.css) の `--radius: 0.625rem` です（ルートの文字サイズが16pxの場合、10px）。

## 基本ルール

Tailwind CSS の角丸ユーティリティは、サイズ名にかかわらず10pxになります。`--radius-sm` から `--radius-4xl` まで、すべて `--radius` を参照しています。

| Tailwind クラス | CSS 変数       | CSS px |
| --------------- | -------------- | -----: |
| `rounded-sm`    | `--radius-sm`  |   10px |
| `rounded-md`    | `--radius-md`  |   10px |
| `rounded-lg`    | `--radius-lg`  |   10px |
| `rounded-xl`    | `--radius-xl`  |   10px |
| `rounded-2xl`   | `--radius-2xl` |   10px |
| `rounded-3xl`   | `--radius-3xl` |   10px |
| `rounded-4xl`   | `--radius-4xl` |   10px |

通常のボタン、入力欄、カード、ダイアログなどには、既存の `rounded-*` クラスを使います。個別に異なる数値を直接指定せず、角丸の変更は `--radius` を通して行います。

`elements` コンポーネントは、内部で使う `ui` コンポーネントの角丸を引き継ぎます。角丸を変える場合は、利用側ごとに重ねて指定せず、対応する `ui` コンポーネントを変更します。

## 例外

形状や表示上の理由がある場合は、10px以外の指定を許容します。

| 指定                | 用途・理由                                 | 例                                                                                                                                                |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rounded-full`      | 円形やカプセル形状                         | [RadioGroup](../src/components/ui/radio-group.tsx)、[Switch](../src/components/ui/switch.tsx)、[Drawer](../src/components/ui/drawer.tsx) のつまみ |
| `rounded-none`      | 部品同士を繋げる、または範囲の連続性を表す | [InputGroup](../src/components/ui/input-group.tsx) の内側、[Calendar](../src/components/ui/calendar.tsx) の範囲選択                               |
| `rounded-[inherit]` | 親要素の角丸を引き継ぐ                     | [Drawer](../src/components/ui/drawer.tsx) の内部                                                                                                  |
| `rounded-[2px]`     | 小さな装飾形状                             | [Tooltip](../src/components/ui/tooltip.tsx) の矢印                                                                                                |

カレンダーのセル角丸は `--cell-radius` を使います。この変数は `--radius-md` を参照するため、基本ルールに従い10pxです。範囲選択中の角は、開始・終了位置や中間部分を正しく表すため個別に調整します。

## 変更時の確認

- 新しい通常部品には、10px以外の固定値や独自の角丸変数を追加しません。
- `rounded-full`、`rounded-none`、継承指定は、必要な形状・動作を維持する場合に限って使います。
- 例外の角丸を追加・変更するときは、用途と理由をこのドキュメントにも反映します。
