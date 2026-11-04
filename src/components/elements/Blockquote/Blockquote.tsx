import { Separator } from '@/components/ui/separator';

type BlockquoteProps = {
	children: React.ReactNode;
};

export function Blockquote({ children }: BlockquoteProps) {
	return (
		<blockquote className="flex items-stretch gap-2">
			<Separator orientation="vertical" className="w-1 bg-gray-400" />

			<div className="min-w-0 flex-1 py-2">{children}</div>
		</blockquote>
	);
}
