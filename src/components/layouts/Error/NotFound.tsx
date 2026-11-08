import { FileQuestion } from 'lucide-react';
import { Heading } from '@/components/elements/Heading/Heading';
import { Link } from '@/components/elements/Link/Link';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';

type NotFoundProps = {
	homeUrl: string;
};

export function NotFound({ homeUrl }: NotFoundProps) {
	return (
		<Stack space="sm">
			<Text as="span" size="lg" weight="bold" color="muted">
				ERROR 404
			</Text>

			<Cluster space="sm">
				<FileQuestion size={32} strokeWidth={1.5} />
				<Heading type="sectionTitle">ページが見つかりません</Heading>
			</Cluster>

			<Text color="muted">
				お探しのページは見つかりませんでした。
				ページが削除されたか、URLが変更された可能性があります。
			</Text>

			<Link to={homeUrl} label="トップページへ戻る" size="lg" />
		</Stack>
	);
}
