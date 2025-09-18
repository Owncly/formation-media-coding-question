import { fetchExternalMenu } from '../services/externalMenuService.js';
import { saveMenuToDB } from '../services/menuService';

useEffect(() => {
  const initialMenu = async () => {
    const externalMenu = await fetchExternalMenu();
    await saveMenuToDB(externalMenu);
  };
  initialMenu();
}, []);