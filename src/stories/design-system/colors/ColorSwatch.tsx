import type { CSSProperties } from 'react';

export type ColorToken = {
	name: string;
	variable: string;
};

type ColorSwatchProps = {
	title: string;
	description?: string;
	tokens: ColorToken[];
};

export function ColorSwatch({ title, description, tokens }: ColorSwatchProps) {
	return (
		<section style={{ marginBottom: 32 }}>
			<h3 style={{ marginBottom: 4 }}>{title}</h3>

			{description && (
				<p style={{ color: 'var(--muted-foreground)', marginTop: 0 }}>{description}</p>
			)}

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
					gap: 12,
				}}
			>
				{tokens.map((token) => (
					<div
						key={token.variable}
						style={{
							border: '1px solid var(--border)',
							borderRadius: 8,
							overflow: 'hidden',
							minWidth: 0,
						}}
					>
						<div
							style={
								{
									height: 64,
									backgroundColor: `var(${token.variable})`,
									borderBottom: '1px solid var(--border)',
								} as CSSProperties
							}
						/>

						<div style={{ padding: 10 }}>
							<div style={{ fontWeight: 600, fontSize: 13 }}>{token.name}</div>

							<code
								style={{
									display: 'block',
									marginTop: 4,
									fontSize: 11,
									color: 'var(--muted-foreground)',
									overflowWrap: 'anywhere',
								}}
							>
								{token.variable}
							</code>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
