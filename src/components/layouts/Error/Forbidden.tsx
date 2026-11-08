import { ShieldBan } from 'lucide-react';
import { Heading } from '@/components/elements/Heading/Heading';
import { Link } from '@/components/elements/Link/Link';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';

type ForbiddenProps = {
	homeUrl: string;
};

export function Forbidden({ homeUrl }: ForbiddenProps) {
	return (
		<Stack space="sm">
			<Text as="span" size="lg" weight="bold" color="muted">
				ERROR 403
			</Text>

			<Cluster space="sm">
				<ShieldBan size={32} strokeWidth={1.5} />
				<Heading type="sectionTitle">アクセスが拒否されました</Heading>
			</Cluster>

			<Text color="muted">
				このページを閲覧する権限がありません。 アクセス権限をご確認いただくか、
				管理者にお問い合わせください。
			</Text>

			<Link to={homeUrl} label="トップページへ戻る" size="lg" />
		</Stack>
	);
}
