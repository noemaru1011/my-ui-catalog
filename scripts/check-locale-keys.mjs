import fs from 'node:fs';

const EN = JSON.parse(fs.readFileSync('src/i18n/locales/en/translation.json', 'utf-8'));

const JA = JSON.parse(fs.readFileSync('src/i18n/locales/ja/translation.json', 'utf-8'));

const ERRORS = [];

function compareKeys(source, target, path = '') {
	for (const key of Object.keys(source)) {
		const currentPath = path ? `${path}.${key}` : key;

		if (!(key in target)) {
			ERRORS.push(`Missing key: ${currentPath}`);
			continue;
		}

		const sourceValue = source[key];
		const targetValue = target[key];

		const sourceIsObject = sourceValue !== null && typeof sourceValue === 'object';

		const targetIsObject = targetValue !== null && typeof targetValue === 'object';

		if (sourceIsObject !== targetIsObject) {
			ERRORS.push(`Type mismatch: ${currentPath}`);
			continue;
		}

		if (sourceIsObject) {
			compareKeys(sourceValue, targetValue, currentPath);
		}
	}
}

compareKeys(EN, JA);
compareKeys(JA, EN);

if (ERRORS.length > 0) {
	console.error('\nLocale key check failed:\n');

	ERRORS.forEach((error) => {
		console.error(`  - ${error}`);
	});

	process.exit(1);
}

console.log('Locale key check passed!');
