import { HandIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { Link } from '@remix-run/react';
import { useContext } from 'react';
import { StoreContext } from '~/context/StoreContext';

type Props = {};

export default function Header({}: Props) {
	const { cart, cartOpen, setCartOpen } = useContext(StoreContext);

	return (
		<>
			<header className="max-w-7xl mx-auto sm:px-6 lg:px-8">
				<div className="border-b border-gray-200 px-4 sm:px-0">
					<div className="h-16 flex items-center justify-between">
						<div className="flex">
							<Link to="/">
								<a className="flex items-center">
									<HandIcon className="w-10 h-10 text-purple-600" />
									<span className="ml-2 uppercase text-2xl font-bold tracking-tight">
										Muggs Shop
									</span>
								</a>
							</Link>
						</div>
						<div className="flex-1 flex items-center justify-end">
							{/*<a href='#' className='p-2 text-gray-400 hover:text-gray-500'>*/}
							{/*	<span className='sr-only'>Search</span>*/}
							{/*	<SearchIcon className='w-6 h-6' />*/}
							{/*</a>*/}
							<button
								onClick={() => setCartOpen(!cartOpen)}
								className={`p-2 text-gray-400 hover:text-gray-500 relative `}
							>
								<span className="sr-only">Cart</span>
								<span className="text-xs text-white absolute top-[2px] right-[2px] bg-gray-600 w-4 h-4 tracking-tight leading-4 font-thin rounded-full">
									{cart.reduce(
										(val, prod) => ((prod.quantity as number) || 0) + val,
										0,
									)}
								</span>
								<ShoppingCartIcon className="w-6 h-6" />
							</button>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
