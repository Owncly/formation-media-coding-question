const internalMenuService = async (menuData) => {
  await fetch('/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menuData),
  });
};

export default internalMenuService;
