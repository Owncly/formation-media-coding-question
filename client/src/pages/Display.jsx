import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import JsonTree from '../components/JsonTree';
import '../styles/MainPages.css';
export default function Display() {
  // Set initial state 
  const [menuData, setMenuData] = useState(null);

  // Awaiting data from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/records');
        const data = await res.json();
        setMenuData(data[0]); 
      } catch (err) {
        console.error('Failed to fetch menu from DB:', err);
      }
    };

    fetchMenu();
  }, []);

  // While loading display wait, and bottumnav
  return (
    <div className="display-page">
      <h1>Display Page</h1>
      <div className="json-tree-wrapper">
        {menuData ? <JsonTree jsonData={menuData} /> : <div className="loading">Please Wait, loading...</div>}
      </div>
      <BottomNav />
    </div>
  );
}