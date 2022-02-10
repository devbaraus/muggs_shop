import type { MetaFunction } from 'remix'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'

import styles from './styles/tailwind.css'
import Header from '~/components/sections/Header'
import { Footer } from '~/components/sections/Footer'

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
	return { title: 'Muggs Shop' }
}

export default function App() {
	return (
		<html lang='en'>
		<head>
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width,initial-scale=1' />
			<Meta />
			<Links />
		</head>
		<body className='scroll-smooth font-inter'>
		<Header />
		<Outlet />
		<Footer />
		<ScrollRestoration />
		<Scripts />
		{process.env.NODE_ENV === 'development' && <LiveReload />}
		</body>
		</html>
	)
}
