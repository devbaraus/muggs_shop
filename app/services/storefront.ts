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

export type ProductItemType = {
	node: {
		title: string
		description: string
		handle: string
		priceRange: {
			minVariantPrice: {
				amount: string
			}
		}
		images: {
			edges: ProductItemImageType[]
		}
	}
}

export type ProductItemImageType = {
	node: {
		transformedSrc: string
		altText: string
	}
}

export type ProductItemResponseType = {
	products: {
		edges: ProductItemType[]
	}
}
