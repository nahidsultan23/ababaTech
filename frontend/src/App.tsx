import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import NotFound from './components/atoms/NotFound/NotFound';
import styles from './App.module.css';
import { MovieDetails } from './pages/MovieDetails/MovieDetails';

function App() {
    return (
        <div className={styles.app}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/log-in" element={<Login />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
