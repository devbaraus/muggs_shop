import { Link } from '@remix-run/react';
import { formatPrice } from '~/utils';
import { ManyProductsResponseType } from '~/services/storefront';

type Props = {
	className?: string;
	data: ManyProductsResponseType;
};

export default function ProductGrid({ data, className }: Props) {
	const { products } = data;

	return (
		<div
			className={`grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 ${className}`}
		>
			{products.edges.map((item) => {
				const product = item.node;
				const image = product.images.edges[0].node;
				return (
					<Link
						key={`product-${product.handle}`}
						to={`/product/${product.handle}`}
					>
						<a className="group hover:cursor-pointer">
							<div className="w-full aspect-w-4 aspect-h-4 rounded-lg overflow-hidden sm:aspect-w-4 sm:aspect-h-4">
								<img
									src={image.transformedSrc}
									alt={image.altText}
									className="w-full h-full object-center object-cover group-hover:opacity-75"
								/>
							</div>
							<div className="mt-4 flex items-center justify-between text-base font-bold text-gray-900">
								<h3>{product.title}</h3>
								<p>{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
							</div>
							<p className="mt-1 text-sm italic text-gray-500 capitalize">
								{product.tags.join(', ')}
							</p>
						</a>
					</Link>
				);
			})}
		</div>
	);
}
