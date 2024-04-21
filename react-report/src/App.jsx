import { Route, Routes } from 'react-router-dom'
import ReportPurchase from './ReportPurchase';
import ReportSells from './ReportSells';
import Home from './Home';

function App() {
	
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/purchase" element={<ReportPurchase />} />
			<Route path="/sells" element={<ReportSells />} />
		</Routes>
    )
}

export default App;
