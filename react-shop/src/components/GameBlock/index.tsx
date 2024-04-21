import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItemById } from '../../redux/cart/selectors'
import { addItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'

// const typeNames = ['Standart Edition', 'Ultimate Edition'];

type GameBlockProps = {
	id: string
	price: number
	title: string
	avatar: {
		url: string
	}
}

const GameBlock: React.FC<GameBlockProps> = ({ id, price, title, avatar }) => {
	const dispatch = useDispatch()
	const cartItem = useSelector(selectCartItemById(id))

	// const [activeType, setActvieType] = React.useState(0);

	const addedCount = cartItem ? cartItem.count : 0

	const onClickAdd = () => {
		const item: CartItem = {
			id,
			title,
			price,
			avatar,
			// type: typeNames[activeType],
			count: 0,
		}
		dispatch(addItem(item))
	}

	return (
		<div className='game-block-wrapper'>
			<div className='game-block'>
				<Link to={'game/' + id}>
					<img
						className='game-block__image'
						src={'http://localhost:1337' + avatar.url}
						alt='game'
						height={360}
					/>
					<h4 className='game-block__title'>{title}</h4>
				</Link>
				{/* <div className='game-block__selector'>
					<ul>
						{types.map((typeId, i) => (
							<li
								key={typeId}
								onClick={() => setActvieType(typeId)}
								className={activeType === typeId ? 'active' : ''}
							>
								{typeNames[typeId]}
							</li>
						))}
					</ul>
				</div> */}
				<div className='game-block__bottom'>
					<div className='game-block__price'>от {price} ₽</div>
					<button
						onClick={onClickAdd}
						className='button button--outline button--add'
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	)
}

export default GameBlock
