import { Text } from '@/components/elements/Text/Text';
import { Spinner } from '@/components/ui/spinner';

type LoadingProps = {
	message?: string;
};

export function Loading({ message = '読み込み中' }: LoadingProps) {
	return (
		<div
			className="flex flex-col items-center justify-center gap-4"
			role="status"
			aria-live="polite"
			aria-atomic="true"
			aria-busy="true"
		>
			<Spinner className="size-24 motion-reduce:animate-none" aria-hidden="true" />

			<Text>{message}</Text>
		</div>
	);
}
