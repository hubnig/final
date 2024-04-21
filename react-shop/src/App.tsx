import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './scss/app.scss'

// https://65e9cfcfc9bf92ae3d3a4e2e.mockapi.io/items
import VideoBackground from './components/VideoBackground'
import MainLayout from './layouts/MainLayout'
import { Home } from './pages/Home'
import SalesReport from './components/Report'

const Cart = React.lazy(
	() => import(/*webpackChunkName:"Cart"*/ './pages/Cart'),
)
const Fullgame = React.lazy(
	() => import(/*webpackChunkName:"Fullgame"*/ './pages/Fullgame'),
)
const NotFound = React.lazy(
	() => import(/*webpackChunkName:"NotFound"*/ './pages/NotFound'),
)

export default function App() {
	return (
		<>
			<VideoBackground />
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Home />} />
					<Route path='report' element={<SalesReport />} />
					<Route
						path='cart'
						element={
							<Suspense
								fallback={
									<div className='container'>
										<h1>Идет загрузка корзины...</h1>
									</div>
								}
							>
								<Cart />
							</Suspense>
						}
					/>
					<Route
						path='game/:id'
						element={
							<Suspense
								fallback={
									<div className='container'>
										<h1>Идет загрузка...</h1>
									</div>
								}
							>
								<Fullgame />
							</Suspense>
						}
					/>
					<Route
						path='*'
						element={
							<Suspense
								fallback={
									<div className='container'>
										<h1>Идет загрузка...</h1>
									</div>
								}
							>
								<NotFound />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</>
	)
}
