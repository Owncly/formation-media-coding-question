
import { Routes, Route } from 'react-router-dom';
import Display from './pages/Display';
import Modify from './pages/Modify';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Display />} />
      <Route path="/modify" element={<Modify />} />
    </Routes>
  );
}