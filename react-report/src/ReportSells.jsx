import { useEffect, useState } from 'react'
import styles from './ReportSells.module.scss'

const SalesReport = () => {
	const [salesData, setSalesData] = useState([])
	const [salesReport, setSalesReport] = useState({
		dailySales: {},
		totalSales: 0,
	})

	useEffect(() => {
		const fetchSalesData = async () => {
			try {
				const response = await fetch(
					'https://636524e2f711cb49d1f662c6.mockapi.io/sells',
				)
				const data = await response.json()
				setSalesData(data)
			} catch (error) {
				console.error('Ошибка при получении данных о продажах:', error)
			}
		}

		fetchSalesData()
	}, [])

	useEffect(() => {
		const parseSalesReport = (salesData) => {
			const report = {
				dailySales: {},
				totalSales: 0,
			}

			salesData.forEach(sale => {
				const purchaseDate = sale.purchaseDate
				const totalPrice = sale.items.reduce(
					(total, item) => total + item.price * item.count,
					0,
				)

				if (!report.dailySales[purchaseDate]) {
					report.dailySales[purchaseDate] = {
						sales: [],
						total: 0,
					}
				}

				report.dailySales[purchaseDate].sales.push(sale)
				report.dailySales[purchaseDate].total += totalPrice
				report.totalSales += totalPrice
			})

			return report
		}

		setSalesReport(parseSalesReport(salesData))
	}, [salesData])

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Отчет по продажам</h2>
			<h3 className={styles.everydayTitle}>Ежедневные продажи:</h3>
			<table className={styles.salesTable}>
				<thead>
					<tr>
						<th>Дата</th>
						<th>Итоговая сумма продаж</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(salesReport.dailySales).map(([date, data]) => (
						<tr key={date}>
							<td>{date}</td>
							<td>{data.total}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3 className={styles.detailsTitle}>Детальная информация:</h3>
			<table className={styles.detailsTable}>
				<thead>
					<tr>
						<th>Дата</th>
						<th>ID транзакции</th>
						<th>Товар</th>
						<th>Цена</th>
						<th>Количество</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(salesReport.dailySales).map(([date, data]) =>
						data.sales.map(sale =>
							sale.items.map((item, index) => (
								<tr key={item.id}>
									{index === 0 ? (
										<td rowSpan={sale.items.length}>{date}</td>
									) : null}
									<td>{sale.id}</td>
									<td>{item.title}</td>
									<td>{item.price}</td>
									<td>{item.count}</td>
								</tr>
							)),
						),
					)}
				</tbody>
			</table>
			<h3>Общая сумма продаж: <span><em>{salesReport.totalSales}</em></span></h3>
		</div>
	)
}

export default SalesReport
