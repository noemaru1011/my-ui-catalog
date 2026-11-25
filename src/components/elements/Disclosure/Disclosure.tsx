import { Button } from '@base-ui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';

type DisclosureProps = {
	openText: string;
	closeText: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
};

/** メイン情報に対する追加情報を折りたたんで提示するときに使用します。
 * 大事な項目には使用しない、表示領域をコンパクトを目的とはしない。
 */
export function Disclosure({
	openText,
	closeText,
	children,
	defaultOpen = false,
}: DisclosureProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<Stack>
			<Button type="button" onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen}>
				<Cluster space="sm" align="center">
					{isOpen ? (
						<ChevronUp size={16} aria-hidden="true" />
					) : (
						<ChevronDown size={16} aria-hidden="true" />
					)}
					<Text as="span">{isOpen ? closeText : openText}</Text>
				</Cluster>
			</Button>

			{isOpen && <div>{children}</div>}
		</Stack>
	);
}
