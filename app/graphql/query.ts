const gql = String.raw

export const queryProducts = (count: number = 6) => gql`
    query Products {
        products(first: ${count}) {
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

export const querySingleProduct = (countImages: number = 6) => gql`
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
            images(first: ${countImages}) {
                edges {
                    node {
                        transformedSrc
                        altText
                    }
                }
            }
            variants(first:1) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    }
`
