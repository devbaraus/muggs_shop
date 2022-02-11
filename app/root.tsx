import type { MetaFunction } from 'remix';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from 'remix';

import styles from './styles/tailwind.css';
import Header from '~/components/sections/Header';
import { Footer } from '~/components/sections/Footer';
import StoreProvider from '~/context/StoreContext';
import CartCheckout from '~/components/CartCheckout';

export function links() {
	return [
		{ rel: 'stylesheet', href: styles },
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500&display=swap',
		},
	];
}

export const meta: MetaFunction = () => {
	return { title: 'Muggs Shop' };
};

export async function loader() {
	return {
		ENV: {
			STOREFRONT_API_URL: process.env.STOREFRONT_API_URL,
			STOREFRONT_ACCESS_TOKEN: process.env.STOREFRONT_ACCESS_TOKEN,
		},
	};
}

export default function App() {
	const data = useLoaderData();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="scroll-smooth font-inter">
				<StoreProvider>
					<Header />
					<CartCheckout />
					<Outlet />
					<Footer />
				</StoreProvider>
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' && <LiveReload />}
			</body>
		</html>
	);
}
