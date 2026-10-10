export type WithoutExternalStyle<T, K extends PropertyKey = never> = Omit<
	T,
	K | 'className' | 'style'
> & {
	className?: never;
	style?: never;
};

export function withoutExternalStyle<T extends { className?: never; style?: never }>(props: T) {
	const { className, style, ...safeProps } = props;

	void className;
	void style;

	return safeProps;
}
