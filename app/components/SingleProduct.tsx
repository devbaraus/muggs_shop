import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { formatPrice } from '~/utils'
import { SingleProductResponseType, Storefront } from '~/services/storefront'
import { useState } from 'react'
import { mutationCreateCheckout } from '~/graphql/mutation'

type Props = {
	data: SingleProductResponseType
}


export default function SingleProduct({ data }: Props) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { productByHandle: product } = data
	const image = product.images.edges[0].node
	const variantId = product.variants?.edges[0].node.id

	async function handleCheckoutProduct(variantId: string, quantity: number = 1) {
		// @ts-ignore
		const store = new Storefront(window.ENV.STOREFRONT_API_URL, window.ENV.STOREFRONT_ACCESS_TOKEN)
		setIsLoading(true)
		const { data } = await store.fetch(mutationCreateCheckout(), {
			variantId, quantity,
		})
		const { webUrl } = data.checkoutCreate.checkout
		window.open(webUrl, '_blank')?.focus()
	}

	return (
		<>
			<div className='lg:grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-16'>
				<div className='lg:col-span-4'>
					<div className='aspect-w-4 aspect-h-4 rounded-lg bg-gray-100 overflow-hidden'>
						<img
							src={image.transformedSrc}
							alt={image.altText}
							className='object-center object-cover'
						/>
					</div>
				</div>
				<div className='max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3'>
					<div className='flex flex-col-reverse'>
						<div>
							<h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
								{product.title}
							</h1>
							<h2 id='information-heading' className='sr-only'>
								Informação do Produto
							</h2>
							<p className='text-sm text-gray-500 mt-2'>
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
						className='text-gray-500 mt-6 h-64 overflow-x-hidden overflow-y-auto mugg-scrollbar'
						dangerouslySetInnerHTML={{ __html: product.description }}
					/>
					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12'>
						<button
							onClick={() => handleCheckoutProduct(variantId as string)}
							type='button'
							className='w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 col-span-8'
						>
							{
								isLoading &&
								<svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg'
										 fill='none' viewBox='0 0 24 24'>
									<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
									<path className='opacity-75' fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
								</svg>
							}
							<span>
								Comprar {formatPrice(product.priceRange.minVariantPrice.amount)}
							</span>
						</button>
						<button
							type='button'
							className='w-full bg-white border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 col-span-4'
						>
							Carrinho
						</button>
					</div>
					<div className='pt-10 sm:border-t sm:mt-10'>
						<h3 className='text-sm font-medium text-gray-900'>
							Venda Fictícia
						</h3>
						<p className='mt-4 text-sm text-gray-500'>
							Não há intuito de vender qualquer produto demonstrado neste
							website. Todas as informações aqui apresentadas foram retiradas do
							site{' '}
							<a
								href='https://www.amocanecas.com.br/'
								target='_blank'
								className='font-medium text-gray-900 hover:text-gray-700'
							>
								amocanecas.com.br
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
