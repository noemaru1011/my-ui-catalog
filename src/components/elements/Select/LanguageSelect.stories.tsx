
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from './LanguageSelect';
import { Text } from '../Text/Text';
import { Stack } from '@/components/layouts/Stack/Stack';

const meta = {
    component: LanguageSelect,
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'コンポーネント内部で宣言',
            control: "inline-radio",
            options: ['ja', 'en'],
        },
    },
} satisfies Meta<typeof LanguageSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const Component = () => {
            const { t, i18n } = useTranslation('example');

            const currentLanguage = i18n.language.startsWith('en')
                ? 'en'
                : 'ja';

            return (
                <Stack>
                    <LanguageSelect
                        value={currentLanguage}
                        onChange={(language) => {
                            i18n.changeLanguage(language);
                        }}
                    />

                    <Stack>
                        <Text size="lg" weight="bold">
                            {t('story.languageSelect.preview')}
                        </Text>

                        <Text weight="bold" color="muted">
                            {t('story.languageSelect.currentLanguage', {
                                language: currentLanguage,
                            })}
                        </Text>

                        <Text size="md">
                            {t('story.description')}
                        </Text>
                    </Stack>
                </Stack>
            );
        };

        return <Component />;
    },
};