import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Stack } from './Stack';

const meta = {
	component: Stack,
	tags: ['autodocs'],
	args: {
		space: 'md',
		as: 'div',
	},
	argTypes: {
		as: {
			control: 'select',
			options: ['div', 'section', 'form', 'article', 'aside', 'nav', 'ul'],
		},
		children: {
			control: false,
		},
		space: {
			control: 'inline-radio',
		},
	},
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<div className="w-80">
				<Stack {...args}>
					{[1, 2, 3].map((count) => (
						<div className="rounded-md border p-4" key={count}>
							{t('example.story.layout.content', { count })}
						</div>
					))}
				</Stack>
			</div>
		);
	},
};
