import { createContext, useState } from 'react';
import { SingleProduct } from '~/services/storefront';

type ContextProps = {
	cart: SingleProduct[];
	updateCartItem: (variantId: string, product: SingleProduct) => void;
	cartOpen: boolean;
	setCartOpen: (value: boolean) => void;
};

type Props = {
	children: any;
};

export const StoreContext = createContext({} as ContextProps);

export default function StoreProvider({ children }: Props) {
	const [cart, setCart] = useState<SingleProduct[]>([]);
	const [cartOpen, setCartOpen] = useState<boolean>(false);

	function updateCartItem(variantId: string, product: SingleProduct) {
		let itemsCart = cart;
		let updateIndex: number = Infinity;
		cart.map((prod, index) => {
			if (prod.variants?.edges[0].node.id == variantId) {
				updateIndex = index;
			}
		});
		if (Object.keys(product).length === 0) {
			itemsCart.splice(updateIndex, 1);
		} else if (updateIndex != Infinity) {
			itemsCart[updateIndex] = product;
		} else {
			itemsCart.push(product);
		}
		console.log(itemsCart, product);
		setCart([...itemsCart]);
	}

	return (
		<StoreContext.Provider
			value={{ cart, updateCartItem, cartOpen, setCartOpen }}
		>
			{children}
		</StoreContext.Provider>
	);
}
