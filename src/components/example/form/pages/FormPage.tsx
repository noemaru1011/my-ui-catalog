import { FormExample } from '../components/FormExample';
import { useExampleForm } from '../hooks/useForm';

/**
 * tanstack/react-query,RHF,zod を用いたフォーム例です。
 * 詳しいコンポーネントの設計はコードを参照してください。
 */
export default function FormExamplePage() {
	const form = useExampleForm();
	return <FormExample {...form} />;
}
