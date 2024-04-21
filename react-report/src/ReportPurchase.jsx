import { useEffect, useState } from 'react'
import styles from './ReportPurchase.module.scss'

function ReportPurchase() {
	const [salesData, setSalesData] = useState([])

	useEffect(() => {
		fetch('https://6619959b125e9bb9f29a55f5.mockapi.io/Purchases')
			.then(response => response.json())
			.then(data => setSalesData(data))
			.catch(error => console.log(error))
	}, [])

	// Функция для подсчета общей суммы
	const calculateTotal = () => {
		return salesData.reduce((total, sale) => total + sale.price, 0)
	}

	return (
		<div className={styles.container}>
			<h1>Отчёт по закупкам</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Company</th>
						<th>Title game</th>
						<th>Category</th>
						<th>Count</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{salesData.map(sale => (
						<tr key={sale.id}>
							<td>{sale.id}</td>
							<td>{sale.company}</td>
							<td>{sale.title}</td>
							<td>{sale.category}</td>
							<td>{sale.count}</td>
							<td>{sale.price}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3>
				Общая сумма продаж:{' '}
				<span>
					<em>{calculateTotal()}</em>
				</span>
			</h3>
		</div>
	)
}

export default ReportPurchase
