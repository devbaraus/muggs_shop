import { useLoaderData } from 'remix'
import { ManyProductsResponseType, storefrontAPI } from '~/services/storefront'
import { queryProducts } from '~/graphql/query'
import ProductGrid from '~/components/ProductGrid'
import { Hero } from '~/components/sections/Hero'

export async function loader() {
	const { data } = await storefrontAPI(queryProducts)
	return data as ManyProductsResponseType
}

export default function Index() {
	const data = useLoaderData() as ManyProductsResponseType

	return (
		<>
			<main className="mt-24 px-4 sm:mt-32">
				<Hero />
				<div className="max-w-2xl mx-auto pt-24 px-4 sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
					<h2 id="products-heading">Products</h2>
					<ProductGrid data={data} />
				</div>
			</main>
		</>
	)
}
