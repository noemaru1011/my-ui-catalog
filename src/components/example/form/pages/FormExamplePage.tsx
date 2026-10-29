import { FormExample } from '../components/FormExample';
import { useExampleForm } from '../hooks/useExampleForm';

export default function FormExamplePage() {
	const form = useExampleForm();
	return <FormExample {...form} />;
}
