import { FileQuestion } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/elements/Heading/Heading';
import { Link } from '@/components/elements/Link/Link';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';

type NotFoundProps = {
	homeUrl: string;
};

export function NotFound({ homeUrl }: NotFoundProps) {
	const { t } = useTranslation();

	return (
		<Stack space="sm">
			<Text as="span" size="lg" weight="bold" color="muted">
				ERROR 404
			</Text>

			<Cluster space="sm">
				<FileQuestion size={32} strokeWidth={1.5} />
				<Heading type="sectionTitle">{t('error.notfound.title')}</Heading>
			</Cluster>

			<Text color="muted">{t('error.notfound.description')}</Text>

			<Link to={homeUrl} label={t('error.backToHome')} size="lg" />
		</Stack>
	);
}
