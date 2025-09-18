import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav.js';
import EditJsonTree from '../components/EditJsonTree';
import '../styles/JsonTree.css';
export default function Modify() {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/records');
        const data = await res.json();
        setMenuData(data[0]); 
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
    <div className="modify-page">
      <h1>Modify Page</h1>
      {menuData ? (
        <EditJsonTree jsonData={menuData} />
      ) : (
        <div>Loading menu...</div>
      )}
      <BottomNav />
    </div>
    </>
  );
}