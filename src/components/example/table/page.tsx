import { useTranslation } from 'react-i18next';
import { DataTable } from './data-table';

/**
 * tanstack/react-table を用いたテーブル例です。
 * 詳しいコンポーネントの設計はコードを参照してください。
 * ページネーションは最初の場合は前へのボタン,最後の場合は次へのボタンを表示させないようにする。
 */
export function Page() {
	const { t } = useTranslation('example');
	const roles = {
		designer: t('story.table.roleDesigner'),
		engineer: t('story.table.roleEngineer'),
		productManager: t('story.table.roleProductManager'),
		customerSuccess: t('story.table.roleCustomerSuccess'),
		marketer: t('story.table.roleMarketer'),
		sales: t('story.table.roleSales'),
	};
	const teams = {
		product: t('story.table.teamProduct'),
		development: t('story.table.teamDevelopment'),
		support: t('story.table.teamSupport'),
		marketing: t('story.table.teamMarketing'),
		sales: t('story.table.teamSales'),
	};
	const members = [
		{ id: 1, name: '山田 太郎', role: roles.designer, team: teams.product },
		{ id: 2, name: '佐藤 花子', role: roles.engineer, team: teams.development },
		{ id: 3, name: '鈴木 次郎', role: roles.productManager, team: teams.product },
		{ id: 4, name: '高橋 美咲', role: roles.engineer, team: teams.development },
		{ id: 5, name: '田中 健', role: roles.customerSuccess, team: teams.support },
		{ id: 6, name: '伊藤 葵', role: roles.designer, team: teams.product },
		{ id: 7, name: '渡辺 翔', role: roles.engineer, team: teams.development },
		{ id: 8, name: '中村 優子', role: roles.marketer, team: teams.marketing },
		{ id: 9, name: '小林 大輔', role: roles.engineer, team: teams.development },
		{ id: 10, name: '加藤 彩', role: roles.customerSuccess, team: teams.support },
		{ id: 11, name: '吉田 拓也', role: roles.productManager, team: teams.product },
		{ id: 12, name: '山本 由美', role: roles.designer, team: teams.product },
		{ id: 13, name: '松本 直樹', role: roles.engineer, team: teams.development },
		{ id: 14, name: '井上 美穂', role: roles.marketer, team: teams.marketing },
		{ id: 15, name: '木村 亮介', role: roles.engineer, team: teams.development },
		{ id: 16, name: '林 さくら', role: roles.customerSuccess, team: teams.support },
		{ id: 17, name: '清水 健太', role: roles.designer, team: teams.product },
		{ id: 18, name: '斎藤 真由', role: roles.engineer, team: teams.development },
		{ id: 19, name: '阿部 誠', role: roles.sales, team: teams.sales },
		{ id: 20, name: '森田 奈々', role: roles.marketer, team: teams.marketing },
		{ id: 21, name: '池田 翔太', role: roles.sales, team: teams.sales },
		{ id: 22, name: '橋本 愛', role: roles.customerSuccess, team: teams.support },
		{ id: 23, name: '石川 悠斗', role: roles.engineer, team: teams.development },
	];
	return <DataTable data={members} />;
}
