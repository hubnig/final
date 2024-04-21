import { createSlice } from '@reduxjs/toolkit'
import { fetchgames } from './asyncActions'
import { gameSliceState, Status } from './types'

const initialState: gameSliceState = {
	items: [],
	status: Status.LOADING,
}

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchgames.pending, state => {
				state.status = Status.LOADING
				state.items = []
			})
			.addCase(fetchgames.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchgames.rejected, (state, action) => {
				console.log(action, 'rejected')
				state.status = Status.ERROR
				state.items = []
			})
	},
})

export const { setItems } = gameSlice.actions
export default gameSlice.reducer
