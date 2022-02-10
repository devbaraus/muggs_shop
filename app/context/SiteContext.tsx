import { createContext, useState } from 'react'

type ContextProps = {
	title: string
	slogan: string
}

export const SiteContext = createContext({} as ContextProps)

interface Props extends ContextProps {
	children: any
}

export function SiteProvider({
	title = 'Brand',
	slogan = 'Buy your stuff right here.',
	children,
}: Props) {
	return (
		<>
			<SiteContext.Provider value={{ title, slogan }}>
				{children}
			</SiteContext.Provider>
		</>
	)
}
