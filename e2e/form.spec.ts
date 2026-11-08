import { expect, test } from 'playwright/test';

const FORM_STORY = '/iframe.html?id=components-example-form--default&viewMode=story';

test.describe('フォーム例 E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(FORM_STORY);
		await expect(page.getByRole('heading', { name: 'フォーム例' })).toBeVisible();
	});

	test('空のフォームを送信すると必須エラーが表示される', async ({ page }) => {
		await page.getByRole('button', { name: '送信' }).click();

		for (const message of [
			'氏名を入力してください。',
			'パスワードは8文字以上で入力してください。',
			'カテゴリを選択してください。',
			'ユーザーを選択してください。',
			'ユーザーを1人以上選択してください。',
			'利用規約への同意が必要です。',
			'興味のある分野を1つ以上選択してください。',
			'性別を選択してください。',
			'日付を選択してください。',
			'期間を選択してください。',
			'説明を入力してください。',
			'ファイルを選択してください。',
		]) {
			await expect(page.getByText(message, { exact: true }).first()).toBeVisible();
		}

		await expect(page.getByText('ファイルを選択してください。', { exact: true })).toHaveCount(2);
	});

	test('D&D版とボタン版でそれぞれファイルを添付できる', async ({ page }) => {
		const dragDropFile = page.getByLabel('添付ファイル（ドラッグ＆ドロップ）');
		const buttonFile = page.getByLabel('添付ファイル（ボタン）');

		await dragDropFile.setInputFiles({
			name: 'drag-drop.txt',
			mimeType: 'text/plain',
			buffer: Buffer.from('drag and drop upload'),
		});
		await buttonFile.setInputFiles({
			name: 'button.txt',
			mimeType: 'text/plain',
			buffer: Buffer.from('button upload'),
		});

		await expect(page.getByRole('button', { name: 'drag-drop.txt Remove' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'button.txt Remove' })).toBeVisible();
	});

	test('短いパスワードでは文字数エラーが表示される', async ({ page }) => {
		await page.getByRole('textbox', { name: 'パスワード *' }).fill('short');
		await page.getByRole('button', { name: '送信' }).click();

		await expect(
			page.getByText('パスワードは8文字以上で入力してください。', { exact: true }),
		).toBeVisible();
	});
});
