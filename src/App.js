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
<<<<<<< HEAD
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
=======
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
>>>>>>> parent of ac62af4 (add prettier)
}

export default App;
