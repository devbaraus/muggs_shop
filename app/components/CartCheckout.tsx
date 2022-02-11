import { useContext, useState } from 'react';
import { StoreContext } from '~/context/StoreContext';
import { formatPrice } from '~/utils';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { SingleProduct, Storefront } from '~/services/storefront';
import { mutationCreateCheckout } from '~/graphql/mutation';

type Props = {};

export default function CartCheckout({}: Props) {
	const { cartOpen, setCartOpen, cart, updateCartItem } =
		useContext(StoreContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleCheckoutProductsCart() {
		// @ts-ignore
		const store = new Storefront(
			window.ENV.STOREFRONT_API_URL,
			window.ENV.STOREFRONT_ACCESS_TOKEN,
		);
		setIsLoading(true);
		const lineItems = cart.map((prod) => ({
			variantId: prod.variants?.edges[0].node.id,
			quantity: prod.quantity,
		}));
		const { data } = await store.fetch(mutationCreateCheckout(), {
			input: {
				lineItems,
			},
		});
		const { webUrl } = data.checkoutCreate.checkout;
		window.open(webUrl, '_blank')?.focus();
		setIsLoading(false);
	}

	return (
		<div
			className={`fixed w-screen h-screen z-10 top-0 left-0 flex ${
				cartOpen ? 'visible' : 'invisible'
			}`}
		>
			<div
				onClick={() => setCartOpen(!cartOpen)}
				className={`absolute w-full h-full top-0 left-0 ${
					cartOpen ? 'backdrop-blur-sm' : 'backdrop-blur-none'
				}`}
			/>
			<div
				className={`absolute flex flex-col h-full justify-between w-11/12 sm:w-5/12 h-full top-0 right-0 bg-white shadow-sm py-12 px-8 transition-all duration-300 ${
					cartOpen ? 'right-0' : '-right-[100%]'
				}`}
			>
				<div className="h-full">
					<p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
						Carrinho
					</p>

					{cart.length > 0 ? (
						<div className={`grid grid-cols-1 divide-y`}>
							{cart.map((product) => {
								const image = product.images.edges[0].node;
								const variantId = product.variants?.edges[0].node.id;
								return (
									<div
										key={`product-${product.handle}`}
										className="flex gap-x-4 h-32 group"
									>
										<div className="w-48 h-full rounded-lg overflow-hidden relative">
											<img
												src={image.transformedSrc}
												alt={image.altText}
												className="w-full h-full object-center object-cover group-hover:opacity-75"
											/>
										</div>
										<div className="flex justify-between w-full items-center">
											<div className="mt-4 text-base font-bold text-gray-900 h-full">
												<h3>{product.title}</h3>
												<p>
													{formatPrice(
														product.priceRange.minVariantPrice.amount *
															(product.quantity || 1),
													)}
												</p>
												<p className="mt-1 text-sm font-normal italic text-gray-500 capitalize">
													{product.tags.join(', ')}
												</p>
											</div>
											<div className="flex flex-col items-center gap-y-2">
												<div className="bg-gray-50 rounded-md py-3 px-2 flex flex-col items-center justify-between text-base text-gray-500 gap-2">
													<button
														className="hover:text-gray-900"
														onClick={() =>
															updateCartItem(variantId as string, {
																...product,
																quantity: (product.quantity as number) + 1,
															})
														}
													>
														<PlusIcon className="w-3 h-3" />
													</button>
													<input
														value={product.quantity}
														onBlur={() => {
															if (!product.quantity)
																updateCartItem(variantId as string, {
																	...product,
																	quantity: 1,
																});
														}}
														onChange={(el) =>
															updateCartItem(variantId as string, {
																...product,
																quantity: parseInt(el.currentTarget.value),
															})
														}
														type="number"
														className="focus:outline-none outline-none bg-transparent font-bold w-8 text-center appearance-none text-gray-900"
													/>
													<button
														className="hover:text-gray-900"
														onClick={() =>
															updateCartItem(variantId as string, {
																...product,
																quantity: Math.max(
																	(product.quantity as number) - 1,
																	1,
																),
															})
														}
													>
														<MinusIcon className="w-3 h-3" />
													</button>
												</div>
												<button
													onClick={() =>
														updateCartItem(
															variantId as string,
															{} as SingleProduct,
														)
													}
													className="text-red-400 hover:text-red-600"
												>
													<TrashIcon className="w-4 h-4 " />
												</button>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div className="text-center h-full flex items-center justify-around">
							<p>Não há itens no carrinho!</p>
						</div>
					)}
				</div>
				<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
					<div className="w-full bg-white rounded-md py-3 px-8 flex items-center justify-center text-lg font-medium text-gray-900 col-span-4">
						<p>
							<span className="text-gray-500">Total </span>
							{formatPrice(
								cart.reduce(
									(val, prod) =>
										prod.priceRange.minVariantPrice.amount *
											(prod.quantity as number) +
										val,
									0,
								),
							)}
						</p>
					</div>
					<button
						onClick={handleCheckoutProductsCart}
						type="button"
						disabled={cart.length < 1}
						className="w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 col-span-4 disabled:bg-gray-500 "
					>
						{isLoading && (
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						)}
						<span>Pagar Agora</span>
					</button>
				</div>
			</div>
		</div>
	);
}
