import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronRight, Settings } from 'lucide-react';
import { Heading } from './Heading';

const meta = {
	component: Heading,
	tags: ['autodocs'],
	args: {
		children: '見出し',
		type: 'sectionTitle',
	},
	argTypes: {
		prefix: {
			control: 'boolean',
			mapping: {
				false: undefined,
				true: <Settings />,
			},
			options: [false, true],
		},
		suffix: {
			control: 'boolean',
			mapping: {
				false: undefined,
				true: <ChevronRight />,
			},
			options: [false, true],
		},
	},
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
