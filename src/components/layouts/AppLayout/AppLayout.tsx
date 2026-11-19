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
			<header className="z-sticky sticky top-0 w-full border-b p-4">{header}</header>

			<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">{main}</main>
		</>
	);
}
