import { Link } from 'react-router-dom';

export type ImageProps = {
	src: string;
	alt: string;
	description?: string;
	/** リンク先のURL。指定した場合、画像がリンクとして表示されます。*/
	to?: string;
	width?: string;
};

export function Image({ src, alt, description, to, width = '100%' }: ImageProps) {
	const image = <img src={src} alt={alt} className="block h-auto w-full" />;

	return (
		<figure className="m-0 max-w-full" style={{ width }}>
			{to ? <Link to={to}>{image}</Link> : image}

			{description && <figcaption className="mt-2 text-base leading-7">{description}</figcaption>}
		</figure>
	);
}
