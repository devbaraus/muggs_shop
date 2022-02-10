import { Link } from '@remix-run/react'
import { ProductItemResponseType } from '~/services/storefront'
import { useEffect } from 'react'

type Props = {
	products: ProductItemResponseType
}

export default function Main({ products }: Props) {
	useEffect(() => {
		console.log(products)
	}, [products])

	return <></>
}
