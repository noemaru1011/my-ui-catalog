import type { ReactNode } from 'react';

type AppLayoutProps = {
	/** ヘッダー領域：画面上部に表示するコンテンツ。スクロール時も上部に固定される */
	header: ReactNode;
	/** メイン領域：画面の主要コンテンツ。中央寄せで最大幅を制限して表示する */
	main: ReactNode;
};

export function AppLayout({ header, main }: AppLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-10 flex h-14 w-full items-center border-b-2 bg-white dark:bg-blue-950 px-4 sm:px-6">
				<div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
					{header}
				</div>
			</header>

			<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">{main}</main>
			{/* フッターはサイトの回遊を目的とはしないので、不要*/}
		</div>
	);
}
