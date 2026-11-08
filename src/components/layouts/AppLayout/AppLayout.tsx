import type { ReactNode } from 'react';

type AppLayoutProps = {
	header: ReactNode;
	main: ReactNode;
};

export function AppLayout({ header, main }: AppLayoutProps) {
	return (
		<>
			<header>{header}</header>
			<main>{main}</main>
			{/* フッターはサイトの回遊を目的とはしないので、不要*/}
		</>
	);
}
