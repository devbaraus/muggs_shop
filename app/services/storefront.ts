type ENVProps = {
	STOREFRONT_API_URL: string
	STOREFRONT_ACCESS_TOKEN: string
}

const ENV = process.env as unknown as ENVProps

export async function storefrontAPI(query: string, variables?: object) {
	const response = await fetch(ENV.STOREFRONT_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': ENV.STOREFRONT_ACCESS_TOKEN,
		},
		body: JSON.stringify({ query, variables }),
	})

	return response.json()
}

export type SingleProduct = {
	title: string
	description: string
	handle: string
	tags: string[]
	updatedAt?: string
	priceRange: {
		minVariantPrice: {
			amount: number
		}
	}
	images: {
		edges: ProductItemImageType[]
	}
}

export type ProductNodeType = {
	node: SingleProduct
}

export type ProductItemImageType = {
	node: {
		transformedSrc: string
		altText: string
	}
}

export type ManyProductsResponseType = {
	products: {
		edges: ProductNodeType[]
	}
}

export type SingleProductResponseType = {
	productByHandle: SingleProduct
}
