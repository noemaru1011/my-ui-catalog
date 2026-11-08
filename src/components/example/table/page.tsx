import { DataTable } from './data-table';

const INITIAL_MEMBERS = [
	{ id: 1, name: '山田 太郎', role: 'デザイナー', team: 'プロダクト' },
	{ id: 2, name: '佐藤 花子', role: 'エンジニア', team: '開発' },
	{ id: 3, name: '鈴木 次郎', role: 'プロダクトマネージャー', team: 'プロダクト' },
	{ id: 4, name: '高橋 美咲', role: 'エンジニア', team: '開発' },
	{ id: 5, name: '田中 健', role: 'カスタマーサクセス', team: 'サポート' },
	{ id: 6, name: '伊藤 葵', role: 'デザイナー', team: 'プロダクト' },
	{ id: 7, name: '渡辺 翔', role: 'エンジニア', team: '開発' },
	{ id: 8, name: '中村 優子', role: 'マーケター', team: 'マーケティング' },
	{ id: 9, name: '小林 大輔', role: 'エンジニア', team: '開発' },
	{ id: 10, name: '加藤 彩', role: 'カスタマーサクセス', team: 'サポート' },
	{ id: 11, name: '吉田 拓也', role: 'プロダクトマネージャー', team: 'プロダクト' },
	{ id: 12, name: '山本 由美', role: 'デザイナー', team: 'プロダクト' },
	{ id: 13, name: '松本 直樹', role: 'エンジニア', team: '開発' },
	{ id: 14, name: '井上 美穂', role: 'マーケター', team: 'マーケティング' },
	{ id: 15, name: '木村 亮介', role: 'エンジニア', team: '開発' },
	{ id: 16, name: '林 さくら', role: 'カスタマーサクセス', team: 'サポート' },
	{ id: 17, name: '清水 健太', role: 'デザイナー', team: 'プロダクト' },
	{ id: 18, name: '斎藤 真由', role: 'エンジニア', team: '開発' },
	{ id: 19, name: '阿部 誠', role: '営業', team: '営業' },
	{ id: 20, name: '森田 奈々', role: 'マーケター', team: 'マーケティング' },
	{ id: 21, name: '池田 翔太', role: '営業', team: '営業' },
	{ id: 22, name: '橋本 愛', role: 'カスタマーサクセス', team: 'サポート' },
	{ id: 23, name: '石川 悠斗', role: 'エンジニア', team: '開発' },
];

export function Page() {
	return <DataTable data={INITIAL_MEMBERS} />;
}
