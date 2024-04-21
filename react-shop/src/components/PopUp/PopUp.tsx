import React, { useState } from 'react'
import Styles from './PopUp.module.scss'
import { processPayment } from '../../redux/cart/slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart } from '../../redux/cart/selectors'

interface IPopupProps {
	Active: boolean
	setActive: (active: boolean) => void
}

const Popup = ({ Active, setActive }: IPopupProps) => {
	const [formFilled, setFormFilled] = useState(false)
	const { items } = useSelector(selectCart)
	const dispatch = useDispatch()

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const formInputs =
			document.querySelectorAll<HTMLInputElement>('input[required]')
		let isFormFilled = true

		formInputs.forEach((input: HTMLInputElement) => {
			if (input.value === '') {
				isFormFilled = false
			}
		})

		setFormFilled(isFormFilled)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// Обработка отправки формы
	}

	const onClickPay = () => {
		if (window.confirm('Оплатить сейчас?')) {
			dispatch(processPayment(items) as any)
		}
	}

	return (
		<div
			onClick={() => setActive(false)}
			className={Active ? `${Styles.overlay} ${Styles.active}` : Styles.overlay}
		>
			<div
				onClick={e => e.stopPropagation()}
				className={Active ? `${Styles.popup} ${Styles.active}` : Styles.popup}
			>
				<h1>Форма оплаты</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						placeholder='Введите свой email'
						required
						onChange={handleInputChange}
					/>

					<label htmlFor='card'>Номер карты:</label>
					<input
						type='text'
						id='card'
						name='card'
						placeholder='Введите номер карты'
						required
						onChange={handleInputChange}
					/>

					<label htmlFor='expiry'>Срок действия:</label>
					<input
						type='text'
						id='expiry'
						name='expiry'
						placeholder='MM/YY'
						required
						onChange={handleInputChange}
					/>

					<label htmlFor='cvv'>CVV:</label>
					<input
						type='text'
						id='cvv'
						name='cvv'
						placeholder='Введите CVV'
						required
						onChange={handleInputChange}
					/>

					<button onClick={onClickPay} type='submit' disabled={!formFilled}>
						Оплатить
					</button>
				</form>
				<button onClick={() => setActive(false)}>Закрыть</button>
			</div>
		</div>
	)
}

export default Popup
