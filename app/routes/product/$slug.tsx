import { useLoaderData } from 'remix'
import { Link } from '@remix-run/react'

type ProductItem = {
	slug: string
	title: string
}

export async function loader() {
	const posts: ProductItem[] = [
		{
			slug: 'my-first-post',
			title: 'My First Post',
		},
		{
			slug: '90s-mixtape',
			title: 'A Mixtape I Made Just For You',
		},
	]

	return posts
}

type Props = {}

export default function ProductItem({}: Props) {
	let posts = useLoaderData() as ProductItem[]
	return (
		<main className="max-w-7xl mx-auto pt-14 px-4 sm:pt-24 sm:px-6 lg:px-8">
			<div className="lg:grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-16">
				<div className="lg:col-span-4">
					<div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
						<img
							src="../../cdn.shopify.com/s/files/1/0596/5516/0014/products/product-011401.png?v=1631074293"
							alt="Preview of the Annuals UI Kit"
							className="object-center object-cover"
						/>
					</div>
				</div>
				<div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3">
					<div className="flex flex-col-reverse">
						<div>
							<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
								Annuals
							</h1>
							<h2 id="information-heading" className="sr-only">
								Product information
							</h2>
							<p className="text-sm text-gray-500 mt-2">
								UI Kit· Updated
								<time dateTime="2021-09-08T04:11:33Z">08 Sep 2021</time>
							</p>
						</div>
					</div>
					<p className="text-gray-500 mt-6">
						Never miss a date again with our timeless calendar design UI Kit.
						Duis commodo purus ligula, a tristique ipsum finibus ut. Nulla
						gravida ultrices dui quis varius.
					</p>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
						<button
							type="button"
							className="w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
						>
							<span>Pay $39</span>
						</button>
						<button
							type="button"
							className="w-full bg-white border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
						>
							Preview
						</button>
					</div>
					<div className="pt-10 sm:border-t sm:mt-10">
						<h3 className="text-sm font-medium text-gray-900">License</h3>
						<p className="mt-4 text-sm text-gray-500">
							For personal and professional use. You cannot resell or
							redistribute these icons in their original or modified state.
							<a
								href="#"
								className="font-medium text-gray-900 hover:text-gray-700"
							>
								Read full license
							</a>
						</p>
					</div>
				</div>
			</div>
			<div className="max-w-2xl mx-auto mt-24 lg:mt-32 lg:max-w-none">
				<div className="flex items-center justify-between space-x-4">
					<h2 className="text-lg font-medium text-gray-900">
						Customers also viewed
					</h2>
					<a
						className="whitespace-nowrap text-sm font-medium text-gray-900 hover:text-gray-700"
						href="../index.html"
					>
						View all<span aria-hidden="true"> →</span>
					</a>
				</div>
				<div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
					<div className="relative group">
						<div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
							<img
								src="../../cdn.shopify.com/s/files/1/0596/5516/0014/products/product-02a106.png?v=1631074361"
								alt="Preview of the Paykit Template"
								className="object-center object-cover group-hover:opacity-75"
							/>
						</div>
						<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
							<h3>
								<a href="paykit">
									<span aria-hidden="true" className="absolute inset-0"></span>
									Paykit
								</a>
							</h3>
							<p>$59</p>
						</div>
						<p className="mt-1 text-sm text-gray-500">Template</p>
					</div>
					<div className="relative group">
						<div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
							<img
								src="../../cdn.shopify.com/s/files/1/0596/5516/0014/products/product-03c5b5.png?v=1631074383"
								alt="Preview of the Tiers UI Kit"
								className="object-center object-cover group-hover:opacity-75"
							/>
						</div>
						<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
							<h3>
								<a href="tiers">
									<span aria-hidden="true" className="absolute inset-0"></span>
									Tiers
								</a>
							</h3>
							<p>$39</p>
						</div>
						<p className="mt-1 text-sm text-gray-500">UI Kit</p>
					</div>
					<div className="relative group">
						<div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
							<img
								src="../../cdn.shopify.com/s/files/1/0596/5516/0014/products/product-048c99.png?v=1631074319"
								alt="Preview of the Format UI KIt"
								className="object-center object-cover group-hover:opacity-75"
							/>
						</div>
						<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
							<h3>
								<a href="format">
									<span aria-hidden="true" className="absolute inset-0"></span>
									Format
								</a>
							</h3>
							<p>$19</p>
						</div>
						<p className="mt-1 text-sm text-gray-500">UI Kit</p>
					</div>
					<div className="relative group">
						<div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
							<img
								src="../../cdn.shopify.com/s/files/1/0596/5516/0014/products/product-05da39.png?v=1631074406"
								alt="Preview of the Unicons Icon Set"
								className="object-center object-cover group-hover:opacity-75"
							/>
						</div>
						<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
							<h3>
								<a href="unicons">
									<span aria-hidden="true" className="absolute inset-0"></span>
									Unicons
								</a>
							</h3>
							<p>$29</p>
						</div>
						<p className="mt-1 text-sm text-gray-500">Icon Set</p>
					</div>
				</div>
			</div>
		</main>
	)
}
