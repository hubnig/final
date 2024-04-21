import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cart from './cart/slice'
import filter from './filter/slice'
import game from './game/slice'

export const store = configureStore({
	reducer: {
		filter,
		cart,
		game,
	},
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
