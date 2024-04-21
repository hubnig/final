export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type game = {
	id: string
	price: number
	title: string
	avatar: object
	types: number[]
}

export interface gameSliceState {
	items: game[]
	status: Status
}

export type SearchgameParams = {
	sortBy: string
	order: string
	category: string
	search: string
	currentPage: string
}
