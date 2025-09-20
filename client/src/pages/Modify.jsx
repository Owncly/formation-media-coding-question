import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import EditJsonTree from '../components/EditJsonTree';
import '../styles/MainPages.css';
import '../styles/EditJsonTree.css';


export default function Modify() {
  const [menuData, setMenuData] = useState(null);
  // Grab the data from, database on load
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


  <h1>Modify Page</h1>
<div className="modify-page">
  {menuData ? <EditJsonTree jsonData={menuData} /> : <div className="loading">Please Wait, loading...</div>}
  <BottomNav />
</div>
    </>
  );
}