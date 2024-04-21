import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { selectCartItemById } from '../redux/cart/selectors'
import { addItem } from '../redux/cart/slice'
import { CartItem } from '../redux/cart/types'

const Fullgame: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const [game, setgame] = useState<{
		avatar: {
			url: string
		}
		title: string
		price: number
		desc: string
	}>()

	const cartItem = useSelector(selectCartItemById(id || ''))
	const addedCount = cartItem ? cartItem.count : 0

	const onClickAdd = () => {
		const item: CartItem = {
			id: id || '',
			title: game?.title || '',
			price: game?.price || 0,
			avatar: game?.avatar || { url: '' },
			count: 0,
		}
		dispatch(addItem(item))
	}

	useEffect(() => {
		async function fetchgame() {
			try {
				const { data } = await axios.get(
					'https://636524e2f711cb49d1f662c6.mockapi.io/items/' + id,
				)
				setgame(data)
			} catch (error) {
				alert('Sorry your game is not found :(')
				navigate('/')
			}
		}

		fetchgame()
	}, [])

	if (!game) {
		return (
			<div className='container'>
				<h1>Загрузка...</h1>
			</div>
		)
	}
	return (
		<div className='container'>
			<div className='content-top'>
				<img
					className='game-block__image'
					src={'http://localhost:1337' + game.avatar.url}
					alt='game'
					height={360}
				/>
				<div className='content-top__info'>
					<h2>{game.title} на Steam PC</h2>
					<div>
						<h4>{game.price} ₽</h4>
						<button
							onClick={onClickAdd}
							className='button button--outline button--add'
						>
							<span>Добавить в корзину</span>
							{addedCount > 0 && <i>{addedCount}</i>}
						</button>
					</div>
				</div>
			</div>
			<div className='desc'>
				<h3>Описание игры:</h3>
				<p>{game.desc}</p>
				<br />
				<p>
					<h3>Инструкция по активации игры {game.title} для Steam</h3>
					<ol>
						<li>Запустите клиент Steam и войдите в свою учетную запись.</li>
						<li>Откройте меню «Игры» вверху клиента Steam.</li>
						<li>Выберите пункт «Активировать через Steam...».</li>
						<li>
							Следуйте инструкциям на экране, чтобы завершить активацию игры в
							Steam.
						</li>
					</ol>
					Готово! Приятной игры!
				</p>
				<br />
			</div>
			<Link to='/'>
				<button className='button button--outline button--add'>
					<span>Назад</span>
				</button>
			</Link>
		</div>
	)
}

export default Fullgame
