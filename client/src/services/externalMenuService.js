// Grabbing data from URL source
const externalMenuService = async () => {
  const res = await fetch('https://formation-media.github.io/fullstack-interview-test/menu.json');
  if (!res.ok) throw new Error('Failed to fetch external menu');
  return res.json();
};

export default externalMenuService;