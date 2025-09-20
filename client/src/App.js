import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import BottomNav from './components/BottomNav'; 
import DataInitialiser from './components/DataInitialiser.js';

function App() {
  return (
    <Router>
      <DataInitialiser />
      <AppRoutes />
      <BottomNav />
    </Router>
  );
}

export default App;