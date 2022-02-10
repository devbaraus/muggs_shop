const gql = String.raw

export const queryProducts = gql`
	query Products {
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

export const querySingleProduct = gql`
	query SingleProduct($handle: String!) {
		productByHandle(handle: $handle) {
			title
			description: descriptionHtml
			tags
			handle
			updatedAt
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
`
