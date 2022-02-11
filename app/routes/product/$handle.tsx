import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import {
	ManyProductsResponseType,
	ProductNodeType,
	SingleProductResponseType,
	Storefront,
} from '~/services/storefront';
import { queryProducts, querySingleProduct } from '~/graphql/query';
import SingleProduct from '~/components/SingleProduct';
import ProductGrid from '~/components/ProductGrid';
import { Link } from '@remix-run/react';

export const loader: LoaderFunction = async ({ params }) => {
	const store = new Storefront();
	const { data: singleProduct } = await store.fetch(querySingleProduct(), {
		handle: params.handle,
	});
	const { data: products } = await store.fetch(queryProducts(7));

	return { singleProduct, products };
};

export const meta: MetaFunction = ({
	data,
}: {
	data: { singleProduct: SingleProductResponseType };
}) => {
	const { productByHandle: product } = data.singleProduct;
	return {
		title: `Muggs Shop | ${product.title}`,
		description: product.description,
		keywords: product.tags.join(', '),
		'twitter:card': 'summary_large_image',
		'twitter:creator': `@devbaraus`,
		'twitter:site': `baraus.dev`,
		'twitter:title': `Muggs Shop | ${product.title}`,
		'twitter:description': product.description,
	};
};

type Props = {};

export default function ProductItem({}: Props) {
	const { singleProduct, products } = useLoaderData();
	const recomendationProducts: ManyProductsResponseType = {
		products: {
			edges: products.products.edges.filter(
				({ node }: ProductNodeType) =>
					node.handle !== singleProduct.productByHandle.handle,
			),
		},
	};

	return (
		<main className="max-w-7xl mx-auto pt-14 px-4 sm:pt-24 sm:px-6 lg:px-8">
			<SingleProduct data={singleProduct} />
			<div className="max-w-2xl mx-auto mt-24 lg:mt-32 lg:max-w-none">
				<div className="flex items-center justify-between space-x-4">
					<h2 className="text-lg font-medium text-gray-900">
						Produtos relevantes
					</h2>
					<Link to="/">
						<a className="whitespace-nowrap text-sm font-medium text-gray-900 hover:text-gray-700">
							Veja mais<span aria-hidden="true"> →</span>
						</a>
					</Link>
				</div>
				<ProductGrid data={recomendationProducts} className="mt-6" />
			</div>
		</main>
	);
}
