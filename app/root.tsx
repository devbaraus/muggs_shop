import type { MetaFunction } from 'remix'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'remix'

import styles from './styles/tailwind.css'
import Header from '~/components/sections/Header'
import { Footer } from '~/components/sections/Footer'
import { SiteProvider } from '~/context/SiteContext'

export function links() {
	return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => {
	return { title: 'New Remix App' }
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="scroll-smooth bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
				<SiteProvider
					title="Muggs Shop"
					slogan="Compre as canecas mais legais aqui!"
				>
					<Header />
					<Outlet />
					<Footer />
				</SiteProvider>
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' && <LiveReload />}
			</body>
		</html>
	)
}
