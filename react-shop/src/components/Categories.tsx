import React from 'react'

type CategoriesProps = {
	value: number
	onChangeCategory: (id: number) => void
}

const categories = [
	'Все',
	'RPG',
	'Action',
	'Sports',
	'Strategy',
	'Fighting',
	'Adventure',
	'Arcade',
	'Racing',
	'Quest',
	'Simulation',
	'Shooter',
	'MMO',
	'Education',
	'Other',
]

export const getCategoryNameById = (categoryId: number): string => {
	if (categoryId >= 0 && categoryId < categories.length) {
		return categories[categoryId]
	}
	return ''
}

const Categories: React.FC<CategoriesProps> = React.memo(
	({ value, onChangeCategory }) => {
		const handleClick = (categoryId: number) => {
			onChangeCategory(categoryId)
		}

		return (
			<div className='categories'>
				<ul>
					{categories.map((categoryName, i) => (
						<li
							key={i}
							onClick={() => handleClick(i)}
							className={value === i ? 'active' : ''}
						>
							{categoryName}
						</li>
					))}
				</ul>
			</div>
		)
	},
)

export default Categories
