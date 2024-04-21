import React from 'react'
import { useSelector } from 'react-redux'
import { selectFilter } from '../redux/filter/selectors'
import { setCategoryId } from '../redux/filter/slice'
import { fetchgames } from '../redux/game/asyncActions'
import { selectgameData } from '../redux/game/selectors'

import Categories, { getCategoryNameById } from '../components/Categories'
import Sort from '../components/Sort'
import GameBlock from '../components/GameBlock'
import Skeleton from '../components/GameBlock/Skeleton'
import { useAppDispatch } from '../redux/store'

export const Home: React.FC = () => {
	const dispatch = useAppDispatch()

	const isSearch = React.useRef(false)

	const { items, status } = useSelector(selectgameData)
	const { sort, categoryId, currentPage, searchValue } =
		useSelector(selectFilter)

	const getgames = async () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category =
			categoryId > 0 ? `category=${getCategoryNameById(categoryId)}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchgames({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			}),
		)

		window.scrollTo(0, 0)
	}

	React.useEffect(() => {
		window.scrollTo(0, 0)
		
		if (!isSearch.current) {
			getgames()
		}
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const foundedgames = items.filter(item =>
		item.title.toLowerCase().includes(searchValue.toLowerCase()),
	)
	const games = foundedgames.map((obj: any) => (
		<GameBlock key={obj.id} {...obj} />
	))
	const skeletons = [...new Array(4)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<>
			<div className='container'>
				<div className='content__top'>
					<Categories
						value={categoryId}
						onChangeCategory={React.useCallback(
							(idx: number) => dispatch(setCategoryId(idx)),
							[],
						)}
					/>
					<Sort value={sort} />
				</div>

				<h2 className='content__title'>Все игры</h2>
				{status === 'error' ? (
					<div className='content__error-info'>
						<h2>Произошла ошибка 😕😕😕</h2>
						<p>
							К сожалению, не удалось получить игры. Попробуйте повторить
							попытку позже
						</p>
					</div>
				) : (
					<div className='content__items'>
						{status === 'loading' ? skeletons : games}
					</div>
				)}
			</div>
		</>
	)
}
