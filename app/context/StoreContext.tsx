import { createContext } from 'react'

type ContextProps = {
	store: any
}

type Props = {
	store: any
	children: any
}

export const StoreContext = createContext({} as ContextProps)

export default function StoreProvider({ store, children }: Props) {
	return (
		<>
			<StoreContext.Provider value={{ store }}>
				{/*<StoreContext.Provider value={{}}>*/}
				{children}
			</StoreContext.Provider>
		</>
	)
}
