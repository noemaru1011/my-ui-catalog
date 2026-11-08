import { useTranslation } from 'react-i18next';
import { DataTable } from './data-table';

export function Page() {
	const { t } = useTranslation();
	const roles = {
		designer: t('example.story.table.roleDesigner'),
		engineer: t('example.story.table.roleEngineer'),
		productManager: t('example.story.table.roleProductManager'),
		customerSuccess: t('example.story.table.roleCustomerSuccess'),
		marketer: t('example.story.table.roleMarketer'),
		sales: t('example.story.table.roleSales'),
	};
	const teams = {
		product: t('example.story.table.teamProduct'),
		development: t('example.story.table.teamDevelopment'),
		support: t('example.story.table.teamSupport'),
		marketing: t('example.story.table.teamMarketing'),
		sales: t('example.story.table.teamSales'),
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
