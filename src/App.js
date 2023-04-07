import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Login from './login';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Routes
} from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<Routes>
						<Route path="/" element={<Login />}>

						</Route>

					</Routes>
				</header>
			</div>
		</Router>
	);
}

export default App;
