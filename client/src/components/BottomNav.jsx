import { Link, useLocation } from 'react-router-dom';
import '../styles/BottomNav.css';

export default function BottomNav() {
  const location = useLocation();
  // Nav with 2 buttons to swap between the two
  return (
    <div className="bottom-nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        Display
      </Link>
      <Link to="/modify" className={location.pathname === '/modify' ? 'active' : ''}>
        Modify
      </Link>
    </div>
  );
}