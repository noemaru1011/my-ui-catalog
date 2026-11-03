import { cn } from 'cn';
import { Separator } from '@/components/ui/separator';

type BlockquoteProps = {
	children: React.ReactNode;
};

export function Blockquote({ children }: BlockquoteProps) {
	return (
		<blockquote className={cn('my-4 flex items-stretch gap-4')}>
			<Separator orientation="vertical" className="w-1 bg-gray-400" />

			<div className="min-w-0 flex-1 py-1">{children}</div>
		</blockquote>
	);
}
