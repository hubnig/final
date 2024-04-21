import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { game, SearchgameParams } from './types'

export const fetchgames = createAsyncThunk<game[], SearchgameParams>(
	'game/fetchgamesStatus',
	async params => {
		const { sortBy, order, category, search } = params
		const { data } = await axios.get<game[]>(
			`https://636524e2f711cb49d1f662c6.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
		return data
	},
)
