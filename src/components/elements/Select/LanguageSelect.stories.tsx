
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from './LanguageSelect';
import { Text } from '../Text/Text';
import { Stack } from '@/components/layouts/Stack/Stack';

const meta = {
    component: LanguageSelect,
    tags: ['autodocs'],
    args: {
        label: '表示言語',
    },
    argTypes: {
        value: {
            control: "inline-radio",
            options: ['ja', 'en'],
        },
    },
} satisfies Meta<typeof LanguageSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const Component = () => {
            const { t, i18n } = useTranslation();

            const currentLanguage = i18n.language.startsWith('en')
                ? 'en'
                : 'ja';

            return (
                <Stack>
                    <LanguageSelect
                        {...args}
                        value={currentLanguage}
                        onChange={(language) => {
                            i18n.changeLanguage(language);
                        }}
                    />

                    <Stack>
                        <Text size="lg" weight="bold">
                            プレビュー
                        </Text>

                        <Text weight="bold" color="muted">
                            現在の言語: {currentLanguage}
                        </Text>

                        <Text size="md">
                            {t('example.description')}
                        </Text>
                    </Stack>
                </Stack>
            );
        };

        return <Component />;
    },
};
