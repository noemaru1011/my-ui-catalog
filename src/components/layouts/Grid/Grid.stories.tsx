
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import { Text } from '@/components/elements/Text/Text';

const meta = {
    tags: ['autodocs'],
    args: {
        columns: 12,
        space: 'md',
    },
    argTypes: {
        children: {
            description: "GridItemPropsのみ有効です。",
            control: false,
        },
        columns: {
            control: 'select',
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        space: {
            control: 'inline-radio',
            options: ['none', 'sm', 'md', 'lg'],
        },
    },
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

/** 12カラムの基本レイアウト */
export const Default: Story = {
    render: (args) => (
        <div className="p-4">
            <Grid {...args}>
                {Array.from({ length: 12 }, (_, index) => (
                    <Grid.Item span={1} key={index}>
                        <div className="rounded-md border p-4">
                            <Text>{index + 1}</Text>
                        </div>
                    </Grid.Item>
                ))}
            </Grid>
        </div>
    ),
};

/** 1:2 のレイアウト */
export const RatioOneToTwo: Story = {
    render: (args) => (
        <div className="p-4">
            <Grid {...args}>
                <Grid.Item span={4}>
                    <div className="rounded-md border p-4">
                        <Text>4 / 12</Text>
                    </div>
                </Grid.Item>

                <Grid.Item span={8}>
                    <div className="rounded-md border p-4">
                        <Text>8 / 12</Text>
                    </div>
                </Grid.Item>
            </Grid>
        </div>
    ),
};

/** 均等な2カラムのレイアウト */
export const EqualColumns: Story = {
    render: (args) => (
        <div className="p-4">
            <Grid {...args}>
                <Grid.Item span={6}>
                    <div className="rounded-md border p-4">
                        <Text>Left (6 / 12)</Text>
                    </div>
                </Grid.Item>

                <Grid.Item span={6}>
                    <div className="rounded-md border p-4">
                        <Text>Right (6 / 12)</Text>
                    </div>
                </Grid.Item>
            </Grid>
        </div>
    ),
};

/** 均等な3カラムのレイアウト */
export const ThreeColumns: Story = {
    render: (args) => (
        <div className="p-4">
            <Grid {...args}>
                <Grid.Item span={4}>
                    <div className="rounded-md border p-4">
                        <Text>Column 1</Text>
                    </div>
                </Grid.Item>

                <Grid.Item span={4}>
                    <div className="rounded-md border p-4">
                        <Text>Column 2</Text>
                    </div>
                </Grid.Item>

                <Grid.Item span={4}>
                    <div className="rounded-md border p-4">
                        <Text>Column 3</Text>
                    </div>
                </Grid.Item>
            </Grid>
        </div>
    ),
};

/** 不均等な3カラムのレイアウト */
export const MixedColumns: Story = {
    render: (args) => (
        <div className="p-4">
            <Grid {...args}>
                <Grid.Item span={3}>
                    <div className="rounded-md border p-4">
                        <Text>3 / 12</Text>
                    </div>
                </Grid.Item>

                <Grid.Item span={6}>
                    <div className="rounded-md border p-4">
                        <Text>6 / 12</Text>
                    </div>
                </Grid.Item>

                <Grid.Item span={3}>
                    <div className="rounded-md border p-4">
                        <Text>3 / 12</Text>
                    </div>
                </Grid.Item>
            </Grid>
        </div>
    ),
};

/** スマホでは1カラム、md以上では均等な2カラムのレイアウト */
export const Responsive: Story = {
    render: (args) => (
        <div className="p-4">
            <Grid {...args}>
                {Array.from({ length: 4 }, (_, index) => (
                    <Grid.Item span={{ default: 12, md: 6 }} key={index}>
                        <div className="rounded-md border p-4">
                            <Text>Column {index + 1}</Text>
                        </div>
                    </Grid.Item>
                ))}
            </Grid>
        </div>
    ),
};

/** スマホでは1カラム、md以上では均等な4カラムのレイアウト */
export const ResponsiveFourColumns: Story = {
    render: (args) => (
        <div className="p-4">
            <Grid {...args}>
                {Array.from({ length: 8 }, (_, index) => (
                    <Grid.Item span={{ default: 12, md: 3 }} key={index}>
                        <div className="rounded-md border p-4">
                            <Text>Column {index + 1}</Text>
                        </div>
                    </Grid.Item>
                ))}
            </Grid>
        </div>
    ),
};

/** 画面幅に応じてカラム数を変更するレイアウト */
export const ResponsiveColumns: Story = {
    render: (args) => (
        <div className="p-4">
            <Grid {...args} columns={{ default: 1, sm: 2, md: 12 }}>
                <Grid.Item span={{ default: 1, sm: 1, md: 6 }}>
                    <div className="rounded-md border p-4">
                        <Text>Item 1</Text>
                    </div>
                </Grid.Item>

                <Grid.Item span={{ default: 1, sm: 1, md: 6 }}>
                    <div className="rounded-md border p-4">
                        <Text>Item 2</Text>
                    </div>
                </Grid.Item>
            </Grid>
        </div>
    ),
};

/** 余白なしのレイアウト */
export const NoSpacing: Story = {
    args: {
        space: 'none',
    },
    render: (args) => (
        <div className="p-4">
            <Grid {...args}>
                <Grid.Item span={6}>
                    <div className="rounded-md border p-4">
                        <Text>Left</Text>
                    </div>
                </Grid.Item>

                <Grid.Item span={6}>
                    <div className="rounded-md border p-4">
                        <Text>Right</Text>
                    </div>
                </Grid.Item>
            </Grid>
        </div>
    ),
};
