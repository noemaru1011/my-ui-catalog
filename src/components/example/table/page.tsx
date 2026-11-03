import { DataTable } from './data-table';

const INITIAL_MEMBERS = [
	{ id: 1, name: '山田 太郎', role: 'デザイナー', team: 'プロダクト' },
	{ id: 2, name: '佐藤 花子', role: 'エンジニア', team: '開発' },
	{ id: 3, name: '鈴木 次郎', role: 'プロダクトマネージャー', team: 'プロダクト' },
	{ id: 4, name: '高橋 美咲', role: 'エンジニア', team: '開発' },
	{ id: 5, name: '田中 健', role: 'カスタマーサクセス', team: 'サポート' },
	{ id: 6, name: '伊藤 葵', role: 'デザイナー', team: 'プロダクト' },
	{ id: 7, name: '渡辺 翔', role: 'エンジニア', team: '開発' },
];

export function Page() {
	return <DataTable data={INITIAL_MEMBERS} />;
}
