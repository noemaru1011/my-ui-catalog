import type { ReactNode } from 'react';

type AppLayoutProps = {
	/** ヘッダー領域：画面上部に表示するコンテンツ。スクロール時も上部に固定される */
	header: ReactNode;
	/** メイン領域：画面の主要コンテンツ。中央寄せで最大幅を制限して表示する */
	main: ReactNode;
};

export function AppLayout({ header, main }: AppLayoutProps) {
	return (
		<>
			<header className="bg-background z-sticky sticky top-0 w-full border-b">
				<div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">{header}</div>
			</header>

			<main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6">
				{main}
			</main>
		</>
	);
}
