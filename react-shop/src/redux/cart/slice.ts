import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartSliceState, CartItem } from './types';
import { format } from 'date-fns' 

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

// Подключение библиотеки для форматирования даты

export const processPayment = createAsyncThunk(
	'cart/processPayment',
	async (cartItems: CartItem[], { dispatch }) => {
		try {
			const currentDate = format(new Date(), 'yyyy-MM-dd') // Получение текущей даты и форматирование ее

			// Создание массива с нужными полями для каждого элемента корзины
			const processedItems = cartItems.map(item => ({
				id: item.id,
				title: item.title,
				price: item.price,
				count: item.count,
			}))

			// Создание объекта, который будет отправлен в POST-запросе на сервер
			const paymentData = {
				items: processedItems,
				purchaseDate: currentDate, // Добавление даты совершения покупки
			}

			// Отправить POST-запрос на сервер с paymentData
			const response = await fetch(
				'https://636524e2f711cb49d1f662c6.mockapi.io/sells',
				{
					method: 'POST',
					body: JSON.stringify(paymentData),
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)

			// Проверить успешный ли ответ сервера и выполнить соответствующие действия
			if (response.ok) {
				// Успешно обработан запрос
				dispatch(clearItems()) // Очистить корзину
			} else {
				// Обработать ошибку
				throw new Error('Payment processing failed')
			}
		} catch (error) {
			// Обработать ошибку
			console.error(error)
		}
	},
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.items = state.items.filter((obj) => obj.count !== 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
