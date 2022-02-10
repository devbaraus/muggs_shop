import type { MetaFunction } from 'remix'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'

import styles from './styles/tailwind.css'
import Header from '~/components/sections/Header'
import { Footer } from '~/components/sections/Footer'
import { SiteContext, SiteProvider } from '~/context/SiteContext'
import { useContext } from 'react'

export function links() {
	return [
		{ rel: 'stylesheet', href: styles },
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap',
		},
	]
}

export const meta: MetaFunction = () => {
	const siteContext = useContext(SiteContext)
	return { title: siteContext.title }
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
			<body className="scroll-smooth font-inter">
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
