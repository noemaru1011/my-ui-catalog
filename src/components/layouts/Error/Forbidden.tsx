import { ShieldBan } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/elements/Heading/Heading';
import { Link } from '@/components/elements/Link/Link';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';

type ForbiddenProps = {
	homeUrl: string;
};

export function Forbidden({ homeUrl }: ForbiddenProps) {
	const { t } = useTranslation();

	return (
		<Stack space="sm">
			<Text as="span" size="lg" weight="bold" color="muted">
				ERROR 403
			</Text>

			<Cluster space="sm">
				<ShieldBan size={32} strokeWidth={1.5} />
				<Heading type="sectionTitle">{t('error.forbidden.title')}</Heading>
			</Cluster>

			<Text color="muted">{t('error.forbidden.description')}</Text>

			<Link to={homeUrl} label={t('error.backToHome')} size="lg" />
		</Stack>
	);
}
