import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

// CUSTOM: loading状態の表示にSpinnerを使用
import { Spinner } from '@/components/ui/spinner';

// CUSTOMIZE: 全サイズのテキストサイズをtext-baseに統一
const buttonVariants = cva(
	// CUSTOMIZE: shadcn/ui標準のtext-smをtext-baseに変更
	"group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-base font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				// CUSTOMIZE: CSSで定義したボタン専用カラーを使用し、Hover・Active時の色を明確化
				default:
					'bg-button text-button-foreground hover:bg-button-hover active:bg-button-active',

				// CUSTOMIZE: Hover・Active時の背景色と文字色を調整
				outline:
					'border-border bg-background text-foreground hover:bg-muted active:bg-muted/70 hover:text-foreground active:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 dark:active:bg-input/60',

				// CUSTOMIZE: Hover・Active時の背景色を調整
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] active:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_10%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',

				// CUSTOMIZE: Hover・Active時の背景色と文字色を調整
				ghost:
					'text-foreground hover:bg-muted active:bg-accent active:text-accent-foreground hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 dark:active:bg-muted/70',

				// KEEP: 削除ボタンの文字色と背景色のコントラスト比を改善
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/80 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive dark:text-white dark:hover:bg-destructive/90 dark:active:bg-destructive/80',

				// CUSTOMIZE: Hover・Active時の文字色と装飾を調整
				link: 'text-primary underline-offset-4 hover:text-primary/80 hover:underline active:text-primary/70',
			},
			size: {
				default:
					'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',

				// CUSTOMIZE: xsサイズのテキストサイズをtext-baseに統一
				xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-base in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",

				// CUSTOMIZE: smサイズのテキストサイズをtext-baseに統一
				sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-base in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",

				lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',

				icon: 'size-8',

				'icon-xs':
					"size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",

				'icon-sm':
					'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',

				'icon-lg': 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

// CUSTOM: loadingプロパティを追加
function Button({
	className,
	variant = "default",
	size = "default",
	loading = false,
	disabled,
	children,
	...props
}: ButtonPrimitive.Props &
	VariantProps<typeof buttonVariants> & {
		loading?: boolean
	}) {
	return (
		<ButtonPrimitive
			{...props}
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			// CUSTOM: loading中は操作を禁止
			disabled={loading || disabled}
			aria-busy={loading || undefined}
		>
			{/* CUSTOM: loading中はSpinnerを表示 */}
			{loading && <Spinner aria-hidden="true" />}
			{children}
		</ButtonPrimitive>
	)
}

export { Button, buttonVariants }
