import { ManyProductsResponseType } from '~/services/storefront'
import { useEffect } from 'react'

type Props = {
	products: ManyProductsResponseType
}

export default function Main({ products }: Props) {
	useEffect(() => {
		console.log(products)
	}, [products])

	return <></>
}
