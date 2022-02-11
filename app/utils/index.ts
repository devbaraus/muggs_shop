export function formatPrice(price: number) {
	return Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	}).format(price);
}
