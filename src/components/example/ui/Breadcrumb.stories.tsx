import type { Meta, StoryObj } from '@storybook/react-vite';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@/components/elements/Link/Link';

const meta = {
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 基本的なパンくずナビゲーション
 *
 * ・現在のページはリンクにしない
 * ・現在のページを aria-current="page" で表現する
 * ・階層構造を順序付きリストで表現する
 */
export const Default: Story = {
    render: () => (
        <Breadcrumb aria-label="パンくずリスト">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/" label="ホーム" />} />
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/services" label="サービス一覧" />} />
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        利用者情報
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    ),
};

/**
 * リンクテキストが長い場合
 *
 * DADSの仕様を参考に、コンテンツ幅を超えた場合でも
 * テキストが折り返されることを確認する。
 */
export const LongText: Story = {
    render: () => (
        <div className="max-w-[400px]">
            <Breadcrumb aria-label="パンくずリスト">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link to="/" label="デジタル庁" />} />
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            render={<Link to="/services" label="行政サービスに関する情報" />}
                        />
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            オンラインでの各種行政手続きに関する詳細情報
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    ),
};

/**
 * 階層が深い場合
 *
 * 複数階層のナビゲーションを確認する。
 */
export const DeepHierarchy: Story = {
    render: () => (
        <Breadcrumb aria-label="パンくずリスト">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/" label="ホーム" />} />
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/services" label="サービス" />} />
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink
                        render={<Link to="/services/life" label="暮らし・手続き" />}
                    />
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink
                        render={<Link to="/services/life/moving" label="引越し" />}
                    />
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        転入届の手続き
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    ),
};

/**
 * モバイル向け横スクロール
 *
 * DADSで示されているモバイル向けの実装パターン。
 * 横スクロールを許可し、パンくずの折り返しを防止する。
 */
export const MobileHorizontalScroll: Story = {
    render: () => (
        <div className="max-w-[320px] overflow-x-auto">
            <Breadcrumb aria-label="パンくずリスト">
                <BreadcrumbList className="w-max flex-nowrap">
                    <BreadcrumbItem className="shrink-0">
                        <BreadcrumbLink render={<Link to="/" label="ホーム" />} />
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem className="shrink-0">
                        <BreadcrumbLink
                            render={<Link to="/services" label="サービス一覧" />}
                        />
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem className="shrink-0">
                        <BreadcrumbLink
                            render={<Link to="/services/procedures" label="行政手続き" />}
                        />
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem className="shrink-0">
                        <BreadcrumbPage>
                            オンライン申請の利用方法
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    ),
};

/**
 * 長い日本語テキストの折り返し
 *
 * デスクトップ・モバイル共通の折り返しパターン。
 */
export const LongTextWithWrapping: Story = {
    render: () => (
        <div className="max-w-[280px]">
            <Breadcrumb aria-label="パンくずリスト">
                <BreadcrumbList className="flex-wrap">
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link to="/" label="ホーム" />} />
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            render={
                                <Link
                                    to="/services"
                                    label="国民生活に関する行政サービスのご案内"
                                />
                            }
                        />
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            各種証明書のオンライン申請手続きについて
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    ),
};