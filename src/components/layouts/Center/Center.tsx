import type { ReactNode } from 'react';

type CenterProps = {
	children: ReactNode;
	/** 最低限の高さ（画面の高さ）を確保するかどうか。(親要素が横幅しか確保してないときに用いる。) */
	minHeight?: boolean;
};

/** 子要素を親要素に対して垂直・水平方向の中央に配置するコンポーネントです。 */
export function Center({ children, minHeight }: CenterProps) {
	return (
		<div
			className={`flex w-full items-center justify-center ${minHeight ? 'min-h-dvh' : 'h-full'}`}
		>
			{children}
		</div>
	);
}
