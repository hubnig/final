import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

const Home = () => {
	return (
		<div className={styles.container}>
			<h1>
				Главная страница c отчётами <br />
				магазина KUPIKOD
			</h1>
			<div className={styles.buttons}>
				<Link to='/purchase'>
					<button>Отчет по закупкам</button>
				</Link>
				<Link to='/sells'>
					<button>Отчет по продажам</button>
				</Link>
			</div>
		</div>
	)
}

export default Home
