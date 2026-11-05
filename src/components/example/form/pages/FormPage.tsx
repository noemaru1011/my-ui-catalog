import { FormExample } from '../components/FormExample';
import { useExampleForm } from '../hooks/useForm';

export default function FormExamplePage() {
	const form = useExampleForm();
	return <FormExample {...form} />;
}
