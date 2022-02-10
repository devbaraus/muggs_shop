import Main from '~/components/sections/Main'
import { useLoaderData } from 'remix'
import { ProductItemResponseType, storefrontAPI } from '~/services/storefront'
import { Link } from '@remix-run/react'
import { formatPrice } from '~/utils/index.js'

const gql = String.raw

export async function loader() {
	const query = gql`
		{
			products(first: 6) {
				edges {
					node {
						title
						description
						tags
						handle
						priceRange {
							minVariantPrice {
								amount
							}
						}
						images(first: 5) {
							edges {
								node {
									transformedSrc
									altText
								}
							}
						}
					}
				}
			}
		}
	`
	const { data } = await storefrontAPI(query)
	return data as ProductItemResponseType
}

export default function Index() {
	const { products } = useLoaderData() as ProductItemResponseType
	console.log(products)

	return (
		<>
			<main className="mt-24 px-4 sm:mt-32">
				<div className="max-w-7xl mx-auto text-center">
					<h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-gray-900">
						Beautiful digital design assets
					</h1>
					<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
						Take your digital products to another level with our collection of
						UI kits, templates and icon sets. All our assets were carefully
						designed to work together beautifully. We have obsessed over every
						little detail, and we really believe it shows.
					</p>
					<div className="mt-5 max-w-md mx-auto flex justify-center md:mt-8">
						<div className="rounded-md shadow">
							<a
								href="#"
								className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 divide-x divide-gray-600 hover:bg-gray-700 md:text-lg"
							>
								<span className="pr-6">Get the bundle</span>
								<span className="pl-6">$199</span>
							</a>
						</div>
					</div>
				</div>
				<div className="max-w-2xl mx-auto pt-24 px-4 sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
					<h2 id="products-heading" className="sr-only">
						Products
					</h2>
					<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
						{products.edges.map((item) => {
							const product = item.node
							const image = product.images.edges[0].node
							return (
								<Link to={`/product/${product.handle}`}>
									<a className="group">
										<div className="w-full aspect-w-4 aspect-h-3 rounded-lg overflow-hidden sm:aspect-w-4 sm:aspect-h-3">
											<img
												src={image.transformedSrc}
												alt={image.altText}
												className="w-full h-full object-center object-cover group-hover:opacity-75"
											/>
										</div>
										<div className="mt-4 flex items-center justify-between text-base font-bold text-gray-900">
											<h3>Annuals</h3>
											<p>
												{formatPrice(product.priceRange.minVariantPrice.amount)}
											</p>
										</div>
										<p className="mt-1 text-sm italic text-gray-500">UI Kit</p>
									</a>
								</Link>
							)
						})}
					</div>
				</div>
			</main>
		</>
	)
}
