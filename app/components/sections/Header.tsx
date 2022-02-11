import { ShoppingCartIcon } from '@heroicons/react/outline';
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 263 220.15"
										className="w-8 h-8 text-purple-600"
										stroke="currentColor"
										fill="currentColor"
									>
										<path d="M0,0H224.66V14.86A14.89,14.89,0,0,1,209.8,29.71h-195A14.9,14.9,0,0,1,0,14.86V0ZM13.64,39.08H211v129A27,27,0,0,1,184.16,195H40.49a26.94,26.94,0,0,1-26.85-26.87v-129Zm33,166.33H178.06v7.37a7.4,7.4,0,0,1-7.37,7.37H54a7.4,7.4,0,0,1-7.38-7.37v-7.37ZM233.21,69.68H220.59V52.43h12.62A29.86,29.86,0,0,1,263,82.21v36.64a29.86,29.86,0,0,1-29.79,29.78H220.59V131.39h12.62a12.6,12.6,0,0,0,12.54-12.54V82.21a12.6,12.6,0,0,0-12.54-12.53Z" />
									</svg>
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
