import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronRight, Settings } from 'lucide-react';
import { MemoryRouter } from 'react-router-dom';
import { Link } from './Link';

const meta = {
	component: Link,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
	args: {
		to: '/users',
		label: 'ユーザー一覧',
		size: 'md',
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

		size: {
			control: 'radio',
			options: ['sm', 'md', 'lg'],
		},
	},
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
