import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
      logout();
    };
  
  return (
    <div>
      <nav className='navbar'>
        <div className='nav-brand'>
          <i className='tachometer-alt'></i>
          Dashboard
        </div>
        <div className='nav-user'>
          <span className='user-name'>{user?.name}</span>
          <button onClick={handleLogout} className='btn-logout'>
            <i className='sign-out-alt'></i>
            Sair
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard