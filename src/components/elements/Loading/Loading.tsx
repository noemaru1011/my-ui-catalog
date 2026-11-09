import { useTranslation } from 'react-i18next';
import { Text } from '@/components/elements/Text/Text';
import { Spinner } from '@/components/ui/spinner';

type LoadingProps = {
	message?: string;
};

/** データ生成中や読み込み中の表示に使用します。(時間がかかるときに用いる) */
export function Loading({ message }: LoadingProps) {
	const { t } = useTranslation();

	return (
		<div
			className="flex flex-col items-center justify-center gap-2"
			role="status"
			aria-live="polite"
			aria-atomic="true"
			aria-busy="true"
		>
			<Spinner className="size-24 motion-reduce:animate-none" aria-hidden="true" />

			<Text>{message || t('common.loading')}</Text>
		</div>
	);
}
