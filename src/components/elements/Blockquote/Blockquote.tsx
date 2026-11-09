import { Separator } from '@/components/ui/separator';

type BlockquoteProps = {
	children: React.ReactNode;
};

/** 引用する際に用いる。見た目の為には用いない。 */
export function Blockquote({ children }: BlockquoteProps) {
	return (
		<blockquote className="flex items-stretch gap-4">
			<Separator orientation="vertical" className="w-1 bg-gray-400" />

			<div className="min-w-0 flex-1 py-1">{children}</div>
		</blockquote>
	);
}
