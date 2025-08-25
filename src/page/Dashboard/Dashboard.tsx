import { useAuth } from '../../hooks/useAuth';
import './Dashboard.scss';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='dashboard'>
      <nav className='dashboard__nav'>
        <div className='dashboard__nav-brand'>Dashboard</div>
        <div className='dashboard__nav-user'>
          <div className='dashboard__nav-user-info'>
            <span className='dashboard__nav-user-name'>{user?.name}</span>
            <span className='dashboard__nav-user-email'>{user?.email}</span>
          </div>
          <button onClick={handleLogout} className='dashboard__nav-btn'>
            Sair
          </button>
        </div>
      </nav>

      <div className='dashboard__content'>
        <div className='dashboard__lorem'>
          <h2>Bem-vindo ao Dashboard</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
