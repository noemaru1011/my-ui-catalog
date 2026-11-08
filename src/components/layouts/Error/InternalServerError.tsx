import { ServerCrash } from 'lucide-react';
import { Heading } from '@/components/elements/Heading/Heading';
import { Link } from '@/components/elements/Link/Link';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';

type InternalServerErrorProps = {
	homeUrl: string;
};

export function InternalServerError({ homeUrl }: InternalServerErrorProps) {
	return (
		<Stack space="sm">
			<Text as="span" size="lg" weight="bold" color="muted">
				ERROR 500
			</Text>

			<Cluster space="sm">
				<ServerCrash size={32} strokeWidth={1.5} />
				<Heading type="sectionTitle">サーバーエラーが発生しました</Heading>
			</Cluster>

			<Text color="muted">
				サーバー内部で予期しないエラーが発生しました。
				時間をおいて再度お試しいただくか、管理者にお問い合わせください。
			</Text>

			<Link to={homeUrl} label="トップページへ戻る" size="lg" />
		</Stack>
	);
}
