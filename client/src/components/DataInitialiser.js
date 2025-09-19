import { useEffect } from 'react';
import externalMenuService from '../services/externalMenuService.js';
import internalMenuService from '../services/internalMenuService.js';

// Grab data initially and dump to DB if missing
export default function DataInitialiser() {
  useEffect(() => {
    const initialMenu = async () => {
      try {
        // Check if data already exists
        const res = await fetch('/records');
        const existing = await res.json();

        if (existing.length === 0) {
          // Only insert if no records exist
          const menuData = await externalMenuService();
          await internalMenuService(menuData);
          console.log('Menu initialised in DB');
        } else {
          console.log('Menu already exists, skipping initialisation');
        }
      } catch (err) {
        console.error('Initialise failed:', err);
      }
    };

    initialMenu();
  }, []);
}
