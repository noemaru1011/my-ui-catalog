import type { ReactNode } from 'react';

type CenterProps = {
	children: ReactNode;
};

/** 子要素を親要素に対して垂直・水平方向の中央に配置するコンポーネントです。 */
export function Center({ children }: CenterProps) {
	return <div className="flex h-full w-full items-center justify-center">{children}</div>;
}
