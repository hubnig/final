export type CartItem = {
	id: string
	title: string
	price: number
	avatar: object
	// type: string;
	count: number
}

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
