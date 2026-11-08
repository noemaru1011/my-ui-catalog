
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';

import { Switch } from './Switch';

const meta = {
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        id: {
            control: false,
        },
        labelPosition: {
            control: 'inline-radio',
            options: ['left', 'right'],
        },
        size: {
            control: 'inline-radio',
            options: ['default', 'sm'],
        },
        checked: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
    args: {
        'aria-label': 'スイッチ切り替え',
        label: '通知設定',
        labelPosition: 'left',
        size: 'default',
        disabled: false,
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Switch
				{...args}
				aria-label={
					args['aria-label'] === 'スイッチ切り替え'
						? t('example.story.labels.switch')
						: args['aria-label']
				}
				label={
					args.label === '通知設定'
						? t('example.story.labels.notifications')
						: args.label
				}
			/>
		);
	},
};
