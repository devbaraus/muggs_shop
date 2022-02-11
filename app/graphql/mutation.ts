const gql = String.raw;

export const mutationCreateCheckout = () => gql`
	mutation CreateCheckout($input: CheckoutCreateInput!) {
		checkoutCreate(input: $input) {
			checkout {
				webUrl
			}
		}
	}
`;
