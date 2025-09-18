import React, { useEffect } from 'react';
import externalMenuService from '../services/externalMenuService.js';
import internalMenuService from '../services/internalMenuService.js';

export default function DataInitialiser() {
  useEffect(() => {
    const initialMenu = async () => {
      try {
        const menuData = await externalMenuService();
        await internalMenuService(menuData);
        console.log(menuData)
        console.log('Menu Initialise DB');
      } catch (err) {
        console.error('Initialise failed:', err);
      }
    };

    initialMenu();
  }, []);

  return <div>Initialise menu data...</div>;
}


