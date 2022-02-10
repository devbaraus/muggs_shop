type StorefrontConfig = {
	STOREFRONT_API_URL: string
	STOREFRONT_ACCESS_TOKEN: string
}

export class Storefront {
	private config: StorefrontConfig = {
		STOREFRONT_API_URL: '',
		STOREFRONT_ACCESS_TOKEN: '',
	}

	public constructor(API_URL: string = '', ACCESS_TOKEN: string = '') {
		this.config = {
			STOREFRONT_API_URL: API_URL || process.env.STOREFRONT_API_URL as string,
			STOREFRONT_ACCESS_TOKEN: ACCESS_TOKEN || process.env.STOREFRONT_ACCESS_TOKEN as string,
		}
	}

	async fetch(query: string, variables?: object) {
		const response = await fetch(this.config.STOREFRONT_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': this.config.STOREFRONT_ACCESS_TOKEN,
			},
			body: JSON.stringify({ query, variables }),
		})

		return response.json()
	}
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
	variants?: {
		edges: ProductVariantType[]
	}
}

export type ProductVariantType = {
	node: {
		id: string
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
