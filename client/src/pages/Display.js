import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav.js';
import JsonTree from '../components/JsonTree.js';

export default function Display() {
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
    <>
      <h1>Display Page</h1>
      <BottomNav />
      {menuData ? <JsonTree jsonData={menuData} /> : <div>Please Wait, loading...</div>}
    </>
  );
}