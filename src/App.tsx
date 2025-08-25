import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Home from './page/Home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './page/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='app'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Navigate to='/Home' replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
