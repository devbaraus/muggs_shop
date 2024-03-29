import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatPrice } from '~/utils';
import { SingleProductResponseType, Storefront } from '~/services/storefront';
import { useContext, useEffect, useState } from 'react';
import { mutationCreateCheckout } from '~/graphql/mutation';
import {
	MinusIcon,
	PlusIcon,
	ShoppingCartIcon,
} from '@heroicons/react/outline';
import { StoreContext } from '~/context/StoreContext';
import ProductImageCarousel from '~/components/ProductImageCarousel';

type Props = {
	data: SingleProductResponseType;
};

export default function SingleProduct({ data }: Props) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(1);
	const { updateCartItem } = useContext(StoreContext);

	const { productByHandle: product } = data;
	const images = product.images.edges.map((item) => item.node);
	const variantId = product.variants?.edges[0].node.id;

	async function handleCheckoutProduct(
		variantId: string,
		quantity: number = 1,
	) {
		// @ts-ignore
		const store = new Storefront(
			window.ENV.STOREFRONT_API_URL,
			window.ENV.STOREFRONT_ACCESS_TOKEN,
		);
		setIsLoading(true);
		const { data } = await store.fetch(mutationCreateCheckout(), {
			input: {
				lineItems: [{ variantId, quantity }],
			},
		});
		const { webUrl } = data.checkoutCreate.checkout;
		window.open(webUrl, '_blank')?.focus();
		setIsLoading(false);
	}

	function handleUpdateCartItem(variantId: string | undefined) {
		updateCartItem(variantId as string, { ...product, quantity: quantity });
	}

	useEffect(() => {
		if (!quantity && quantity != 0) return;
		if (quantity < 1) setQuantity(1);
	}, [quantity]);

	useEffect(() => {
		setQuantity(1);
	}, [product]);

	return (
		<>
			<div className="lg:grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-16">
				<div className="lg:col-span-4">
					<ProductImageCarousel images={images} />
				</div>
				<div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3">
					<div className="flex flex-col-reverse">
						<div>
							<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
								{product.title}
							</h1>
							<h2 id="information-heading" className="sr-only">
								Informação do Produto
							</h2>
							<p className="text-sm text-gray-500 mt-2">
								{product.tags.map((tag) => (
									<span
										key={`tag-${tag.replace(' ', '-')}`}
										className={
											'text-xs py-1 px-1 bg-gray-200 mr-[2px] capitalize'
										}
									>
										{tag}
									</span>
								))}
								· Atualizado{' '}
								<time dateTime={product.updatedAt}>
									{format(
										new Date(product.updatedAt || Date.now()),
										'dd MMM yyyy',
										{
											locale: ptBR,
										},
									)}
								</time>
							</p>
						</div>
					</div>
					<div
						className="text-gray-500 mt-6 h-64 overflow-x-hidden overflow-y-auto mugg-scrollbar"
						dangerouslySetInnerHTML={{ __html: product.description }}
					/>
					<div className="mt-10 grid grid-cols-8 gap-x-6 gap-y-4">
						<div className="w-full bg-gray-50 border border-transparent rounded-md py-3 px-4 flex items-center justify-between text-base text-gray-500 col-span-5">
							<p className="text-sm mr-2">Quantidade</p>
							<input
								value={quantity}
								onBlur={() => {
									if (!quantity) setQuantity(1);
								}}
								onChange={(el) => setQuantity(parseInt(el.currentTarget.value))}
								type="number"
								className="focus:outline-none outline-none bg-transparent font-bold w-full appearance-none text-gray-900"
							/>
							<div className="flex divide-x gap-x-2 bg-gray-200 px-3 rounded-md py-2">
								<button
									className="hover:text-gray-900"
									onClick={() => setQuantity(quantity - 1)}
								>
									<MinusIcon className="w-4 h-4" />
								</button>
								<button
									className="hover:text-gray-900"
									onClick={() => setQuantity(quantity + 1)}
								>
									<PlusIcon className="w-4 h-4" />
								</button>
							</div>
						</div>
						<div className="w-full bg-white rounded-md py-3 px-8 flex items-center justify-center text-lg font-medium text-gray-900 col-span-3">
							{formatPrice(
								product.priceRange.minVariantPrice.amount * (quantity || 1),
							)}
						</div>
					</div>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
						<button
							onClick={() =>
								handleCheckoutProduct(variantId as string, quantity)
							}
							type="button"
							className="w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 col-span-full sm:col-span-5"
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
							<span>Comprar Agora</span>
						</button>
						<button
							onClick={() => handleUpdateCartItem(variantId)}
							type="button"
							className="w-full bg-white border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 col-span-full sm:col-span-3 gap-x-2"
						>
							<ShoppingCartIcon className="w-4 h-4" />
							Carrinho
						</button>
					</div>
					<div className="pt-10 sm:border-t sm:mt-10">
						<h3 className="text-sm font-medium text-gray-900">
							Venda Fictícia
						</h3>
						<p className="mt-4 text-sm text-gray-500">
							Não há intuito de vender qualquer produto demonstrado neste
							website. Todas as informações aqui apresentadas foram retiradas do
							site{' '}
							<a
								href="https://www.amocanecas.com.br/"
								target="_blank"
								className="font-medium text-gray-900 hover:text-gray-700"
							>
								amocanecas.com.br
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
